import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, DollarSign, Clock, CheckCircle } from "lucide-react"

const stats = [
  {
    name: "Total Revenue",
    value: "$2,847,392",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Active Customers",
    value: "1,429",
    change: "+8.2%",
    changeType: "positive",
    icon: Users,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Inventory Items",
    value: "8,547",
    change: "-2.1%",
    changeType: "negative",
    icon: Package,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Pending Orders",
    value: "127",
    change: "+15.3%",
    changeType: "positive",
    icon: ShoppingCart,
    gradient: "from-orange-500 to-red-600",
  },
]

const alerts = [
  {
    title: "Low Stock Alert",
    description: "15 items are running low on stock",
    type: "warning",
    icon: AlertTriangle,
    time: "5 min ago",
  },
  {
    title: "Payment Received",
    description: "Payment of $2,450 received from Acme Corp",
    type: "success",
    icon: CheckCircle,
    time: "15 min ago",
  },
  {
    title: "System Backup",
    description: "Daily backup completed successfully",
    type: "info",
    icon: Clock,
    time: "1 hour ago",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "order",
    title: "New order #ORD-2024-001",
    description: "Order placed by Acme Corp",
    amount: "$1,299.00",
    time: "2 minutes ago",
    status: "success",
  },
  {
    id: 2,
    type: "inventory",
    title: "Inventory updated",
    description: "Stock levels adjusted for 5 products",
    amount: "+50 items",
    time: "15 minutes ago",
    status: "info",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment received",
    description: "Invoice #INV-2024-045 paid",
    amount: "$2,450.00",
    time: "1 hour ago",
    status: "success",
  },
  {
    id: 4,
    type: "user",
    title: "New user registered",
    description: "Sarah Johnson joined the team",
    amount: "",
    time: "2 hours ago",
    status: "info",
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-muted-foreground text-lg">Welcome back! Here's what's happening with your business today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.name}
            className="relative overflow-hidden shadow-elegant hover:shadow-elegant-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-5`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center space-x-1 mt-1">
                <TrendingUp
                  className={`h-3 w-3 ${stat.changeType === "positive" ? "text-emerald-600" : "text-red-600"}`}
                />
                <p
                  className={`text-xs font-medium ${
                    stat.changeType === "positive"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.change} from last month
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-elegant border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">Recent Activity</CardTitle>
            <CardDescription className="text-base">Latest transactions and system events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      activity.status === "success"
                        ? "bg-emerald-500"
                        : activity.status === "info"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <div
                      className={`text-sm font-semibold ${
                        activity.amount.startsWith("+") ? "text-emerald-600" : "text-foreground"
                      }`}
                    >
                      {activity.amount}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="shadow-elegant border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold">System Alerts</CardTitle>
            <CardDescription className="text-base">Important notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div
                    className={`p-1.5 rounded-lg ${
                      alert.type === "warning"
                        ? "bg-yellow-100 dark:bg-yellow-900"
                        : alert.type === "success"
                          ? "bg-emerald-100 dark:bg-emerald-900"
                          : "bg-blue-100 dark:bg-blue-900"
                    }`}
                  >
                    <alert.icon
                      className={`h-4 w-4 ${
                        alert.type === "warning"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : alert.type === "success"
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-blue-600 dark:text-blue-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{alert.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
