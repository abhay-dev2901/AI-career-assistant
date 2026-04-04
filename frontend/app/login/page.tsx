'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LogIn } from 'lucide-react'

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
    <div className="auth-hero-bg relative z-0 flex min-h-screen items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        <Card className="auth-glass-panel border-0 shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-2xl font-bold text-[#f1f5f9]">
              <LogIn className="h-6 w-6 text-[#3b82f6]" />
              Welcome Back
            </CardTitle>
            <CardDescription className="text-[#94a3b8]">
              Sign in to your AI Career Assistant account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-destructive/10 border border-destructive text-destructive rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-[#94a3b8]">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-[8px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-3 py-2 text-[#f1f5f9] placeholder:text-[#64748b] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-[#94a3b8]">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-[8px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.05)] px-3 py-2 text-[#f1f5f9] placeholder:text-[#64748b] transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#3b82f6]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full rounded-[8px] transition-all duration-200 ease-in-out"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-[#64748b]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-[#60a5fa] transition-colors duration-200 hover:text-[#93c5fd] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
