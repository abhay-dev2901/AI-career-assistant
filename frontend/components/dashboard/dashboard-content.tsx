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
  }[] = []= []

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
        className="animate-fade-in-up relative overflow-hidden rounded-[12px] border border-[rgba(255,255,255,0.08)] p-8 transition-all duration-200 ease-in-out"
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0a0a0f 100%)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-100"
          style={{
            background:
              "radial-gradient(circle at 80% 50%, rgba(59,130,246,0.15), transparent 60%)",
          }}
        />
        <div className="relative flex items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-white">
              Good morning, {user?.firstName || "User"}!
            </h2>
            <p className="max-w-xl text-base text-[#94a3b8]">
              {user?.bio ||
                "Your career journey starts here. Let's make today count."}
            </p>
          </div>
          <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#3b82f6]/20 md:flex">
            <Sparkles className="h-8 w-8 text-[#60a5fa]" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.title}
            className={cn(
              "animate-fade-in-up group border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] shadow-none backdrop-blur-[12px] transition-all duration-200 ease-in-out",
              "hover:scale-[1.02] hover:border-[rgba(59,130,246,0.4)] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]"
            )}
            style={{
              borderTop: `2px solid ${stat.accentBorder}`,
              animationDelay: `${(index + 1) * 100}ms`,
            }}
          >
            <CardContent className="p-6 pt-5">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#64748b]">
                    {stat.title}
                  </p>
                  <p className="text-[2rem] font-bold leading-tight text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#64748b]">{stat.change}</p>
                </div>
                <div
                  className={cn(
                    "rounded-full p-3 transition-all duration-200 ease-in-out",
                    stat.bgColor
                  )}
                >
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
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
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className={cn(
                  "animate-fade-in-up group flex w-full items-center justify-between rounded-[12px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.05)] px-4 py-3 backdrop-blur-[10px] transition-all duration-200 ease-in-out",
                  "hover:border-[rgba(59,130,246,0.3)] hover:bg-[rgba(59,130,246,0.08)]"
                )}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-[#3b82f6]/20 transition-all duration-200 ease-in-out group-hover:bg-[#3b82f6]/30">
                    <action.icon className="h-5 w-5 text-[#60a5fa]" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-[#f1f5f9]">{action.title}</p>
                    <p className="text-xs text-[#64748b]">{action.description}</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#64748b] transition-transform duration-200 ease-in-out group-hover:translate-x-[4px] group-hover:text-[#60a5fa]" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
