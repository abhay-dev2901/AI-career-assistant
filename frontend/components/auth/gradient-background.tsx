'use client'

export function GradientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-20 bg-black">
      {/* Subtle radial gradient lighting from top center */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(59, 130, 246, 0.03) 0%, transparent 50%)',
        }}
      />
    </div>
  )
}
