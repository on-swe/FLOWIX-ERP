import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, CheckCircle, Clock, Users } from "lucide-react"

const stats = [
  {
    title: "Active Projects",
    value: "24",
    change: "+3 this month",
    icon: Briefcase,
    color: "text-blue-600",
  },
  {
    title: "Completed Tasks",
    value: "1,247",
    change: "+156 this week",
    icon: CheckCircle,
    color: "text-green-600",
  },
  {
    title: "Hours Logged",
    value: "2,847",
    change: "+12.5% this month",
    icon: Clock,
    color: "text-purple-600",
  },
  {
    title: "Team Members",
    value: "47",
    change: "+5 new members",
    icon: Users,
    color: "text-orange-600",
  },
]

export function ProjectOverview() {
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
