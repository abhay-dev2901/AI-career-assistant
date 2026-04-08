'use client'

export function GradientBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden -z-20">
      {/* Deep base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-black" />
      
      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' result='noise' seed='1'/%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23ffffff' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '400px 400px',
        }}
      />
      
      {/* Primary glow orb - top left - deep blue */}
      <div 
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.8) 0%, rgba(29, 78, 216, 0.4) 100%)',
          animationDelay: '0s',
        }}
      />
      
      {/* Secondary glow orb - bottom right - purple */}
      <div 
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-glow-float"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.7) 0%, rgba(124, 58, 202, 0.3) 100%)',
          animationDelay: '2s',
        }}
      />
      
      {/* Tertiary glow orb - top right - cyan */}
      <div 
        className="absolute -top-20 -right-20 w-72 h-72 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"
        style={{
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.6) 0%, rgba(6, 182, 212, 0.2) 100%)',
          animationDelay: '4s',
        }}
      />
      
      {/* Accent glow - center bottom */}
      <div 
        className="absolute top-2/3 left-1/2 transform -translate-x-1/2 w-64 h-64 rounded-full mix-blend-screen filter blur-2xl opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0) 100%)',
        }}
      />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: '4rem 4rem'
        }}
      />
      
      {/* Gradient overlay to darken bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50" />
    </div>
  )
}
