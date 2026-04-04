import express from "express";
import multer from "multer";
import path from "path";
import { ingestResume } from "./ingestResume.js";
import { matchJobToResume } from "./matchJob.js";

const router = express.Router();

// multer setup — save PDFs to /uploads
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
// Upload and ingest a resume PDF
router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const userId = req.body.userId || "default";
    const result = await ingestResume(req.file.path, userId);

    res.json({
      success: true,
      message: "Resume uploaded and indexed successfully",
      ...result,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message });
  }
});

// POST /api/resume/match
// Match a job description against stored resume
router.post("/match", async (req, res) => {
  try {
    const { jobDescription, userId } = req.body;

    if (!jobDescription?.trim()) {
      return res.status(400).json({ error: "jobDescription is required" });
    }

    const result = await matchJobToResume(jobDescription, userId || "default");
    res.json({ success: true, ...result });
  } catch (err) {
    console.error("Match error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;