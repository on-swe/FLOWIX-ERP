"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Edit, Eye, MessageSquare, User } from "lucide-react"

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
]

export function TicketList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tickets] = useState<Ticket[]>(mockTickets)

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getPriorityBadge = (priority: Ticket["priority"]) => {
    const priorityConfig = {
      low: { label: "Low", className: "bg-gray-100 text-gray-800" },
      medium: { label: "Medium", className: "bg-blue-100 text-blue-800" },
      high: { label: "High", className: "bg-orange-100 text-orange-800" },
      urgent: { label: "Urgent", className: "bg-red-100 text-red-800" },
    }

    const config = priorityConfig[priority]
    return (
      <Badge variant="default" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const getStatusBadge = (status: Ticket["status"]) => {
    const statusConfig = {
      open: { label: "Open", className: "bg-blue-100 text-blue-800" },
      "in-progress": { label: "In Progress", className: "bg-yellow-100 text-yellow-800" },
      waiting: { label: "Waiting", className: "bg-purple-100 text-purple-800" },
      resolved: { label: "Resolved", className: "bg-green-100 text-green-800" },
      closed: { label: "Closed", className: "bg-gray-100 text-gray-800" },
    }

    const config = statusConfig[status]
    return (
      <Badge variant="default" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Support Tickets</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assignee</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.ticketNumber}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell>{ticket.customer}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>{ticket.assignee}</TableCell>
                  <TableCell>{ticket.lastUpdate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
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
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
