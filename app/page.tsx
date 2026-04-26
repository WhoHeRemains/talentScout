"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { JobInput } from "@/components/dashboard/job-input"
import { PipelineLogs } from "@/components/dashboard/pipeline-logs"
import { ExtractedSkills } from "@/components/dashboard/extracted-skills"
import { TopCandidateCard } from "@/components/dashboard/top-candidate-card"
import { CandidateCard } from "@/components/dashboard/candidate-card"
import { ChatModal } from "@/components/dashboard/chat-modal"
import { RankingTable } from "@/components/dashboard/ranking-table"
import { AnalyticsView } from "@/components/dashboard/analytics-view"
import { mockCandidates, mockChatMessages, extractedSkills, type Candidate } from "@/lib/mock-data"
import { Sparkles, Users } from "lucide-react"

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [isRunningPipeline, setIsRunningPipeline] = useState(false)
  const [pipelineComplete, setPipelineComplete] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleRunAgent = useCallback(() => {
    setIsRunningPipeline(true)
    setPipelineComplete(false)
    setCandidates([])
  }, [])

  const handlePipelineComplete = useCallback(() => {
    setIsRunningPipeline(false)
    setPipelineComplete(true)
    setCandidates(mockCandidates)
  }, [])

  const handleEngage = useCallback((candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setIsChatOpen(true)
  }, [])

  const handleCloseChat = useCallback(() => {
    setIsChatOpen(false)
    setSelectedCandidate(null)
  }, [])

  const topCandidate = candidates.length > 0 
    ? [...candidates].sort((a, b) => b.finalScore - a.finalScore)[0] 
    : null

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
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* 2-Column Layout */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-6">
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

                  {/* Pipeline Logs */}
                  {(isRunningPipeline || pipelineComplete) && (
                    <PipelineLogs 
                      isRunning={isRunningPipeline} 
                      onComplete={handlePipelineComplete} 
                    />
                  )}
                </div>

                {/* Right Column - Top Candidate */}
                <div>
                  {topCandidate ? (
                    <TopCandidateCard candidate={topCandidate} />
                  ) : (
                    <div className="rounded-xl border-2 border-dashed border-muted-foreground/25 p-12 text-center bg-card/50 h-full flex flex-col items-center justify-center min-h-[400px]">
                      <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <Users className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Top Candidate Preview</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto text-balance">
                        Run the talent scouting agent to see your best-matched candidate here with detailed scoring breakdown.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* All Candidates Table */}
              {candidates.length > 0 && (
                <RankingTable candidates={candidates} />
              )}
            </div>
          )}

          {activeTab === "candidates" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground">All Candidates</h2>
                <p className="text-muted-foreground">Browse and manage your entire candidate pool</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {mockCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    onEngage={handleEngage}
                  />
                ))}
              </div>
              <RankingTable candidates={mockCandidates} />
            </div>
          )}

          {activeTab === "analytics" && <AnalyticsView />}
        </main>
      </div>

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
