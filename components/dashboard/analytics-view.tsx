"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Users, UserCheck, TrendingUp, MessageSquare, Target, Clock } from "lucide-react"

const stats = [
  {
    label: "Total Candidates",
    value: "1,284",
    change: "+12%",
    icon: Users,
  },
  {
    label: "Engaged This Week",
    value: "156",
    change: "+8%",
    icon: MessageSquare,
  },
  {
    label: "Response Rate",
    value: "68%",
    change: "+5%",
    icon: TrendingUp,
  },
  {
    label: "Avg. Match Score",
    value: "76%",
    change: "+3%",
    icon: Target,
  },
]

const pipelineStages = [
  { stage: "Sourced", count: 1284, percentage: 100 },
  { stage: "Contacted", count: 856, percentage: 67 },
  { stage: "Responded", count: 582, percentage: 45 },
  { stage: "Interested", count: 312, percentage: 24 },
  { stage: "Interview", count: 98, percentage: 8 },
  { stage: "Offer", count: 24, percentage: 2 },
]

const recentActivity = [
  { action: "Sarah Chen responded with interest", time: "2 min ago", type: "positive" },
  { action: "New candidate matched: David Kim (75%)", time: "15 min ago", type: "neutral" },
  { action: "Michael Rodriguez scheduled interview", time: "1 hour ago", type: "positive" },
  { action: "Emily Johnson viewed job description", time: "2 hours ago", type: "neutral" },
  { action: "Alex Thompson completed assessment", time: "3 hours ago", type: "positive" },
]

export function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Analytics</h2>
        <p className="text-muted-foreground">Track your recruiting performance and pipeline metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    <p className="text-sm text-success mt-1">{stat.change} from last week</p>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pipeline */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              <CardTitle>Recruitment Pipeline</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {pipelineStages.map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stage.stage}</span>
                  <span className="text-muted-foreground">{stage.count} candidates</span>
                </div>
                <Progress value={stage.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <CardTitle>Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`h-2 w-2 rounded-full mt-2 ${
                    activity.type === "positive" ? "bg-success" : "bg-muted-foreground"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
