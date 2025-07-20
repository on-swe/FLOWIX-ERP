"use client"

import { useState, useMemo } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Edit,
  Eye,
  Mail,
  Phone,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ArrowUpDown,
  Filter,
  Plus,
  Check,
  X,
  User,
  Users,
  Building,
  ShoppingCart,
  DollarSign,
  Star,
  Frown,
  Smile,
  Download,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  avatar?: string
  totalOrders: number
  totalSpent: number
  status: "active" | "inactive" | "lead" | "high-value" | "churned"
  lastOrderDate: string
  customerSince: string
  notes?: string
  location: string
  industry: string
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 123-4567",
    company: "Tech Solutions Inc",
    avatar: "/avatars/01.png",
    totalOrders: 15,
    totalSpent: 24500.0,
    status: "high-value",
    lastOrderDate: "2024-01-15",
    customerSince: "2021-03-12",
    location: "San Francisco, CA",
    industry: "Technology",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 987-6543",
    company: "Design Studio",
    totalOrders: 8,
    totalSpent: 12000.5,
    status: "active",
    lastOrderDate: "2024-01-10",
    customerSince: "2022-05-18",
    location: "New York, NY",
    industry: "Creative Services",
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "(555) 456-7890",
    company: "Global Corp",
    avatar: "/avatars/03.png",
    totalOrders: 32,
    totalSpent: 58750.0,
    status: "high-value",
    lastOrderDate: "2024-01-14",
    customerSince: "2020-01-05",
    location: "Chicago, IL",
    industry: "Manufacturing",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "(555) 234-5678",
    company: "Innovation Labs",
    totalOrders: 3,
    totalSpent: 4500.0,
    status: "lead",
    lastOrderDate: "2024-01-05",
    customerSince: "2023-11-20",
    location: "Austin, TX",
    industry: "Research & Development",
  },
  {
    id: "5",
    name: "Robert Wilson",
    email: "robert.w@example.com",
    phone: "(555) 345-6789",
    company: "Data Systems",
    avatar: "/avatars/05.png",
    totalOrders: 12,
    totalSpent: 18750.0,
    status: "active",
    lastOrderDate: "2023-12-28",
    customerSince: "2021-09-15",
    location: "Seattle, WA",
    industry: "Information Technology",
  },
  {
    id: "6",
    name: "Lisa Miller",
    email: "lisa.m@example.com",
    phone: "(555) 678-9012",
    company: "Creative Minds",
    totalOrders: 5,
    totalSpent: 8250.0,
    status: "active",
    lastOrderDate: "2023-11-30",
    customerSince: "2022-07-22",
    location: "Boston, MA",
    industry: "Marketing",
  },
  {
    id: "7",
    name: "David Taylor",
    email: "david.t@example.com",
    phone: "(555) 789-0123",
    company: "Future Tech",
    avatar: "/avatars/07.png",
    totalOrders: 0,
    totalSpent: 0.0,
    status: "lead",
    lastOrderDate: "",
    customerSince: "2023-12-15",
    location: "Denver, CO",
    industry: "Technology",
  },
  {
    id: "8",
    name: "Jessica Lee",
    email: "jessica.l@example.com",
    phone: "(555) 890-1234",
    company: "Digital Solutions",
    totalOrders: 18,
    totalSpent: 31250.0,
    status: "high-value",
    lastOrderDate: "2024-01-12",
    customerSince: "2020-08-10",
    location: "Atlanta, GA",
    industry: "Consulting",
  },
  {
    id: "9",
    name: "Daniel Clark",
    email: "daniel.c@example.com",
    phone: "(555) 901-2345",
    company: "Innovate Co",
    avatar: "/avatars/09.png",
    totalOrders: 7,
    totalSpent: 10500.0,
    status: "active",
    lastOrderDate: "2023-12-15",
    customerSince: "2022-03-05",
    location: "Portland, OR",
    industry: "Product Development",
  },
  {
    id: "10",
    name: "Amanda White",
    email: "amanda.w@example.com",
    phone: "(555) 012-3456",
    company: "Tech Partners",
    totalOrders: 25,
    totalSpent: 42500.0,
    status: "high-value",
    lastOrderDate: "2024-01-08",
    customerSince: "2019-11-30",
    location: "Miami, FL",
    industry: "Software",
  },
]

export function CustomerTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: string
  } | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { toast } = useToast()


  const filteredCustomers = useMemo(() => {
    let filtered = [...mockCustomers]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (customer) =>
          customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone.includes(searchTerm) ||
          customer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.industry.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((customer) => customer.status === statusFilter)
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key as keyof Customer] < b[sortConfig.key as keyof Customer]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key as keyof Customer] > b[sortConfig.key as keyof Customer]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [searchTerm, statusFilter, sortConfig])

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem)

  const requestSort = (key: string) => {
    let direction = "ascending"
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(currentItems.map((customer) => customer.id))
    }
  }

  const handleBulkExport = () => {
    toast({
      title: "Export prepared",
      description: `Data for ${selectedRows.length} customers is ready for download`,
    })
  }

  const handleBulkEmail = () => {
    toast({
      title: "Email campaign prepared",
      description: `Email will be sent to ${selectedRows.length} customers`,
    })
  }

  const getStatusBadge = (status: Customer["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="whitespace-nowrap bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Check className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge className="whitespace-nowrap bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <User className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )
      case "lead":
        return (
          <Badge className="whitespace-nowrap bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Star className="h-3 w-3 mr-1" />
            Lead
          </Badge>
        )
      case "high-value":
        return (
          <Badge className="whitespace-nowrap bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            <DollarSign className="h-3 w-3 mr-1" />
            High Value
          </Badge>
        )
      case "churned":
        return (
          <Badge className="whitespace-nowrap bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <X className="h-3 w-3 mr-1" />
            Churned
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getCustomerValueProgress = (totalSpent: number) => {
    // Assuming tiers: <10k = low, 10k-25k = medium, >25k = high
    const max = 50000 // Adjust based on your customer base
    const percentage = (totalSpent / max) * 100
    let color = "bg-gray-300"

    if (totalSpent === 0) {
      color = "bg-gray-300"
    } else if (totalSpent < 10000) {
      color = "bg-yellow-400"
    } else if (totalSpent < 25000) {
      color = "bg-blue-400"
    } else {
      color = "bg-green-400"
    }

    return (
      <div className="flex items-center space-x-2 whitespace-nowrap w-full">
        <Progress
          value={percentage > 100 ? 100 : percentage}
          className={`h-2 ${color}`}
        />
        <span className="text-xs text-gray-500 w-12 text-right">
          ${(totalSpent / 1000).toFixed(1)}k
        </span>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4">
 
      {/* Customer Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Customer Directory
              </CardTitle>
              <CardDescription>
                {filteredCustomers.length} customers found
                {selectedRows.length > 0 && (
                  <span className="ml-2">• {selectedRows.length} selected</span>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search customers, companies, emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="whitespace-nowrap">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-[23rem] overflow-y-scroll">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("high-value")}>
                    <DollarSign className="mr-2 h-4 w-4 text-purple-600" />
                    High Value
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("lead")}>
                    <Star className="mr-2 h-4 w-4 text-blue-600" />
                    Lead
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                    <User className="mr-2 h-4 w-4 text-gray-600" />
                    Inactive
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("churned")}>
                    <X className="mr-2 h-4 w-4 text-red-600" />
                    Churned
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        {selectedRows.length > 0 && (
          <div className="border-b border-gray-200 px-6 py-3 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedRows.length} customer{selectedRows.length !== 1 ? "s" : ""}{" "}
              selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkEmail}>
                <Mail className="h-4 w-4 mr-2" />
                Email Selected
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkExport}>
                <Download className="h-4 w-4 mr-2" />
                Export Selected
              </Button>
            </div>
          </div>
        )}

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50 dark:bg-gray-800">
                <TableRow>
                  <TableHead className="w-[40px]">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length > 0 &&
                        selectedRows.length === currentItems.length
                      }
                      onChange={toggleSelectAll}
                      className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                    />
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("name")}
                  >
                    <div className="flex items-center">
                      Customer
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("company")}
                  >
                    <div className="flex items-center">
                      Company
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("totalOrders")}
                  >
                    <div className="flex items-center">
                      Orders
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Customer Value</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("totalSpent")}
                  >
                    <div className="flex items-center">
                      Total Spent
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right w-[100px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className={cn(
                        "hover:bg-gray-50",
                        selectedRows.includes(customer.id) && "bg-gray-50"
                      )}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(customer.id)}
                          onChange={() => toggleRowSelection(customer.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={customer.avatar} alt={customer.name} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                              {customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-gray-500">
                              Since {new Date(customer.customerSince).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{customer.email}</div>
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <Phone className="h-3 w-3 mr-1" />
                          {customer.phone}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{customer.company}</div>
                        <div className="text-xs text-gray-500">
                          {customer.industry}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">{customer.location}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50">
                          {customer.totalOrders} orders
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getCustomerValueProgress(customer.totalSpent)}
                      </TableCell>
                      <TableCell>
                        ${customer.totalSpent.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingCart className="mr-2 h-4 w-4" />
                              View Orders
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" />
                              Mark as Churned
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Users className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-lg font-medium text-gray-600">
                          No customers found
                        </p>
                        <p className="text-sm text-gray-500">
                          Try adjusting your search or filter criteria
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, filteredCustomers.length)} of{" "}
            {filteredCustomers.length} customers
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-700">Rows per page</p>
              <Select
                value={`${itemsPerPage}`}
                onValueChange={(value) => {
                  setItemsPerPage(Number(value))
                  setCurrentPage(1)
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue placeholder={itemsPerPage} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 50, 100].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center justify-center w-10 text-sm text-gray-700">
              {currentPage}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}