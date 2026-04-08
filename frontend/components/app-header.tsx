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
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/5 bg-black px-6 transition-all duration-200">
      <div className="flex items-center gap-4">
        <h1 className="text-sm font-medium text-gray-300">
          Welcome back, {user?.firstName || "User"}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative p-2 rounded-lg text-gray-600 transition-all duration-200 hover:text-gray-300 hover:bg-white/5"
        >
          <Bell className="h-5 w-5" />
          <span
            className="absolute right-1 top-1 h-2 w-2 rounded-full bg-blue-500"
            aria-hidden
          />
          <span className="sr-only">Notifications</span>
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative h-9 w-9 rounded-lg overflow-hidden transition-all duration-200 hover:bg-white/5"
            >
              <Avatar className="h-9 w-9 rounded-lg">
                <AvatarImage src="/avatar.png" alt="User" />
                <AvatarFallback className="rounded-lg bg-blue-600 text-white font-semibold text-xs">
                  {getInitials(user?.firstName, user?.lastName)}
                </AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 rounded-lg border-white/5 bg-[#0B1220]"
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
                <p className="text-xs text-gray-600">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="rounded-md focus:bg-white/5 cursor-pointer text-gray-300 focus:text-white">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-md focus:bg-white/5 cursor-pointer text-gray-300 focus:text-white">
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-md focus:bg-white/5 cursor-pointer text-gray-300 focus:text-white">
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem
              className="rounded-md focus:bg-white/5 cursor-pointer text-red-500"
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
