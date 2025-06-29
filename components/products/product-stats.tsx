import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Tag, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Products",
    value: "1,247",
    change: "+8.2%",
    icon: Package,
    color: "text-blue-600",
  },
  {
    title: "Product Categories",
    value: "24",
    change: "+2",
    icon: Tag,
    color: "text-green-600",
  },
  {
    title: "Average Price",
    value: "$156.80",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-purple-600",
  },
  {
    title: "Top Performer",
    value: "Electronics",
    change: "45% of sales",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

export function ProductStats() {
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
