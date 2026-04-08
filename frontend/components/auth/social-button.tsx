'use client'

import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'
import { useState } from 'react'

interface SocialButtonProps {
  icon: LucideIcon
  provider: 'google' | 'github' | 'apple'
  label: string
  onClick?: () => void
}

export function SocialButton({ icon: Icon, provider, label, onClick }: SocialButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      onClick?.()
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full h-11 border border-white/5 bg-white/3 hover:bg-white/5 text-white hover:text-white transition-all duration-200"
      disabled={isLoading}
      onClick={handleClick}
    >
      <Icon className="w-4 h-4 mr-2" />
      {isLoading ? 'Connecting...' : label}
    </Button>
  )
}
