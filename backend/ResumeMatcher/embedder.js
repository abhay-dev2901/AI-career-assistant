import { GoogleGenerativeAI } from "@google/generative-ai";

const DELAY_MS = 4500;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");
  const client = new GoogleGenerativeAI(apiKey);
  return client.getGenerativeModel({ model: "gemini-embedding-001" });
}

export async function embedText(text) {
  await sleep(DELAY_MS);
  const model = getModel();
  const result = await model.embedContent({
    content: { role: "user", parts: [{ text }] },
  });
  if (!result.embedding?.values?.length) {
    throw new Error("Empty embedding returned");
  }
  return result.embedding.values;
}

export async function embedBatch(texts) {
  const embeddings = [];
  for (const text of texts) {
    const vector = await embedText(text);
    embeddings.push(vector);
  }
  return embeddings;
}