'use client'

import { ReactNode } from 'react'

interface GlowButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  variant?: 'primary' | 'secondary'
  isLoading?: boolean
}

export function GlowButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  variant = 'primary',
  isLoading = false,
}: GlowButtonProps) {
  const baseStyles =
    'relative h-11 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group'

  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-xl hover:shadow-blue-500/40 hover:from-blue-600 hover:to-blue-700 active:scale-95',
    secondary:
      'border border-white/20 text-white hover:border-white/40 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 active:scale-95',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-full group-hover:translate-x-0 transition-transform duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-loader" />
            <span>Processing...</span>
          </>
        ) : (
          children
        )}
      </div>
    </button>
  )
}
