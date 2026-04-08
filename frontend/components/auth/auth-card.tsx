'use client'

import { ReactNode } from 'react'

interface AuthCardProps {
  children: ReactNode
  title: string
  description?: string
}

export function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <div className="w-full max-w-md animate-fade-in-up group" style={{ animationDelay: '0.1s' }}>
      {/* Glow effect behind card */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/15 to-purple-600/15 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Main premium glass card */}
      <div className="relative rounded-2xl border border-white/15 bg-gradient-to-br from-white/12 to-white/5 backdrop-blur-2xl p-8 shadow-2xl shadow-black/60 hover:border-white/25 transition-all duration-300">
        {/* Inner shimmer on top */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Top accent line */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />
        
        <div className="relative mb-8 space-y-3">
          <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
          {description && <p className="text-gray-400 text-sm leading-relaxed">{description}</p>}
        </div>
        
        <div className="relative">
          {children}
        </div>
      </div>
    </div>
  )
}
