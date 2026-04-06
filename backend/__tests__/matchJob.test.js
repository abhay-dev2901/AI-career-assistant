import { describe, it, expect } from "@jest/globals";

describe("Match Score Calculation", () => {
  function calculateScore(matches) {
    if (!matches?.length) return 0;
    const scores = matches.map(m => m.score);
    return Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 100);
  }

  function generateSummary(score) {
    if (score >= 75) return "Strong match!";
    if (score >= 55) return "Good match.";
    if (score >= 35) return "Moderate match.";
    return "Low match.";
  }

  it("calculates average score correctly", () => {
    const matches = [
      { score: 0.8 },
      { score: 0.6 },
      { score: 0.7 },
    ]
    expect(calculateScore(matches)).toBe(70)
  })

  it("returns 0 for empty matches", () => {
    expect(calculateScore([])).toBe(0)
    expect(calculateScore(null)).toBe(0)
  })

  it("returns strong match for score >= 75", () => {
    expect(generateSummary(80)).toContain("Strong")
  })

  it("returns low match for score < 35", () => {
    expect(generateSummary(20)).toContain("Low")
  })
})