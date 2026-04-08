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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/5 bg-black">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-3 border-b border-white/5 px-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 transition-all duration-200">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-white">CareerAI</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-blue-600/20 text-white"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span>{item.name}</span>
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-blue-500" />
                )}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/5 p-4">
          <div className="rounded-lg border border-white/5 bg-[#0B1220] p-4 transition-all duration-200 hover:border-white/10">
            <p className="text-xs font-medium text-blue-400">Pro Tip</p>
            <p className="mt-2 text-xs text-gray-500 leading-relaxed">
              Upload your resume to get personalized job recommendations.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
