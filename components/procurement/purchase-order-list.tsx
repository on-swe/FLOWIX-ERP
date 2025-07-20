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
  FileText,
  Truck,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ArrowUpDown,
  Filter,
  Plus,
  Check,
  X,
  Clock,
  Package,
  PackageCheck,
  AlertCircle,
  Box,
  Download,
  DollarSign,
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
import { Progress } from "../ui/progress"

interface PurchaseOrder {
  id: string
  poNumber: string
  vendor: string
  vendorContact: string
  date: string
  deliveryDate: string
  amount: number
  status: "draft" | "sent" | "confirmed" | "partial" | "delivered" | "cancelled"
  items: number
  receivedItems: number
  paymentTerms: string
  shippingMethod: string
}

const mockPOs: PurchaseOrder[] = [
  {
    id: "1",
    poNumber: "PO-2024-001",
    vendor: "Tech Supplies Inc",
    vendorContact: "John Smith (john@techsupplies.com)",
    date: "2024-01-15",
    deliveryDate: "2024-01-25",
    amount: 15750.0,
    status: "confirmed",
    items: 12,
    receivedItems: 0,
    paymentTerms: "Net 30",
    shippingMethod: "FedEx Ground",
  },
  {
    id: "2",
    poNumber: "PO-2024-002",
    vendor: "Office Equipment Co",
    vendorContact: "Sarah Johnson (sarah@officeequip.com)",
    date: "2024-01-14",
    deliveryDate: "2024-01-28",
    amount: 8950.5,
    status: "sent",
    items: 8,
    receivedItems: 0,
    paymentTerms: "Net 15",
    shippingMethod: "UPS Express",
  },
  {
    id: "3",
    poNumber: "PO-2024-003",
    vendor: "Industrial Materials Ltd",
    vendorContact: "Michael Brown (michael@industrial.com)",
    date: "2024-01-13",
    deliveryDate: "2024-01-20",
    amount: 24500.0,
    status: "partial",
    items: 25,
    receivedItems: 18,
    paymentTerms: "Net 45",
    shippingMethod: "Freight",
  },
  {
    id: "4",
    poNumber: "PO-2024-004",
    vendor: "Electronics Distributors",
    vendorContact: "Emily Davis (emily@electronics.com)",
    date: "2024-01-12",
    deliveryDate: "2024-01-18",
    amount: 12000.0,
    status: "delivered",
    items: 15,
    receivedItems: 15,
    paymentTerms: "Net 30",
    shippingMethod: "DHL",
  },
  {
    id: "5",
    poNumber: "PO-2024-005",
    vendor: "Packaging Solutions",
    vendorContact: "Robert Wilson (robert@packaging.com)",
    date: "2024-01-11",
    deliveryDate: "2024-01-17",
    amount: 7500.0,
    status: "cancelled",
    items: 10,
    receivedItems: 0,
    paymentTerms: "Net 15",
    shippingMethod: "USPS",
  },
  {
    id: "6",
    poNumber: "PO-2024-006",
    vendor: "Safety Equipment Co",
    vendorContact: "Lisa Miller (lisa@safety.com)",
    date: "2024-01-10",
    deliveryDate: "2024-01-22",
    amount: 18500.0,
    status: "confirmed",
    items: 20,
    receivedItems: 0,
    paymentTerms: "Net 30",
    shippingMethod: "FedEx Ground",
  },
  {
    id: "7",
    poNumber: "PO-2024-007",
    vendor: "Furniture Manufacturers",
    vendorContact: "David Taylor (david@furniture.com)",
    date: "2024-01-09",
    deliveryDate: "2024-01-30",
    amount: 32000.0,
    status: "draft",
    items: 35,
    receivedItems: 0,
    paymentTerms: "Net 60",
    shippingMethod: "Freight",
  },
  {
    id: "8",
    poNumber: "PO-2024-008",
    vendor: "Computer Parts Inc",
    vendorContact: "Jessica Lee (jessica@computerparts.com)",
    date: "2024-01-08",
    deliveryDate: "2024-01-15",
    amount: 14250.0,
    status: "partial",
    items: 18,
    receivedItems: 12,
    paymentTerms: "Net 30",
    shippingMethod: "UPS Express",
  },
  {
    id: "9",
    poNumber: "PO-2024-009",
    vendor: "Office Supplies Plus",
    vendorContact: "Daniel Clark (daniel@officesupplies.com)",
    date: "2024-01-07",
    deliveryDate: "2024-01-14",
    amount: 6500.0,
    status: "delivered",
    items: 8,
    receivedItems: 8,
    paymentTerms: "Net 15",
    shippingMethod: "USPS",
  },
  {
    id: "10",
    poNumber: "PO-2024-010",
    vendor: "Industrial Tools Co",
    vendorContact: "Amanda White (amanda@tools.com)",
    date: "2024-01-06",
    deliveryDate: "2024-01-16",
    amount: 28750.0,
    status: "sent",
    items: 30,
    receivedItems: 0,
    paymentTerms: "Net 45",
    shippingMethod: "Freight",
  },
]

export function PurchaseOrderList() {
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

  
  const filteredOrders = useMemo(() => {
    let filtered = [...mockPOs]

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.vendorContact.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key as keyof PurchaseOrder] < b[sortConfig.key as keyof PurchaseOrder]) {
          return sortConfig.direction === "ascending" ? -1 : 1
        }
        if (a[sortConfig.key as keyof PurchaseOrder] > b[sortConfig.key as keyof PurchaseOrder]) {
          return sortConfig.direction === "ascending" ? 1 : -1
        }
        return 0
      })
    }

    return filtered
  }, [searchTerm, statusFilter, sortConfig])

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem)

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
      setSelectedRows(currentItems.map((order) => order.id))
    }
  }

  const handleBulkExport = () => {
    toast({
      title: "Export prepared",
      description: `Data for ${selectedRows.length} purchase orders is ready for download`,
    })
  }

  const handleBulkCancel = () => {
    toast({
      title: "Orders cancelled",
      description: `${selectedRows.length} purchase orders have been cancelled`,
      variant: "destructive",
    })
    setSelectedRows([])
  }

  const getStatusBadge = (status: PurchaseOrder["status"]) => {
    switch (status) {
      case "draft":
        return (
          <Badge className="whitespace-nowrap bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200">
            <FileText className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        )
      case "sent":
        return (
          <Badge className="whitespace-nowrap bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            <Truck className="h-3 w-3 mr-1" />
            Sent
          </Badge>
        )
      case "confirmed":
        return (
          <Badge className="whitespace-nowrap bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Check className="h-3 w-3 mr-1" />
            Confirmed
          </Badge>
        )
      case "partial":
        return (
          <Badge className="whitespace-nowrap bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Package className="h-3 w-3 mr-1" />
            Partial
          </Badge>
        )
      case "delivered":
        return (
          <Badge className="whitespace-nowrap bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            <PackageCheck className="h-3 w-3 mr-1" />
            Delivered
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

  const getDeliveryProgress = (items: number, receivedItems: number) => {
    const percentage = (receivedItems / items) * 100
    let color = "bg-gray-300"

    if (percentage === 0) {
      color = "bg-gray-300"
    } else if (percentage < 50) {
      color = "bg-yellow-400"
    } else if (percentage < 100) {
      color = "bg-blue-400"
    } else {
      color = "bg-green-400"
    }

    return (
      <div className="flex items-center space-x-2 whitespace-nowrap w-full">
        <Progress
          value={percentage}
          className={`h-2 ${color}`}
        />
        <span className="text-xs text-gray-500 w-8 text-right">
          {receivedItems}/{items}
        </span>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4">
    

      {/* Purchase Orders Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Purchase Orders
              </CardTitle>
              <CardDescription>
                {filteredOrders.length} orders found
                {selectedRows.length > 0 && (
                  <span className="ml-2">• {selectedRows.length} selected</span>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search POs, vendors, contacts..."
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
                  <DropdownMenuItem onClick={() => setStatusFilter("draft")}>
                    <FileText className="mr-2 h-4 w-4 text-gray-600" />
                    Draft
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("sent")}>
                    <Truck className="mr-2 h-4 w-4 text-blue-600" />
                    Sent
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("confirmed")}>
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Confirmed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("partial")}>
                    <Package className="mr-2 h-4 w-4 text-yellow-600" />
                    Partial
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("delivered")}>
                    <PackageCheck className="mr-2 h-4 w-4 text-purple-600" />
                    Delivered
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("cancelled")}>
                    <X className="mr-2 h-4 w-4 text-red-600" />
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        {selectedRows.length > 0 && (
          <div className="border-b border-gray-200 px-6 py-3 bg-gray-50 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {selectedRows.length} order{selectedRows.length !== 1 ? "s" : ""}{" "}
              selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleBulkExport}>
                <Download className="h-4 w-4 mr-2" />
                Export Selected
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBulkCancel}
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel Orders
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
                    onClick={() => requestSort("poNumber")}
                  >
                    <div className="flex items-center">
                      PO Number
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("date")}
                  >
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Delivery Date</TableHead>
                  <TableHead>Delivery Progress</TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => requestSort("amount")}
                  >
                    <div className="flex items-center">
                      Amount
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
                  currentItems.map((order) => (
                    <TableRow
                      key={order.id}
                      className={cn(
                        "hover:bg-gray-50",
                        selectedRows.includes(order.id) && "bg-gray-50"
                      )}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(order.id)}
                          onChange={() => toggleRowSelection(order.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.poNumber}
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{order.vendor}</div>
                        <div className="text-xs text-gray-500">
                          {order.vendorContact}
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(order.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(order.deliveryDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getDeliveryProgress(order.items, order.receivedItems)}
                      </TableCell>
                      <TableCell>
                        ${order.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" />
                              Cancel Order
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
                          No purchase orders found
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
            {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
            {filteredOrders.length} orders
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