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
  Star,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ArrowUpDown,
  Filter,
  Check,
  X,
  Clock,
  Building,
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

interface Vendor {
  id: string
  name: string
  contact: string
  email: string
  phone: string
  category: string
  rating: number
  totalOrders: number
  totalSpent: number
  status: "active" | "inactive" | "pending"
  lastOrder: string
  paymentTerms: string
  leadTime: number
}

const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Tech Supplies Inc",
    contact: "John Manager",
    email: "john@techsupplies.com",
    phone: "+1 (555) 123-4567",
    category: "Technology",
    rating: 4.8,
    totalOrders: 45,
    totalSpent: 125000,
    status: "active",
    lastOrder: "2024-01-15",
    paymentTerms: "Net 30",
    leadTime: 7,
  },
  {
    id: "2",
    name: "Office Equipment Co",
    contact: "Sarah Wilson",
    email: "sarah@officeequip.com",
    phone: "+1 (555) 987-6543",
    category: "Office Supplies",
    rating: 4.5,
    totalOrders: 32,
    totalSpent: 78500,
    status: "active",
    lastOrder: "2024-01-12",
    paymentTerms: "Net 15",
    leadTime: 5,
  },
  {
    id: "3",
    name: "Industrial Materials Ltd",
    contact: "Mike Davis",
    email: "mike@industrial.com",
    phone: "+1 (555) 456-7890",
    category: "Manufacturing",
    rating: 4.2,
    totalOrders: 18,
    totalSpent: 245000,
    status: "pending",
    lastOrder: "2024-01-08",
    paymentTerms: "Net 45",
    leadTime: 14,
  },
  {
    id: "4",
    name: "Packaging Solutions",
    contact: "Emily Brown",
    email: "emily@packaging.com",
    phone: "+1 (555) 234-5678",
    category: "Packaging",
    rating: 4.7,
    totalOrders: 28,
    totalSpent: 92500,
    status: "active",
    lastOrder: "2024-01-10",
    paymentTerms: "Net 30",
    leadTime: 10,
  },
  {
    id: "5",
    name: "Safety Equipment Co",
    contact: "Robert Johnson",
    email: "robert@safety.com",
    phone: "+1 (555) 345-6789",
    category: "Safety",
    rating: 3.9,
    totalOrders: 15,
    totalSpent: 48500,
    status: "inactive",
    lastOrder: "2023-12-15",
    paymentTerms: "Net 30",
    leadTime: 12,
  },
  {
    id: "6",
    name: "Electronics Distributors",
    contact: "Lisa Smith",
    email: "lisa@electronics.com",
    phone: "+1 (555) 456-7890",
    category: "Electronics",
    rating: 4.6,
    totalOrders: 37,
    totalSpent: 187500,
    status: "active",
    lastOrder: "2024-01-14",
    paymentTerms: "Net 30",
    leadTime: 8,
  },
  {
    id: "7",
    name: "Furniture Manufacturers",
    contact: "David Wilson",
    email: "david@furniture.com",
    phone: "+1 (555) 567-8901",
    category: "Furniture",
    rating: 4.3,
    totalOrders: 22,
    totalSpent: 156000,
    status: "active",
    lastOrder: "2024-01-09",
    paymentTerms: "Net 45",
    leadTime: 21,
  },
  {
    id: "8",
    name: "Computer Parts Inc",
    contact: "Jessica Lee",
    email: "jessica@computerparts.com",
    phone: "+1 (555) 678-9012",
    category: "Technology",
    rating: 4.4,
    totalOrders: 41,
    totalSpent: 203500,
    status: "active",
    lastOrder: "2024-01-13",
    paymentTerms: "Net 30",
    leadTime: 5,
  },
  {
    id: "9",
    name: "Office Supplies Plus",
    contact: "Daniel Clark",
    email: "daniel@officesupplies.com",
    phone: "+1 (555) 789-0123",
    category: "Office Supplies",
    rating: 4.1,
    totalOrders: 19,
    totalSpent: 62500,
    status: "pending",
    lastOrder: "2024-01-05",
    paymentTerms: "Net 15",
    leadTime: 7,
  },
  {
    id: "10",
    name: "Industrial Tools Co",
    contact: "Amanda White",
    email: "amanda@tools.com",
    phone: "+1 (555) 890-1234",
    category: "Manufacturing",
    rating: 4.0,
    totalOrders: 26,
    totalSpent: 142000,
    status: "active",
    lastOrder: "2024-01-11",
    paymentTerms: "Net 30",
    leadTime: 10,
  },
]

export function VendorTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: string
  } | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { toast } = useToast()

  const filteredVendors = useMemo(() => {
    let filtered = [...mockVendors]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vendor.phone.includes(searchTerm) ||
          vendor.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((vendor) => vendor.status === statusFilter)
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((vendor) => vendor.category === categoryFilter)
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key as keyof Vendor] < b[sortConfig.key as keyof Vendor]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key as keyof Vendor] > b[sortConfig.key as keyof Vendor]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [searchTerm, statusFilter, categoryFilter, sortConfig])

  // Pagination logic
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredVendors.slice(indexOfFirstItem, indexOfLastItem)

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
      setSelectedRows(currentItems.map((vendor) => vendor.id))
    }
  }

  const handleBulkExport = () => {
    toast({
      title: "Export prepared",
      description: `Data for ${selectedRows.length} vendors is ready for download`,
    })
  }

  const handleBulkEmail = () => {
    toast({
      title: "Email campaign prepared",
      description: `Email will be sent to ${selectedRows.length} vendors`,
    })
  }

  const getStatusBadge = (status: Vendor["status"]) => {
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
            <X className="h-3 w-3 mr-1" />
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge className="whitespace-nowrap bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }

  const categories = [...new Set(mockVendors.map((v) => v.category))]

  return (
    <div className="flex-1 space-y-4">
      {/* Vendor Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Vendor Directory
              </CardTitle>
              <CardDescription>
                {filteredVendors.length} vendors found
                {selectedRows.length > 0 && (
                  <span className="ml-2">• {selectedRows.length} selected</span>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search vendors, contacts, categories..."
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
                <DropdownMenuContent className="w-56">
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                    <X className="mr-2 h-4 w-4 text-red-600" />
                    Inactive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCategoryFilter("all")}>
                    All Categories
                  </DropdownMenuItem>
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        {selectedRows.length > 0 && (
          <div className="border-b border-gray-200 px-6 py-3 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedRows.length} vendor{selectedRows.length !== 1 ? "s" : ""}{" "}
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
                      Vendor Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("category")}
                  >
                    <div className="flex items-center">
                      Category
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("rating")}
                  >
                    <div className="flex items-center">
                      Rating
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("totalOrders")}
                  >
                    <div className="flex items-center">
                      Orders
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
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
                  currentItems.map((vendor) => (
                    <TableRow
                      key={vendor.id}
                      className={cn(
                        "hover:bg-gray-50",
                        selectedRows.includes(vendor.id) && "bg-gray-50"
                      )}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(vendor.id)}
                          onChange={() => toggleRowSelection(vendor.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {vendor.name}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{vendor.contact}</div>
                          <div className="text-xs text-gray-500">{vendor.email}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Phone className="h-3 w-3 mr-1" />
                            {vendor.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50">
                          {vendor.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {renderRating(vendor.rating)}
                      </TableCell>
                      <TableCell>
                        {vendor.totalOrders}
                      </TableCell>
                      <TableCell>
                        ${vendor.totalSpent.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(vendor.status)}
                      </TableCell>
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
                              Edit Vendor
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Call Vendor
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" />
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Building className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-lg font-medium text-gray-600">
                          No vendors found
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
            {Math.min(indexOfLastItem, filteredVendors.length)} of{" "}
            {filteredVendors.length} vendors
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