import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCheck, Clock, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Employees",
    value: "247",
    change: "+12 this month",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Present Today",
    value: "234",
    change: "94.7% attendance",
    icon: UserCheck,
    color: "text-green-600",
  },
  {
    title: "Avg. Hours/Week",
    value: "42.5",
    change: "+2.1 hours",
    icon: Clock,
    color: "text-purple-600",
  },
  {
    title: "Monthly Payroll",
    value: "$847K",
    change: "+8.2% from last month",
    icon: DollarSign,
    color: "text-orange-600",
  },
]

export function HROverview() {
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
