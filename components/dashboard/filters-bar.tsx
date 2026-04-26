"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Search, SlidersHorizontal, X } from "lucide-react"

export interface FilterState {
  search: string
  experienceRange: [number, number]
  locations: string[]
  skills: string[]
  recommendations: string[]
  sortBy: "finalScore" | "matchScore" | "interestScore" | "experience"
}

interface FiltersBarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  availableLocations: string[]
  availableSkills: string[]
}

export function FiltersBar({
  filters,
  onFiltersChange,
  availableLocations,
  availableSkills,
}: FiltersBarProps) {
  const [skillsOpen, setSkillsOpen] = useState(false)
  const [locationsOpen, setLocationsOpen] = useState(false)

  const activeFilterCount = 
    (filters.locations.length > 0 ? 1 : 0) +
    (filters.skills.length > 0 ? 1 : 0) +
    (filters.recommendations.length > 0 ? 1 : 0) +
    (filters.experienceRange[0] > 0 || filters.experienceRange[1] < 15 ? 1 : 0)

  const clearFilters = () => {
    onFiltersChange({
      ...filters,
      search: "",
      experienceRange: [0, 15],
      locations: [],
      skills: [],
      recommendations: [],
    })
  }

  const toggleArrayItem = (array: string[], item: string): string[] => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item]
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by name, role, or skill..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-9"
          />
        </div>

        {/* Sort */}
        <Select
          value={filters.sortBy}
          onValueChange={(value) => onFiltersChange({ ...filters, sortBy: value as FilterState["sortBy"] })}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="finalScore">Final Score</SelectItem>
            <SelectItem value="matchScore">Match Score</SelectItem>
            <SelectItem value="interestScore">Interest Score</SelectItem>
            <SelectItem value="experience">Experience</SelectItem>
          </SelectContent>
        </Select>

        {/* Skills Filter */}
        <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Skills
              {filters.skills.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                  {filters.skills.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-3" align="end">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableSkills.slice(0, 15).map((skill) => (
                <label
                  key={skill}
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded"
                >
                  <Checkbox
                    checked={filters.skills.includes(skill)}
                    onCheckedChange={() =>
                      onFiltersChange({
                        ...filters,
                        skills: toggleArrayItem(filters.skills, skill),
                      })
                    }
                  />
                  <span className="text-sm">{skill}</span>
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Location Filter */}
        <Popover open={locationsOpen} onOpenChange={setLocationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto">
              Location
              {filters.locations.length > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 px-1.5">
                  {filters.locations.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-56 p-3" align="end">
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {availableLocations.map((location) => (
                <label
                  key={location}
                  className="flex items-center gap-2 cursor-pointer hover:bg-muted/50 p-1 rounded"
                >
                  <Checkbox
                    checked={filters.locations.includes(location)}
                    onCheckedChange={() =>
                      onFiltersChange({
                        ...filters,
                        locations: toggleArrayItem(filters.locations, location),
                      })
                    }
                  />
                  <span className="text-sm">{location}</span>
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {/* Recommendation Filter */}
        <Select
          value={filters.recommendations.length === 1 ? filters.recommendations[0] : "all"}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              recommendations: value === "all" ? [] : [value],
            })
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Recommendation" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Recommendations</SelectItem>
            <SelectItem value="Highly Recommended">Highly Recommended</SelectItem>
            <SelectItem value="Recommended">Recommended</SelectItem>
            <SelectItem value="Maybe">Maybe</SelectItem>
            <SelectItem value="Not Recommended">Not Recommended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Experience Range */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Experience:</span>
          <Slider
            value={filters.experienceRange}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, experienceRange: value as [number, number] })
            }
            min={0}
            max={15}
            step={1}
            className="flex-1"
          />
          <span className="text-sm font-medium whitespace-nowrap">
            {filters.experienceRange[0]}-{filters.experienceRange[1]} yrs
          </span>
        </div>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
            <X className="mr-1 h-4 w-4" />
            Clear filters ({activeFilterCount})
          </Button>
        )}
      </div>
    </div>
  )
}
