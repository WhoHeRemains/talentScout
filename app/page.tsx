"use client"

import { useState, useCallback, useMemo } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { JobInput } from "@/components/dashboard/job-input"
import { PipelineLogs } from "@/components/dashboard/pipeline-logs"
import { ExtractedSkills } from "@/components/dashboard/extracted-skills"
import { TopCandidates } from "@/components/dashboard/top-candidates"
import { CandidateTable } from "@/components/dashboard/candidate-table"
import { CandidateDetailModal } from "@/components/dashboard/candidate-detail-modal"
import { ChatModal } from "@/components/dashboard/chat-modal"
import { FiltersBar, type FilterState } from "@/components/dashboard/filters-bar"
import { AnalyticsPanel } from "@/components/dashboard/analytics-panel"
import { AnalyticsView } from "@/components/dashboard/analytics-view"
import { mockCandidates, mockChatMessages, extractedSkills, type Candidate } from "@/lib/mock-data"
import { Sparkles, Users } from "lucide-react"
import { ThemeToggle } from "@/components/dashboard/theme-toggle"

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [isRunningPipeline, setIsRunningPipeline] = useState(false)
  const [pipelineComplete, setPipelineComplete] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [isLoading, setIsLoading] = useState(false)
  
  // Modal states
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Filters
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    experienceRange: [0, 15],
    locations: [],
    skills: [],
    recommendations: [],
    sortBy: "finalScore",
  })

  // Available filter options
  const availableLocations = useMemo(() => 
    [...new Set(mockCandidates.map(c => c.location))].sort(),
    []
  )
  
  const availableSkills = useMemo(() => 
    [...new Set(mockCandidates.flatMap(c => c.skills))].sort(),
    []
  )

  // Filtered and sorted candidates
  const filteredCandidates = useMemo(() => {
    let result = [...candidates]

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase()
      result = result.filter(c =>
        c.name.toLowerCase().includes(search) ||
        c.role.toLowerCase().includes(search) ||
        c.skills.some(s => s.toLowerCase().includes(search))
      )
    }

    // Experience filter
    result = result.filter(c =>
      c.experience >= filters.experienceRange[0] &&
      c.experience <= filters.experienceRange[1]
    )

    // Location filter
    if (filters.locations.length > 0) {
      result = result.filter(c => filters.locations.includes(c.location))
    }

    // Skills filter
    if (filters.skills.length > 0) {
      result = result.filter(c =>
        filters.skills.some(skill => c.skills.includes(skill))
      )
    }

    // Recommendation filter
    if (filters.recommendations.length > 0) {
      result = result.filter(c => filters.recommendations.includes(c.recommendation))
    }

    // Sort
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case "matchScore": return b.matchScore - a.matchScore
        case "interestScore": return b.interestScore - a.interestScore
        case "experience": return b.experience - a.experience
        default: return b.finalScore - a.finalScore
      }
    })

    return result
  }, [candidates, filters])

  const handleRunAgent = useCallback(() => {
    setIsRunningPipeline(true)
    setPipelineComplete(false)
    setCandidates([])
    setIsLoading(true)
  }, [])

  const handlePipelineComplete = useCallback(() => {
    setIsRunningPipeline(false)
    setPipelineComplete(true)
    // Simulate loading delay
    setTimeout(() => {
      setCandidates(mockCandidates)
      setIsLoading(false)
    }, 500)
  }, [])

  const handleEngage = useCallback((candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setIsDetailOpen(false)
    setIsChatOpen(true)
  }, [])

  const handleViewDetails = useCallback((candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setIsDetailOpen(true)
  }, [])

  const handleCloseChat = useCallback(() => {
    setIsChatOpen(false)
    setSelectedCandidate(null)
  }, [])

  const handleCloseDetail = useCallback(() => {
    setIsDetailOpen(false)
    setSelectedCandidate(null)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
          <MobileSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isOpen={mobileMenuOpen}
            onOpenChange={setMobileMenuOpen}
          />
          <div className="flex-1">
            <h1 className="text-lg font-semibold sm:text-xl">
              {activeTab === "dashboard" && "Talent Scout Dashboard"}
              {activeTab === "candidates" && "All Candidates"}
              {activeTab === "analytics" && "Analytics"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">AI Active</span>
            </div>
            <ThemeToggle />
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* 2-Column Layout for Input + Pipeline */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Job Description Card */}
                  <JobInput
                    jobDescription={jobDescription}
                    onJobDescriptionChange={setJobDescription}
                    onAnalyze={handleRunAgent}
                    isAnalyzing={isRunningPipeline}
                  />

                  {/* Extracted Skills */}
                  <ExtractedSkills 
                    skills={extractedSkills} 
                    isVisible={pipelineComplete || isRunningPipeline} 
                  />
                </div>

                {/* Right Column - Pipeline Logs */}
                <div>
                  {(isRunningPipeline || pipelineComplete) ? (
                    <PipelineLogs 
                      isRunning={isRunningPipeline} 
                      onComplete={handlePipelineComplete} 
                    />
                  ) : (
                    <div className="rounded-xl border-2 border-dashed border-muted-foreground/25 p-8 text-center bg-card/50 h-full flex flex-col items-center justify-center min-h-[200px]">
                      <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <Sparkles className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-base font-semibold mb-1 text-foreground">Pipeline Ready</h3>
                      <p className="text-sm text-muted-foreground max-w-xs mx-auto text-balance">
                        Enter a job description and run the agent to see the pipeline in action.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Analytics Panel */}
              {candidates.length > 0 && (
                <AnalyticsPanel candidates={candidates} />
              )}

              {/* Top 3 Candidates Highlight */}
              {candidates.length > 0 && (
                <TopCandidates 
                  candidates={candidates}
                  onEngage={handleEngage}
                  onViewDetails={handleViewDetails}
                />
              )}

              {/* Filters */}
              {candidates.length > 0 && (
                <FiltersBar
                  filters={filters}
                  onFiltersChange={setFilters}
                  availableLocations={availableLocations}
                  availableSkills={availableSkills}
                />
              )}

              {/* All Candidates Table */}
              {(candidates.length > 0 || isLoading) && (
                <CandidateTable 
                  candidates={filteredCandidates}
                  isLoading={isLoading}
                  onViewDetails={handleViewDetails}
                />
              )}

              {/* Empty State */}
              {candidates.length === 0 && !isRunningPipeline && !isLoading && (
                <div className="rounded-xl border-2 border-dashed border-muted-foreground/25 p-12 text-center bg-card/50">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">No candidates yet</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto text-balance">
                    Paste a job description above and run the talent scouting agent to find matching candidates.
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === "candidates" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">All Candidates</h2>
                <p className="text-muted-foreground">Browse and manage your entire candidate pool</p>
              </div>
              
              {/* Analytics */}
              <AnalyticsPanel candidates={mockCandidates} />

              {/* Filters */}
              <FiltersBar
                filters={filters}
                onFiltersChange={setFilters}
                availableLocations={availableLocations}
                availableSkills={availableSkills}
              />

              {/* Table */}
              <CandidateTable 
                candidates={filteredCandidates.length > 0 ? filteredCandidates : mockCandidates.filter(c => {
                  let match = true
                  if (filters.search) {
                    const search = filters.search.toLowerCase()
                    match = c.name.toLowerCase().includes(search) ||
                      c.role.toLowerCase().includes(search) ||
                      c.skills.some(s => s.toLowerCase().includes(search))
                  }
                  if (match && filters.locations.length > 0) {
                    match = filters.locations.includes(c.location)
                  }
                  if (match && filters.skills.length > 0) {
                    match = filters.skills.some(skill => c.skills.includes(skill))
                  }
                  if (match && filters.recommendations.length > 0) {
                    match = filters.recommendations.includes(c.recommendation)
                  }
                  if (match) {
                    match = c.experience >= filters.experienceRange[0] &&
                      c.experience <= filters.experienceRange[1]
                  }
                  return match
                }).sort((a, b) => {
                  switch (filters.sortBy) {
                    case "matchScore": return b.matchScore - a.matchScore
                    case "interestScore": return b.interestScore - a.interestScore
                    case "experience": return b.experience - a.experience
                    default: return b.finalScore - a.finalScore
                  }
                })}
                onViewDetails={handleViewDetails}
              />
            </div>
          )}

          {activeTab === "analytics" && <AnalyticsView />}
        </main>
      </div>

      {/* Candidate Detail Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        isOpen={isDetailOpen}
        onClose={handleCloseDetail}
        onEngage={handleEngage}
      />

      {/* Chat Modal */}
      <ChatModal
        candidate={selectedCandidate}
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        messages={selectedCandidate ? mockChatMessages[selectedCandidate.id] || [] : []}
      />
    </div>
  )
}
