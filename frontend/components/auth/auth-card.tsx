'use client'

import { ReactNode } from 'react'

interface AuthCardProps {
  children: ReactNode
  title: string
  description?: string
}

export function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <div className="w-full max-w-md animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
      {/* Minimal matte card */}
      <div className="rounded-lg border border-white/5 bg-[#0B1220] p-8 transition-all duration-200">
        <div className="mb-8 space-y-3">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {description && <p className="text-gray-600 text-sm">{description}</p>}
        </div>
        
        {children}
      </div>
    </div>
  )
}
