"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { AppHeader } from "@/components/app-header"
import { ThemeProvider } from "@/components/theme-provider"

export function AppShell({ children }: { children: React.ReactNode }) {
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
