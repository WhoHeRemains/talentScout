"use client"

import { useState, useCallback } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { JobInput } from "@/components/dashboard/job-input"
import { CandidateCard } from "@/components/dashboard/candidate-card"
import { ChatModal } from "@/components/dashboard/chat-modal"
import { RankingTable } from "@/components/dashboard/ranking-table"
import { AnalyticsView } from "@/components/dashboard/analytics-view"
import { mockCandidates, mockChatMessages, type Candidate } from "@/lib/mock-data"
import { Sparkles, Users } from "lucide-react"

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [jobDescription, setJobDescription] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setCandidates(mockCandidates)
      setIsAnalyzing(false)
    }, 1500)
  }, [])

  const handleEngage = useCallback((candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setIsChatOpen(true)
  }, [])

  const handleCloseChat = useCallback(() => {
    setIsChatOpen(false)
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
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-success/10 px-3 py-1.5">
              <Sparkles className="h-4 w-4 text-success" />
              <span className="text-sm font-medium text-success">AI Active</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Job Input */}
              <JobInput
                jobDescription={jobDescription}
                onJobDescriptionChange={setJobDescription}
                onAnalyze={handleAnalyze}
                isAnalyzing={isAnalyzing}
              />

              {/* Candidates Section */}
              {candidates.length > 0 && (
                <>
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="h-5 w-5 text-primary" />
                      <h2 className="text-xl font-semibold">Matched Candidates</h2>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                        {candidates.length}
                      </span>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {candidates.map((candidate) => (
                        <CandidateCard
                          key={candidate.id}
                          candidate={candidate}
                          onEngage={handleEngage}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Ranking Table */}
                  <RankingTable candidates={candidates} />
                </>
              )}

              {/* Empty State */}
              {candidates.length === 0 && !isAnalyzing && (
                <div className="rounded-xl border-2 border-dashed border-muted-foreground/20 p-12 text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No candidates yet</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto">
                    Paste a job description above and click &quot;Analyze JD&quot; to find matching candidates powered by AI.
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
