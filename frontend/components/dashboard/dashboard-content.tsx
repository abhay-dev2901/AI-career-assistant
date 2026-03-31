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
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"

const quickActions = [
  {
    title: "Search Jobs",
    description: "Find your dream role",
    icon: Search,
    href: "/jobs",
    color: "bg-primary hover:bg-primary/90",
  },
  {
    title: "Analyze Resume",
    description: "Match your skills",
    icon: FileText,
    href: "/resume",
    color: "bg-success hover:bg-success/90",
  },
  {
    title: "Start Interview",
    description: "Practice makes perfect",
    icon: MessageSquare,
    href: "/interview",
    color: "bg-warning hover:bg-warning/90 text-warning-foreground",
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
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Resume Score",
      value: "—",
      icon: FileText,
      change: "Pending analysis",
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Interviews Done",
      value: "0",
      icon: MessageSquare,
      change: "0 scheduled",
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Profile Skills",
      value: "0",
      icon: Flame,
      change: "Add your skills",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ])

  const recentActivity = []

  useEffect(() => {
    if (user) {
      // Update stats based on user data
      const skillsCount = user.skills?.length || 0
      setStats((prev) =>
        prev.map((stat) => {
          if (stat.title === "Profile Skills") {
            return {
              ...stat,
              value: skillsCount.toString(),
              change: skillsCount > 0 ? `${skillsCount} skills added` : "Add your skills",
            }
          }
          return stat
        })
      )
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="border-none bg-gradient-to-r from-primary/20 via-primary/10 to-background">
        <CardContent className="flex items-center justify-between p-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-serif text-foreground">
              Good morning, {user?.firstName || "User"}!
            </h2>
            <p className="text-muted-foreground">
              {user?.bio || "Your career journey starts here. Let's make today count."}
            </p>
          </div>
          <div className="hidden md:flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="transition-all hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold font-serif text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
                <div className={`rounded-full p-3 ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        {recentActivity.length > 0 && (
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-serif">
                <span>Recent Activity</span>
                <Badge variant="secondary" className="text-xs">
                  {recentActivity.length} items
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-all hover:bg-muted/50"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {activity.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {activity.company}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="font-serif">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Button
                  className={`w-full justify-between ${action.color} text-primary-foreground`}
                >
                  <div className="flex items-center gap-3">
                    <action.icon className="h-5 w-5" />
                    <div className="text-left">
                      <p className="font-medium">{action.title}</p>
                      <p className="text-xs opacity-80">{action.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
