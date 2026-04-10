'use client'

import { BarChart, TrendingUp } from 'lucide-react'

export function FloatingDashboardPreview() {
  return (
    <div className="relative animate-float" style={{ animationDelay: '1s' }}>
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl blur-2xl" />

      {/* Card with glassmorphism */}
      <div className="relative rounded-xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl p-5 shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-400">Career Progress</p>
            <h4 className="text-sm font-semibold text-white">Job Matches</h4>
          </div>
          <BarChart className="w-4 h-4 text-blue-400" />
        </div>

        {/* Chart visualization */}
        <div className="space-y-3 mb-4">
          {[85, 72, 68, 95, 78].map((value, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full animate-shimmer"
                  style={{
                    width: `${value}%`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              </div>
              <span className="text-xs text-gray-400 w-8 text-right">{value}%</span>
            </div>
          ))}
        </div>

        {/* Stats footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-xs text-green-400 font-medium">+23%</span>
          </div>
          <span className="text-xs text-gray-500">This month</span>
        </div>
      </div>
    </div>
  )
}
