'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Code2 } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          CareerAI
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
            Features
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
            Pricing
          </Link>
          <Link href="#" className="text-sm text-gray-600 hover:text-gray-400 transition-colors">
            Docs
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild className="text-gray-600 hover:text-gray-400 hover:bg-white/5">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
