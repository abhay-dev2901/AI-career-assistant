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
    <div className="min-h-screen w-full overflow-hidden bg-black">
      <GradientBackground />
      
      <div className="relative z-10 grid lg:grid-cols-2 gap-0">
        {/* Left Panel - Branding & Marketing with Features */}
        <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/5">
          <div className="space-y-8">
            {/* Branding */}
            <Link href="/" className="flex items-center gap-3 font-bold text-lg text-white hover:opacity-80 transition-opacity w-fit">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <span>CareerAI</span>
            </Link>
            
            {/* Hero text */}
            <div className="max-w-sm space-y-4">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Transform your career
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                AI-powered insights for smarter job searches, tailored resume optimization, and interview mastery.
              </p>
            </div>
          </div>

          {/* Bottom section */}
          <div className="space-y-6 border-t border-white/5 pt-6">
            <p className="text-xs text-gray-600">Trusted by professionals worldwide</p>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-0 lg:pr-12 min-h-screen">
          <AuthCard title="Welcome back" description="Sign in to your account to continue">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
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
                  <label className="text-xs font-medium text-gray-600">Password</label>
                  <Link href="#" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-600">Or continue with</span>
              </div>
            </div>

            <div className="space-y-2">
              <SocialButton icon={Chrome} provider="google" label="Continue with Google" />
              <SocialButton icon={Github} provider="github" label="Continue with GitHub" />
              <SocialButton icon={Apple} provider="apple" label="Continue with Apple" />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                  Sign up
                </Link>
              </p>
              <p className="text-xs text-gray-600 mt-4">
                By continuing, you agree to our{' '}
                <Link href="#" className="text-gray-500 hover:text-gray-400 underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link href="#" className="text-gray-500 hover:text-gray-400 underline">
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
