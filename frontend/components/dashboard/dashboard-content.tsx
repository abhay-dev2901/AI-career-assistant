"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import {
  Briefcase,
  FileText,
  MessageSquare,
  Flame,
  Search,
  Sparkles,
  ArrowRight,
  Loader2,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { cn } from "@/lib/utils"

const quickActions = [
  {
    title: "Search Jobs",
    description: "Find your dream role",
    icon: Search,
    href: "/jobs",
  },
  {
    title: "Analyze Resume",
    description: "Match your skills",
    icon: FileText,
    href: "/resume",
  },
  {
    title: "Start Interview",
    description: "Practice makes perfect",
    icon: MessageSquare,
    href: "/interview",
  },
]

export function DashboardContent() {
  const { user, loading } = useAuth()
  const [stats, setStats] = useState([
    {
      title: "Jobs Found",
      value: "0",
      icon: Briefcase,
      change: "+0 this week",
      color: "text-[#3b82f6]",
      bgColor: "bg-[#3b82f6]/15",
      accentBorder: "#3b82f6",
    },
    {
      title: "Resume Score",
      value: "—",
      icon: FileText,
      change: "Pending analysis",
      color: "text-[#22c55e]",
      bgColor: "bg-[#22c55e]/15",
      accentBorder: "#22c55e",
    },
    {
      title: "Interviews Done",
      value: "0",
      icon: MessageSquare,
      change: "0 scheduled",
      color: "text-[#f59e0b]",
      bgColor: "bg-[#f59e0b]/15",
      accentBorder: "#f59e0b",
    },
    {
      title: "Profile Skills",
      value: "0",
      icon: Flame,
      change: "Add your skills",
      color: "text-[#f43f5e]",
      bgColor: "bg-[#f43f5e]/15",
      accentBorder: "#f43f5e",
    },
  ])

  const recentActivity: {
    id: string
    type: string
    message: string
    time: string
  }[] = []

  useEffect(() => {
    if (user) {
      const skillsCount = user.skills?.length || 0
      setStats((prev) =>
        prev.map((stat) => {
          if (stat.title === "Profile Skills") {
            return {
              ...stat,
              value: skillsCount.toString(),
              change:
                skillsCount > 0 ? `${skillsCount} skills added` : "Add your skills",
            }
          }
          return stat
        })
      )
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#3b82f6]" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div
        className="animate-fade-in-up premium-shimmer-border premium-hover-lift relative overflow-hidden rounded-[14px] border border-white/5 p-8 transition-all duration-200"
        style={{
          background: '#0B1220',
        }}
      >
        {/* Premium ambient gradient */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-[260px] w-[260px] rounded-full bg-blue-500/10 blur-3xl animate-blob-drift" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-[320px] w-[320px] rounded-full bg-blue-500/5 blur-3xl animate-blob-drift animation-delay-2000" />

        <div className="flex items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs text-blue-300">
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
              Today’s sprint
            </div>
            <h2 className="text-3xl font-bold text-white text-balance">
              Welcome back, {user?.firstName || "User"}.
            </h2>
            <p className="max-w-xl text-sm text-gray-400 text-balance">
              {user?.bio ||
                "Here’s a focused path for today: pick a target role, tailor your resume, and rehearse your best answers."}
            </p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: "1) Find roles",
                  desc: "Shortlist good-fit jobs",
                  href: "/jobs",
                },
                {
                  label: "2) Tailor resume",
                  desc: "Match skills to JD",
                  href: "/resume",
                },
                {
                  label: "3) Practice",
                  desc: "Answer with structure",
                  href: "/interview",
                },
              ].map((step) => (
                <Link
                  key={step.label}
                  href={step.href}
                  className="group rounded-[12px] border border-white/5 bg-white/[0.02] p-3 transition-all duration-200 hover:border-white/10 hover:bg-white/[0.03]"
                >
                  <p className="text-xs font-semibold text-white">{step.label}</p>
                  <p className="mt-1 text-[11px] text-gray-600 group-hover:text-gray-500">
                    {step.desc}
                  </p>
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600/20 md:flex">
            <Sparkles className="h-6 w-6 text-blue-400" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={cn(
              "animate-fade-in-up premium-hover-lift relative overflow-hidden rounded-[14px] border border-white/5 bg-[#0B1220] p-6 transition-all duration-200",
              "hover:border-white/10"
            )}
            style={{
              animationDelay: `${(index + 1) * 100}ms`,
            }}
          >
            <div
              className="pointer-events-none absolute inset-x-0 -top-10 h-24 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(60% 70% at 50% 30%, rgba(59,130,246,0.12), transparent 70%)",
              }}
            />
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold leading-tight text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-600">{stat.change}</p>
              </div>
              <div
                className={cn(
                  "rounded-lg p-3 transition-all duration-200",
                  stat.bgColor
                )}
              >
                <stat.icon className={cn("h-6 w-6", stat.color)} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {recentActivity.length > 0 && (
          <Card
            className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] backdrop-blur-[12px] lg:col-span-2"
            style={{ animationDelay: "500ms" }}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#f1f5f9]">
                <span>Recent Activity</span>
                <Badge
                  variant="secondary"
                  className="border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.06)] text-xs text-[#94a3b8]"
                >
                  {recentActivity.length} items
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-4 transition-all duration-200 ease-in-out hover:bg-[rgba(255,255,255,0.05)]"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-[#f1f5f9]">
                        {activity.action}
                      </p>
                      <p className="text-sm text-[#64748b]">{activity.company}</p>
                    </div>
                    <span className="text-xs text-[#64748b]">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card
          className="animate-fade-in-up border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] backdrop-blur-[12px]"
          style={{ animationDelay: "500ms" }}
        >
          <CardHeader>
            <CardTitle className="text-[#f1f5f9]">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className={cn(
                  "group animate-fade-in-up flex w-full items-center justify-between rounded-[14px] border border-white/5 bg-[#0B1220] px-4 py-3 transition-all duration-200",
                  "hover:border-white/10 hover:bg-white/[0.02]"
                )}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600/15 transition-all duration-200">
                    <action.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">{action.title}</p>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-gray-600 transition-all duration-200 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
