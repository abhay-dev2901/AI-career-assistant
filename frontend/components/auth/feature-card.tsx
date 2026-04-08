'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur hover:bg-white/8 hover:border-blue-500/30 transition-all duration-300">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center mb-4 group-hover:from-blue-400/40 group-hover:to-blue-600/40 transition-all duration-300">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  )
}
