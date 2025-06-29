import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, FileText, Download, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Total Reports",
    value: "47",
    change: "+5 this month",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    title: "Scheduled Reports",
    value: "12",
    change: "3 running daily",
    icon: BarChart3,
    color: "text-green-600",
  },
  {
    title: "Downloads This Month",
    value: "284",
    change: "+23% from last month",
    icon: Download,
    color: "text-purple-600",
  },
  {
    title: "Most Popular",
    value: "Sales Report",
    change: "156 downloads",
    icon: TrendingUp,
    color: "text-orange-600",
  },
]

export function ReportsOverview() {
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
