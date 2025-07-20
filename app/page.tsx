import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  Users,
  Building2,
  CreditCard,
  UserCheck,
  Briefcase,
  BarChart3,
  HelpCircle,
  Box,
  Truck,
  Building,
  CheckCircle,
  ChevronRight,
  ArrowRight,
  Zap,
  Database,
  Globe,
  ShieldCheck,
  Cpu,
  LayoutDashboard,
} from "lucide-react";

const modules = [
  {
    name: "Dashboard",
    description: "Executive overview with key metrics",
    href: "/dashboard",
    icon: LayoutDashboard,
    features: ["Real-time KPIs", "Activity feed", "System alerts"],
  },
  {
    name: "Inventory",
    description: "Track stock levels and products",
    href: "/dashboard/inventory",
    icon: Package,
    features: ["Stock tracking", "Low stock alerts", "Product management"],
  },
  {
    name: "Product Catalog",
    description: "Manage product information",
    href: "/dashboard/products",
    icon: Box,
    features: ["Product variants", "Category management", "Pricing"],
  },
  {
    name: "Sales",
    description: "Handle orders and transactions",
    href: "/dashboard/sales",
    icon: ShoppingCart,
    features: ["Sales orders", "Quotations", "Invoice generation"],
  },
  {
    name: "Customers",
    description: "Manage customer relationships",
    href: "/dashboard/customers",
    icon: Users,
    features: ["Customer profiles", "Purchase history", "CRM"],
  },
  {
    name: "Vendors",
    description: "Manage supplier relationships",
    href: "/dashboard/vendors",
    icon: Building2,
    features: ["Vendor profiles", "Performance tracking", "Contracts"],
  },
  {
    name: "Procurement",
    description: "Purchase order management",
    href: "/dashboard/procurement",
    icon: Truck,
    features: ["PO management", "Vendor selection", "Delivery tracking"],
  },
  {
    name: "Finance",
    description: "Accounting operations",
    href: "/dashboard/finance",
    icon: CreditCard,
    features: ["Chart of accounts", "Transactions", "Financial reports"],
  },
  {
    name: "HR",
    description: "Employee management",
    href: "/dashboard/hr",
    icon: UserCheck,
    features: ["Employee profiles", "Payroll", "Performance reviews"],
  },
  {
    name: "Projects",
    description: "Task and team collaboration",
    href: "/dashboard/projects",
    icon: Briefcase,
    features: ["Project tracking", "Task management", "Time tracking"],
  },
  {
    name: "Support",
    description: "Help desk operations",
    href: "/dashboard/support",
    icon: HelpCircle,
    features: ["Ticket management", "SLA tracking", "Knowledge base"],
  },
  {
    name: "Organization",
    description: "Company structure",
    href: "/dashboard/organization",
    icon: Building,
    features: ["Departments", "Org chart", "Location management"],
  },
  {
    name: "Reports",
    description: "Business intelligence",
    href: "/dashboard/reports",
    icon: BarChart3,
    features: ["Custom reports", "Data visualization", "Exports"],
  },
];

const features = [
  {
    title: "Enterprise Security",
    description: "RBAC, audit logs, and multi-tenant isolation",
    icon: ShieldCheck,
  },
  {
    title: "Real-time Analytics",
    description: "Live dashboards with up-to-the-minute data",
    icon: BarChart3,
  },
  {
    title: "Global Ready",
    description: "Multi-language and multi-currency support",
    icon: Globe,
  },
  {
    title: "High Performance",
    description: "Optimized for enterprise-scale operations",
    icon: Zap,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-gray-200">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-black">
              <Zap className="w-4 h-4 mr-2" />
              FLOWIX
            </Badge>
            <h1 className="text-6xl font-bold mb-6 tracking-tight">
              <span className="bg-black text-white px-2">MODERN</span> BUSINESS
              OPERATIONS
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              A complete, modular ERP platform designed for efficiency and
              scalability.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/dashboard">
                <Button className="bg-black text-white hover:bg-gray-900">
                  Explore Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="#modules">
                <Button variant="outline" className="border-black">
                  View Modules
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Designed for Efficiency</h2>
            <p className="text-gray-700">
              Every feature built for enterprise performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="flex items-start gap-6">
                  <div className="p-3 border border-black rounded-full">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Modules */}
      <div id="modules" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Complete Business Suite</h2>
            <p className="text-gray-700">
              Every function your business needs in one system.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module) => (
              <Card
                key={module.name}
                className="border-black hover:shadow-lg transition-all"
              >
                <CardHeader>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 border border-black rounded-lg">
                      <module.icon className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xl">{module.name}</CardTitle>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {module.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href={module.href}>
                    <Button variant="outline" className="w-full border-black">
                      Explore
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the power of a modern ERP system.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button className="bg-white text-black hover:bg-gray-100">
                Explore Demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#">
              <Button
                variant="outline"
                className="border border-white text-white bg-transparent"
              >
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-700 mb-6">
            A fully functional ERP demo with mock data.
          </p>
          <Link href="/dashboard">
            <Button variant="outline" className="border-black">
              Start Exploring
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="pt-6 md:pt-8 mt-8 w-[90%] mx-auto border-t border-[#cdcdcd] text-center text-sm sm:text-base">
          <p className="mb-2">
            &copy; 2025 <strong>FLOWIX</strong>. All rights reserved.
          </p>
          <p>
            Designed and Developed by{" "}
            <Link
              href="https://raqeem-eg.vercel.app"
              className="hover:underline"
            >
              <strong>Raqeem - رَقيم</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
