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
    <div className="relative p-6 rounded-lg border border-white/5 bg-[#0B1220] transition-all duration-200 hover:border-white/10">
      <div className="space-y-4">
        <div className="w-12 h-12 rounded-lg bg-blue-600/15 flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  )
}
