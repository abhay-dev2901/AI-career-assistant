import dotenv from "dotenv";
import { prisma } from "./lib/prisma.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await prisma.$queryRaw`SELECT NOW()`;
    console.log("✓ Database connection successful");

    app.listen(PORT, () => {
      console.log("\n" + "=".repeat(50));
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📊 Frontend URL: ${process.env.FRONTEND_URL}`);
      console.log(`🔗 Database: Neon PostgreSQL (${process.env.NODE_ENV})`);
      console.log("=".repeat(50) + "\n");
    });

    process.on("SIGINT", async () => {
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();