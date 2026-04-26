"use client"

import { useEffect, useState, useRef } from "react"
import { pipelineSteps } from "@/lib/mock-data"
import { CheckCircle2, Loader2, Terminal, Clock } from "lucide-react"

interface PipelineLogsProps {
  isRunning: boolean
  onComplete: () => void
}

interface StepWithTimestamp {
  id: number
  text: string
  timestamp: string
  duration: number
}

export function PipelineLogs({ isRunning, onComplete }: PipelineLogsProps) {
  const [completedSteps, setCompletedSteps] = useState<StepWithTimestamp[]>([])
  const [currentStep, setCurrentStep] = useState<number | null>(null)
  const startTimeRef = useRef<number>(0)

  const formatTimestamp = (elapsed: number) => {
    const seconds = (elapsed / 1000).toFixed(1)
    return `+${seconds}s`
  }

  useEffect(() => {
    if (!isRunning) {
      return
    }

    let stepIndex = 0
    startTimeRef.current = Date.now()
    setCompletedSteps([])
    setCurrentStep(pipelineSteps[0].id)

    const runStep = () => {
      if (stepIndex >= pipelineSteps.length) {
        setCurrentStep(null)
        onComplete()
        return
      }

      const step = pipelineSteps[stepIndex]
      setCurrentStep(step.id)

      setTimeout(() => {
        const timestamp = formatTimestamp(Date.now() - startTimeRef.current)
        setCompletedSteps(prev => [...prev, { ...step, timestamp }])
        stepIndex++
        if (stepIndex < pipelineSteps.length) {
          setCurrentStep(pipelineSteps[stepIndex].id)
        }
        runStep()
      }, step.duration)
    }

    runStep()
  }, [isRunning, onComplete])

  const getCompletedStep = (id: number) => completedSteps.find(s => s.id === id)

  return (
    <div className="rounded-lg bg-slate-900 p-4 font-mono text-sm">
      <div className="flex items-center justify-between mb-3 text-slate-400 border-b border-slate-700 pb-2">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span>Agent Pipeline</span>
        </div>
        {completedSteps.length === pipelineSteps.length && (
          <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Complete
          </div>
        )}
      </div>
      <div className="space-y-2">
        {pipelineSteps.map((step) => {
          const completed = getCompletedStep(step.id)
          const isCurrent = currentStep === step.id && !completed

          return (
            <div
              key={step.id}
              className={`flex items-center gap-2 transition-all duration-200 ${
                !completed && !isCurrent ? "opacity-40" : "opacity-100"
              }`}
            >
              {/* Status Icon */}
              {completed ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="h-4 w-4 text-blue-400 animate-spin shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-slate-600 shrink-0" />
              )}

              {/* Step Text */}
              <span
                className={`flex-1 ${
                  completed
                    ? "text-emerald-400"
                    : isCurrent
                    ? "text-blue-400"
                    : "text-slate-500"
                }`}
              >
                {step.text}
              </span>

              {/* Timestamp */}
              {completed && (
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {completed.timestamp}
                </span>
              )}
              {isCurrent && (
                <span className="text-xs text-blue-400 animate-pulse">processing...</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
