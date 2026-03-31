"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { ThemeProvider } from "@/components/theme-provider"
import { useAuth } from '@/context/auth-context'

const PUBLIC_ROUTES = ['/login', '/signup']

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
      router.push('/dashboard')
      return
    }

    setShouldRender(true)
  }, [isAuthenticated, loading, pathname, router])

  if (!shouldRender) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    )
  }

  // For public routes, don't show sidebar
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname)

  if (isPublicRoute) {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="relative min-h-screen">
        <AppSidebar />
        <div className="pl-64">
          <AppHeader />
          <main className="min-h-[calc(100vh-4rem)] p-6">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  )
}
