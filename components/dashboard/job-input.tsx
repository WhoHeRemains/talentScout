"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { Sparkles, FileText } from "lucide-react"

interface JobInputProps {
  jobDescription: string
  onJobDescriptionChange: (value: string) => void
  onAnalyze: () => void
  isAnalyzing: boolean
}

export function JobInput({ 
  jobDescription, 
  onJobDescriptionChange, 
  onAnalyze,
  isAnalyzing 
}: JobInputProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <CardTitle>Job Description</CardTitle>
        </div>
        <CardDescription>
          Paste the job description to find matching candidates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Paste the full job description here...

Example:
We are looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern web technologies. The ideal candidate should have experience with Next.js, state management solutions, and a strong understanding of UI/UX principles..."
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          className="min-h-[200px] resize-none"
        />
        <Button 
          onClick={onAnalyze} 
          disabled={!jobDescription.trim() || isAnalyzing}
          className="w-full sm:w-auto"
        >
          {isAnalyzing ? (
            <Spinner className="mr-2 h-4 w-4" />
          ) : (
            <Sparkles className="mr-2 h-4 w-4" />
          )}
          {isAnalyzing ? "Analyzing..." : "Analyze JD"}
        </Button>
      </CardContent>
    </Card>
  )
}
