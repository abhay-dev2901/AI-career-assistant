"use client"

import { useState } from "react"
import {
  Code,
  Users,
  Server,
  MessageCircle,
  Sparkles,
  Loader2,
  Send,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "dsa", label: "DSA", icon: Code },
  { id: "hr", label: "HR", icon: Users },
  { id: "system-design", label: "System Design", icon: Server },
  { id: "behavioural", label: "Behavioural", icon: MessageCircle },
]

const difficulties = [
  {
    id: "easy",
    label: "Easy",
    color:
      "border-emerald-500/40 bg-[rgba(34,197,94,0.15)] text-emerald-400",
  },
  {
    id: "medium",
    label: "Medium",
    color:
      "border-amber-500/40 bg-[rgba(245,158,11,0.15)] text-amber-400",
  },
  {
    id: "hard",
    label: "Hard",
    color: "border-red-500/40 bg-[rgba(239,68,68,0.12)] text-red-400",
  },
]

const mockQuestions: Record<string, Record<string, string[]>> = {
  dsa: {
    easy: [
      "Write a function to reverse a linked list.",
      "Find the maximum element in an array without using built-in functions.",
      "Check if a string is a palindrome.",
    ],
    medium: [
      "Implement a function to find the longest substring without repeating characters.",
      "Design an algorithm to detect a cycle in a linked list.",
      "Given a binary tree, find its maximum depth.",
    ],
    hard: [
      "Implement a LRU (Least Recently Used) cache with O(1) time complexity for both get and put operations.",
      "Given an array of integers, find the median of two sorted arrays in O(log(m+n)) time.",
      "Design an algorithm to serialize and deserialize a binary tree.",
    ],
  },
  hr: {
    easy: [
      "Tell me about yourself and your background.",
      "Why are you interested in this position?",
      "What are your greatest strengths?",
    ],
    medium: [
      "Describe a challenging project you worked on and how you overcame obstacles.",
      "How do you handle conflicts with team members?",
      "Where do you see yourself in 5 years?",
    ],
    hard: [
      "Tell me about a time when you had to make a difficult decision with incomplete information.",
      "Describe a situation where you had to lead a team through a significant change.",
      "How would you handle a situation where your manager asks you to do something unethical?",
    ],
  },
  "system-design": {
    easy: [
      "Design a URL shortening service like bit.ly.",
      "Design a simple key-value store.",
      "Design a rate limiter for an API.",
    ],
    medium: [
      "Design a social media news feed like Twitter or Facebook.",
      "Design a real-time chat application.",
      "Design a notification system for a large-scale application.",
    ],
    hard: [
      "Design a distributed file storage system like Google Drive or Dropbox.",
      "Design a video streaming service like YouTube or Netflix.",
      "Design a global-scale search engine.",
    ],
  },
  behavioural: {
    easy: [
      "Describe your ideal work environment.",
      "How do you stay organized and manage your time?",
      "What motivates you in your work?",
    ],
    medium: [
      "Tell me about a time you received critical feedback. How did you respond?",
      "Describe a situation where you had to work with a difficult colleague.",
      "How do you approach learning new technologies or skills?",
    ],
    hard: [
      "Tell me about a time when you failed. What did you learn from it?",
      "Describe a situation where you had to influence stakeholders without direct authority.",
      "How have you handled a situation where project requirements changed significantly mid-way?",
    ],
  },
}

const mockFeedback = {
  score: 7,
  strengths: [
    "Clear problem-solving approach",
    "Good communication of thought process",
    "Considered edge cases",
  ],
  improvements: [
    "Could optimize time complexity further",
    "Consider adding more error handling",
    "Explain trade-offs in more detail",
  ],
  modelAnswer:
    "A strong answer would include: 1) Clarifying requirements and constraints, 2) Discussing multiple approaches with trade-offs, 3) Implementing the most optimal solution, 4) Testing with various inputs including edge cases, 5) Analyzing time and space complexity.",
}

export function InterviewPrepContent() {
  const [category, setCategory] = useState("dsa")
  const [difficulty, setDifficulty] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [question, setQuestion] = useState<string | null>(null)
  const [answer, setAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<typeof mockFeedback | null>(null)
  const [showModelAnswer, setShowModelAnswer] = useState(false)

  const handleGenerateQuestion = () => {
    setIsGenerating(true)
    setFeedback(null)
    setAnswer("")
    setShowModelAnswer(false)
    
    setTimeout(() => {
      const questions = mockQuestions[category]?.[difficulty] || []
      const randomIndex = Math.floor(Math.random() * questions.length)
      setQuestion(questions[randomIndex] || "No question available")
      setIsGenerating(false)
    }, 1500)
  }

  const handleSubmitAnswer = () => {
    if (!answer.trim()) return
    setIsSubmitting(true)
    
    setTimeout(() => {
      setFeedback(mockFeedback)
      setIsSubmitting(false)
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-emerald-400"
    if (score >= 6) return "text-amber-400"
    return "text-red-400"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="midnight-page-title">Interview Prep</h2>
        <p className="midnight-page-subtitle mt-1">
          Practice with AI-generated questions and get instant feedback on your answers.
        </p>
      </div>

      <Card className="midnight-glass-card">
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Category Tabs */}
            <div>
              <label className="mb-3 block text-sm font-medium text-[#94a3b8]">
                Select Category
              </label>
              <Tabs value={category} onValueChange={setCategory}>
                <TabsList className="grid w-full grid-cols-4">
                  {categories.map((cat) => (
                    <TabsTrigger
                      key={cat.id}
                      value={cat.id}
                      className="flex items-center gap-2"
                    >
                      <cat.icon className="h-4 w-4" />
                      <span className="hidden sm:inline">{cat.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>

            {/* Difficulty Selection */}
            <div>
              <label className="mb-3 block text-sm font-medium text-[#94a3b8]">
                Select Difficulty
              </label>
              <div className="flex gap-3">
                {difficulties.map((diff) => (
                  <Button
                    key={diff.id}
                    variant="outline"
                    size="sm"
                    onClick={() => setDifficulty(diff.id)}
                    className={`flex-1 rounded-[8px] border border-[rgba(255,255,255,0.08)] bg-transparent transition-all duration-200 ease-in-out hover:bg-[rgba(255,255,255,0.05)] ${
                      difficulty === diff.id ? diff.color : "text-[#94a3b8]"
                    }`}
                  >
                    {diff.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <Button
              onClick={handleGenerateQuestion}
              disabled={isGenerating}
              className="w-full rounded-[8px] transition-all duration-200 ease-in-out"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Question...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Question
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      {question && (
        <Card className="midnight-glass-card border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.08)] shadow-[0_0_28px_rgba(59,130,246,0.12)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="midnight-card-title flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-[#60a5fa]" />
                Interview Question
              </CardTitle>
              <div className="flex gap-2">
                <Badge
                  variant="outline"
                  className="rounded-[8px] border-[rgba(255,255,255,0.12)] capitalize text-[#94a3b8]"
                >
                  {category.replace("-", " ")}
                </Badge>
                <Badge
                  variant="outline"
                  className={`rounded-[8px] capitalize ${difficulties.find((d) => d.id === difficulty)?.color ?? ""}`}
                >
                  {difficulty}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed text-[#f1f5f9]">{question}</p>
          </CardContent>
        </Card>
      )}

      {/* Answer Section */}
      {question && (
        <Card className="midnight-glass-card">
          <CardHeader>
            <CardTitle className="midnight-card-title">Your Answer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[200px] resize-none rounded-[12px] border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.03)] text-[#f1f5f9] placeholder:text-[#64748b] focus-visible:border-[rgba(59,130,246,0.45)] focus-visible:ring-[rgba(59,130,246,0.2)]"
              disabled={isSubmitting || !!feedback}
            />
            {!feedback && (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!answer.trim() || isSubmitting}
                className="w-full rounded-[8px] transition-all duration-200 ease-in-out"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing Answer...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Submit Answer
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Feedback Card */}
      {feedback && (
        <Card className="midnight-glass-card">
          <CardHeader>
            <CardTitle className="midnight-card-title flex items-center justify-between">
              <span>AI Feedback</span>
              <div className="flex items-center gap-2">
                <span className="font-sans text-sm text-[#64748b]">Score:</span>
                <span className={`text-2xl font-bold ${getScoreColor(feedback.score)}`}>
                  {feedback.score}/10
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Strengths */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#f1f5f9]">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Strengths
              </h4>
              <div className="space-y-2">
                {feedback.strengths.map((strength, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-[12px] border border-emerald-500/20 bg-[rgba(34,197,94,0.08)] p-3 text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="text-[#f1f5f9]">{strength}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div>
              <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-[#f1f5f9]">
                <AlertCircle className="h-4 w-4 text-amber-400" />
                Areas for Improvement
              </h4>
              <div className="space-y-2">
                {feedback.improvements.map((improvement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 rounded-[12px] border border-amber-500/20 bg-[rgba(245,158,11,0.08)] p-3 text-sm"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                    <span className="text-[#f1f5f9]">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Model Answer Toggle */}
            <div className="border-t border-[rgba(255,255,255,0.08)] pt-4">
              <Button
                variant="ghost"
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="w-full justify-between rounded-[8px] text-[#94a3b8] transition-all duration-200 ease-in-out hover:bg-[rgba(255,255,255,0.05)] hover:text-[#f1f5f9]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  View Model Answer
                </span>
                {showModelAnswer ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
              {showModelAnswer && (
                <div className="mt-4 rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4">
                  <p className="text-sm leading-relaxed text-[#94a3b8]">
                    {feedback.modelAnswer}
                  </p>
                </div>
              )}
            </div>

            {/* Try Another */}
            <Button
              variant="outline"
              onClick={handleGenerateQuestion}
              className="w-full rounded-[8px] border-[rgba(255,255,255,0.12)] bg-transparent text-[#f1f5f9] transition-all duration-200 ease-in-out hover:border-[rgba(59,130,246,0.4)] hover:bg-[rgba(59,130,246,0.1)]"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Try Another Question
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
