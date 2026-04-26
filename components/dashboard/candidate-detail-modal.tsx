"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { type Candidate } from "@/lib/mock-data"
import { 
  MapPin, Briefcase, MessageCircle, CheckCircle2, XCircle, 
  Target, TrendingUp, Star, User
} from "lucide-react"

interface CandidateDetailModalProps {
  candidate: Candidate | null
  isOpen: boolean
  onClose: () => void
  onEngage: (candidate: Candidate) => void
}

export function CandidateDetailModal({ 
  candidate, 
  isOpen, 
  onClose, 
  onEngage 
}: CandidateDetailModalProps) {
  if (!candidate) return null

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-600"
    if (score >= 60) return "text-amber-600"
    return "text-red-600"
  }

  const getProgressColor = (score: number) => {
    if (score >= 80) return "[&>div]:bg-emerald-500"
    if (score >= 60) return "[&>div]:bg-amber-500"
    return "[&>div]:bg-red-500"
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "Highly Recommended": return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Recommended": return "bg-blue-100 text-blue-700 border-blue-200"
      case "Maybe": return "bg-amber-100 text-amber-700 border-amber-200"
      default: return "bg-red-100 text-red-700 border-red-200"
    }
  }

  const getInterestColor = (level: string) => {
    switch (level) {
      case "High": return "bg-emerald-100 text-emerald-700"
      case "Medium": return "bg-amber-100 text-amber-700"
      default: return "bg-red-100 text-red-700"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-xl">{candidate.name}</DialogTitle>
              <DialogDescription className="mt-1">
                {candidate.role}
              </DialogDescription>
            </div>
            <Badge className={getRecommendationColor(candidate.recommendation)}>
              {candidate.recommendation}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {candidate.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="h-4 w-4" />
              {candidate.experience} years experience
            </span>
          </div>

          {/* Final Score */}
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">Final Score</span>
              <span className={`text-2xl font-bold ${getScoreColor(candidate.finalScore)}`}>
                {candidate.finalScore}%
              </span>
            </div>
            <Progress 
              value={candidate.finalScore} 
              className={`h-3 ${getProgressColor(candidate.finalScore)}`} 
            />
          </div>

          {/* Score Breakdown */}
          <div>
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              Score Breakdown
            </h4>
            <div className="grid gap-3">
              {[
                { label: "Skill Match", score: candidate.skillMatchScore, icon: CheckCircle2 },
                { label: "Experience Match", score: candidate.experienceMatchScore, icon: Briefcase },
                { label: "Location Match", score: candidate.locationMatchScore, icon: MapPin },
                { label: "Match Score", score: candidate.matchScore, icon: Target },
                { label: "Interest Score", score: candidate.interestScore, icon: TrendingUp },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <item.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-sm w-32">{item.label}</span>
                  <div className="flex-1">
                    <Progress 
                      value={item.score} 
                      className={`h-2 ${getProgressColor(item.score)}`} 
                    />
                  </div>
                  <span className={`text-sm font-medium w-12 text-right ${getScoreColor(item.score)}`}>
                    {item.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Skills */}
          <div>
            <h4 className="font-medium mb-3">Skills Assessment</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Matched Skills ({candidate.matchedSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.matchedSkills.map((skill) => (
                    <Badge key={skill} className="bg-emerald-100 text-emerald-700 border-emerald-200">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.matchedSkills.length === 0 && (
                    <span className="text-sm text-muted-foreground">No matched skills</span>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1.5">
                  <XCircle className="h-4 w-4 text-red-500" />
                  Missing Skills ({candidate.missingSkills.length})
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {candidate.missingSkills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-red-600 border-red-200">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.missingSkills.length === 0 && (
                    <span className="text-sm text-muted-foreground">No missing skills</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Why This Candidate */}
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" />
              Why This Candidate
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {candidate.whyThisCandidate}
            </p>
          </div>

          {/* Interest Assessment */}
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Interest Assessment
              <Badge className={getInterestColor(candidate.chatSimulation.interestLevel)}>
                {candidate.chatSimulation.interestLevel} Interest
              </Badge>
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {candidate.interestAssessment}
            </p>
          </div>

          {/* Chat Preview */}
          <div className="rounded-lg border p-4 bg-muted/30">
            <h4 className="font-medium mb-3 flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat Simulation Preview
            </h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-primary/10 rounded-lg rounded-tl-none px-3 py-2 text-sm max-w-[85%]">
                  {candidate.chatSimulation.recruiterMessage}
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <div className="bg-muted rounded-lg rounded-tr-none px-3 py-2 text-sm max-w-[85%]">
                  {candidate.chatSimulation.candidateReply}
                </div>
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button className="flex-1 gap-2" onClick={() => onEngage(candidate)}>
              <MessageCircle className="h-4 w-4" />
              Start Conversation
            </Button>
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
