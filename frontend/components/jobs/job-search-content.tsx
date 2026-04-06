"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  Building2,
  ExternalLink,
  X,
  Sparkles,
  Zap,
  SlidersHorizontal,
  Globe,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const UPCOMING_FEATURES = [
  {
    icon: Sparkles,
    label: "AI-powered matching",
    desc: "Personalized job recommendations based on your skills and history.",
  },
  {
    icon: Globe,
    label: "Real-time listings",
    desc: "Live job postings pulled from hundreds of platforms.",
  },
  {
    icon: SlidersHorizontal,
    label: "Advanced filters",
    desc: "Filter by salary, remote, industry, tech stack, and more.",
  },
  {
    icon: TrendingUp,
    label: "Salary insights",
    desc: "Market-rate data and negotiation tips for every role.",
  },
  {
    icon: Zap,
    label: "One-click apply",
    desc: "Apply to multiple jobs instantly with your saved profile.",
  },
]

// Skeleton ghost cards shown behind the coming-soon banner
function GhostCard({ opacity }: { opacity: number }) {
  return (
    <Card
      className="midnight-glass-card pointer-events-none select-none"
      style={{ opacity }}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-14 w-14 shrink-0 rounded-[12px] bg-[rgba(255,255,255,0.05)]" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-2/5 rounded-md bg-[rgba(255,255,255,0.07)]" />
            <div className="h-3 w-1/4 rounded-md bg-[rgba(255,255,255,0.05)]" />
            <div className="h-3 w-3/5 rounded-md bg-[rgba(255,255,255,0.04)]" />
            <div className="mt-3 flex gap-2">
              <div className="h-5 w-16 rounded-[8px] bg-[rgba(255,255,255,0.05)]" />
              <div className="h-5 w-14 rounded-[8px] bg-[rgba(255,255,255,0.04)]" />
            </div>
          </div>
          <div className="h-6 w-20 rounded-[8px] bg-[rgba(255,255,255,0.05)]" />
        </div>
      </CardContent>
    </Card>
  )
}

export function JobSearchContent() {
  const [jobRole, setJobRole] = useState("")
  const [location, setLocation] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [experience, setExperience] = useState("")
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [salaryRange, setSalaryRange] = useState([80])
  const [datePosted, setDatePosted] = useState("any")

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault()
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()])
      }
      setSkillInput("")
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }

  return (
    <div className="flex gap-6">
      {/* Sidebar Filters */}
      <Card className="midnight-glass-card sticky top-24 hidden h-fit w-64 shrink-0 lg:block opacity-50 pointer-events-none select-none">
        <CardHeader>
          <CardTitle className="midnight-card-title text-base">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="remote" className="text-sm">
              Remote Only
            </Label>
            <Switch
              id="remote"
              checked={remoteOnly}
              onCheckedChange={setRemoteOnly}
              disabled
            />
          </div>

          <div className="space-y-3">
            <Label className="text-sm">Min Salary: ${salaryRange[0]}k</Label>
            <Slider
              value={salaryRange}
              onValueChange={setSalaryRange}
              max={250}
              min={50}
              step={10}
              className="w-full"
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Date Posted</Label>
            <Select value={datePosted} onValueChange={setDatePosted} disabled>
              <SelectTrigger>
                <SelectValue placeholder="Any time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any time</SelectItem>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="week">Last week</SelectItem>
                <SelectItem value="month">Last month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Search Form — disabled until feature launches */}
        <Card className="midnight-glass-card opacity-50 pointer-events-none select-none">
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="role">Job Role</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                  <Input
                    id="role"
                    placeholder="Frontend Developer"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#64748b]" />
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={experience} onValueChange={setExperience} disabled>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fresher">Fresher (0-1 years)</SelectItem>
                    <SelectItem value="mid">Mid (2-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button disabled className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  Find Jobs
                </Button>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="Type a skill and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                disabled
              />
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="cursor-pointer rounded-[8px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.08)] text-[#f1f5f9] transition-all duration-200 ease-in-out hover:border-red-500/50 hover:bg-red-500/20 hover:text-red-200"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      {skill}
                      <X className="ml-1 h-3 w-3" />
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ── Coming Soon Banner ── */}
        <div className="relative rounded-xl border border-dashed border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.02)] px-6 py-12 flex flex-col items-center text-center gap-6">
          {/* Icon */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(59,130,246,0.3)] bg-[rgba(59,130,246,0.1)]">
            <Search className="h-7 w-7 text-[#60a5fa]" />
          </div>

          {/* Headline */}
          <div className="space-y-2 max-w-md">
            <div className="flex items-center justify-center gap-2">
              <span className="rounded-full border border-[rgba(59,130,246,0.4)] bg-[rgba(59,130,246,0.12)] px-3 py-0.5 text-xs font-medium text-[#60a5fa]">
                Coming soon
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#f1f5f9]">
              Smart job search is on its way
            </h2>
            <p className="text-sm leading-relaxed text-[#64748b]">
              We're building a powerful job matching engine with real-time listings,
              AI-powered recommendations, and one-click applications. Stay tuned.
            </p>
          </div>

          {/* Feature grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-2xl mt-2">
            {UPCOMING_FEATURES.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-[12px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] p-4 text-left"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[rgba(59,130,246,0.1)]">
                  <Icon className="h-4 w-4 text-[#60a5fa]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#e2e8f0]">{label}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[#64748b]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Notify CTA — optional, wire up as needed */}
          <Button
            variant="outline"
            className="mt-2 rounded-[10px] border-[rgba(59,130,246,0.4)] bg-[rgba(59,130,246,0.08)] text-[#60a5fa] hover:border-[rgba(59,130,246,0.6)] hover:bg-[rgba(59,130,246,0.15)] transition-all duration-200"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Notify me when it's ready
          </Button>
        </div>

        {/* Ghost job cards — decorative blur-behind effect */}
        <div className="space-y-4" aria-hidden="true">
          <GhostCard opacity={0.25} />
          <GhostCard opacity={0.15} />
          <GhostCard opacity={0.08} />
        </div>
      </div>
    </div>
  )
}