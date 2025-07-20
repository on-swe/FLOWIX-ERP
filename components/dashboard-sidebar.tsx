"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
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
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    name: "Inventory",
    href: "/dashboard/inventory",
    icon: Package,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    name: "Products",
    href: "/dashboard/products",
    icon: Box,
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    name: "Sales",
    href: "/dashboard/sales",
    icon: ShoppingCart,
    gradient: "from-orange-500 to-red-600",
  },
  {
    name: "Procurement",
    href: "/dashboard/procurement",
    icon: Truck,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "Customers",
    href: "/dashboard/customers",
    icon: Users,
    gradient: "from-green-500 to-emerald-600",
  },
  {
    name: "Vendors",
    href: "/dashboard/vendors",
    icon: Building2,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    name: "Finance",
    href: "/dashboard/finance",
    icon: CreditCard,
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    name: "HR",
    href: "/dashboard/hr",
    icon: UserCheck,
    gradient: "from-pink-500 to-rose-600",
  },
  {
    name: "Projects",
    href: "/dashboard/projects",
    icon: Briefcase,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    name: "Reports",
    href: "/dashboard/reports",
    icon: BarChart3,
    gradient: "from-teal-500 to-cyan-600",
  },
  {
    name: "Support",
    href: "/dashboard/support",
    icon: HelpCircle,
    gradient: "from-red-500 to-pink-600",
  },
  {
    name: "Organization",
    href: "/dashboard/organization",
    icon: Building,
    gradient: "from-slate-500 to-gray-600",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    gradient: "from-gray-500 to-slate-600",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-[10px] left-[2px] z-40">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md  dark:bg-gray-800 shadow-md border bg-white dark:border-gray-700"
          aria-label="Toggle sidebar"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:fixed inset-y-0 left-0 z-30 w-64 flex-col transition-all duration-300 ease-in-out",
          "bg-white dark:bg-gray-900 shadow-elegant border-r border-gray-200 dark:border-gray-800",
          isMobile
            ? isOpen
              ? "translate-x-0"
              : "-translate-x-full"
            : "translate-x-0"
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4 h-full">
          <div className="flex h-16 shrink-0 items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-black rounded-xl shadow-lg">
                <Image
                  src="/logo/logo.png"
                  alt="Flowix"
                  width={32}
                  height={32}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  FLOWIX
                </h1>
                <p className="text-xs text-muted-foreground">
                  Professional Edition
                </p>
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
                        onClick={() => isMobile && setIsOpen(false)}
                        className={cn(
                          "group flex items-center gap-x-3 rounded-xl p-3 text-sm font-medium transition-all duration-200",
                          pathname === item.href
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 text-black dark:text-blue-300 shadow-sm border border-blue-200 dark:border-blue-800"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                            pathname === item.href
                              ? `bg-black shadow-lg`
                              : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                          )}
                        >
                          <item.icon
                            className={cn(
                              "h-4 w-4 transition-colors duration-200",
                              pathname === item.href
                                ? "text-white"
                                : "text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300"
                            )}
                            aria-hidden="true"
                          />
                        </div>
                        <span className="truncate">{item.name}</span>
                        {pathname === item.href && (
                          <div className="ml-auto h-2 w-2 rounded-full bg-black dark:bg-blue-400" />
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
    </>
  );
}
