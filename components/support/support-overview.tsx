import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, Clock, CheckCircle, AlertTriangle } from "lucide-react"

const stats = [
  {
    title: "Open Tickets",
    value: "127",
    change: "+12 today",
    icon: HelpCircle,
    color: "text-blue-600",
  },
  {
    title: "Avg Response Time",
    value: "2.4h",
    change: "-15min from last week",
    icon: Clock,
    color: "text-green-600",
  },
  {
    title: "Resolved Today",
    value: "45",
    change: "+8 from yesterday",
    icon: CheckCircle,
    color: "text-purple-600",
  },
  {
    title: "High Priority",
    value: "8",
    change: "2 overdue",
    icon: AlertTriangle,
    color: "text-red-600",
  },
]

export function SupportOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
