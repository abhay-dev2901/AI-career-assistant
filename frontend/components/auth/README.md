# Authentication & Welcome Components

This directory contains reusable components for the modern, premium SaaS-style authentication and welcome experience.

## Components

### Navbar
A fixed navigation bar that appears on the welcome page with logo, links, and CTA buttons.

**Usage:**
```tsx
import { Navbar } from '@/components/auth/navbar'

export default function Page() {
  return <Navbar />
}
```

### AuthCard
A reusable card wrapper for authentication forms with consistent styling and layout.

**Props:**
- `title: string` - The main heading
- `description?: string` - Optional subheading
- `children: ReactNode` - Form content

**Usage:**
```tsx
import { AuthCard } from '@/components/auth/auth-card'

<AuthCard title="Welcome back" description="Sign in to continue">
  {/* Form content */}
</AuthCard>
```

### SocialButton
A button component for social authentication providers with loading states.

**Props:**
- `icon: LucideIcon` - Icon from lucide-react
- `provider: 'google' | 'github' | 'apple'` - Provider identifier
- `label: string` - Button text
- `onClick?: () => void` - Click handler

**Usage:**
```tsx
import { SocialButton } from '@/components/auth/social-button'
import { Github } from 'lucide-react'

<SocialButton icon={Github} provider="github" label="Continue with GitHub" />
```

### FeatureCard
A card component for displaying feature highlights on the welcome page.

**Props:**
- `icon: LucideIcon` - Feature icon
- `title: string` - Feature title
- `description: string` - Feature description

**Usage:**
```tsx
import { FeatureCard } from '@/components/auth/feature-card'
import { Zap } from 'lucide-react'

<FeatureCard
  icon={Zap}
  title="Fast Performance"
  description="Lightning-fast analysis and insights"
/>
```

### GradientBackground
A full-screen animated gradient background with animated orbs and grid pattern overlay. Used on all auth pages and welcome page for a premium look.

**Usage:**
```tsx
import { GradientBackground } from '@/components/auth/gradient-background'

export default function Page() {
  return (
    <div className="min-h-screen">
      <GradientBackground />
      {/* Your content */}
    </div>
  )
}
```

## Design System

### Colors
- **Primary**: Blue (from-blue-500 to-blue-600)
- **Backgrounds**: Dark gradient (slate-950 to black)
- **Borders**: White with opacity (border-white/10)
- **Surfaces**: White with opacity (bg-white/5)
- **Text**: White primary, gray-400 secondary

### Typography
- **Headings**: Bold white text with large sizes
- **Body**: Gray-400 for secondary text
- **Labels**: White text with small size

### Spacing
- Uses Tailwind's standard spacing scale
- Consistent gaps between elements (gap-2, gap-3, gap-4, gap-6)
- Padding with p-6, p-8, p-12 for sections

### Animations
- `animate-fade-in-up` - Fade in with upward movement
- `animate-pulse` - Pulsing animation for visual interest
- Smooth transitions on hover states

## Pages Using These Components

- **Home Page (`/`)**: Displays welcome landing page for unauthenticated users, shows dashboard for authenticated users
- **Login Page (`/login`)**: Split layout with branding panel on left, auth form on right
- **Signup Page (`/signup`)**: Same split layout design as login page

## Styling Approach

All components use Tailwind CSS with a focus on:
- Premium, minimal aesthetic
- Dark mode first
- Smooth animations and transitions
- Consistent hover states
- Accessibility with proper focus states and color contrast

## Future Enhancements

- Add more social providers (LinkedIn, Microsoft, etc.)
- Implement OAuth integration
- Add password reset flow
- Add email verification
- Add 2FA support
- Add dark/light theme toggle
