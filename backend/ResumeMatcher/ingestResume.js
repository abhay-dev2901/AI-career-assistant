import fs from "fs";
import path from "path";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embedBatch } from "./embedder.js";
import { getPineconeIndex } from "./pineconeClient.js";

// Simple PDF text extractor using pdfjs-dist
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

export async function ingestResume(filePath, userId = "default") {
    // 1. Extract text
    console.log("📄 Extracting text from PDF...");
    const text = await extractTextFromPDF(filePath);
    console.log("Text length:", text.length);
    console.log("Text preview:", text.slice(0, 300));
    console.log("Chunks will be:", text.trim().length);
    if (!text?.trim()) throw new Error("Could not extract text from PDF");


    // 2. Split into chunks
    console.log("✂️  Splitting into chunks...");
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 500,
        chunkOverlap: 50,
    });
    const chunks = await splitter.splitText(text);
    console.log(`Split into ${chunks.length} chunks`);

    // 3. Embed
    console.log("🔢 Embedding chunks...");
    const embeddings = await embedBatch(chunks);

    console.log("Embeddings count:", embeddings.length);
    console.log("First embedding:", embeddings[0]?.slice(0, 3));

    // 4. Upsert into Pinecone
    console.log("📌 Storing in Pinecone...");
    const index = await getPineconeIndex();

    const vectors = chunks.map((chunk, i) => ({
        id: `${userId}-chunk-${i}-${Date.now()}`,
        values: embeddings[i],
        metadata: { text: chunk, userId, chunkIndex: i, source: "resume" },
    }));
    console.log("Vectors to upsert:", vectors.length);

    console.log("First vector id:", vectors[0].id);
    console.log("First vector values length:", vectors[0].values.length);
    console.log("First vector metadata:", vectors[0].metadata);
    console.log("First vector sample:", JSON.stringify(vectors[0]).slice(0, 100));

    await index.upsert({ records: vectors });

    console.log(`✅ Ingested ${vectors.length} chunks for user: ${userId}`);
    return { chunksIngested: vectors.length };
}