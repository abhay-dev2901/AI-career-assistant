'use client'

import { Navbar } from '@/components/auth/navbar'
import { FeatureCard } from '@/components/auth/feature-card'
import { GradientBackground } from '@/components/auth/gradient-background'
import { useAuth } from '@/context/auth-context'
import { DashboardContent } from '@/components/dashboard/dashboard-content'
import { Zap, Shield, Code2 } from 'lucide-react'

export default function HomePage() {
  const { isAuthenticated } = useAuth()

  // If user is authenticated, show dashboard
  if (isAuthenticated) {
    return <DashboardContent />
  }

  // Otherwise show landing page
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <GradientBackground />
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-12">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm text-blue-300 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              Now available for all users
            </div>

            {/* Headline */}
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 text-balance">
                Build faster. Ship smarter.
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto text-balance">
                Your AI-powered career assistant that helps you land your dream job with smarter job searches, tailored resume optimization, and interview mastery.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
              </a>
              <a
                href="/login"
                className="px-8 py-3 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-200"
              >
                Explore Features
              </a>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Powerful features for your success
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Everything you need to accelerate your career journey
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard
                icon={Zap}
                title="Fast Performance"
                description="Lightning-fast AI analysis and real-time career insights powered by cutting-edge technology."
              />
              <FeatureCard
                icon={Shield}
                title="Secure & Private"
                description="Enterprise-grade security ensures your personal data and job search history remain completely confidential."
              />
              <FeatureCard
                icon={Code2}
                title="Developer-First"
                description="Built for professionals who value efficiency. Seamless integration with your workflow."
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: '10k+', label: 'Active Users' },
                { value: '95%', label: 'Success Rate' },
                { value: '24/7', label: 'AI Support' },
                { value: '100%', label: 'Secure' },
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-2">
                  <p className="text-4xl lg:text-5xl font-bold text-blue-400">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Ready to transform your career?
              </h2>
              <p className="text-xl text-gray-400">
                Join thousands of professionals who are already using CareerAI
              </p>
            </div>

            <a
              href="/signup"
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Start Your Journey
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-12 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-gray-500 text-sm">© 2024 CareerAI. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-400 text-sm transition-colors">
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
