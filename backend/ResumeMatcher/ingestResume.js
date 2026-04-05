import fs from "fs";
import { embedBatch } from "./embedder.js";
import { getPineconeIndex } from "./pineconeClient.js";

async function extractTextFromPDF(filePath) {
  const { getDocument } = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(fs.readFileSync(filePath));
  const pdf = await getDocument({ data }).promise;

  let fullText = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += pageText + "\n";
  }
  return fullText;
}

function splitIntoSemanticChunks(text) {
  const sectionPatterns = [
    /\b(PROFESSIONAL SUMMARY|SUMMARY|OBJECTIVE)\b/i,
    /\b(EXPERIENCE|WORK EXPERIENCE|PROFESSIONAL EXPERIENCE|EMPLOYMENT)\b/i,
    /\b(EDUCATION|ACADEMIC|QUALIFICATIONS)\b/i,
    /\b(SKILLS|TECHNICAL SKILLS|CORE SKILLS|COMPETENCIES)\b/i,
    /\b(PROJECTS|PERSONAL PROJECTS|KEY PROJECTS)\b/i,
    /\b(CERTIFICATIONS|CERTIFICATES|ACHIEVEMENTS|AWARDS)\b/i,
    /\b(LANGUAGES|INTERESTS|HOBBIES|VOLUNTEER)\b/i,
  ];

  const sections = [];
  for (const pattern of sectionPatterns) {
    const match = text.match(pattern);
    if (match && match.index !== undefined) {
      sections.push({ index: match.index, name: match[0] });
    }
  }

  sections.sort((a, b) => a.index - b.index);

  if (sections.length === 0) {
    // fallback to basic splitting
    const chunks = [];
    for (let i = 0; i < text.length; i += 450) {
      const chunk = text.slice(i, i + 500).trim();
      if (chunk.length > 30) chunks.push(chunk);
    }
    return chunks;
  }

  const chunks = [];

  // text before first section (name, contact info)
  if (sections[0].index > 50) {
    const header = text.slice(0, sections[0].index).trim();
    if (header.length > 30) chunks.push(header);
  }

  // each section as its own chunk
  for (let i = 0; i < sections.length; i++) {
    const start = sections[i].index;
    const end = sections[i + 1]?.index ?? text.length;
    const sectionText = text.slice(start, end).trim();

    if (sectionText.length <= 30) continue;

    if (sectionText.length > 800) {
      for (let j = 0; j < sectionText.length; j += 750) {
        const sub = sectionText.slice(j, j + 800).trim();
        if (sub.length > 30) chunks.push(sub);
      }
    } else {
      chunks.push(sectionText);
    }
  }

  return chunks;
}

export async function deleteUserResume(userId) {
  const index = await getPineconeIndex();
  try {
    await index.deleteMany({ userId, source: "resume" });
    console.log(`🗑️ Deleted existing resume vectors for: ${userId}`);
  } catch (err) {
    console.log("Delete warning (may not exist yet):", err.message);
  }
}

export async function ingestResume(filePath, userId = "default") {
  const index = await getPineconeIndex();

  // Check if resume already indexed
  if (!forceReindex) {
    console.log("🔍 Checking if resume already indexed...");
    try {
      const stats = await index.describeIndexStats();
      const namespaceExists = stats.namespaces?.[""] !== undefined;
      const totalVectors = stats.totalRecordCount ?? 0;

      if (totalVectors > 0) {
        // Query with a real check
        const checkEmbed = await embedText(userId); // embed userId as proxy
        const existing = await index.query({
          vector: checkEmbed,
          topK: 1,
          filter: { userId, source: "resume" },
          includeMetadata: false,
        });

        if (existing.matches?.length > 0 && existing.matches[0].score > 0) {
          console.log(`✅ Resume already indexed for: ${userId}, skipping`);
          return { chunksIngested: 0, skipped: true };
        }
      }
    } catch (err) {
      console.log("Could not check existing:", err.message);
    }
  }

  // 1. Extract text
  console.log("📄 Extracting text from PDF...");
  const text = await extractTextFromPDF(filePath);
  if (!text?.trim()) throw new Error("Could not extract text from PDF");
  console.log(`Text length: ${text.length}`);

  // 2. Semantic chunking
  console.log("✂️  Splitting into semantic chunks...");
  const chunks = splitIntoSemanticChunks(text);
  console.log(`Split into ${chunks.length} semantic chunks`);

  // 3. Embed
  console.log("🔢 Embedding chunks...");
  const embeddings = await embedBatch(chunks);

  // 4. Upsert into Pinecone
  console.log("📌 Storing in Pinecone...");
  const vectors = chunks.map((chunk, i) => ({
    id: `${userId}-chunk-${i}-${Date.now()}`,
    values: embeddings[i],
    metadata: { text: chunk, userId, chunkIndex: i, source: "resume" },
  }));

  await index.upsert({ records: vectors });

  console.log(`✅ Ingested ${vectors.length} chunks for user: ${userId}`);
  return { chunksIngested: vectors.length, skipped: false };
}