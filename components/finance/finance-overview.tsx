import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, TrendingDown, CreditCard } from "lucide-react"

const stats = [
  {
    title: "Total Revenue",
    value: "$2,847,392",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Total Expenses",
    value: "$1,234,567",
    change: "+8.2%",
    icon: TrendingDown,
    color: "text-red-600",
  },
  {
    title: "Net Profit",
    value: "$1,612,825",
    change: "+15.3%",
    icon: TrendingUp,
    color: "text-blue-600",
  },
  {
    title: "Outstanding AR",
    value: "$456,789",
    change: "-5.1%",
    icon: CreditCard,
    color: "text-orange-600",
  },
]

export function FinanceOverview() {
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
