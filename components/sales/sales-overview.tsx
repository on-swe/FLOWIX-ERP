import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$847,392",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Orders This Month",
    value: "1,429",
    change: "+8.2%",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Average Order Value",
    value: "$592.80",
    change: "+15.3%",
    icon: TrendingUp,
    color: "text-purple-600",
  },
  {
    title: "Active Customers",
    value: "2,847",
    change: "+5.1%",
    icon: Users,
    color: "text-orange-600",
  },
]

export function SalesOverview() {
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
