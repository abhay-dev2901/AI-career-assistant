import { describe, it, expect } from "@jest/globals";

// Test semantic chunking logic in isolation
function splitIntoSemanticChunks(text) {
  const sectionPatterns = [
    /\b(PROFESSIONAL SUMMARY|SUMMARY|OBJECTIVE)\b/i,
    /\b(EXPERIENCE|WORK EXPERIENCE)\b/i,
    /\b(EDUCATION|ACADEMIC)\b/i,
    /\b(SKILLS|TECHNICAL SKILLS)\b/i,
    /\b(PROJECTS|PERSONAL PROJECTS)\b/i,
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
    const chunks = [];
    for (let i = 0; i < text.length; i += 450) {
      const chunk = text.slice(i, i + 500).trim();
      if (chunk.length > 30) chunks.push(chunk);
    }
    return chunks;
  }

  const chunks = [];
  if (sections[0].index > 50) {
    chunks.push(text.slice(0, sections[0].index).trim());
  }
  for (let i = 0; i < sections.length; i++) {
    const start = sections[i].index;
    const end = sections[i + 1]?.index ?? text.length;
    const sectionText = text.slice(start, end).trim();
    if (sectionText.length > 30) chunks.push(sectionText);
  }
  return chunks;
}

describe("Semantic Chunking", () => {
  it("splits resume into sections correctly", () => {
    const resume = `John Doe
    SUMMARY
    Experienced developer with 3 years in React.
    EXPERIENCE
    Software Engineer at Google 2022-2024
    EDUCATION
    B.Tech Computer Science 2022
    SKILLS
    React, Node.js, Python`

    const chunks = splitIntoSemanticChunks(resume)
    expect(chunks.length).toBeGreaterThan(1)
    expect(chunks.some(c => c.includes("SUMMARY"))).toBe(true)
    expect(chunks.some(c => c.includes("EXPERIENCE"))).toBe(true)
  })

  it("falls back to character splitting when no sections found", () => {
    const text = "a".repeat(1000)
    const chunks = splitIntoSemanticChunks(text)
    expect(chunks.length).toBeGreaterThan(1)
  })

  it("filters out chunks shorter than 30 chars", () => {
    const resume = `Hi
    SKILLS
    ok`
    const chunks = splitIntoSemanticChunks(resume)
    expect(chunks.every(c => c.length > 30)).toBe(true)
  })
})