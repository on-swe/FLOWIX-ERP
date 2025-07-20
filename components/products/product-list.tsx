"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  ArrowUpDown,
  Check,
  X,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  PackageSearch,
  ListFilter,
  Tag,
  Truck,
  ScanBarcode,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const products = [
  {
    id: "WH-001",
    name: "Wireless Headphones Pro",
    sku: "WH-001",
    barcode: "854123456789",
    category: "Electronics",
    price: 299.99,
    cost: 150.0,
    stock: 45,
    minStock: 10,
    status: "in-stock",
    location: "A12-4",
    supplier: "TechGadgets Inc.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "OC-002",
    name: "Ergonomic Office Chair",
    sku: "OC-002",
    barcode: "854123456790",
    category: "Furniture",
    price: 599.99,
    cost: 300.0,
    stock: 8,
    minStock: 5,
    status: "low-stock",
    location: "B05-2",
    supplier: "OfficeComfort Ltd.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "LS-003",
    name: "Adjustable Laptop Stand",
    sku: "LS-003",
    barcode: "854123456791",
    category: "Accessories",
    price: 89.99,
    cost: 45.0,
    stock: 0,
    minStock: 15,
    status: "out-of-stock",
    location: "C03-1",
    supplier: "Workspace Solutions",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "BS-004",
    name: "Bluetooth Speaker X3",
    sku: "BS-004",
    barcode: "854123456792",
    category: "Electronics",
    price: 149.99,
    cost: 75.0,
    stock: 32,
    minStock: 10,
    status: "in-stock",
    location: "A12-3",
    supplier: "AudioTech Corp.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "KB-005",
    name: "Mechanical Keyboard RGB",
    sku: "KB-005",
    barcode: "854123456793",
    category: "Electronics",
    price: 129.99,
    cost: 65.0,
    stock: 22,
    minStock: 8,
    status: "in-stock",
    location: "A11-2",
    supplier: "TechGadgets Inc.",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "MM-006",
    name: "Wireless Mouse Pro",
    sku: "MM-006",
    barcode: "854123456794",
    category: "Electronics",
    price: 59.99,
    cost: 30.0,
    stock: 3,
    minStock: 10,
    status: "low-stock",
    location: "A11-3",
    supplier: "TechGadgets Inc.",
    image: "/placeholder.svg?height=60&width=60",
  },
];

const stats = [
  {
    title: "Total Products",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: Package,
    color: "blue",
  },
  {
    title: "Total Value",
    value: "$45,231",
    change: "+8%",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "green",
  },
  {
    title: "Low Stock Items",
    value: "23",
    change: "-5%",
    changeType: "negative" as const,
    icon: AlertTriangle,
    color: "orange",
  },
];

export function ProductList() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const { toast } = useToast();

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.barcode &&
            product.barcode.includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((product) => product.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.category === categoryFilter
      );
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (
          a[sortConfig.key as keyof (typeof products)[0]] <
          b[sortConfig.key as keyof (typeof products)[0]]
        ) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof (typeof products)[0]] >
          b[sortConfig.key as keyof (typeof products)[0]]
        ) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, statusFilter, categoryFilter, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === currentItems.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentItems.map((product) => product.id));
    }
  };

  const handleBulkDelete = () => {
    toast({
      title: "Items deleted",
      description: `${selectedRows.length} items have been removed`,
      variant: "destructive",
    });
    setSelectedRows([]);
  };

  const handleBulkExport = () => {
    toast({
      title: "Export prepared",
      description: `Data for ${selectedRows.length} items is ready for download`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "in-stock":
        return (
          <Badge className="whitespace-nowrap bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Check className="h-3 w-3 mr-1" />
            In Stock
          </Badge>
        );
      case "low-stock":
        return (
          <Badge className="whitespace-nowrap bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Low Stock
          </Badge>
        );
      case "out-of-stock":
        return (
          <Badge className="whitespace-nowrap bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <X className="h-3 w-3 mr-1" />
            Out of Stock
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getStockProgress = (stock: number, minStock: number) => {
    const percentage = (stock / (minStock * 2)) * 100;
    let color = "bg-gray-300";

    if (stock === 0) {
      color = "bg-red-400";
    } else if (stock <= minStock) {
      color = "bg-yellow-400";
    } else if (stock <= minStock * 1.5) {
      color = "bg-blue-400";
    } else {
      color = "bg-green-400";
    }

    return (
      <div className="flex items-center space-x-2 whitespace-nowrap w-full">
        <Progress
          value={percentage > 100 ? 100 : percentage}
          className={`h-2 ${color}`}
        />
        <span className="text-xs text-gray-500 w-8 text-right">
          {stock}/{minStock}
        </span>
      </div>
    );
  };

  const categories = [...new Set(products.map((p) => p.category))];
  const suppliers = [...new Set(products.map((p) => p.supplier))];

  const getStatColor = (color: string) => {
    switch (color) {
      case "blue":
        return "from-blue-500 to-blue-600";
      case "green":
        return "from-green-500 to-green-600";
      case "orange":
        return "from-orange-500 to-orange-600";
      case "red":
        return "from-red-500 to-red-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Product Inventory
            </CardTitle>
            <CardDescription>
              {filteredProducts.length} products found
              {selectedRows.length > 0 && (
                <span className="ml-2">• {selectedRows.length} selected</span>
              )}
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search products, SKU, barcode..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="whitespace-nowrap">
                  <ListFilter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                  All Statuses
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("in-stock")}>
                  <Check className="mr-2 h-4 w-4 text-green-600" />
                  In Stock
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setStatusFilter("low-stock")}>
                  <AlertTriangle className="mr-2 h-4 w-4 text-yellow-600" />
                  Low Stock
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setStatusFilter("out-of-stock")}
                >
                  <X className="mr-2 h-4 w-4 text-red-600" />
                  Out of Stock
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
                    <Tag className="mr-2 h-4 w-4" />
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
            {selectedRows.length} item{selectedRows.length !== 1 ? "s" : ""}{" "}
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
              onClick={handleBulkDelete}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
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
                  onClick={() => requestSort("sku")}
                >
                  <div className="flex items-center">
                    SKU
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Product</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("category")}
                >
                  <div className="flex items-center">
                    Category
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("price")}
                >
                  <div className="flex items-center">
                    Price
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Margin</TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => requestSort("location")}
                >
                  <div className="flex items-center">
                    Location
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((product) => (
                  <TableRow
                    key={product.id}
                    className={cn(
                      "hover:bg-gray-50",
                      selectedRows.includes(product.id) && "bg-gray-50"
                    )}
                  >
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(product.id)}
                        onChange={() => toggleRowSelection(product.id)}
                        className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>{product.sku}</div>
                      {product.barcode && (
                        <div className="text-xs text-gray-500 flex items-center mt-1">
                          <ScanBarcode className="h-3 w-3 mr-1" />
                          {product.barcode}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 mr-3">
                          <img
                            className="h-10 w-10 rounded-lg object-cover border border-gray-200"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500">
                            ID: {product.id}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50">
                        {product.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {getStockProgress(product.stock, product.minStock)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        ${product.price.toFixed(2)}
                      </div>
                      <div className="text-xs text-gray-500">
                        Cost: ${product.cost.toFixed(2)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50">
                        {(
                          ((product.price - product.cost) / product.cost) *
                          100
                        ).toFixed(1)}
                        %
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(product.status)}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-gray-50">
                        {product.location}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {product.supplier}
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
                            Edit Product
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Reorder
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={11} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center py-8">
                      <PackageSearch className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-lg font-medium text-gray-600">
                        No products found
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
          {Math.min(indexOfLastItem, filteredProducts.length)} of{" "}
          {filteredProducts.length} products
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium text-gray-700">Rows per page</p>
            <Select
              value={`${itemsPerPage}`}
              onValueChange={(value) => {
                setItemsPerPage(Number(value));
                setCurrentPage(1);
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
  );
}
