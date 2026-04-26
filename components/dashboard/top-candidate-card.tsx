"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { type Candidate } from "@/lib/mock-data"
import { Award, Briefcase, CheckCircle2, Lightbulb, MapPin, MessageSquareQuote, User, XCircle } from "lucide-react"

interface TopCandidateCardProps {
  candidate: Candidate
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500"
    if (score >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{score}%</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getScoreColor(score)}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

export function TopCandidateCard({ candidate }: TopCandidateCardProps) {
  const getFinalScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500 text-white"
    if (score >= 60) return "bg-amber-500 text-white"
    return "bg-red-500 text-white"
  }

  const getInterestBadgeVariant = (level: string) => {
    if (level === "High") return "bg-emerald-100 text-emerald-700 border-emerald-200"
    if (level === "Medium") return "bg-amber-100 text-amber-700 border-amber-200"
    return "bg-red-100 text-red-700 border-red-200"
  }

  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-primary/5">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-7 w-7 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{candidate.name}</h3>
                <Award className="h-5 w-5 text-amber-500" />
              </div>
              <p className="text-sm text-muted-foreground">{candidate.role}</p>
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5" />
                  {candidate.experience} years
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {candidate.location}
                </span>
              </div>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-lg text-xl font-bold ${getFinalScoreBadgeColor(candidate.finalScore)}`}>
            {candidate.finalScore}%
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Matched Skills */}
        <div>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            Matched Skills
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {candidate.matchedSkills.map((skill) => (
              <Badge key={skill} className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        {candidate.missingSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-red-500" />
              Missing Skills
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {candidate.missingSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="bg-red-50 text-red-600 border-red-200">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Why This Candidate */}
        <div className="rounded-lg bg-muted/50 p-3">
          <h4 className="text-sm font-medium mb-1.5 flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            Why this candidate was selected
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{candidate.whyThisCandidate}</p>
        </div>

        {/* Interest Assessment */}
        <div className="rounded-lg bg-muted/50 p-3">
          <h4 className="text-sm font-medium mb-1.5">Interest Assessment</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">{candidate.interestAssessment}</p>
        </div>

        {/* Chat Simulation */}
        <div className="rounded-lg border p-3 space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-1.5">
            <MessageSquareQuote className="h-4 w-4 text-primary" />
            Chat Simulation
          </h4>
          <div className="space-y-2">
            <div className="bg-primary/10 rounded-lg p-2.5 text-sm">
              <span className="font-medium text-primary">Recruiter:</span>
              <p className="text-muted-foreground mt-0.5">{candidate.chatSimulation.recruiterMessage}</p>
            </div>
            <div className="bg-muted rounded-lg p-2.5 text-sm">
              <span className="font-medium">Candidate:</span>
              <p className="text-muted-foreground mt-0.5 italic">&quot;{candidate.chatSimulation.candidateReply}&quot;</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Badge className={getInterestBadgeVariant(candidate.chatSimulation.interestLevel)}>
              {candidate.chatSimulation.interestLevel} Interest
            </Badge>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3 pt-2 border-t">
          <h4 className="text-sm font-medium">Score Breakdown</h4>
          <ScoreBar label="Skill Match" score={candidate.skillMatchScore} />
          <ScoreBar label="Experience Match" score={candidate.experienceMatchScore} />
          <ScoreBar label="Location Match" score={candidate.locationMatchScore} />
          <div className="pt-2 border-t">
            <ScoreBar label="Match Score" score={candidate.matchScore} />
            <div className="mt-2">
              <ScoreBar label="Interest Score" score={candidate.interestScore} />
            </div>
            <div className="mt-2">
              <ScoreBar label="Final Score" score={candidate.finalScore} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
