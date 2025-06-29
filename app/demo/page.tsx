import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
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
  Star,
  ArrowRight,
} from "lucide-react"

const modules = [
  {
    name: "Dashboard",
    description: "Executive overview with key metrics and insights",
    href: "/dashboard",
    icon: BarChart3,
    features: ["Real-time KPIs", "Activity feed", "Quick actions", "System alerts"],
    status: "Complete",
  },
  {
    name: "Inventory Management",
    description: "Track stock levels, manage products, and monitor inventory",
    href: "/dashboard/inventory",
    icon: Package,
    features: ["Stock tracking", "Low stock alerts", "Inventory reports", "Product management"],
    status: "Complete",
  },
  {
    name: "Product Catalog",
    description: "Manage product information, variants, and categories",
    href: "/dashboard/products",
    icon: Box,
    features: ["Product variants", "Category management", "Pricing", "Product lifecycle"],
    status: "Complete",
  },
  {
    name: "Sales Management",
    description: "Handle sales orders, quotes, and customer transactions",
    href: "/dashboard/sales",
    icon: ShoppingCart,
    features: ["Sales orders", "Quotations", "Invoice generation", "Sales analytics"],
    status: "Complete",
  },
  {
    name: "Customer Management",
    description: "Manage customer relationships and interaction history",
    href: "/dashboard/customers",
    icon: Users,
    features: ["Customer profiles", "Contact management", "Purchase history", "CRM integration"],
    status: "Complete",
  },
  {
    name: "Vendor Management",
    description: "Manage supplier relationships and vendor performance",
    href: "/dashboard/vendors",
    icon: Building2,
    features: ["Vendor profiles", "Performance tracking", "Contract management", "Rating system"],
    status: "Complete",
  },
  {
    name: "Procurement",
    description: "Handle purchase orders and procurement processes",
    href: "/dashboard/procurement",
    icon: Truck,
    features: ["Purchase orders", "Vendor selection", "Delivery tracking", "Cost analysis"],
    status: "Complete",
  },
  {
    name: "Finance & Accounting",
    description: "Manage financial transactions and accounting operations",
    href: "/dashboard/finance",
    icon: CreditCard,
    features: ["Chart of accounts", "Transaction management", "Financial reports", "Budget tracking"],
    status: "Complete",
  },
  {
    name: "Human Resources",
    description: "Employee management, payroll, and HR processes",
    href: "/dashboard/hr",
    icon: UserCheck,
    features: ["Employee profiles", "Attendance tracking", "Payroll management", "Performance reviews"],
    status: "Complete",
  },
  {
    name: "Project Management",
    description: "Track projects, tasks, and team collaboration",
    href: "/dashboard/projects",
    icon: Briefcase,
    features: ["Project tracking", "Task management", "Team collaboration", "Time tracking"],
    status: "Complete",
  },
  {
    name: "Support & Helpdesk",
    description: "Customer support tickets and help desk operations",
    href: "/dashboard/support",
    icon: HelpCircle,
    features: ["Ticket management", "SLA tracking", "Knowledge base", "Customer communication"],
    status: "Complete",
  },
  {
    name: "Organization",
    description: "Manage organizational structure and departments",
    href: "/dashboard/organization",
    icon: Building,
    features: ["Department management", "Organizational chart", "Budget allocation", "Location management"],
    status: "Complete",
  },
  {
    name: "Reports & Analytics",
    description: "Generate insights and business intelligence",
    href: "/dashboard/reports",
    icon: BarChart3,
    features: ["Custom reports", "Scheduled reports", "Data visualization", "Export capabilities"],
    status: "Complete",
  },
]

const features = [
  "Multi-tenant architecture with complete data isolation",
  "Role-based access control (RBAC) with granular permissions",
  "Real-time notifications and activity tracking",
  "Comprehensive audit logging for compliance",
  "Multi-language and currency support",
  "Data import/export capabilities (CSV, Excel, JSON, PDF)",
  "Responsive design with dark mode support",
  "Modular architecture for easy customization",
  "Enterprise-grade security features",
  "Complete REST API with documentation",
]

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Enterprise ERP System</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            A comprehensive, modular Enterprise Resource Planning system built with Next.js, TypeScript, and modern web
            technologies. Explore all modules and features without authentication.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              13+ Core Modules
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Star className="w-3 h-3 mr-1" />
              Enterprise Ready
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              Multi-Tenant
            </Badge>
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              Mobile Responsive
            </Badge>
          </div>
          <Link href="/dashboard">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Explore Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Key Features */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl">Key Features</CardTitle>
            <CardDescription>Enterprise-grade features built for scalability and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Modules Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <Card key={module.name} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <module.icon className="h-8 w-8 text-blue-600" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {module.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{module.name}</CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Features:</h4>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {module.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link href={module.href}>
                    <Button variant="outline" className="w-full bg-transparent">
                      Explore Module
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Technical Stack */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle className="text-2xl">Technical Stack</CardTitle>
            <CardDescription>Built with modern technologies for performance and scalability</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Frontend</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Next.js 14+ (App Router)</li>
                  <li>TypeScript</li>
                  <li>Tailwind CSS</li>
                  <li>shadcn/ui Components</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Backend</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Next.js API Routes</li>
                  <li>PostgreSQL Database</li>
                  <li>Prisma ORM</li>
                  <li>Server Actions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Security</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>NextAuth.js</li>
                  <li>RBAC System</li>
                  <li>Audit Logging</li>
                  <li>Multi-tenant Isolation</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Features</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>Real-time Notifications</li>
                  <li>Data Import/Export</li>
                  <li>Internationalization</li>
                  <li>Responsive Design</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-gray-600 dark:text-gray-400">
            This is a demonstration of a complete Enterprise ERP system. All modules are fully functional with mock
            data.
          </p>
          <div className="mt-4">
            <Link href="/dashboard">
              <Button variant="outline">
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
