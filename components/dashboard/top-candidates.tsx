"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { type Candidate } from "@/lib/mock-data"
import { Trophy, Medal, MapPin, Briefcase, MessageCircle, Star, TrendingUp } from "lucide-react"

interface TopCandidatesProps {
  candidates: Candidate[]
  onEngage: (candidate: Candidate) => void
  onViewDetails: (candidate: Candidate) => void
}

export function TopCandidates({ candidates, onEngage, onViewDetails }: TopCandidatesProps) {
  const topThree = [...candidates]
    .sort((a, b) => b.finalScore - a.finalScore)
    .slice(0, 3)

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-amber-500" />
    if (index === 1) return <Medal className="h-5 w-5 text-slate-400" />
    return <Medal className="h-5 w-5 text-amber-700" />
  }

  const getRankBadge = (candidate: Candidate, index: number) => {
    if (index === 0) {
      return (
        <Badge className="bg-amber-100 text-amber-700 border-amber-200">
          <Star className="mr-1 h-3 w-3" />
          Top Match
        </Badge>
      )
    }
    if (candidate.interestScore >= 80) {
      return (
        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-200">
          <TrendingUp className="mr-1 h-3 w-3" />
          High Interest
        </Badge>
      )
    }
    return null
  }

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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Trophy className="h-5 w-5 text-amber-500" />
        <h3 className="text-lg font-semibold">Top Candidates</h3>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {topThree.map((candidate, index) => (
          <Card
            key={candidate.id}
            className={`relative overflow-hidden transition-all hover:shadow-lg cursor-pointer ${
              index === 0 ? "ring-2 ring-amber-200 bg-amber-50/30" : ""
            }`}
            onClick={() => onViewDetails(candidate)}
          >
            <CardContent className="p-4">
              {/* Rank Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                {getRankIcon(index)}
              </div>

              {/* Header */}
              <div className="mb-3">
                <h4 className="font-semibold text-foreground pr-8">{candidate.name}</h4>
                <p className="text-sm text-muted-foreground">{candidate.role}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {candidate.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {candidate.experience}y exp
                  </span>
                </div>
              </div>

              {/* Badge */}
              <div className="mb-3">
                {getRankBadge(candidate, index)}
              </div>

              {/* Final Score */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Final Score</span>
                  <span className={`text-lg font-bold ${getScoreColor(candidate.finalScore)}`}>
                    {candidate.finalScore}%
                  </span>
                </div>
                <Progress
                  value={candidate.finalScore}
                  className={`h-2 ${getProgressColor(candidate.finalScore)}`}
                />
              </div>

              {/* Skills */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {candidate.matchedSkills.slice(0, 3).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                      {skill}
                    </Badge>
                  ))}
                  {candidate.matchedSkills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{candidate.matchedSkills.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Action */}
              <Button
                size="sm"
                className="w-full gap-2"
                onClick={(e) => {
                  e.stopPropagation()
                  onEngage(candidate)
                }}
              >
                <MessageCircle className="h-4 w-4" />
                Engage
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
