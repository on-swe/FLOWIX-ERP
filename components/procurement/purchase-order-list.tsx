"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, Filter, MoreHorizontal, Edit, Eye, FileText, Truck } from "lucide-react"

interface PurchaseOrder {
  id: string
  poNumber: string
  vendor: string
  date: string
  deliveryDate: string
  amount: number
  status: "draft" | "sent" | "confirmed" | "partial" | "delivered" | "cancelled"
  items: number
}

const mockPOs: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-2024-001",
    vendor: "Tech Supplies Inc",
    date: "2024-01-15",
    deliveryDate: "2024-01-25",
    amount: 15750.0,
    status: "confirmed",
    items: 12,
  },
  {
    id: "2",
    poNumber: "PO-2024-002",
    vendor: "Office Equipment Co",
    date: "2024-01-14",
    deliveryDate: "2024-01-28",
    amount: 8950.5,
    status: "sent",
    items: 8,
  },
  {
    id: "3",
    poNumber: "PO-2024-003",
    vendor: "Industrial Materials Ltd",
    date: "2024-01-13",
    deliveryDate: "2024-01-20",
    amount: 24500.0,
    status: "partial",
    items: 25,
  },
]

export function PurchaseOrderList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [orders] = useState<PurchaseOrder[]>(mockPOs)

  const filteredOrders = orders.filter(
    (order) =>
      order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.vendor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: PurchaseOrder["status"]) => {
    const statusConfig = {
      draft: { label: "Draft", className: "bg-gray-100 text-gray-800" },
      sent: { label: "Sent", className: "bg-blue-100 text-blue-800" },
      confirmed: { label: "Confirmed", className: "bg-green-100 text-green-800" },
      partial: { label: "Partial", className: "bg-yellow-100 text-yellow-800" },
      delivered: { label: "Delivered", className: "bg-purple-100 text-purple-800" },
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
          <CardTitle>Purchase Orders</CardTitle>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search purchase orders..."
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
                <TableHead>PO Number</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[70px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.poNumber}</TableCell>
                  <TableCell>{order.vendor}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.deliveryDate}</TableCell>
                  <TableCell>{order.items}</TableCell>
                  <TableCell>${order.amount.toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
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
                          Edit PO
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <FileText className="mr-2 h-4 w-4" />
                          Generate PDF
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" />
                          Track Delivery
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
