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

export default function SignupPage() {
  const router = useRouter()
  const { signup } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
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
      await signup(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password,
        formData.passwordConfirm
      )
      router.push('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
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
                Join thousands of professionals
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Build your dream career with AI-powered job matching, resume optimization, and interview prep.
              </p>
            </div>
          </div>

          {/* Bottom section */}
          <div className="space-y-6 border-t border-white/5 pt-6">
            <p className="text-xs text-gray-600">Featured in leading publications</p>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        <div className="flex flex-col items-center justify-center p-6 lg:p-0 lg:pr-12 min-h-screen">
          <AuthCard title="Create account" description="Start building your dream career">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <FloatingLabelInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                />

                <FloatingLabelInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                />
              </div>

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

              <FloatingLabelInput
                label="Password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />

              <FloatingLabelInput
                label="Confirm Password"
                name="passwordConfirm"
                type="password"
                placeholder="••••••••"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 mt-2"
              >
                {loading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-600">Or sign up with</span>
              </div>
            </div>

            <div className="space-y-2">
              <SocialButton icon={Chrome} provider="google" label="Continue with Google" />
              <SocialButton icon={Github} provider="github" label="Continue with GitHub" />
              <SocialButton icon={Apple} provider="apple" label="Continue with Apple" />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
              <p className="text-xs text-gray-500 mt-4">
                By creating an account, you agree to our{' '}
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
