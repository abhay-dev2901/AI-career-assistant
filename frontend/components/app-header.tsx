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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-gradient-to-r from-slate-950/60 via-slate-900/60 to-slate-950/60 px-6 backdrop-blur-2xl transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-white">
          Welcome back, {user?.firstName || "User"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative p-2 rounded-lg text-gray-500 transition-all duration-300 hover:text-gray-300 hover:bg-white/10 group"
        >
          <Bell className="h-5 w-5" />
          <span
            className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50 animate-pulse"
            aria-hidden
          />
          <span className="sr-only">Notifications</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative h-9 w-9 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 group"
            >
              <Avatar className="h-9 w-9 rounded-lg">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {getInitials(user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-xl border-white/15 bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl"
            align="end"
            forceMount
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-white">
                  {user?.firstName && user?.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="rounded-lg focus:bg-white/10 cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg focus:bg-white/10 cursor-pointer">
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg focus:bg-white/10 cursor-pointer">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              className="rounded-lg focus:bg-white/10 cursor-pointer text-red-400"
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
