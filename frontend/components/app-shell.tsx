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
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-center">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-blue-500" />
            <p className="text-sm text-gray-600">Loading...</p>
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
      <div className="relative min-h-screen bg-black">
        {/* Subtle radial gradient lighting */}
        <div 
          className="fixed inset-0 -z-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 0%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)',
          }}
        />

        <AppSidebar />
        <div className="pl-64">
          <AppHeader />
          <main className="min-h-[calc(100vh-4rem)] p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
