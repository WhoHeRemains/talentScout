"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Trophy } from "lucide-react"
import type { Candidate } from "@/lib/mock-data"

interface RankingTableProps {
  candidates: Candidate[]
}

function getScoreColor(score: number) {
  if (score >= 80) return "text-success font-semibold"
  if (score >= 60) return "text-warning font-semibold"
  return "text-destructive font-semibold"
}

function getRankBadge(rank: number) {
  if (rank === 1) return "🥇"
  if (rank === 2) return "🥈"
  if (rank === 3) return "🥉"
  return `#${rank}`
}

export function RankingTable({ candidates }: RankingTableProps) {
  const sortedCandidates = [...candidates].sort((a, b) => b.finalScore - a.finalScore)

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <CardTitle>Candidate Rankings</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="text-center">Match Score</TableHead>
              <TableHead className="text-center">Interest Score</TableHead>
              <TableHead className="text-center">Final Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCandidates.map((candidate, index) => (
              <TableRow key={candidate.id}>
                <TableCell className="font-medium text-lg">
                  {getRankBadge(index + 1)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-primary">
                        {candidate.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                    <span className="font-medium">{candidate.name}</span>
                  </div>
                </TableCell>
                <TableCell className={`text-center ${getScoreColor(candidate.matchScore)}`}>
                  {candidate.matchScore}%
                </TableCell>
                <TableCell className={`text-center ${getScoreColor(candidate.interestScore)}`}>
                  {candidate.interestScore}%
                </TableCell>
                <TableCell className={`text-center ${getScoreColor(candidate.finalScore)}`}>
                  {candidate.finalScore}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
