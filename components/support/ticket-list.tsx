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
  MessageSquare,
  User,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ArrowUpDown,
  Filter,
  Check,
  X,
  Clock,
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

interface Ticket {
  id: string
  ticketNumber: string
  subject: string
  customer: string
  priority: "low" | "medium" | "high" | "urgent"
  status: "open" | "in-progress" | "waiting" | "resolved" | "closed"
  assignee: string
  created: string
  lastUpdate: string
}

const mockTickets: Ticket[] = [
  {
    id: "1",
    ticketNumber: "TKT-2024-001",
    subject: "Login issues with mobile app",
    customer: "John Smith",
    priority: "high",
    status: "in-progress",
    assignee: "Alice Johnson",
    created: "2024-01-15",
    lastUpdate: "2024-01-15 14:30",
  },
  {
    id: "2",
    ticketNumber: "TKT-2024-002",
    subject: "Payment processing error",
    customer: "Sarah Wilson",
    priority: "urgent",
    status: "open",
    assignee: "Bob Smith",
    created: "2024-01-15",
    lastUpdate: "2024-01-15 13:45",
  },
  {
    id: "3",
    ticketNumber: "TKT-2024-003",
    subject: "Feature request - Export functionality",
    customer: "Mike Davis",
    priority: "low",
    status: "waiting",
    assignee: "Carol Johnson",
    created: "2024-01-14",
    lastUpdate: "2024-01-14 16:20",
  },
  {
    id: "4",
    ticketNumber: "TKT-2024-004",
    subject: "Account verification problem",
    customer: "Emily Brown",
    priority: "medium",
    status: "open",
    assignee: "David Wilson",
    created: "2024-01-14",
    lastUpdate: "2024-01-14 11:15",
  },
  {
    id: "5",
    ticketNumber: "TKT-2024-005",
    subject: "Dashboard loading slowly",
    customer: "Frank Miller",
    priority: "high",
    status: "in-progress",
    assignee: "Grace Lee",
    created: "2024-01-13",
    lastUpdate: "2024-01-14 09:30",
  },
  {
    id: "6",
    ticketNumber: "TKT-2024-006",
    subject: "Password reset not working",
    customer: "Henry Clark",
    priority: "urgent",
    status: "resolved",
    assignee: "Isabella White",
    created: "2024-01-13",
    lastUpdate: "2024-01-13 17:45",
  },
  {
    id: "7",
    ticketNumber: "TKT-2024-007",
    subject: "Invoice download issue",
    customer: "Jack Taylor",
    priority: "medium",
    status: "closed",
    assignee: "Kevin Martin",
    created: "2024-01-12",
    lastUpdate: "2024-01-13 14:20",
  },
  {
    id: "8",
    ticketNumber: "TKT-2024-008",
    subject: "Mobile app crash on startup",
    customer: "Lisa Anderson",
    priority: "high",
    status: "in-progress",
    assignee: "Michael Brown",
    created: "2024-01-12",
    lastUpdate: "2024-01-12 16:50",
  },
  {
    id: "9",
    ticketNumber: "TKT-2024-009",
    subject: "Request for API documentation",
    customer: "Nathan Evans",
    priority: "low",
    status: "waiting",
    assignee: "Olivia Garcia",
    created: "2024-01-11",
    lastUpdate: "2024-01-11 10:15",
  },
  {
    id: "10",
    ticketNumber: "TKT-2024-010",
    subject: "Two-factor authentication setup",
    customer: "Patricia Lopez",
    priority: "medium",
    status: "resolved",
    assignee: "Robert Wilson",
    created: "2024-01-10",
    lastUpdate: "2024-01-11 08:30",
  },
]

export function TicketList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [assigneeFilter, setAssigneeFilter] = useState<string>("all")
  const [sortConfig, setSortConfig] = useState<{
    key: string
    direction: string
  } | null>(null)
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { toast } = useToast()

  const filteredTickets = useMemo(() => {
    let filtered = [...mockTickets]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (ticket) =>
          ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ticket.assignee.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter)
    }

    // Apply priority filter
    if (priorityFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.priority === priorityFilter)
    }

    // Apply assignee filter
    if (assigneeFilter !== "all") {
      filtered = filtered.filter((ticket) => ticket.assignee === assigneeFilter)
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key as keyof Ticket] < b[sortConfig.key as keyof Ticket]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key as keyof Ticket] > b[sortConfig.key as keyof Ticket]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [searchTerm, statusFilter, priorityFilter, assigneeFilter, sortConfig])

  // Pagination logic
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem)

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
      setSelectedRows(currentItems.map((ticket) => ticket.id))
    }
  }

  const handleBulkAction = () => {
    toast({
      title: "Bulk action prepared",
      description: `${selectedRows.length} tickets will be processed`,
    })
  }

  const getPriorityBadge = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "low":
        return (
          <Badge className="whitespace-nowrap bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            Low
          </Badge>
        )
      case "medium":
        return (
          <Badge className="whitespace-nowrap bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Medium
          </Badge>
        )
      case "high":
        return (
          <Badge className="whitespace-nowrap bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
            High
          </Badge>
        )
      case "urgent":
        return (
          <Badge className="whitespace-nowrap bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <Clock className="h-3 w-3 mr-1" />
            Urgent
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getStatusBadge = (status: Ticket["status"]) => {
    switch (status) {
      case "open":
        return (
          <Badge className="whitespace-nowrap bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Open
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="whitespace-nowrap bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            In Progress
          </Badge>
        )
      case "waiting":
        return (
          <Badge className="whitespace-nowrap bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            Waiting
          </Badge>
        )
      case "resolved":
        return (
          <Badge className="whitespace-nowrap bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Check className="h-3 w-3 mr-1" />
            Resolved
          </Badge>
        )
      case "closed":
        return (
          <Badge className="whitespace-nowrap bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <X className="h-3 w-3 mr-1" />
            Closed
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const assignees = [...new Set(mockTickets.map((t) => t.assignee))]
  const statuses = [...new Set(mockTickets.map((t) => t.status))]
  const priorities = [...new Set(mockTickets.map((t) => t.priority))]

  return (
    <div className="flex-1 space-y-4">
      {/* Tickets Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Support Tickets
              </CardTitle>
              <CardDescription>
                {filteredTickets.length} tickets found
                {selectedRows.length > 0 && (
                  <span className="ml-2">• {selectedRows.length} selected</span>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tickets, customers, assignees..."
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
                  {statuses.map((status) => (
                    <DropdownMenuItem
                      key={status}
                      onClick={() => setStatusFilter(status)}
                    >
                      {getStatusBadge(status)}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setPriorityFilter("all")}>
                    All Priorities
                  </DropdownMenuItem>
                  {priorities.map((priority) => (
                    <DropdownMenuItem
                      key={priority}
                      onClick={() => setPriorityFilter(priority)}
                    >
                      {getPriorityBadge(priority)}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setAssigneeFilter("all")}>
                    All Assignees
                  </DropdownMenuItem>
                  {assignees.map((assignee) => (
                    <DropdownMenuItem
                      key={assignee}
                      onClick={() => setAssigneeFilter(assignee)}
                    >
                      {assignee}
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
              {selectedRows.length} ticket{selectedRows.length !== 1 ? "s" : ""}{" "}
              selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkAction}>
                <Check className="h-4 w-4 mr-2" />
                Mark as Resolved
              </Button>
              <Button variant="outline" size="sm" onClick={handleBulkAction}>
                <User className="h-4 w-4 mr-2" />
                Reassign Selected
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
                    onClick={() => requestSort("ticketNumber")}
                  >
                    <div className="flex items-center">
                      Ticket ID
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("subject")}
                  >
                    <div className="flex items-center">
                      Subject
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("customer")}
                  >
                    <div className="flex items-center">
                      Customer
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("assignee")}
                  >
                    <div className="flex items-center">
                      Assignee
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("created")}
                  >
                    <div className="flex items-center">
                      Created
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
                  currentItems.map((ticket) => (
                    <TableRow
                      key={ticket.id}
                      className={cn(
                        "hover:bg-gray-50",
                        selectedRows.includes(ticket.id) && "bg-gray-50"
                      )}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(ticket.id)}
                          onChange={() => toggleRowSelection(ticket.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {ticket.ticketNumber}
                      </TableCell>
                      <TableCell>
                        <div>{ticket.subject}</div>
                        <div className="text-xs text-gray-500">
                          Last update: {ticket.lastUpdate}
                        </div>
                      </TableCell>
                      <TableCell>{ticket.customer}</TableCell>
                      <TableCell>
                        {getPriorityBadge(ticket.priority)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(ticket.status)}
                      </TableCell>
                      <TableCell>{ticket.assignee}</TableCell>
                      <TableCell>
                        {new Date(ticket.created).toLocaleDateString()}
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
                              Edit Ticket
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Add Comment
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              Reassign
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-green-600">
                              <Check className="mr-2 h-4 w-4" />
                              Mark Resolved
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
                        <MessageSquare className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-lg font-medium text-gray-600">
                          No tickets found
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
            {Math.min(indexOfLastItem, filteredTickets.length)} of{" "}
            {filteredTickets.length} tickets
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