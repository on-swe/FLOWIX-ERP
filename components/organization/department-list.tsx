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
  Users,
  DollarSign,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ArrowUpDown,
  Filter,
  Check,
  X,
  Plus,
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

interface Department {
  id: string
  name: string
  manager: string
  employees: number
  budget: number
  location: string
  status: "active" | "inactive"
  description: string
}

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Engineering",
    manager: "Alice Johnson",
    employees: 45,
    budget: 2500000,
    location: "Building A, Floor 3",
    status: "active",
    description: "Software development and technical operations",
  },
  {
    id: "2",
    name: "Sales & Marketing",
    manager: "Bob Smith",
    employees: 32,
    budget: 1800000,
    location: "Building B, Floor 2",
    status: "active",
    description: "Sales operations and marketing campaigns",
  },
  {
    id: "3",
    name: "Human Resources",
    manager: "Carol Davis",
    employees: 12,
    budget: 850000,
    location: "Building A, Floor 1",
    status: "active",
    description: "Employee relations and organizational development",
  },
  {
    id: "4",
    name: "Finance",
    manager: "David Wilson",
    employees: 18,
    budget: 1200000,
    location: "Building C, Floor 1",
    status: "active",
    description: "Financial planning and accounting",
  },
  {
    id: "5",
    name: "Product Management",
    manager: "Emily Brown",
    employees: 15,
    budget: 1500000,
    location: "Building A, Floor 2",
    status: "active",
    description: "Product strategy and roadmap",
  },
  {
    id: "6",
    name: "Customer Support",
    manager: "Frank Miller",
    employees: 28,
    budget: 950000,
    location: "Building B, Floor 1",
    status: "active",
    description: "Customer service and technical support",
  },
  {
    id: "7",
    name: "Research & Development",
    manager: "Grace Lee",
    employees: 22,
    budget: 2000000,
    location: "Building D, Floor 3",
    status: "active",
    description: "Innovation and new technology research",
  },
  {
    id: "8",
    name: "Quality Assurance",
    manager: "Henry Clark",
    employees: 20,
    budget: 1100000,
    location: "Building A, Floor 4",
    status: "active",
    description: "Product testing and quality control",
  },
  {
    id: "9",
    name: "Operations",
    manager: "Isabella White",
    employees: 25,
    budget: 1300000,
    location: "Building C, Floor 2",
    status: "active",
    description: "Business operations and logistics",
  },
  {
    id: "10",
    name: "Legal",
    manager: "Jack Taylor",
    employees: 8,
    budget: 750000,
    location: "Building D, Floor 1",
    status: "active",
    description: "Legal affairs and compliance",
  },
]

export function DepartmentList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [locationFilter, setLocationFilter] = useState<string>("all")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: string
  } | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { toast } = useToast()

  const filteredDepartments = useMemo(() => {
    let filtered = [...mockDepartments]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (dept) =>
          dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dept.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dept.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dept.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((dept) => dept.status === statusFilter)
    }

    // Apply location filter
    if (locationFilter !== "all") {
      filtered = filtered.filter((dept) => dept.location === locationFilter)
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key as keyof Department] < b[sortConfig.key as keyof Department]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key as keyof Department] > b[sortConfig.key as keyof Department]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [searchTerm, statusFilter, locationFilter, sortConfig])

  // Pagination logic
  const totalPages = Math.ceil(filteredDepartments.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredDepartments.slice(indexOfFirstItem, indexOfLastItem)

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
      setSelectedRows(currentItems.map((dept) => dept.id))
    }
  }

  const handleBulkAction = () => {
    toast({
      title: "Bulk action prepared",
      description: `${selectedRows.length} departments will be processed`,
    })
  }

  const getStatusBadge = (status: Department["status"]) => {
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
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const locations = [...new Set(mockDepartments.map((d) => d.location))]

  return (
    <div className="flex-1 space-y-4">
      {/* Departments Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Department Structure
              </CardTitle>
              <CardDescription>
                {filteredDepartments.length} departments found
                {selectedRows.length > 0 && (
                  <span className="ml-2">• {selectedRows.length} selected</span>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search departments, managers, locations..."
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
                  <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>
                    <X className="mr-2 h-4 w-4 text-gray-600" />
                    Inactive
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setLocationFilter("all")}>
                    All Locations
                  </DropdownMenuItem>
                  {locations.map((location) => (
                    <DropdownMenuItem
                      key={location}
                      onClick={() => setLocationFilter(location)}
                    >
                      {location}
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
              {selectedRows.length} department{selectedRows.length !== 1 ? "s" : ""}{" "}
              selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkAction}>
                <Users className="h-4 w-4 mr-2" />
                Manage Employees
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkAction}>
                <DollarSign className="h-4 w-4 mr-2" />
                Budget Planning
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
                      Department
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("manager")}
                  >
                    <div className="flex items-center">
                      Manager
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("employees")}
                  >
                    <div className="flex items-center">
                      Employees
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("budget")}
                  >
                    <div className="flex items-center">
                      Budget
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right w-[100px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((dept) => (
                    <TableRow
                      key={dept.id}
                      className={cn(
                        "hover:bg-gray-50",
                        selectedRows.includes(dept.id) && "bg-gray-50"
                      )}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(dept.id)}
                          onChange={() => toggleRowSelection(dept.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{dept.name}</div>
                        <div className="text-xs text-gray-500">{dept.description}</div>
                      </TableCell>
                      <TableCell>{dept.manager}</TableCell>
                      <TableCell>{dept.employees}</TableCell>
                      <TableCell>${dept.budget.toLocaleString()}</TableCell>
                      <TableCell>{dept.location}</TableCell>
                      <TableCell>
                        {getStatusBadge(dept.status)}
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
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Department
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Manage Employees
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <DollarSign className="mr-2 h-4 w-4" />
                              Budget Planning
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {dept.status === "active" ? (
                              <DropdownMenuItem className="text-gray-600">
                                <X className="mr-2 h-4 w-4" />
                                Deactivate
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">
                                <Check className="mr-2 h-4 w-4" />
                                Activate
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      <div className="flex flex-col items-center justify-center py-8">
                        <Users className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-lg font-medium text-gray-600">
                          No departments found
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
            {Math.min(indexOfLastItem, filteredDepartments.length)} of{" "}
            {filteredDepartments.length} departments
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