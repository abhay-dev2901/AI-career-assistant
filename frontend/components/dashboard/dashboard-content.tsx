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
        className="animate-fade-in-up relative overflow-hidden rounded-2xl border border-white/15 p-8 transition-all duration-300 ease-in-out hover:border-white/25 group"
        style={{
          background:
            "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 27, 75, 0.8) 50%, rgba(10, 10, 15, 0.8) 100%)",
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Top accent line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

        <div
          className="pointer-events-none absolute inset-0 opacity-100 rounded-2xl"
          style={{
            background:
              "radial-gradient(circle at 80% 50%, rgba(59,130,246,0.1), transparent 60%)",
          }}
        />
        <div className="relative flex items-center justify-between gap-6">
          <div className="space-y-3">
            <h2 className="text-4xl font-bold text-white">
              Good morning, {user?.firstName || "User"}!
            </h2>
            <p className="max-w-xl text-base text-gray-400 leading-relaxed">
              {user?.bio ||
                "Your career journey starts here. Let's make today count."}
            </p>
          </div>
          <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/30 to-purple-600/20 md:flex shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300">
            <Sparkles className="h-8 w-8 text-blue-300 animate-pulse" />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={cn(
              "animate-fade-in-up group relative overflow-hidden rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 transition-all duration-300 ease-in-out",
              "hover:scale-[1.03] hover:border-white/25 hover:shadow-2xl hover:shadow-blue-500/20"
            )}
            style={{
              borderTop: `3px solid ${stat.accentBorder}`,
              animationDelay: `${(index + 1) * 100}ms`,
            }}
          >
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
            
            {/* Top accent line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-300/40 to-transparent" />

            <div className="relative flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  {stat.title}
                </p>
                <p className="text-3xl font-bold leading-tight text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
              <div
                className={cn(
                  "rounded-xl p-3 transition-all duration-300 group-hover:scale-110",
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
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className={cn(
                  "animate-fade-in-up group relative overflow-hidden flex w-full items-center justify-between rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 px-4 py-3 backdrop-blur-xl transition-all duration-300 ease-in-out",
                  "hover:border-white/25 hover:shadow-lg hover:shadow-blue-500/15 hover:scale-[1.02]"
                )}
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl" />
                
                <div className="relative flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-600/20 transition-all duration-300 ease-in-out group-hover:from-blue-500/50 group-hover:to-blue-600/40 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/30">
                    <action.icon className="h-5 w-5 text-blue-300" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-white">{action.title}</p>
                    <p className="text-xs text-gray-500">{action.description}</p>
                  </div>
                </div>
                <ArrowRight className="relative h-4 w-4 shrink-0 text-gray-500 transition-all duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-blue-300" />
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
