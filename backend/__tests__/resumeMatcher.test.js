import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import request from "supertest";
import app from "../app.js";
import { prisma } from "../lib/prisma.js";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("Resume Matcher API", () => {

  // Health check
  it("GET /api/health → returns ok", async () => {
    const res = await request(app).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  // Upload validation
  it("POST /api/resume/upload → rejects missing file", async () => {
    const res = await request(app)
      .post("/api/resume/upload")
      .field("userId", "test-user");
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("No file uploaded");
  });

  it("POST /api/resume/upload → rejects non-PDF", async () => {
    const res = await request(app)
      .post("/api/resume/upload")
      .attach("resume", Buffer.from("not a pdf"), {
        filename: "test.txt",
        contentType: "text/plain",
      })
      .field("userId", "test-user");
    expect(res.status).toBe(500);
  });

  // Match validation
  it("POST /api/resume/match → rejects empty job description", async () => {
    const res = await request(app)
      .post("/api/resume/match")
      .send({ userId: "test-user", jobDescription: "" });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe("jobDescription is required");
  });

  it("POST /api/resume/match → rejects missing job description", async () => {
    const res = await request(app)
      .post("/api/resume/match")
      .send({ userId: "test-user" });
    expect(res.status).toBe(400);
  });

  // History
  it("GET /api/resume/history → returns array", async () => {
    const res = await request(app)
      .get("/api/resume/history?userId=test-user");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.history)).toBe(true);
  });

  // Auth routes
  it("POST /api/auth/login → rejects invalid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "fake@fake.com", password: "wrongpassword" });
    expect(res.status).toBe(401);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });
});