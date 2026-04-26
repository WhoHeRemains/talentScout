"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { type Candidate } from "@/lib/mock-data"
import { Trophy, Medal, Users, ChevronRight } from "lucide-react"

interface CandidateTableProps {
  candidates: Candidate[]
  isLoading?: boolean
  onViewDetails: (candidate: Candidate) => void
}

const ITEMS_PER_PAGE = 8

export function CandidateTable({ candidates, isLoading, onViewDetails }: CandidateTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(candidates.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedCandidates = candidates.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return <Trophy className="h-5 w-5 text-amber-500" />
    if (rank === 2) return <Medal className="h-5 w-5 text-slate-400" />
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />
    return <span className="text-muted-foreground font-medium text-sm">#{rank}</span>
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return "bg-emerald-100 text-emerald-700 border-emerald-200"
    if (score >= 60) return "bg-amber-100 text-amber-700 border-amber-200"
    return "bg-red-100 text-red-700 border-red-200"
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case "Highly Recommended": return "bg-emerald-100 text-emerald-700"
      case "Recommended": return "bg-blue-100 text-blue-700"
      case "Maybe": return "bg-amber-100 text-amber-700"
      default: return "bg-red-100 text-red-700"
    }
  }

  const getRowHighlight = (rank: number) => {
    if (rank === 1) return "bg-amber-50/50"
    if (rank === 2) return "bg-slate-50/50"
    if (rank === 3) return "bg-orange-50/30"
    return ""
  }

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = []
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push("ellipsis")
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push("ellipsis")
      pages.push(totalPages)
    }
    return pages
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            All Candidates
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            All Candidates
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            {candidates.length} candidates
          </span>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="rounded-lg border mx-6 mb-4 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
                <TableRow>
                  <TableHead className="w-14">Rank</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="hidden lg:table-cell">Skills</TableHead>
                  <TableHead className="text-center w-20">Match</TableHead>
                  <TableHead className="text-center w-20">Interest</TableHead>
                  <TableHead className="text-center w-20">Final</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCandidates.map((candidate, index) => {
                  const rank = startIndex + index + 1
                  return (
                    <TableRow
                      key={candidate.id}
                      className={`${getRowHighlight(rank)} cursor-pointer transition-colors hover:bg-muted/50`}
                      onClick={() => onViewDetails(candidate)}
                    >
                      <TableCell>
                        <div className="flex items-center justify-center">
                          {getRankDisplay(rank)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{candidate.name}</p>
                          <p className="text-xs text-muted-foreground">{candidate.role}</p>
                          <p className="text-xs text-muted-foreground md:hidden">{candidate.location}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                        {candidate.location}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1 max-w-[200px]">
                          {candidate.matchedSkills.slice(0, 2).map((skill) => (
                            <Badge key={skill} variant="secondary" className="text-xs bg-emerald-100 text-emerald-700">
                              {skill}
                            </Badge>
                          ))}
                          {candidate.matchedSkills.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{candidate.matchedSkills.length - 2}
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
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline" className={getRecommendationColor(candidate.recommendation)}>
                          {candidate.recommendation}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 pb-4">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, candidates.length)} of {candidates.length}
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {getPageNumbers().map((page, i) =>
                  page === "ellipsis" ? (
                    <PaginationItem key={`ellipsis-${i}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
