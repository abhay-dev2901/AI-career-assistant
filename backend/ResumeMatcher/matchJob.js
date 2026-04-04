import { GoogleGenerativeAI } from "@google/generative-ai";
import { embedText } from "./embedder.js";
import { getPineconeIndex } from "./pineconeClient.js";

function getLLM() {
  const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return client.getGenerativeModel({ model: "gemini-2.5-flash-lite" });
}

export async function matchJobToResume(jobDescription, userId = "default", topK = 5) {
  // 1. Embed job description
  console.log("🔢 Embedding job description...");
  const jobVector = await embedText(jobDescription);

  // 2. Query Pinecone
  console.log("🔍 Searching Pinecone...");
  const index = await getPineconeIndex();
  const results = await index.query({
    vector: jobVector,
    topK,
    filter: { userId },
    includeMetadata: true,
  });

  if (!results.matches?.length) {
    return {
      score: 0,
      summary: "No resume found. Please upload your resume first.",
      suggestions: [],
    };
  }

  // 3. Calculate match score
  const scores = results.matches.map((m) => m.score);
  const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
  const matchPercent = Math.round(avgScore * 100);

  // 4. Extract resume context from matched chunks
  const resumeContext = results.matches
    .map((m) => m.metadata.text)
    .join("\n\n");

  // 5. Ask Gemini LLM for improvement suggestions
  console.log("🤖 Generating AI suggestions...");
  const model = getLLM();

  const prompt = `
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

Respond in this exact JSON format:
{
  "assessment": "2-3 sentence honest assessment",
  "suggestions": [
    "specific suggestion 1",
    "specific suggestion 2",
    "specific suggestion 3",
    "specific suggestion 4",
    "specific suggestion 5"
  ],
  "missingSkills": ["skill1", "skill2", "skill3"],
  "strengths": ["strength1", "strength2", "strength3"]
}

Return ONLY the JSON, no extra text.
`;

  const result = await model.generateContent(prompt);
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

  return {
    score: matchPercent,
    ...aiAnalysis,
  };
}