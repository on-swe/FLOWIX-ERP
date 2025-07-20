"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Clock,
  CheckCircle,
  BarChart2,
  PieChart as PieChartIcon,
  Activity,
  Database,
  Globe,
  Shield,
  Cpu,
  Zap,
  Cloud,
  Bell,
  FileText,
  Settings,
  UserCog,
  RefreshCw,
} from "lucide-react";
import { AreaChart, BarChart, DonutChart, LineChart } from "@tremor/react";
import { Button } from "@/components/ui/button";
import {
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";

const COLORS = ["#000000", "#333333", "#666666", "#999999"];

const stats = [
  {
    name: "Annual Revenue",
    value: "$2.84M",
    change: "+12.5%",
    changeType: "positive",
    icon: DollarSign,
    chartData: [
      { month: "Jan", value: 189000 },
      { month: "Feb", value: 215000 },
      { month: "Mar", value: 198000 },
      { month: "Apr", value: 232000 },
      { month: "May", value: 247000 },
      { month: "Jun", value: 263000 },
      { month: "Jul", value: 281000 },
      { month: "Aug", value: 276000 },
      { month: "Sep", value: 292000 },
      { month: "Oct", value: 312000 },
      { month: "Nov", value: 298000 },
      { month: "Dec", value: 327000 },
    ],
  },
  {
    name: "Active Customers",
    value: "1,429",
    change: "+8.2%",
    changeType: "positive",
    icon: Users,
    chartData: [
      { month: "Jan", value: 1120 },
      { month: "Feb", value: 1185 },
      { month: "Mar", value: 1240 },
      { month: "Apr", value: 1275 },
      { month: "May", value: 1310 },
      { month: "Jun", value: 1352 },
      { month: "Jul", value: 1380 },
      { month: "Aug", value: 1401 },
      { month: "Sep", value: 1429 },
    ],
  },
  {
    name: "Inventory Value",
    value: "$1.27M",
    change: "-2.1%",
    changeType: "negative",
    icon: Package,
    chartData: [
      { month: "Jan", value: 1320000 },
      { month: "Feb", value: 1295000 },
      { month: "Mar", value: 1280000 },
      { month: "Apr", value: 1265000 },
      { month: "May", value: 1250000 },
      { month: "Jun", value: 1240000 },
      { month: "Jul", value: 1235000 },
      { month: "Aug", value: 1230000 },
      { month: "Sep", value: 1270000 },
    ],
  },
  {
    name: "Order Fulfillment",
    value: "98.7%",
    change: "+0.5%",
    changeType: "positive",
    icon: ShoppingCart,
    chartData: [
      { month: "Jan", value: 97.2 },
      { month: "Feb", value: 97.5 },
      { month: "Mar", value: 97.8 },
      { month: "Apr", value: 98.0 },
      { month: "May", value: 98.1 },
      { month: "Jun", value: 98.3 },
      { month: "Jul", value: 98.5 },
      { month: "Aug", value: 98.6 },
      { month: "Sep", value: 98.7 },
    ],
  },
];

const alerts = [
  {
    title: "Low Stock Alert",
    description: "15 items below minimum threshold",
    type: "warning",
    icon: AlertTriangle,
    time: "5 min ago",
    priority: "high",
  },
  {
    title: "Payment Received",
    description: "$2,450 payment from Acme Corp",
    type: "success",
    icon: CheckCircle,
    time: "15 min ago",
    priority: "medium",
  },
  {
    title: "System Update Available",
    description: "Version 2.3.1 ready to install",
    type: "info",
    icon: Cloud,
    time: "1 hour ago",
    priority: "low",
  },
  {
    title: "Security Alert",
    description: "Unusual login attempt detected",
    type: "warning",
    icon: Shield,
    time: "2 hours ago",
    priority: "critical",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "order",
    title: "New order #ORD-2024-001",
    description: "Order placed by Acme Corp",
    amount: "$1,299.00",
    time: "2 minutes ago",
    status: "success",
    icon: ShoppingCart,
  },
  {
    id: 2,
    type: "inventory",
    title: "Inventory updated",
    description: "Stock levels adjusted for 5 products",
    amount: "+50 items",
    time: "15 minutes ago",
    status: "info",
    icon: Package,
  },
  {
    id: 3,
    type: "payment",
    title: "Payment received",
    description: "Invoice #INV-2024-045 paid",
    amount: "$2,450.00",
    time: "1 hour ago",
    status: "success",
    icon: DollarSign,
  },
  {
    id: 4,
    type: "user",
    title: "New user registered",
    description: "Sarah Johnson joined the team",
    amount: "",
    time: "2 hours ago",
    status: "info",
    icon: Users,
  },
];

const salesData = [
  { name: "Jan", sales: 189000 },
  { name: "Feb", sales: 215000 },
  { name: "Mar", sales: 198000 },
  { name: "Apr", sales: 232000 },
  { name: "May", sales: 247000 },
  { name: "Jun", sales: 263000 },
  { name: "Jul", sales: 281000 },
  { name: "Aug", sales: 276000 },
  { name: "Sep", sales: 292000 },
];

const inventoryData = [
  { name: "Electronics", value: 35 },
  { name: "Furniture", value: 25 },
  { name: "Office Supplies", value: 20 },
  { name: "Raw Materials", value: 15 },
  { name: "Other", value: 5 },
];

const statusData = [
  { name: "Completed", value: 156 },
  { name: "Processing", value: 42 },
  { name: "Shipped", value: 28 },
  { name: "Pending", value: 12 },
];

const aiInsights = [
  {
    title: "Sales Forecast",
    description: "AI predicts 12% increase in Q4 based on current trends",
    icon: Activity,
  },
  {
    title: "Inventory Optimization",
    description: "Recommend reducing electronics stock by 15%",
    icon: Package,
  },
  {
    title: "Customer Retention",
    description: "3 high-value customers at risk - suggest outreach",
    icon: Users,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-fade-in bg-white dark:bg-gray-950 py-6">
      {/* Header with AI Assistant */}
      <div className="flex flex-col gap-4 justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Enterprise Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Intelligent business overview -{" "}
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="flex justify-end w-full items-center space-x-4">
          <Button className="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            <Zap className="h-4 w-4" />
            <span>AI Assistant</span>
          </Button>
          <Button className=" bg-white w-12 h-12 p-2 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Settings className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </Button>
        </div>
      </div>

      {/* Stats Grid with Mini Charts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.name}
            className="border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {stat.name}
              </CardTitle>
              <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                <stat.icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <TrendingUp
                    className={`h-3 w-3 ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  />
                  <p
                    className={`text-xs font-medium ${
                      stat.changeType === "positive"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {stat.change}
                  </p>
                </div>
                <div className="h-12 w-20">
                  <AreaChart
                    data={stat.chartData}
                    index="month"
                    categories={["value"]}
                    colors={
                      stat.changeType === "positive" ? ["green"] : ["red"]
                    }
                    showXAxis={false}
                    showYAxis={false}
                    showLegend={false}
                    showGridLines={false}
                    curveType="monotone"
                    className="h-12"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance Line Chart */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Sales Performance
            </CardTitle>
            <CardDescription>Monthly revenue and orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    stroke="#888"
                    tick={{ fill: "currentColor" }}
                  />
                  <YAxis
                    stroke="#888"
                    tick={{ fill: "currentColor" }}
                    tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `$${Number(value).toLocaleString()}`,
                      "Sales",
                    ]}
                    labelFormatter={(name) => `Month: ${name}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#000"
                    strokeWidth={2}
                    dot={{ r: 4, fill: "#000" }}
                    activeDot={{
                      r: 6,
                      stroke: "#000",
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </CardFooter>
        </Card>

        {/* Order Status Pie Chart */}
        <Card className="border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Order Status
            </CardTitle>
            <CardDescription>Current order distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} orders`]} />
                  {/* <Legend /> */}
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lower Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border border-gray-100 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest system events and transactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg ${
                      activity.status === "success"
                        ? "bg-green-100 dark:bg-green-900/50"
                        : "bg-blue-100 dark:bg-blue-900/50"
                    }`}
                  >
                    <activity.icon
                      className={`h-4 w-4 ${
                        activity.status === "success"
                          ? "text-green-600 dark:text-green-400"
                          : "text-blue-600 dark:text-blue-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                  {activity.amount && (
                    <div
                      className={`text-sm font-semibold ${
                        activity.amount.startsWith("+")
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-900 dark:text-white"
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
        <Card className="border border-gray-100 dark:border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-semibold">
                  System Alerts
                </CardTitle>
                <CardDescription>Priority notifications</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <span className="text-xs font-medium bg-red-500 text-white rounded-full px-2 py-1">
                  {alerts.filter((a) => a.priority === "critical").length}{" "}
                  Critical
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 p-3 rounded-lg border ${
                    alert.priority === "critical"
                      ? "border-red-500/20 bg-red-50/50 dark:bg-red-900/10"
                      : alert.priority === "high"
                      ? "border-yellow-500/20 bg-yellow-50/50 dark:bg-yellow-900/10"
                      : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-lg ${
                      alert.type === "warning"
                        ? "bg-yellow-100 dark:bg-yellow-900/50"
                        : alert.type === "success"
                        ? "bg-green-100 dark:bg-green-900/50"
                        : "bg-blue-100 dark:bg-blue-900/50"
                    }`}
                  >
                    <alert.icon
                      className={`h-4 w-4 ${
                        alert.type === "warning"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : alert.type === "success"
                          ? "text-green-600 dark:text-green-400"
                          : "text-blue-600 dark:text-blue-400"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {alert.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {alert.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {alert.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card className="border border-gray-100 dark:border-gray-800">
        <CardHeader>
          <div className="flex flex-col justify-start items-start gap-2">
            <div className="flex items-center space-x-2">
              <Cpu className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              <span className="text-xs whitespace-nowrap font-medium bg-black text-white rounded-full px-2 py-1">
                Real-time Analysis
              </span>
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">
                AI-Powered Insights
              </CardTitle>
              <CardDescription>
                Actionable intelligence from your data
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {aiInsights.map((insight, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <insight.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {insight.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {insight.description}
                </p>
                <button className="mt-3 text-xs font-medium text-black dark:text-white hover:underline">
                  View details →
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
