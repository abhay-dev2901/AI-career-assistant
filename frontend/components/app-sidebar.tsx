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
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-[rgba(255,255,255,0.06)] bg-[#0d0d14]">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-[rgba(255,255,255,0.06)] px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#3b82f6]/20 transition-all duration-200 ease-in-out">
            <Sparkles className="h-4 w-4 text-[#3b82f6]" />
          </div>
          <span className="text-xl font-bold text-[#f1f5f9]">CareerAI</span>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "relative flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-sm font-medium text-[#64748b] transition-all duration-200 ease-in-out",
                  "hover:bg-[rgba(255,255,255,0.05)] hover:text-[#f1f5f9]",
                  isActive &&
                    "bg-[rgba(59,130,246,0.1)] text-[#f1f5f9] before:absolute before:left-0 before:top-1/2 before:h-[60%] before:w-[3px] before:-translate-y-1/2 before:rounded-full before:bg-[#3b82f6] before:content-['']"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-[rgba(255,255,255,0.06)] p-4">
          <div className="rounded-[12px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4 backdrop-blur-[12px] transition-all duration-200 ease-in-out">
            <p className="text-xs font-medium text-[#f1f5f9]">Pro Tip</p>
            <p className="mt-1 text-xs text-[#64748b]">
              Upload your resume to get personalized job recommendations.
            </p>
          </div>
        </div>
      </div>
    </aside>
  )
}
