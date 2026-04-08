"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { ThemeProvider } from "@/components/theme-provider"
import { useAuth } from '@/context/auth-context'

const PUBLIC_ROUTES = ['/', '/login', '/signup']

export function AppShell({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, loading } = useAuth()
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    // If still loading, wait for auth state
    if (loading) {
      return
    }

    // Check if route is public
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

    if (!isAuthenticated && !isPublicRoute) {
      // Redirect to login if not authenticated and on protected route
      router.push('/login')
      return
    }

    if (isAuthenticated && isPublicRoute) {
      // Redirect to dashboard if authenticated and on auth route
      router.push('/')
      return
    }

    setShouldRender(true)
  }, [isAuthenticated, loading, pathname, router])

  if (!shouldRender) {
    return (
      <ThemeProvider>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-blue-500 border-b-purple-500 shadow-lg shadow-blue-500/30" />
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  // For public routes, don't show sidebar
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  if (isPublicRoute) {
    return (
      <ThemeProvider>
        {children}
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        {/* Premium animated background elements */}
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-600/20 to-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-purple-600/20 to-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-glow-float" style={{ animationDelay: '2s' }} />
        </div>

        <AppSidebar />
        <div className="pl-64 relative z-10">
          <AppHeader />
          <main className="min-h-[calc(100vh-4rem)] p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
