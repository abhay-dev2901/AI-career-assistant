"use client"

import { useState, useCallback } from "react"
import {
  Upload,
  FileText,
  Loader2,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sparkles,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

const mockResults = {
  score: 78,
  matchedSkills: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Git",
    "REST APIs",
  ],
  missingSkills: ["GraphQL", "AWS", "Docker", "Kubernetes"],
  suggestions: [
    {
      title: "Add cloud experience",
      description:
        "Include any experience with cloud platforms like AWS, GCP, or Azure to strengthen your profile.",
    },
    {
      title: "Highlight leadership roles",
      description:
        "The job requires leading a team. Emphasize any team lead or mentorship experiences.",
    },
    {
      title: "Quantify achievements",
      description:
        "Add specific metrics to your accomplishments, such as performance improvements or user growth.",
    },
    {
      title: "Include system design",
      description:
        "Mention any experience with system design or architecture decisions you have made.",
    },
  ],
}

export function ResumeMatcherContent() {
  const [file, setFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<typeof mockResults | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (
      droppedFile &&
      (droppedFile.type === "application/pdf" ||
        droppedFile.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document")
    ) {
      setFile(droppedFile)
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleAnalyze = () => {
    if (!file || !jobDescription.trim()) return
    setIsAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults)
      setIsAnalyzing(false)
    }, 2500)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-400"
    if (score >= 60) return "text-amber-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="midnight-page-title">Resume Matcher</h2>
        <p className="midnight-page-subtitle mt-1">
          Upload your resume and paste a job description to see how well they match.
        </p>
      </div>

      {/* Upload Panels */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Resume Upload */}
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
              className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-[12px] border-2 border-dashed transition-all duration-200 ease-in-out ${
                isDragging
                  ? "border-[#3b82f6] bg-[rgba(59,130,246,0.12)]"
                  : file
                    ? "border-emerald-500/50 bg-[rgba(34,197,94,0.1)]"
                    : "border-[rgba(255,255,255,0.12)] hover:border-[rgba(59,130,246,0.45)] hover:bg-[rgba(255,255,255,0.04)]"
              }`}
            >
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="absolute inset-0 cursor-pointer opacity-0"
              />
              {file ? (
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(34,197,94,0.15)]">
                    <CheckCircle2 className="h-6 w-6 text-emerald-400" />
                  </div>
                  <p className="font-medium text-[#f1f5f9]">{file.name}</p>
                  <p className="text-sm text-[#64748b]">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 rounded-[8px] text-[#94a3b8] hover:bg-[rgba(255,255,255,0.06)] hover:text-[#f1f5f9]"
                    onClick={(e) => {
                      e.stopPropagation()
                      setFile(null)
                      setResults(null)
                    }}
                  >
                    <X className="mr-1 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2 text-center p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,255,255,0.06)]">
                    <Upload className="h-6 w-6 text-[#64748b]" />
                  </div>
                  <p className="font-medium text-[#f1f5f9]">
                    Drag and drop your resume
                  </p>
                  <p className="text-sm text-[#64748b]">
                    or click to browse (PDF, DOC, DOCX)
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
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

      {/* Analyze Button */}
      <div className="flex justify-center">
        <Button
          size="lg"
          onClick={handleAnalyze}
          disabled={!file || !jobDescription.trim() || isAnalyzing}
          className="rounded-[8px] px-8 transition-all duration-200 ease-in-out"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Analyzing Match...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Analyze Match
            </>
          )}
        </Button>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Score Card */}
          <Card className="midnight-glass-card overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="flex flex-col items-center justify-center border-b border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 md:w-1/3 md:border-b-0 md:border-r">
                  <div className="relative flex h-40 w-40 items-center justify-center">
                    <svg className="h-40 w-40 -rotate-90 transform">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-[rgba(255,255,255,0.12)]"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={440}
                        strokeDashoffset={440 - (440 * results.score) / 100}
                        strokeLinecap="round"
                        className={getScoreColor(results.score)}
                      />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                      <span
                        className={`text-4xl font-bold ${getScoreColor(results.score)}`}
                      >
                        {results.score}%
                      </span>
                      <span className="text-sm text-[#64748b]">Match Score</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex-1 p-6 space-y-6">
                  {/* Matched Skills */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#f1f5f9]">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      Matched Skills ({results.matchedSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.matchedSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-[8px] border border-emerald-500/30 bg-[rgba(34,197,94,0.12)] text-emerald-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#f1f5f9]">
                      <XCircle className="h-4 w-4 text-red-400" />
                      Missing Skills ({results.missingSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.missingSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="rounded-[8px] border border-red-500/35 bg-[rgba(239,68,68,0.1)] text-red-300"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="midnight-glass-card">
            <CardHeader>
              <CardTitle className="midnight-card-title flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-400" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {results.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4 transition-all duration-200 ease-in-out hover:border-[rgba(59,130,246,0.35)] hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]"
                  >
                    <h5 className="font-medium text-[#f1f5f9]">{suggestion.title}</h5>
                    <p className="mt-1 text-sm text-[#64748b]">
                      {suggestion.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
