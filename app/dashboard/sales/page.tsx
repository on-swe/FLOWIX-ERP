"use client"

import { useState } from "react"
import { Plus, ShoppingCart, TrendingUp, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddSaleModal } from "@/components/modals/add-sale-modal"

const sales = [
  {
    id: "SO-001",
    customer: "John Smith",
    company: "Tech Solutions Inc.",
    amount: 2999.99,
    status: "completed",
    date: "2024-01-15",
    items: 3,
    paymentMethod: "Credit Card",
  },
  {
    id: "SO-002",
    customer: "Sarah Johnson",
    company: "Design Studio",
    amount: 1599.5,
    status: "pending",
    date: "2024-01-14",
    items: 2,
    paymentMethod: "Bank Transfer",
  },
  {
    id: "SO-003",
    customer: "Michael Brown",
    company: "Global Corp",
    amount: 4250.0,
    status: "completed",
    date: "2024-01-13",
    items: 5,
    paymentMethod: "Check",
  },
  {
    id: "SO-004",
    customer: "Emily Davis",
    company: "Innovation Labs",
    amount: 899.99,
    status: "draft",
    date: "2024-01-12",
    items: 1,
    paymentMethod: "Credit Card",
  },
]

const stats = [
  {
    title: "Total Sales",
    value: "$124,563",
    change: "+12%",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "green",
  },
  {
    title: "Orders This Month",
    value: "89",
    change: "+18%",
    changeType: "positive" as const,
    icon: ShoppingCart,
    color: "blue",
  },
  {
    title: "Average Order",
    value: "$1,401",
    change: "+8%",
    changeType: "positive" as const,
    icon: TrendingUp,
    color: "purple",
  },
  {
    title: "Pending Orders",
    value: "12",
    change: "-5%",
    changeType: "negative" as const,
    icon: Calendar,
    color: "orange",
  },
]

export default function SalesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Pending</Badge>
      case "draft":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">Draft</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatColor = (color: string) => {
    switch (color) {
      case "green":
        return "from-green-500 to-green-600"
      case "blue":
        return "from-blue-500 to-blue-600"
      case "purple":
        return "from-purple-500 to-purple-600"
      case "orange":
        return "from-orange-500 to-orange-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Sales
          </h2>
          <p className="text-muted-foreground">Manage your sales orders and track revenue</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Sale
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getStatColor(stat.color)} opacity-5`} />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg bg-gradient-to-br ${getStatColor(stat.color)}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sales Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <CardTitle className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <span>Sales Orders</span>
          </CardTitle>
          <CardDescription>Recent sales orders and their current status</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {sale.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{sale.customer}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{sale.company}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${sale.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {sale.items} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(sale.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(sale.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AddSaleModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  )
}
