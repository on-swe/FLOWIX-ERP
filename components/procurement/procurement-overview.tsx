import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Truck, DollarSign, Clock } from "lucide-react"

const stats = [
  {
    title: "Active POs",
    value: "47",
    change: "+8 this week",
    icon: ShoppingCart,
    color: "text-blue-600",
  },
  {
    title: "Pending Deliveries",
    value: "23",
    change: "5 overdue",
    icon: Truck,
    color: "text-orange-600",
  },
  {
    title: "Monthly Spend",
    value: "$284K",
    change: "+12% from last month",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Avg Lead Time",
    value: "12 days",
    change: "-2 days improvement",
    icon: Clock,
    color: "text-purple-600",
  },
]

export function ProcurementOverview() {
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
