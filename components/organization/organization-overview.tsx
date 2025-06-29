import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, UserCheck, Briefcase } from "lucide-react"

const stats = [
  {
    title: "Departments",
    value: "12",
    change: "+2 this quarter",
    icon: Building,
    color: "text-blue-600",
  },
  {
    title: "Total Employees",
    value: "247",
    change: "+15 this month",
    icon: Users,
    color: "text-green-600",
  },
  {
    title: "Managers",
    value: "24",
    change: "3 new promotions",
    icon: UserCheck,
    color: "text-purple-600",
  },
  {
    title: "Open Positions",
    value: "8",
    change: "5 in recruitment",
    icon: Briefcase,
    color: "text-orange-600",
  },
]

export function OrganizationOverview() {
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
