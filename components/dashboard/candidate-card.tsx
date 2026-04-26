"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Briefcase, MessageCircle, Lightbulb } from "lucide-react"
import type { Candidate } from "@/lib/mock-data"

interface CandidateCardProps {
  candidate: Candidate
  onEngage: (candidate: Candidate) => void
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-success"
  if (score >= 60) return "text-warning"
  return "text-destructive"
}

function getProgressColor(score: number) {
  if (score >= 80) return "[&>div]:bg-success"
  if (score >= 60) return "[&>div]:bg-warning"
  return "[&>div]:bg-destructive"
}

export function CandidateCard({ candidate, onEngage }: CandidateCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {candidate.name.split(" ").map(n => n[0]).join("")}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{candidate.name}</h3>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mt-0.5">
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
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">Final Score</p>
            <span className={`text-2xl font-bold ${getScoreColor(candidate.finalScore)}`}>
              {candidate.finalScore}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Skills */}
        <div className="flex flex-wrap gap-1.5">
          {candidate.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>

        {/* Scores */}
        <div className="space-y-3">
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Match Score</span>
              <span className={`font-medium ${getScoreColor(candidate.matchScore)}`}>
                {candidate.matchScore}%
              </span>
            </div>
            <Progress 
              value={candidate.matchScore} 
              className={`h-2 ${getProgressColor(candidate.matchScore)}`}
            />
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Interest Score</span>
              <span className={`font-medium ${getScoreColor(candidate.interestScore)}`}>
                {candidate.interestScore}%
              </span>
            </div>
            <Progress 
              value={candidate.interestScore} 
              className={`h-2 ${getProgressColor(candidate.interestScore)}`}
            />
          </div>
        </div>

        {/* Why this candidate */}
        <div className="rounded-lg bg-muted/50 p-3">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground">
              {candidate.whyThisCandidate}
            </p>
          </div>
        </div>

        {/* Engage Button */}
        <Button 
          onClick={() => onEngage(candidate)} 
          className="w-full gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Engage Candidate
        </Button>
      </CardContent>
    </Card>
  )
}
