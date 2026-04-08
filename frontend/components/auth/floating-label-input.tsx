'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface FloatingLabelInputProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  autoComplete?: string
}

export function FloatingLabelInput({
  label,
  name,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  required = false,
  autoComplete,
}: FloatingLabelInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const displayType = isPassword && showPassword ? 'text' : type

  const hasValue = value.length > 0

  return (
    <div className="relative group">
      {/* Input field with premium styling */}
      <input
        id={name}
        name={name}
        type={displayType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoComplete={autoComplete}
        required={required}
        className="peer w-full h-12 rounded-lg border border-white/15 bg-white/7 px-4 pt-6 pb-2 text-white placeholder-transparent text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-white/30 transition-all duration-200 hover:border-white/20 group-hover:bg-white/10"
      />

      {/* Floating label */}
      <label
        htmlFor={name}
        className={`absolute left-4 text-sm font-medium text-gray-400 transition-all duration-200 pointer-events-none
          ${
            isFocused || hasValue
              ? 'top-2 text-xs text-blue-400'
              : 'top-3.5 text-gray-500'
          }
        `}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      {/* Password visibility toggle */}
      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200 focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  )
}
