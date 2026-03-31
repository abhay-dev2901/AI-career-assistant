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
import { Progress } from "@/components/ui/progress"

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
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-destructive"
  }

  const getScoreTrackColor = (score: number) => {
    if (score >= 80) return "[&>div]:bg-success"
    if (score >= 60) return "[&>div]:bg-warning"
    return "[&>div]:bg-destructive"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-serif text-foreground">Resume Matcher</h2>
        <p className="text-muted-foreground">
          Upload your resume and paste a job description to see how well they match.
        </p>
      </div>

      {/* Upload Panels */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Resume Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif">
              <FileText className="h-5 w-5 text-primary" />
              Your Resume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all ${
                isDragging
                  ? "border-primary bg-primary/10"
                  : file
                    ? "border-success bg-success/10"
                    : "border-border hover:border-primary/50 hover:bg-muted/50"
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/20">
                    <CheckCircle2 className="h-6 w-6 text-success" />
                  </div>
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2"
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="font-medium text-foreground">
                    Drag and drop your resume
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse (PDF, DOC, DOCX)
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Job Description */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-serif">
              <Sparkles className="h-5 w-5 text-primary" />
              Job Description
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="min-h-[200px] resize-none"
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
          className="px-8"
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
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Score Circle */}
                <div className="flex flex-col items-center justify-center bg-muted/50 p-8 md:w-1/3">
                  <div className="relative flex h-40 w-40 items-center justify-center">
                    <svg className="h-40 w-40 -rotate-90 transform">
                      <circle
                        cx="80"
                        cy="80"
                        r="70"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-muted"
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
                        className={`text-4xl font-bold font-serif ${getScoreColor(results.score)}`}
                      >
                        {results.score}%
                      </span>
                      <span className="text-sm text-muted-foreground">
                        Match Score
                      </span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex-1 p-6 space-y-6">
                  {/* Matched Skills */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      Matched Skills ({results.matchedSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.matchedSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-success/20 text-success border-success/30"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Missing Skills */}
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
                      <XCircle className="h-4 w-4 text-destructive" />
                      Missing Skills ({results.missingSkills.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {results.missingSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="bg-destructive/20 text-destructive border-destructive/30"
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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif">
                <Lightbulb className="h-5 w-5 text-warning" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {results.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-sm"
                  >
                    <h5 className="font-medium text-foreground">
                      {suggestion.title}
                    </h5>
                    <p className="mt-1 text-sm text-muted-foreground">
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
