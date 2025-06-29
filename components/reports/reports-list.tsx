"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Download, Edit, Eye, Calendar } from "lucide-react"

interface Report {
  id: string
  name: string
  category: string
  type: "standard" | "custom" | "scheduled"
  lastRun: string
  frequency: string
  format: "PDF" | "Excel" | "CSV"
  status: "active" | "inactive" | "draft"
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
  },
]

export function ReportsList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [reports] = useState<Report[]>(mockReports)

  const filteredReports = reports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getTypeBadge = (type: Report["type"]) => {
    const typeConfig = {
      standard: { label: "Standard", className: "bg-blue-100 text-blue-800" },
      custom: { label: "Custom", className: "bg-purple-100 text-purple-800" },
      scheduled: { label: "Scheduled", className: "bg-green-100 text-green-800" },
    }

    const config = typeConfig[type]
    return (
      <Badge variant="default" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  const getStatusBadge = (status: Report["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "inactive":
        return <Badge variant="secondary">Inactive</Badge>
      case "draft":
        return (
          <Badge variant="default" className="bg-yellow-100 text-yellow-800">
            Draft
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Available Reports</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
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
                <TableHead>Report Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead>Format</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Run</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.category}</TableCell>
                  <TableCell>{getTypeBadge(report.type)}</TableCell>
                  <TableCell>{report.frequency}</TableCell>
                  <TableCell>{report.format}</TableCell>
                  <TableCell>{getStatusBadge(report.status)}</TableCell>
                  <TableCell>{report.lastRun}</TableCell>
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
