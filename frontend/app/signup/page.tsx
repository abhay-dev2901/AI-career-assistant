'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { GradientBackground } from '@/components/auth/gradient-background'
import { AuthCard } from '@/components/auth/auth-card'
import { SocialButton } from '@/components/auth/social-button'
import { FloatingLabelInput } from '@/components/auth/floating-label-input'
import { FeatureCarousel } from '@/components/auth/feature-carousel'
import { FloatingDashboardPreview } from '@/components/auth/floating-dashboard-preview'
import { Github, Chrome, Apple, Sparkles, Target, MessageSquareText } from 'lucide-react'

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
        <div className="relative hidden lg:flex flex-col justify-between p-12 border-r border-white/5 overflow-hidden">
          <div className="space-y-8">
            {/* Branding */}
            <Link href="/" className="flex items-center gap-3 font-bold text-lg text-white hover:opacity-80 transition-opacity w-fit">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <span>CareerAI</span>
            </Link>
            
            {/* Hero text */}
            <div className="max-w-md space-y-4 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-xs text-blue-300">
                <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
                Your career OS starts here
              </div>
              <h2 className="text-4xl font-bold text-white leading-tight text-balance">
                Turn effort into progress — with a plan you can see.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed text-balance">
                Get a simple workflow: discover roles, tailor your resume, and practice answers — all inside one dashboard.
              </p>
            </div>

            <div className="grid gap-3 max-w-md">
              {[
                {
                  icon: Target,
                  title: "Match to the right roles",
                  desc: "Clarity on what fits (and what doesn’t).",
                },
                {
                  icon: Sparkles,
                  title: "Upgrade your resume fast",
                  desc: "Get actionable suggestions, not vague advice.",
                },
                {
                  icon: MessageSquareText,
                  title: "Practice answers that land",
                  desc: "Structured feedback for interviews and HR screens.",
                },
              ].map((item, idx) => (
                <div
                  key={item.title}
                  className="premium-shimmer-border premium-hover-lift animate-fade-in-up rounded-[14px] border border-white/5 bg-white/[0.03] px-4 py-3 backdrop-blur-[14px]"
                  style={{ animationDelay: `${200 + idx * 100}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-[10px] bg-blue-600/15">
                      <item.icon className="h-4 w-4 text-blue-300" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Product storytelling (desktop) */}
            <div className="mt-2 grid gap-6 max-w-md">
              <FeatureCarousel />
              <div className="animate-subtle-tilt">
                <FloatingDashboardPreview />
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div className="space-y-6 border-t border-white/5 pt-6">
            <div className="rounded-[14px] border border-white/5 bg-[#0B1220] p-4">
              <p className="text-xs text-gray-500">
                “The resume + interview flow is ridiculously smooth. It feels like having a coach on standby.”
              </p>
              <p className="mt-2 text-[11px] text-gray-600">— New grad → first offer</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        {/* Keep the form pinned to the top on desktop too.
            The left marketing column can be taller than viewport; centering would push the form down. */}
        <div className="relative flex min-h-screen flex-col items-center justify-start p-6 pt-10 lg:p-0 lg:pr-12 lg:pt-16">
          <div className="lg:hidden w-full max-w-md mb-6 animate-fade-in-up">
            <Link href="/" className="flex items-center gap-3 font-bold text-lg text-white w-fit">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <span>CareerAI</span>
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Create your account and start your first guided career sprint.
            </p>
          </div>

          <div className="w-full max-w-md">
            <AuthCard title="Create account" description="Start building your career plan">
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
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 mt-2 premium-hover-lift"
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
    </div>
  )
}
