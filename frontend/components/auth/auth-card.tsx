'use client'

import { ReactNode } from 'react'

interface AuthCardProps {
  children: ReactNode
  title: string
  description?: string
}

export function AuthCard({ children, title, description }: AuthCardProps) {
  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
          {description && <p className="text-gray-400">{description}</p>}
        </div>
        
        {children}
      </div>
    </div>
  )
}
