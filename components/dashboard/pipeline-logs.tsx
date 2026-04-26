"use client"

import { useEffect, useState } from "react"
import { pipelineSteps } from "@/lib/mock-data"
import { CheckCircle2, Loader2, Terminal } from "lucide-react"

interface PipelineLogsProps {
  isRunning: boolean
  onComplete: () => void
}

export function PipelineLogs({ isRunning, onComplete }: PipelineLogsProps) {
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState<number | null>(null)

  useEffect(() => {
    if (!isRunning) {
      setCompletedSteps([])
      setCurrentStep(null)
      return
    }

    let stepIndex = 0
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
        setCompletedSteps(prev => [...prev, step.id])
        stepIndex++
        if (stepIndex < pipelineSteps.length) {
          setCurrentStep(pipelineSteps[stepIndex].id)
        }
        runStep()
      }, step.duration)
    }

    runStep()
  }, [isRunning, onComplete])

  return (
    <div className="rounded-lg bg-slate-900 p-4 font-mono text-sm">
      <div className="flex items-center gap-2 mb-3 text-slate-400 border-b border-slate-700 pb-2">
        <Terminal className="h-4 w-4" />
        <span>Agent Pipeline</span>
      </div>
      <div className="space-y-1.5">
        {pipelineSteps.map((step) => {
          const isCompleted = completedSteps.includes(step.id)
          const isCurrent = currentStep === step.id && !isCompleted

          return (
            <div
              key={step.id}
              className={`flex items-center gap-2 transition-opacity duration-200 ${
                !isCompleted && !isCurrent ? "opacity-40" : "opacity-100"
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="h-4 w-4 text-blue-400 animate-spin shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-full border border-slate-600 shrink-0" />
              )}
              <span
                className={
                  isCompleted
                    ? "text-emerald-400"
                    : isCurrent
                    ? "text-blue-400"
                    : "text-slate-500"
                }
              >
                {step.text}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
