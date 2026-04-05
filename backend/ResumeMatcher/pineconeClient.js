import { Pinecone } from "@pinecone-database/pinecone";

let pineconeIndex = null;

export async function getPineconeIndex() {
  if (pineconeIndex) return pineconeIndex;

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const indexName = process.env.PINECONE_INDEX;
  const existingIndexes = await pinecone.listIndexes();
  const exists = existingIndexes.indexes?.some((i) => i.name === indexName);

  if (!exists) {
    console.log(`Creating index: ${indexName}`);
    await pinecone.createIndex({
      name: indexName,
      dimension: 3072,
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "aws",
          region: "us-east-1",
        },
      },
    });
    console.log("Waiting 60s for index to be ready...");
    await new Promise((r) => setTimeout(r, 60000));
  }

  pineconeIndex = pinecone.index(indexName);
  console.log(`✓ Pinecone index ready: ${indexName}`);
  return pineconeIndex;
}