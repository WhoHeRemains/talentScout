"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { type Candidate } from "@/lib/mock-data"
import { Users, Target, TrendingUp, Star } from "lucide-react"

interface AnalyticsPanelProps {
  candidates: Candidate[]
}

export function AnalyticsPanel({ candidates }: AnalyticsPanelProps) {
  const totalCandidates = candidates.length
  const avgMatchScore = Math.round(
    candidates.reduce((sum, c) => sum + c.matchScore, 0) / totalCandidates
  )
  const avgInterestScore = Math.round(
    candidates.reduce((sum, c) => sum + c.interestScore, 0) / totalCandidates
  )
  const highlyRecommended = candidates.filter(c => c.recommendation === "Highly Recommended").length
  const highlyRecommendedPercent = Math.round((highlyRecommended / totalCandidates) * 100)

  const stats = [
    {
      label: "Total Candidates",
      value: totalCandidates,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Avg Match Score",
      value: `${avgMatchScore}%`,
      icon: Target,
      color: "text-emerald-600",
      bgColor: "bg-emerald-500/10",
      progress: avgMatchScore,
      progressColor: "bg-emerald-500",
    },
    {
      label: "Avg Interest Score",
      value: `${avgInterestScore}%`,
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
      progress: avgInterestScore,
      progressColor: "bg-blue-500",
    },
    {
      label: "Highly Recommended",
      value: `${highlyRecommendedPercent}%`,
      subValue: `${highlyRecommended} of ${totalCandidates}`,
      icon: Star,
      color: "text-amber-600",
      bgColor: "bg-amber-500/10",
      progress: highlyRecommendedPercent,
      progressColor: "bg-amber-500",
    },
  ]

  return (
    <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground truncate">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                {stat.subValue && (
                  <p className="text-xs text-muted-foreground">{stat.subValue}</p>
                )}
              </div>
            </div>
            {stat.progress !== undefined && (
              <div className="mt-3">
                <Progress 
                  value={stat.progress} 
                  className="h-1.5 bg-muted"
                />
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
