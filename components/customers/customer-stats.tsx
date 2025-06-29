import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserPlus, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Customers",
    value: "2,847",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "New This Month",
    value: "127",
    change: "+8.2%",
    icon: UserPlus,
    color: "text-green-600",
  },
  {
    title: "Customer LTV",
    value: "$4,250",
    change: "+15.3%",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Retention Rate",
    value: "94.2%",
    change: "+2.1%",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

export function CustomerStats() {
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
            <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
