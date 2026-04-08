'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { GradientBackground } from '@/components/auth/gradient-background'
import { AuthCard } from '@/components/auth/auth-card'
import { SocialButton } from '@/components/auth/social-button'
import { FloatingLabelInput } from '@/components/auth/floating-label-input'
import { GlowButton } from '@/components/auth/glow-button'
import { FeatureCarousel } from '@/components/auth/feature-carousel'
import { FloatingDashboardPreview } from '@/components/auth/floating-dashboard-preview'
import { Github, Chrome, Apple } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData.email, formData.password)
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full overflow-hidden">
      <GradientBackground />
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-0">
        {/* Left Panel - Branding & Marketing with Features */}
        <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/10">
          <div className="space-y-12">
            {/* Branding */}
            <Link href="/" className="flex items-center gap-3 font-bold text-lg text-white hover:opacity-80 transition-opacity w-fit">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <span>CareerAI</span>
            </Link>
            
            {/* Hero text */}
            <div className="max-w-sm space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-5xl font-bold text-white leading-tight">
                Transform your career
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                AI-powered insights for smarter job searches, tailored resume optimization, and interview mastery.
              </p>
            </div>

            {/* Feature carousel */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <FeatureCarousel />
            </div>
          </div>

          {/* Bottom section with preview and social proof */}
          <div className="space-y-8">
            {/* Floating dashboard preview */}
            <FloatingDashboardPreview />

            {/* Social proof */}
            <div className="border-t border-white/10 pt-6">
              <p className="text-xs text-gray-500 mb-4 uppercase tracking-widest">Trusted by professionals worldwide</p>
              <div className="flex gap-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/30 to-purple-600/30 border border-white/15 flex items-center justify-center">
                    <span className="text-xs text-blue-300 font-semibold">{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-0 lg:pr-12 min-h-screen">
          <AuthCard title="Welcome back" description="Sign in to your account to continue">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/40 text-red-300 text-sm animate-pulse">
                  {error}
                </div>
              )}

              <div className="space-y-4">
                <FloatingLabelInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />

                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-400">Password</label>
                  <Link href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <FloatingLabelInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
              </div>

              <GlowButton type="submit" isLoading={loading} className="w-full">
                {loading ? 'Signing in...' : 'Sign In with Email'}
              </GlowButton>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-900 text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="space-y-3">
              <SocialButton icon={Chrome} provider="google" label="Continue with Google" />
              <SocialButton icon={Github} provider="github" label="Continue with GitHub" />
              <SocialButton icon={Apple} provider="apple" label="Continue with Apple" />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign up
                </Link>
              </p>
              <p className="text-xs text-gray-500 mt-4">
                By continuing, you agree to our{' '}
                <Link href="#" className="text-gray-400 hover:text-gray-300 underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="#" className="text-gray-400 hover:text-gray-300 underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </AuthCard>
        </div>
      </div>
    </div>
  )
}
