"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tags } from "lucide-react"

interface ExtractedSkillsProps {
  skills: string[]
  isVisible: boolean
}

export function ExtractedSkills({ skills, isVisible }: ExtractedSkillsProps) {
  if (!isVisible) return null

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Tags className="h-4 w-4 text-primary" />
          Extracted Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
