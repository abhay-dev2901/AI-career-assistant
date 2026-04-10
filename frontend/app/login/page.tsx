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
import { Github, Chrome, Apple, Sparkles, ShieldCheck, Timer } from 'lucide-react'

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
                Built for serious job seekers
              </div>
              <h2 className="text-4xl font-bold text-white leading-tight text-balance">
                Pick up where you left off — and ship your next offer faster.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed text-balance">
                CareerAI turns your resume + goals into a clear plan: smarter job search, better-fit roles, and stronger interviews.
              </p>
            </div>

            <div className="grid gap-3 max-w-md">
              {[
                {
                  icon: Sparkles,
                  title: "Personalized next steps",
                  desc: "See what to do today to move your search forward.",
                },
                {
                  icon: ShieldCheck,
                  title: "Private by default",
                  desc: "Your data stays yours — built for trust.",
                },
                {
                  icon: Timer,
                  title: "Save hours every week",
                  desc: "Faster screening, sharper answers, better outcomes.",
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
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Avg. time saved", value: "4.2h/wk" },
                { label: "Interview confidence", value: "+32%" },
                { label: "Role fit clarity", value: "Higher" },
              ].map((s) => (
                <div key={s.label} className="rounded-[12px] border border-white/5 bg-white/[0.02] p-3">
                  <p className="text-[11px] text-gray-600">{s.label}</p>
                  <p className="mt-1 text-sm font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[14px] border border-white/5 bg-[#0B1220] p-4">
              <p className="text-xs text-gray-500">
                “The dashboard makes it obvious what to do next. I finally stopped guessing.”
              </p>
              <p className="mt-2 text-[11px] text-gray-600">— Product Engineer</p>
            </div>
          </div>
        </div>

        {/* Right Panel - Auth Form */}
        {/* Keep the form pinned to the top on desktop too.
            The left marketing column can be taller than viewport; centering would push the form down. */}
        <div className="relative flex min-h-screen flex-col items-center justify-start p-6 pt-10 lg:p-0 lg:pr-12 lg:pt-16">
          {/* Mobile top story block */}
          <div className="lg:hidden w-full max-w-md mb-6 animate-fade-in-up">
            <Link href="/" className="flex items-center gap-3 font-bold text-lg text-white w-fit">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CA</span>
              </div>
              <span>CareerAI</span>
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Welcome back. Let’s turn momentum into outcomes.
            </p>
          </div>

          <div className="w-full max-w-md">
            <AuthCard
              title="Welcome back"
              description="Sign in to continue your career plan"
            >
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
                className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 disabled:opacity-50 premium-hover-lift"
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
    </div>
  )
}
