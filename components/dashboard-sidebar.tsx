"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Building2,
  CreditCard,
  UserCheck,
  Briefcase,
  BarChart3,
  HelpCircle,
  Box,
  Truck,
  Building,
  Sparkles,
} from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, gradient: "from-blue-500 to-indigo-600" },
  { name: "Inventory", href: "/dashboard/inventory", icon: Package, gradient: "from-purple-500 to-pink-600" },
  { name: "Products", href: "/dashboard/products", icon: Box, gradient: "from-emerald-500 to-teal-600" },
  { name: "Sales", href: "/dashboard/sales", icon: ShoppingCart, gradient: "from-orange-500 to-red-600" },
  { name: "Procurement", href: "/dashboard/procurement", icon: Truck, gradient: "from-cyan-500 to-blue-600" },
  { name: "Customers", href: "/dashboard/customers", icon: Users, gradient: "from-green-500 to-emerald-600" },
  { name: "Vendors", href: "/dashboard/vendors", icon: Building2, gradient: "from-violet-500 to-purple-600" },
  { name: "Finance", href: "/dashboard/finance", icon: CreditCard, gradient: "from-yellow-500 to-orange-600" },
  { name: "HR", href: "/dashboard/hr", icon: UserCheck, gradient: "from-pink-500 to-rose-600" },
  { name: "Projects", href: "/dashboard/projects", icon: Briefcase, gradient: "from-indigo-500 to-blue-600" },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3, gradient: "from-teal-500 to-cyan-600" },
  { name: "Support", href: "/dashboard/support", icon: HelpCircle, gradient: "from-red-500 to-pink-600" },
  { name: "Organization", href: "/dashboard/organization", icon: Building, gradient: "from-slate-500 to-gray-600" },
  { name: "Settings", href: "/dashboard/settings", icon: Settings, gradient: "from-gray-500 to-slate-600" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white dark:bg-gray-900 px-6 pb-4 shadow-elegant border-r border-gray-200 dark:border-gray-800">
        <div className="flex h-16 shrink-0 items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Enterprise ERP
              </h1>
              <p className="text-xs text-muted-foreground">Professional Edition</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group flex items-center gap-x-3 rounded-xl p-3 text-sm font-medium transition-all duration-200",
                        pathname === item.href
                          ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 text-blue-700 dark:text-blue-300 shadow-sm border border-blue-200 dark:border-blue-800"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white",
                      )}
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                          pathname === item.href
                            ? `bg-gradient-to-br ${item.gradient} shadow-lg`
                            : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700",
                        )}
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4 transition-colors duration-200",
                            pathname === item.href
                              ? "text-white"
                              : "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300",
                          )}
                          aria-hidden="true"
                        />
                      </div>
                      <span className="truncate">{item.name}</span>
                      {pathname === item.href && (
                        <div className="ml-auto h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
