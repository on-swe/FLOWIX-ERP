import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Star, DollarSign, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Active Vendors",
    value: "127",
    change: "+8 this month",
    icon: Building2,
    color: "text-blue-600",
  },
  {
    title: "Top Rated",
    value: "4.8/5",
    change: "Average rating",
    icon: Star,
    color: "text-yellow-600",
  },
  {
    title: "Total Spend",
    value: "$2.4M",
    change: "+15% this year",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Performance Score",
    value: "94%",
    change: "+2% improvement",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

export function VendorStats() {
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
