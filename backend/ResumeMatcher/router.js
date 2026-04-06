import express from "express";
import multer from "multer";
import path from "path";
import { ingestResume, deleteUserResume } from "./ingestResume.js";
import { matchJobToResumeStream } from "./matchJob.js";
import { prisma } from "../lib/prisma.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `resume-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") cb(null, true);
    else cb(new Error("Only PDF files allowed"), false);
  },
});

// POST /api/resume/upload
import fs from "fs";

router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const userId = req.body.userId || "default";
    const forceReindex = req.body.forceReindex === "true";

    if (forceReindex) await deleteUserResume(userId);

    const result = await ingestResume(req.file.path, userId);

    // Delete file immediately after processing — we don't need it anymore
    fs.unlink(req.file.path, (err) => {
      if (err) console.log("Could not delete temp file:", err.message);
      else console.log("🗑️ Temp file deleted after processing");
    });

    res.json({ success: true, message: "Resume indexed successfully", ...result });
  } catch (err) {
    // Also delete on error
    if (req.file?.path) fs.unlink(req.file.path, () => {});
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/resume/match — SSE streaming
router.post("/match", async (req, res) => {
  try {
    const { jobDescription, userId } = req.body;
    if (!jobDescription?.trim()) {
      return res.status(400).json({ error: "jobDescription is required" });
    }

    // Set up SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders();

    await matchJobToResumeStream(
      jobDescription,
      userId || "default",
      5,
      (chunk) => res.write(`data: ${chunk}\n\n`)
    );

    res.write("data: [DONE]\n\n");
    res.end();
  } catch (err) {
    console.error("Match error:", err);
    res.write(`data: ${JSON.stringify({ type: "error", message: err.message })}\n\n`);
    res.end();
  }
});

// GET /api/resume/history
router.get("/history", async (req, res) => {
  try {
    const userId = req.query.userId || "default";
    const history = await prisma.resumeAnalysis.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        score: true,
        assessment: true,
        suggestions: true,
        missingSkills: true,
        strengths: true,
        createdAt: true,
      },
    });
    res.json({ success: true, history });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;