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
  Download,
  Edit,
  Eye,
  Calendar,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ArrowUpDown,
  Filter,
  Check,
  X,
  Clock,
  FileText,
  FileSpreadsheet,
  File,
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

interface Report {
  id: string
  name: string
  category: string
  type: "standard" | "custom" | "scheduled"
  lastRun: string
  frequency: string
  format: "PDF" | "Excel" | "CSV"
  status: "active" | "inactive" | "draft"
  createdBy: string
  lastModified: string
}

const mockReports: Report[] = [
  {
    id: "1",
    name: "Monthly Sales Report",
    category: "Sales",
    type: "scheduled",
    lastRun: "2024-01-15",
    frequency: "Monthly",
    format: "PDF",
    status: "active",
    createdBy: "Alice Johnson",
    lastModified: "2024-01-10",
  },
  {
    id: "2",
    name: "Inventory Status Report",
    category: "Inventory",
    type: "standard",
    lastRun: "2024-01-14",
    frequency: "Weekly",
    format: "Excel",
    status: "active",
    createdBy: "Bob Smith",
    lastModified: "2024-01-05",
  },
  {
    id: "3",
    name: "Customer Analysis Dashboard",
    category: "CRM",
    type: "custom",
    lastRun: "2024-01-13",
    frequency: "On-demand",
    format: "PDF",
    status: "draft",
    createdBy: "Carol Davis",
    lastModified: "2024-01-12",
  },
  {
    id: "4",
    name: "Financial Quarterly Report",
    category: "Finance",
    type: "scheduled",
    lastRun: "2023-12-31",
    frequency: "Quarterly",
    format: "Excel",
    status: "active",
    createdBy: "David Wilson",
    lastModified: "2023-12-20",
  },
  {
    id: "5",
    name: "Marketing Campaign Performance",
    category: "Marketing",
    type: "custom",
    lastRun: "2024-01-10",
    frequency: "On-demand",
    format: "PDF",
    status: "active",
    createdBy: "Emily Brown",
    lastModified: "2024-01-08",
  },
  {
    id: "6",
    name: "Employee Productivity Metrics",
    category: "HR",
    type: "standard",
    lastRun: "2024-01-12",
    frequency: "Monthly",
    format: "CSV",
    status: "inactive",
    createdBy: "Frank Miller",
    lastModified: "2023-12-15",
  },
  {
    id: "7",
    name: "Website Traffic Analysis",
    category: "Analytics",
    type: "scheduled",
    lastRun: "2024-01-14",
    frequency: "Weekly",
    format: "PDF",
    status: "active",
    createdBy: "Grace Lee",
    lastModified: "2024-01-13",
  },
  {
    id: "8",
    name: "Supply Chain Optimization",
    category: "Operations",
    type: "custom",
    lastRun: "2024-01-09",
    frequency: "On-demand",
    format: "Excel",
    status: "draft",
    createdBy: "Henry Clark",
    lastModified: "2024-01-07",
  },
  {
    id: "9",
    name: "Customer Satisfaction Survey",
    category: "CRM",
    type: "standard",
    lastRun: "2023-12-20",
    frequency: "Quarterly",
    format: "PDF",
    status: "active",
    createdBy: "Isabella White",
    lastModified: "2023-12-18",
  },
  {
    id: "10",
    name: "Annual Revenue Forecast",
    category: "Finance",
    type: "scheduled",
    lastRun: "2023-12-31",
    frequency: "Annual",
    format: "Excel",
    status: "active",
    createdBy: "Jack Taylor",
    lastModified: "2023-12-28",
  },
]

export function ReportsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: string
  } | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { toast } = useToast()

  const filteredReports = useMemo(() => {
    let filtered = [...mockReports]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.createdBy.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter)
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter((report) => report.type === typeFilter)
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((report) => report.category === categoryFilter)
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key as keyof Report] < b[sortConfig.key as keyof Report]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key as keyof Report] > b[sortConfig.key as keyof Report]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [searchTerm, statusFilter, typeFilter, categoryFilter, sortConfig])

  // Pagination logic
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredReports.slice(indexOfFirstItem, indexOfLastItem)

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
      setSelectedRows(currentItems.map((report) => report.id))
    }
  }

  const handleBulkDownload = () => {
    toast({
      title: "Download prepared",
      description: `${selectedRows.length} reports will be downloaded as a zip file`,
    })
  }

  const handleBulkExport = () => {
    toast({
      title: "Export prepared",
      description: `Data for ${selectedRows.length} reports is ready for export`,
    })
  }

  const getTypeBadge = (type: Report["type"]) => {
    switch (type) {
      case "standard":
        return (
          <Badge className="whitespace-nowrap bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <FileText className="h-3 w-3 mr-1" />
            Standard
          </Badge>
        )
      case "custom":
        return (
          <Badge className="whitespace-nowrap bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            <File className="h-3 w-3 mr-1" />
            Custom
          </Badge>
        )
      case "scheduled":
        return (
          <Badge className="whitespace-nowrap bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Calendar className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: Report["status"]) => {
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
      case "draft":
        return (
          <Badge className="whitespace-nowrap bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getFormatIcon = (format: Report["format"]) => {
    switch (format) {
      case "PDF":
        return <FileText className="h-4 w-4 mr-2" />
      case "Excel":
        return <FileSpreadsheet className="h-4 w-4 mr-2" />
      case "CSV":
        return <File className="h-4 w-4 mr-2" />
      default:
        return <File className="h-4 w-4 mr-2" />
    }
  }

  const categories = [...new Set(mockReports.map((r) => r.category))]

  return (
    <div className="flex-1 space-y-4">
      {/* Reports Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Available Reports
              </CardTitle>
              <CardDescription>
                {filteredReports.length} reports found
                {selectedRows.length > 0 && (
                  <span className="ml-2">• {selectedRows.length} selected</span>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reports, categories, creators..."
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
                <DropdownMenuContent className="w-56 h-[23rem] overflow-y-scroll">
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
                  <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                    <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                    Draft
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                    All Types
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("standard")}>
                    <FileText className="mr-2 h-4 w-4 text-blue-600" />
                    Standard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("custom")}>
                    <File className="mr-2 h-4 w-4 text-purple-600" />
                    Custom
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("scheduled")}>
                    <Calendar className="mr-2 h-4 w-4 text-green-600" />
                    Scheduled
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
              {selectedRows.length} report{selectedRows.length !== 1 ? "s" : ""}{" "}
              selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download Selected
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkExport}>
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export Data
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
                      Report Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("category")}
                  >
                    <div className="flex items-center">
                      Category
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Format</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("lastRun")}
                  >
                    <div className="flex items-center">
                      Last Run
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right w-[100px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((report) => (
                    <TableRow
                      key={report.id}
                      className={cn(
                        "hover:bg-gray-50",
                        selectedRows.includes(report.id) && "bg-gray-50"
                      )}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(report.id)}
                          onChange={() => toggleRowSelection(report.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>{report.name}</div>
                        <div className="text-xs text-gray-500">
                          Created by: {report.createdBy}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50">
                          {report.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(report.type)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {getFormatIcon(report.format)}
                          {report.format}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50">
                          {report.frequency}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(report.status)}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {new Date(report.lastRun).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          Modified: {new Date(report.lastModified).toLocaleDateString()}
                        </div>
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
                              View Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule
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
                        <FileText className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-lg font-medium text-gray-600">
                          No reports found
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
            {Math.min(indexOfLastItem, filteredReports.length)} of{" "}
            {filteredReports.length} reports
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