"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Edit, Eye, Users, Calendar } from "lucide-react"

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
    teamSize: 8,
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
    teamSize: 5,
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
    teamSize: 3,
  },
]

export function ProjectList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [projects] = useState<Project[]>(mockProjects)

  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.manager.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: Project["status"]) => {
    const statusConfig = {
      planning: { label: "Planning", className: "bg-gray-100 text-gray-800" },
      active: { label: "Active", className: "bg-blue-100 text-blue-800" },
      "on-hold": { label: "On Hold", className: "bg-yellow-100 text-yellow-800" },
      completed: { label: "Completed", className: "bg-green-100 text-green-800" },
      cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800" },
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
          <CardTitle>Project Portfolio</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
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
                <TableHead>Project Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Team</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{project.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {project.startDate} - {project.endDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{project.client}</TableCell>
                  <TableCell>{project.manager}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <Progress value={project.progress} className="w-16" />
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>${project.budget.toLocaleString()}</TableCell>
                  <TableCell>{project.teamSize} members</TableCell>
                  <TableCell>{getStatusBadge(project.status)}</TableCell>
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
