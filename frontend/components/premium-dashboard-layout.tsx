'use client'

interface PremiumDashboardLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function PremiumDashboardLayout({
  children,
  title,
  description,
}: PremiumDashboardLayoutProps) {
  return (
    <div className="relative space-y-6">
      {/* Premium animated background gradient */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-600/15 to-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-purple-600/15 to-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-glow-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Page header with premium styling */}
      {(title || description) && (
        <div className="animate-fade-in-up">
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl p-8 shadow-2xl shadow-black/60">
            {/* Top accent line */}
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

            <div className="relative">
              {title && <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>}
              {description && <p className="text-gray-400 text-lg leading-relaxed">{description}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Content area */}
      <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        {children}
      </div>
    </div>
  )
}
