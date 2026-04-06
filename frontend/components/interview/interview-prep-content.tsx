"use client"

import { Sparkles, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function InterviewPrepContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="midnight-page-title">Interview Prep</h2>
        <p className="midnight-page-subtitle mt-1">
          Practice with AI-generated questions and get instant feedback on your answers.
        </p>
      </div>

      <Card className="midnight-glass-card">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[rgba(59,130,246,0.1)] border border-[rgba(59,130,246,0.2)]">
            <Clock className="h-10 w-10 text-[#3b82f6]" />
          </div>

          <Badge className="mb-4 rounded-[8px] border border-[rgba(59,130,246,0.35)] bg-[rgba(59,130,246,0.1)] text-[#60a5fa] px-4 py-1">
            <Sparkles className="mr-1 h-3 w-3" />
            Coming Soon
          </Badge>

          <h3 className="mb-3 text-2xl font-medium text-[#f1f5f9]">
            Interview Prep is Under Development
          </h3>

          <p className="max-w-md text-sm leading-relaxed text-[#64748b]">
            We are building an AI-powered interview practice tool with real-time feedback,
            DSA questions, HR rounds, system design, and behavioural interview preparation.
            Stay tuned!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["DSA Questions", "HR Rounds", "System Design", "AI Feedback", "Behavioural"].map((feature) => (
              <Badge
                key={feature}
                className="rounded-[8px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] text-[#64748b] px-3 py-1"
              >
                {feature}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}