'use client'

import { useState, useEffect } from 'react'
import { Zap, Shield, Sparkles } from 'lucide-react'

const features = [
  {
    id: 1,
    icon: Zap,
    title: 'AI-Powered Matching',
    description: 'Advanced algorithms find jobs that match your unique skills and experience.',
  },
  {
    id: 2,
    icon: Shield,
    title: 'Resume Optimization',
    description: 'Get AI suggestions to improve your resume and land more interviews.',
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'Interview Mastery',
    description: 'Practice with AI interviewer and get instant feedback on your responses.',
  },
]

export function FeatureCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const currentFeature = features[activeIndex]
  const Icon = currentFeature.icon

  return (
    <div className="space-y-6">
      {/* Feature display with animation */}
      <div className="relative h-32 overflow-hidden">
        <div
          className="absolute inset-0 transition-all duration-500 ease-out"
          style={{
            transform: `translateY(-${activeIndex * 100}%)`,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="h-32 flex flex-col justify-center space-y-3 animate-slide-in-bottom"
              style={{
                animationDelay: `${feature.id * 0.1}s`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400/20 to-blue-600/20 border border-blue-400/50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue-300" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel indicators */}
      <div className="flex gap-2">
        {features.map((feature, idx) => (
          <button
            key={feature.id}
            onClick={() => setActiveIndex(idx)}
            className={`h-1 transition-all duration-300 rounded-full ${
              idx === activeIndex
                ? 'bg-blue-500 w-8'
                : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
