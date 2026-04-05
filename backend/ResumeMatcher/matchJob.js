import { GoogleGenerativeAI } from "@google/generative-ai";
import { embedText } from "./embedder.js";
import { getPineconeIndex } from "./pineconeClient.js";
import { prisma } from "../lib/prisma.js";

const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-pro-latest",
  "gemini-flash-latest",
];

function getLLM(modelName) {
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return client.getGenerativeModel({ model: modelName });
}

async function generateWithRetry(model, prompt, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await model.generateContent(prompt);
    } catch (err) {
      if (err.status === 503 && i < retries - 1) {
        console.log(`Model busy, retrying in ${(i + 1) * 5}s...`);
        await new Promise((r) => setTimeout(r, (i + 1) * 5000));
      } else {
        throw err;
      }
    }
  }
}

async function generateWithFallback(prompt) {
  for (const modelName of MODELS) {
    try {
      console.log(`🤖 Trying model: ${modelName}`);
      const model = getLLM(modelName);
      const result = await generateWithRetry(model, prompt);
      console.log(`✅ Success with: ${modelName}`);
      return result;
    } catch (err) {
      if (err.status === 429 || err.status === 503 || err.status === 404) {
        console.log(`❌ ${modelName} failed (${err.status}), trying next...`);
        continue;
      }
      throw err;
    }
  }
  throw new Error("All models failed. Please try again later.");
}

async function generateStreamWithFallback(prompt) {
  for (const modelName of MODELS) {
    try {
      console.log(`🤖 Trying stream model: ${modelName}`);
      const model = getLLM(modelName);
      const result = await model.generateContentStream(prompt);
      console.log(`✅ Streaming with: ${modelName}`);
      return result;
    } catch (err) {
      if (err.status === 429 || err.status === 503 || err.status === 404) {
        console.log(`❌ ${modelName} failed (${err.status}), trying next...`);
        continue;
      }
      throw err;
    }
  }
  throw new Error("All models failed. Please try again later.");
}

function buildPrompt(resumeContext, jobDescription) {
  return `
You are an expert career coach and resume reviewer.

Here is the candidate's resume (relevant sections):
${resumeContext}

Here is the job description they are applying for:
${jobDescription}

Based on the resume and job description:
1. Give an honest assessment of how well the resume matches this role
2. List 5 specific, actionable suggestions to improve the resume for this role
3. List the key skills/keywords from the job description that are MISSING from the resume
4. List the candidate's existing strengths that are relevant to this role

Respond in this exact JSON format only, no extra text:
{
  "assessment": "2-3 sentence honest assessment",
  "suggestions": ["suggestion 1", "suggestion 2", "suggestion 3", "suggestion 4", "suggestion 5"],
  "missingSkills": ["skill1", "skill2", "skill3"],
  "strengths": ["strength1", "strength2", "strength3"]
}`;
}

async function getResumeContext(jobDescription, userId, topK) {
  console.log("🔢 Embedding job description...");
  const jobVector = await embedText(jobDescription);

  console.log("🔍 Searching Pinecone...");
  const index = await getPineconeIndex();
  const results = await index.query({
    vector: jobVector,
    topK,
    filter: { userId },
    includeMetadata: true,
  });

  return results;
}

// Non-streaming version
export async function matchJobToResume(jobDescription, userId = "default", topK = 5) {
  const results = await getResumeContext(jobDescription, userId, topK);

  if (!results.matches?.length) {
    return {
      score: 0,
      assessment: "No resume found. Please upload your resume first.",
      suggestions: [],
      missingSkills: [],
      strengths: [],
    };
  }

  const scores = results.matches.map((m) => m.score);
  const matchPercent = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
  const resumeContext = results.matches.map((m) => m.metadata.text).join("\n\n");

  console.log("🤖 Generating AI suggestions...");
  const result = await generateWithFallback(buildPrompt(resumeContext, jobDescription));
  const responseText = result.response.text();

  let aiAnalysis;
  try {
    const clean = responseText.replace(/```json|```/g, "").trim();
    aiAnalysis = JSON.parse(clean);
  } catch {
    aiAnalysis = {
      assessment: responseText,
      suggestions: [],
      missingSkills: [],
      strengths: [],
    };
  }

  // Save to DB
  try {
    await prisma.resumeAnalysis.create({
      data: {
        userId,
        jobDescription,
        score: matchPercent,
        assessment: aiAnalysis.assessment,
        suggestions: aiAnalysis.suggestions,
        missingSkills: aiAnalysis.missingSkills,
        strengths: aiAnalysis.strengths,
      },
    });
    console.log("💾 Analysis saved to database");
  } catch (err) {
    console.error("Failed to save analysis (non-blocking):", err.message);
  }

  return { score: matchPercent, ...aiAnalysis };
}

// Streaming version
export async function matchJobToResumeStream(jobDescription, userId = "default", topK = 5, onChunk) {
  const results = await getResumeContext(jobDescription, userId, topK);

  if (!results.matches?.length) {
    onChunk(JSON.stringify({ type: "error", message: "No resume found. Please upload your resume first." }));
    return;
  }

  const scores = results.matches.map((m) => m.score);
  const matchPercent = Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
  const resumeContext = results.matches.map((m) => m.metadata.text).join("\n\n");

  // Send score immediately
  onChunk(JSON.stringify({ type: "score", score: matchPercent }));

  console.log("🤖 Streaming AI suggestions...");
  const streamResult = await generateStreamWithFallback(buildPrompt(resumeContext, jobDescription));

  let fullText = "";
  for await (const chunk of streamResult.stream) {
    const text = chunk.text();
    fullText += text;
    onChunk(JSON.stringify({ type: "chunk", text }));
  }

  // Parse final result
  let aiAnalysis;
  try {
    const clean = fullText.replace(/```json|```/g, "").trim();
    aiAnalysis = JSON.parse(clean);
  } catch {
    aiAnalysis = {
      assessment: fullText,
      suggestions: [],
      missingSkills: [],
      strengths: [],
    };
  }

  // Save to DB
  try {
    await prisma.resumeAnalysis.create({
      data: {
        userId,
        jobDescription,
        score: matchPercent,
        assessment: aiAnalysis.assessment,
        suggestions: aiAnalysis.suggestions,
        missingSkills: aiAnalysis.missingSkills,
        strengths: aiAnalysis.strengths,
      },
    });
    console.log("💾 Analysis saved to database");
  } catch (err) {
    console.error("Failed to save analysis (non-blocking):", err.message);
  }

  onChunk(JSON.stringify({ type: "done", data: { score: matchPercent, ...aiAnalysis } }));
}