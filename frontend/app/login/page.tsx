'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { GradientBackground } from '@/components/auth/gradient-background'
import { AuthCard } from '@/components/auth/auth-card'
import { SocialButton } from '@/components/auth/social-button'
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
        {/* Left Panel - Branding & Marketing */}
        <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/10">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg text-white mb-16">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">CA</span>
              </div>
              CareerAI
            </Link>
            
            <div className="max-w-sm">
              <h2 className="text-4xl font-bold text-white mb-4">
                Accelerate your career
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                AI-powered insights for smarter job searches, tailored resume optimization, and interview mastery.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-t border-white/10 pt-6">
              <p className="text-sm text-gray-500 mb-4">Trusted by professionals</p>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/20 border border-white/10" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-0 lg:pr-12 min-h-screen">
          <AuthCard title="Welcome back" description="Sign in to your account to continue">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-white">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-11 rounded-lg border border-white/10 bg-white/5 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-white">
                    Password
                  </label>
                  <Link href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full h-11 rounded-lg border border-white/10 bg-white/5 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
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
