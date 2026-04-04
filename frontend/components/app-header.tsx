"use client"

import { Bell } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/context/auth-context"

export function AppHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const getInitials = (firstName?: string, lastName?: string) => {
    if (!firstName && !lastName) return "U"
    const first = firstName?.charAt(0) || ""
    const last = lastName?.charAt(0) || ""
    return (first + last).toUpperCase()
  }

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[rgba(255,255,255,0.06)] bg-[rgba(10,10,15,0.8)] px-6 backdrop-blur-[20px] transition-all duration-200 ease-in-out">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-[#f1f5f9]">
          Welcome back, {user?.firstName || "User"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="relative rounded-[8px] text-[#64748b] transition-all duration-200 ease-in-out hover:bg-[rgba(255,255,255,0.05)] hover:text-[#f1f5f9]"
        >
          <Bell className="h-5 w-5" />
          <span
            className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#3b82f6] shadow-[0_0_8px_2px_rgba(59,130,246,0.7)]"
            aria-hidden
          />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-[8px] transition-all duration-200 ease-in-out"
            >
              <Avatar className="h-9 w-9 rounded-[8px]">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback className="rounded-[8px] bg-[#3b82f6] text-white">
                  {getInitials(user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-[12px] border-[rgba(255,255,255,0.08)] bg-[#0d0d14]"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-[#f1f5f9]">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "User"}
                </p>
                <p className="text-xs text-[#64748b]">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.08)]" />
            <DropdownMenuItem className="rounded-[8px] focus:bg-[rgba(255,255,255,0.05)]">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-[8px] focus:bg-[rgba(255,255,255,0.05)]">
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-[8px] focus:bg-[rgba(255,255,255,0.05)]">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[rgba(255,255,255,0.08)]" />
            <DropdownMenuItem
              className="rounded-[8px] focus:bg-[rgba(255,255,255,0.05)]"
              onClick={handleLogout}
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
