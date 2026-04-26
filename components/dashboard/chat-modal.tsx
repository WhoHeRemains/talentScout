"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import type { Candidate, ChatMessage } from "@/lib/mock-data"

interface ChatModalProps {
  candidate: Candidate | null
  isOpen: boolean
  onClose: () => void
  messages: ChatMessage[]
}

function getSentimentBadge(sentiment: ChatMessage["sentiment"]) {
  switch (sentiment) {
    case "interested":
      return <Badge className="bg-success text-success-foreground">Interested</Badge>
    case "neutral":
      return <Badge className="bg-warning text-warning-foreground">Neutral</Badge>
    case "not_interested":
      return <Badge variant="destructive">Not Interested</Badge>
    default:
      return null
  }
}

export function ChatModal({ candidate, isOpen, onClose, messages }: ChatModalProps) {
  if (!candidate) return null

  const overallSentiment = messages.filter(m => m.sender === "candidate").pop()?.sentiment || "neutral"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] flex flex-col">
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-semibold text-primary">
                  {candidate.name.split(" ").map(n => n[0]).join("")}
                </span>
              </div>
              <div>
                <DialogTitle className="text-base">{candidate.name}</DialogTitle>
                <p className="text-sm text-muted-foreground">{candidate.location}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Detected Sentiment</p>
              {getSentimentBadge(overallSentiment)}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 max-h-[400px]">
          <div className="space-y-4 py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender === "recruiter" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-2.5",
                    message.sender === "recruiter"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <div className={cn(
                    "flex items-center gap-2 mt-1",
                    message.sender === "recruiter" ? "justify-end" : "justify-start"
                  )}>
                    <span className={cn(
                      "text-xs",
                      message.sender === "recruiter" 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground"
                    )}>
                      {message.timestamp}
                    </span>
                    {message.sender === "candidate" && message.sentiment && (
                      <span className="text-xs">
                        {getSentimentBadge(message.sentiment)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="border-t pt-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button className="rounded-full bg-primary p-2 text-primary-foreground hover:bg-primary/90 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
