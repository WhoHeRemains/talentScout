"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { type Candidate } from "@/lib/mock-data"
import { Trophy, Medal } from "lucide-react"

interface RankingTableProps {
  candidates: Candidate[]
}

export function RankingTable({ candidates }: RankingTableProps) {
  const sortedCandidates = [...candidates].sort((a, b) => b.finalScore - a.finalScore)

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />
    return <span className="text-muted-foreground font-medium">#{rank}</span>
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-700"
    if (score >= 60) return "bg-amber-100 text-amber-700"
    return "bg-red-100 text-red-700"
  }

  const getRowHighlight = (rank: number) => {
    if (rank === 1) return "bg-amber-50/50"
    if (rank === 2) return "bg-slate-50/50"
    if (rank === 3) return "bg-orange-50/30"
    return ""
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Candidate Rankings
        </CardTitle>
        <CardDescription>All candidates sorted by final score</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Role</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead className="hidden lg:table-cell">Skills</TableHead>
                <TableHead className="text-center">Match</TableHead>
                <TableHead className="text-center">Interest</TableHead>
                <TableHead className="text-center">Final</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCandidates.map((candidate, index) => {
                const rank = index + 1
                return (
                  <TableRow key={candidate.id} className={getRowHighlight(rank)}>
                    <TableCell className="font-medium">
                      <div className="flex items-center justify-center">
                        {getRankDisplay(rank)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{candidate.name}</p>
                        <p className="text-xs text-muted-foreground sm:hidden">{candidate.role}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {candidate.role}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {candidate.location}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {candidate.skills.slice(0, 3).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{candidate.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={getScoreBadgeColor(candidate.matchScore)}>
                        {candidate.matchScore}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={getScoreBadgeColor(candidate.interestScore)}>
                        {candidate.interestScore}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`${getScoreBadgeColor(candidate.finalScore)} font-semibold`}>
                        {candidate.finalScore}%
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
