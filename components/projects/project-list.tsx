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
import { Progress } from "@/components/ui/progress"
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
  AlertCircle,
  Download,
  Plus,
  CircleDollarSign,
  User,
  Briefcase,
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

interface Project {
  id: string
  name: string
  client: string
  manager: string
  startDate: string
  endDate: string
  progress: number
  status: "planning" | "active" | "on-hold" | "completed" | "cancelled"
  budget: number
  teamSize: number
  spent: number
  priority: "low" | "medium" | "high"
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "E-commerce Platform Redesign",
    client: "Acme Corp",
    manager: "Alice Johnson",
    startDate: "2024-01-01",
    endDate: "2024-03-31",
    progress: 65,
    status: "active",
    budget: 125000,
    spent: 82500,
    teamSize: 8,
    priority: "high",
  },
  {
    id: "2",
    name: "Mobile App Development",
    client: "Tech Solutions Inc",
    manager: "Bob Smith",
    startDate: "2024-02-01",
    endDate: "2024-05-31",
    progress: 30,
    status: "active",
    budget: 85000,
    spent: 25500,
    teamSize: 5,
    priority: "medium",
  },
  {
    id: "3",
    name: "Data Migration Project",
    client: "Global Enterprises",
    manager: "Carol Davis",
    startDate: "2023-11-01",
    endDate: "2024-01-31",
    progress: 100,
    status: "completed",
    budget: 45000,
    spent: 42000,
    teamSize: 3,
    priority: "low",
  },
  {
    id: "4",
    name: "Website Redesign",
    client: "Creative Agency",
    manager: "David Wilson",
    startDate: "2024-01-15",
    endDate: "2024-04-30",
    progress: 45,
    status: "active",
    budget: 75000,
    spent: 33750,
    teamSize: 6,
    priority: "medium",
  },
  {
    id: "5",
    name: "ERP Implementation",
    client: "Manufacturing Co",
    manager: "Emily Brown",
    startDate: "2023-12-01",
    endDate: "2024-06-30",
    progress: 20,
    status: "on-hold",
    budget: 150000,
    spent: 30000,
    teamSize: 10,
    priority: "high",
  },
  {
    id: "6",
    name: "Marketing Campaign",
    client: "Retail Brand",
    manager: "Frank Miller",
    startDate: "2024-02-15",
    endDate: "2024-03-15",
    progress: 80,
    status: "active",
    budget: 35000,
    spent: 28000,
    teamSize: 4,
    priority: "medium",
  },
  {
    id: "7",
    name: "Product Launch",
    client: "Startup Ventures",
    manager: "Grace Lee",
    startDate: "2023-10-01",
    endDate: "2023-12-31",
    progress: 100,
    status: "completed",
    budget: 60000,
    spent: 58000,
    teamSize: 7,
    priority: "high",
  },
  {
    id: "8",
    name: "Security Audit",
    client: "Financial Services",
    manager: "Henry Clark",
    startDate: "2024-03-01",
    endDate: "2024-03-31",
    progress: 10,
    status: "planning",
    budget: 25000,
    spent: 2500,
    teamSize: 3,
    priority: "low",
  },
  {
    id: "9",
    name: "Cloud Migration",
    client: "Tech Startup",
    manager: "Isabella White",
    startDate: "2024-01-10",
    endDate: "2024-04-30",
    progress: 55,
    status: "active",
    budget: 90000,
    spent: 49500,
    teamSize: 5,
    priority: "high",
  },
  {
    id: "10",
    name: "Customer Portal",
    client: "Service Provider",
    manager: "Jack Taylor",
    startDate: "2023-09-01",
    endDate: "2023-11-30",
    progress: 100,
    status: "completed",
    budget: 50000,
    spent: 48000,
    teamSize: 4,
    priority: "medium",
  },
]

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: string
  } | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { toast } = useToast()

  const filteredProjects = useMemo(() => {
    let filtered = [...mockProjects]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.manager.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter)
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((project) => project.priority === priorityFilter)
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key as keyof Project] < b[sortConfig.key as keyof Project]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key as keyof Project] > b[sortConfig.key as keyof Project]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [searchTerm, statusFilter, priorityFilter, sortConfig])

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredProjects.slice(indexOfFirstItem, indexOfLastItem)

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
      setSelectedRows(currentItems.map((project) => project.id))
    }
  }

  const handleBulkExport = () => {
    toast({
      title: "Export prepared",
      description: `Data for ${selectedRows.length} projects is ready for download`,
    })
  }

  const getStatusBadge = (status: Project["status"]) => {
    switch (status) {
      case "planning":
        return (
          <Badge className="whitespace-nowrap bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <Clock className="h-3 w-3 mr-1" />
            Planning
          </Badge>
        )
      case "active":
        return (
          <Badge className="whitespace-nowrap bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Check className="h-3 w-3 mr-1" />
            Active
          </Badge>
        )
      case "on-hold":
        return (
          <Badge className="whitespace-nowrap bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            On Hold
          </Badge>
        )
      case "completed":
        return (
          <Badge className="whitespace-nowrap bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Check className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge className="whitespace-nowrap bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getPriorityBadge = (priority: Project["priority"]) => {
    switch (priority) {
      case "low":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-600">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-600">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-600">
            High
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getBudgetProgress = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100
    let color = "bg-gray-300"

    if (percentage < 50) {
      color = "bg-green-400"
    } else if (percentage < 80) {
      color = "bg-yellow-400"
    } else {
      color = "bg-red-400"
    }

    return (
      <div className="flex items-center space-x-2 whitespace-nowrap w-full">
        <Progress
          value={percentage > 100 ? 100 : percentage}
          className={`h-2 ${color}`}
        />
        <span className="text-xs text-gray-500 w-12 text-right">
          ${spent.toLocaleString()}/${budget.toLocaleString()}
        </span>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4">
      {/* Project Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Project Portfolio
              </CardTitle>
              <CardDescription>
                {filteredProjects.length} projects found
                {selectedRows.length > 0 && (
                  <span className="ml-2">• {selectedRows.length} selected</span>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects, clients, managers..."
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
                  <DropdownMenuItem onClick={() => setStatusFilter("planning")}>
                    <Clock className="mr-2 h-4 w-4 text-gray-600" />
                    Planning
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    <Check className="mr-2 h-4 w-4 text-blue-600" />
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("on-hold")}>
                    <AlertCircle className="mr-2 h-4 w-4 text-yellow-600" />
                    On Hold
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("completed")}>
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                    <X className="mr-2 h-4 w-4 text-red-600" />
                    Cancelled
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setPriorityFilter("all")}>
                    All Priorities
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("low")}>
                    Low
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>
                    Medium
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter("high")}>
                    High
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        {selectedRows.length > 0 && (
          <div className="border-b border-gray-200 px-6 py-3 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedRows.length} project{selectedRows.length !== 1 ? "s" : ""}{" "}
              selected
            </div>
            <div className="flex gap-2">
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
                      Project
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right w-[100px]">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.length > 0 ? (
                  currentItems.map((project) => (
                    <TableRow
                      key={project.id}
                      className={cn(
                        "hover:bg-gray-50",
                        selectedRows.includes(project.id) && "bg-gray-50"
                      )}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(project.id)}
                          onChange={() => toggleRowSelection(project.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {new Date(project.endDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>{project.client}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          {project.manager}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <Progress value={project.progress} className="w-24" />
                          <span className="text-xs text-gray-500">{project.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getBudgetProgress(project.spent, project.budget)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50">
                          {project.teamSize} members
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {getPriorityBadge(project.priority)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(project.status)}
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
                              Edit Project
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              Manage Team
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              View Timeline
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" />
                              Cancel Project
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
                        <Briefcase className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-lg font-medium text-gray-600">
                          No projects found
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
            {Math.min(indexOfLastItem, filteredProjects.length)} of{" "}
            {filteredProjects.length} projects
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