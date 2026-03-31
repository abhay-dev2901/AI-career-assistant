"use client"

import { useState } from "react"
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building2,
  Heart,
  ExternalLink,
  Loader2,
  X,
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

const mockJobs = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$150k - $200k",
    match: 95,
    posted: "2 days ago",
    type: "Full-time",
    remote: true,
  },
  {
    id: 2,
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "New York, NY",
    salary: "$130k - $170k",
    match: 88,
    posted: "3 days ago",
    type: "Full-time",
    remote: false,
  },
  {
    id: 3,
    title: "React Developer",
    company: "DesignStudio",
    location: "Austin, TX",
    salary: "$120k - $160k",
    match: 82,
    posted: "1 week ago",
    type: "Contract",
    remote: true,
  },
  {
    id: 4,
    title: "Frontend Architect",
    company: "Enterprise Solutions",
    location: "Seattle, WA",
    salary: "$180k - $220k",
    match: 79,
    posted: "4 days ago",
    type: "Full-time",
    remote: false,
  },
  {
    id: 5,
    title: "UI Engineer",
    company: "InnovateTech",
    location: "Remote",
    salary: "$110k - $140k",
    match: 75,
    posted: "5 days ago",
    type: "Full-time",
    remote: true,
  },
]

export function JobSearchContent() {
  const [jobRole, setJobRole] = useState("")
  const [location, setLocation] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [skillInput, setSkillInput] = useState("")
  const [experience, setExperience] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [jobs, setJobs] = useState(mockJobs)
  const [savedJobs, setSavedJobs] = useState<number[]>([])
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

  const handleSearch = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setJobs(mockJobs)
    }, 1500)
  }

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs((prev) =>
      prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId]
    )
  }

  const getMatchColor = (match: number) => {
    if (match >= 90) return "bg-secondary text-accent-foreground"
    if (match >= 80) return "bg-secondary text-accent-foreground"
    if (match >= 70) return "bg-secondary text-accent-foreground"
    return "bg-muted text-muted-foreground"
  }

  return (
    <div className="flex gap-6">
      {/* Filter Sidebar */}
      <Card className="hidden lg:block w-64 shrink-0 h-fit sticky top-24">
        <CardHeader>
          <CardTitle className="text-base font-serif">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Remote Toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor="remote" className="text-sm">
              Remote Only
            </Label>
            <Switch
              id="remote"
              checked={remoteOnly}
              onCheckedChange={setRemoteOnly}
            />
          </div>

          {/* Salary Range */}
          <div className="space-y-3">
            <Label className="text-sm">Min Salary: ${salaryRange[0]}k</Label>
            <Slider
              value={salaryRange}
              onValueChange={setSalaryRange}
              max={250}
              min={50}
              step={10}
              className="w-full"
            />
          </div>

          {/* Date Posted */}
          <div className="space-y-2">
            <Label className="text-sm">Date Posted</Label>
            <Select value={datePosted} onValueChange={setDatePosted}>
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
        {/* Search Form */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Job Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Job Role</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="role"
                    placeholder="Frontend Developer"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select value={experience} onValueChange={setExperience}>
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

              {/* Search Button */}
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Find Jobs
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Skills Input */}
            <div className="mt-4 space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="Type a skill and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
              />
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground transition-colors"
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

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-medium text-foreground">{jobs.length}</span> jobs
          </p>
          <Select defaultValue="match">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match">Best Match</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="salary">Highest Salary</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Job Cards */}
        <div className="space-y-4">
          {jobs.map((job) => (
            <Card
              key={job.id}
              className="transition-all hover:shadow-lg hover:border-primary/50"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-4">
                    {/* Company Logo Placeholder */}
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <Building2 className="h-7 w-7 text-muted-foreground" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold font-serif text-foreground">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground">{job.company}</p>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.posted}
                        </span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Badge variant="outline">{job.type}</Badge>
                        {job.remote && (
                          <Badge variant="outline" className="border-primary text-primary">
                            Remote
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <Badge className={getMatchColor(job.match)}>
                      {job.match}% Match
                    </Badge>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleSaveJob(job.id)}
                        className={
                          savedJobs.includes(job.id)
                            ? "text-destructive"
                            : "text-muted-foreground"
                        }
                      >
                        <Heart
                          className={`h-5 w-5 ${
                            savedJobs.includes(job.id) ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
