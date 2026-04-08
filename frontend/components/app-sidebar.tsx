"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Search,
  FileText,
  MessageSquare,
  Settings,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Job Search", href: "/jobs", icon: Search },
  { name: "Resume Matcher", href: "/resume", icon: FileText },
  { name: "Interview Prep", href: "/interview", icon: MessageSquare },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/10 bg-gradient-to-b from-slate-950/80 via-slate-900/80 to-slate-950/80 backdrop-blur-xl">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">CareerAI</span>
        </div>

        <nav className="flex-1 space-y-2 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ease-in-out group",
                  isActive
                    ? "bg-gradient-to-r from-blue-500/30 to-blue-600/20 text-white shadow-lg shadow-blue-500/20"
                    : "text-gray-500 hover:text-white hover:bg-white/10"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                <span>{item.name}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 shadow-lg shadow-blue-500/50" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="relative overflow-hidden rounded-lg border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl transition-all duration-300 hover:border-white/25 group">
            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/5 to-blue-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" />
            
            <div className="relative">
              <p className="text-xs font-semibold text-white uppercase tracking-wider">Pro Tip</p>
              <p className="mt-2 text-xs text-gray-400 leading-relaxed">
                Upload your resume to get personalized job recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
