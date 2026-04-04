"use client"

import { useState, useCallback } from "react"
import {
  Upload, FileText, Loader2, CheckCircle2, Sparkles,
  X, AlertCircle, AlignLeft, TrendingUp, XCircle, Lightbulb,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useAuth } from "@/context/auth-context"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001"

type MatchResult = {
  score: number
  assessment: string
  suggestions: string[]
  missingSkills: string[]
  strengths: string[]
}

function isPdf(file: File) {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
}

export function ResumeMatcherContent() {
  const { user } = useAuth()
  const userId = user?._id !== undefined && user?._id !== null ? String(user._id) : "default"

  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<MatchResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true) }, [])
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false) }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && isPdf(droppedFile)) { setFile(droppedFile); setError(null); setResults(null) }
    else if (droppedFile) setError("Please upload a PDF file.")
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.files?.[0]
    if (next && isPdf(next)) { setFile(next); setError(null); setResults(null) }
    else if (next) setError("Please upload a PDF file.")
  }

  const handleAnalyze = async () => {
    if (!file || !jobDescription.trim()) return
    setError(null); setResults(null); setIsAnalyzing(true)
    try {
      const formData = new FormData()
      formData.append("resume", file)
      formData.append("userId", userId)

      const uploadRes = await fetch(`${API_BASE_URL}/api/resume/upload`, { method: "POST", body: formData })
      const uploadJson = await uploadRes.json().catch(() => ({}))
      if (!uploadRes.ok) throw new Error(uploadJson.error || "Failed to upload resume")

      const matchRes = await fetch(`${API_BASE_URL}/api/resume/match`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobDescription: jobDescription.trim(), userId }),
      })
      const matchJson = await matchRes.json().catch(() => ({}))
      if (!matchRes.ok) throw new Error(matchJson.error || "Failed to match job")

      setResults({
        score: typeof matchJson.score === "number" ? matchJson.score : 0,
        assessment: String(matchJson.assessment ?? matchJson.summary ?? ""),
        suggestions: Array.isArray(matchJson.suggestions) ? matchJson.suggestions : [],
        missingSkills: Array.isArray(matchJson.missingSkills) ? matchJson.missingSkills : [],
        strengths: Array.isArray(matchJson.strengths) ? matchJson.strengths : [],
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400"
    if (score >= 60) return "text-amber-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="midnight-page-title">Resume Matcher</h2>
        <p className="midnight-page-subtitle mt-1">
          Upload your resume and paste a job description to get AI-powered improvement suggestions.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="border-red-500/40 bg-[rgba(239,68,68,0.08)] text-[#fecaca] [&>svg]:text-red-400">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not complete match</AlertTitle>
          <AlertDescription className="text-red-200/90">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="midnight-glass-card">
          <CardHeader>
            <CardTitle className="midnight-card-title flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#3b82f6]" />
              Your Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-[12px] border-2 border-dashed transition-all duration-200 ${
                isDragging ? "border-[#3b82f6] bg-[rgba(59,130,246,0.12)]"
                : file ? "border-emerald-500/50 bg-[rgba(34,197,94,0.1)]"
                : "border-[rgba(255,255,255,0.12)] hover:border-[rgba(59,130,246,0.45)] hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <input type="file" accept=".pdf,application/pdf" onChange={handleFileChange} className="absolute inset-0 cursor-pointer opacity-0" />
              {file ? (
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(34,197,94,0.15)]">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="font-medium text-[#f1f5f9]">{file.name}</p>
                  <p className="text-sm text-[#64748b]">{(file.size / 1024).toFixed(1)} KB</p>
                  <Button variant="ghost" size="sm" className="mt-2 rounded-[8px] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.06)]"
                    onClick={(e) => { e.stopPropagation(); setFile(null); setResults(null); setError(null) }}>
                    <X className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 p-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]">
                    <Upload className="h-6 w-6 text-[#64748b]" />
                  </div>
                  <p className="font-medium text-[#f1f5f9]">Drag and drop your resume</p>
                  <p className="text-sm text-[#64748b]">PDF only — click to browse</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="midnight-glass-card">
          <CardHeader>
            <CardTitle className="midnight-card-title flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-[#60a5fa]" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px] resize-none rounded-[12px] border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[#f1f5f9] placeholder:text-[#64748b] focus-visible:border-[rgba(59,130,246,0.45)] focus-visible:ring-[rgba(59,130,246,0.2)]"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button size="lg" onClick={handleAnalyze} disabled={!file || !jobDescription.trim() || isAnalyzing}
          className="rounded-[8px] px-8 transition-all duration-200">
          {isAnalyzing ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Analyzing your resume…</>
          ) : (
            <><Sparkles className="mr-2 h-5 w-5" />Analyze Match</>
          )}
        </Button>
      </div>

      {results && (
        <div className="space-y-6">

          {/* Score + Assessment */}
          <Card className="midnight-glass-card overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col items-center justify-center border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 md:w-1/3 md:border-b-0 md:border-r">
                  <div className="relative flex h-40 w-40 items-center justify-center">
                    <svg className="h-40 w-40 -rotate-90 transform">
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none" className="text-[rgba(255,255,255,0.12)]" />
                      <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="none"
                        strokeDasharray={440} strokeDashoffset={440 - (440 * results.score) / 100}
                        strokeLinecap="round" className={getScoreColor(results.score)} />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span className={`text-4xl font-bold ${getScoreColor(results.score)}`}>{results.score}%</span>
                      <span className="text-sm text-[#64748b]">Match Score</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-4 p-6">
                  <div className="flex items-start gap-2">
                    <AlignLeft className="mt-0.5 h-5 w-5 shrink-0 text-[#60a5fa]" />
                    <div>
                      <h4 className="text-sm font-medium text-[#f1f5f9]">Assessment</h4>
                      <p className="mt-1 text-sm leading-relaxed text-[#94a3b8]">{results.assessment}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">

            {/* Strengths */}
            {results.strengths.length > 0 && (
              <Card className="midnight-glass-card">
                <CardHeader>
                  <CardTitle className="midnight-card-title flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-emerald-400" />
                    Your Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.strengths.map((strength, i) => (
                      <Badge key={i} className="rounded-[8px] border border-emerald-500/30 bg-[rgba(34,197,94,0.1)] text-emerald-300 px-3 py-1">
                        ✓ {strength}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Missing Skills */}
            {results.missingSkills.length > 0 && (
              <Card className="midnight-glass-card">
                <CardHeader>
                  <CardTitle className="midnight-card-title flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-400" />
                    Missing Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.missingSkills.map((skill, i) => (
                      <Badge key={i} className="rounded-[8px] border border-red-500/30 bg-[rgba(239,68,68,0.1)] text-red-300 px-3 py-1">
                        ✗ {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Suggestions */}
          {results.suggestions.length > 0 && (
            <Card className="midnight-glass-card">
              <CardHeader>
                <CardTitle className="midnight-card-title flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-amber-400" />
                  How to Improve Your Resume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {results.suggestions.map((suggestion, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-[12px] border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.03)] p-4">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[rgba(251,191,36,0.15)] text-xs font-bold text-amber-400">
                        {i + 1}
                      </div>
                      <p className="text-sm leading-relaxed text-[#cbd5e1]">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      )}
    </div>
  )
}