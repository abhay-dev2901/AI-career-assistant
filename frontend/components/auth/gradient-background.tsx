'use client'

export function GradientBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-slate-950 via-slate-900 to-black" />
      
      {/* Animated gradient orbs */}
      <div className="fixed top-0 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse -z-10" />
      <div className="fixed top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000 -z-10" />
      <div className="fixed -bottom-8 left-20 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse animation-delay-4000 -z-10" />
      
      {/* Grid pattern overlay */}
      <div 
        className="fixed inset-0 -z-10 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />
    </>
  )
}
