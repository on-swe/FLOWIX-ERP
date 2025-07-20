"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Search,
  MoreHorizontal,
  Edit,
  Eye,
  FileText,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ArrowUpDown,
  Filter,
  Check,
  X,
  Clock,
  Download,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Banknote,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  type: "income" | "expense";
  amount: number;
  account: string;
  status: "completed" | "pending" | "cancelled";
  reference?: string;
  paymentMethod: string;
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    description: "Sales Revenue - Acme Corp",
    category: "Sales",
    type: "income",
    amount: 2450.0,
    account: "Checking Account",
    status: "completed",
    reference: "INV-2024-001",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "2",
    date: "2024-01-14",
    description: "Office Supplies Purchase",
    category: "Office Expenses",
    type: "expense",
    amount: 156.78,
    account: "Business Credit Card",
    status: "completed",
    reference: "POS-456789",
    paymentMethod: "Credit Card",
  },
  {
    id: "3",
    date: "2024-01-13",
    description: "Software Subscription",
    category: "Technology",
    type: "expense",
    amount: 299.99,
    account: "Checking Account",
    status: "pending",
    reference: "SUB-789012",
    paymentMethod: "Direct Debit",
  },
  {
    id: "4",
    date: "2024-01-12",
    description: "Consulting Fee",
    category: "Services",
    type: "income",
    amount: 1200.0,
    account: "Savings Account",
    status: "completed",
    reference: "INV-2024-002",
    paymentMethod: "Check",
  },
  {
    id: "5",
    date: "2024-01-11",
    description: "Rent Payment",
    category: "Facilities",
    type: "expense",
    amount: 1850.0,
    account: "Checking Account",
    status: "completed",
    reference: "RENT-JAN",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "6",
    date: "2024-01-10",
    description: "Marketing Campaign",
    category: "Marketing",
    type: "expense",
    amount: 750.5,
    account: "Business Credit Card",
    status: "completed",
    reference: "MKT-2024-01",
    paymentMethod: "Credit Card",
  },
  {
    id: "7",
    date: "2024-01-09",
    description: "Product Sales",
    category: "Sales",
    type: "income",
    amount: 3200.0,
    account: "Checking Account",
    status: "pending",
    reference: "INV-2024-003",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "8",
    date: "2024-01-08",
    description: "Equipment Purchase",
    category: "Equipment",
    type: "expense",
    amount: 4200.0,
    account: "Business Credit Card",
    status: "completed",
    reference: "EQP-456",
    paymentMethod: "Credit Card",
  },
  {
    id: "9",
    date: "2024-01-07",
    description: "Freelance Payment",
    category: "Services",
    type: "expense",
    amount: 850.0,
    account: "Checking Account",
    status: "cancelled",
    reference: "FL-789",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "10",
    date: "2024-01-06",
    description: "Advertising Revenue",
    category: "Advertising",
    type: "income",
    amount: 1800.0,
    account: "Savings Account",
    status: "completed",
    reference: "AD-2024-01",
    paymentMethod: "Bank Transfer",
  },
];

export function TransactionTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { toast } = useToast();

  const filteredTransactions = useMemo(() => {
    let filtered = [...mockTransactions];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.category
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          transaction.account
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (transaction.reference &&
            transaction.reference
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.status === statusFilter
      );
    }

    // Apply type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.type === typeFilter
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (transaction) => transaction.category === categoryFilter
      );
    }

    // Apply sorting
    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (
          a[sortConfig.key as keyof Transaction] <
          b[sortConfig.key as keyof Transaction]
        ) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof Transaction] >
          b[sortConfig.key as keyof Transaction]
        ) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, statusFilter, typeFilter, categoryFilter, sortConfig]);

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(
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
      setSelectedRows(currentItems.map((transaction) => transaction.id));
    }
  };

  const handleBulkExport = () => {
    toast({
      title: "Export prepared",
      description: `Data for ${selectedRows.length} transactions is ready for download`,
    });
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="whitespace-nowrap bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Check className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="whitespace-nowrap bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="whitespace-nowrap bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
            <X className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getTypeBadge = (type: Transaction["type"]) => {
    return type === "income" ? (
      <Badge className="whitespace-nowrap bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
        <TrendingUp className="h-3 w-3 mr-1" />
        Income
      </Badge>
    ) : (
      <Badge className="whitespace-nowrap bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
        <TrendingDown className="h-3 w-3 mr-1" />
        Expense
      </Badge>
    );
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case "credit card":
        return <CreditCard className="h-4 w-4 mr-2" />;
      case "bank transfer":
        return <Banknote className="h-4 w-4 mr-2" />;
      case "check":
        return <FileText className="h-4 w-4 mr-2" />;
      default:
        return <Banknote className="h-4 w-4 mr-2" />;
    }
  };

  const categories = [...new Set(mockTransactions.map((t) => t.category))];

  return (
    <div className="flex-1 space-y-4">
      {/* Transactions Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                Recent Transactions
              </CardTitle>
              <CardDescription>
                {filteredTransactions.length} transactions found
                {selectedRows.length > 0 && (
                  <span className="ml-2">• {selectedRows.length} selected</span>
                )}
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search transactions, references, categories..."
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
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("completed")}
                  >
                    <Check className="mr-2 h-4 w-4 text-green-600" />
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    <Clock className="mr-2 h-4 w-4 text-yellow-600" />
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("cancelled")}
                  >
                    <X className="mr-2 h-4 w-4 text-red-600" />
                    Cancelled
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setTypeFilter("all")}>
                    All Types
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("income")}>
                    <TrendingUp className="mr-2 h-4 w-4 text-blue-600" />
                    Income
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTypeFilter("expense")}>
                    <TrendingDown className="mr-2 h-4 w-4 text-purple-600" />
                    Expense
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
              {selectedRows.length} transaction
              {selectedRows.length !== 1 ? "s" : ""} selected
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
                    onClick={() => requestSort("date")}
                  >
                    <div className="flex items-center">
                      Date
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Description</TableHead>
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
                  <TableHead>Account</TableHead>
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
                  currentItems.map((transaction) => (
                    <TableRow
                      key={transaction.id}
                      className={cn(
                        "hover:bg-gray-50",
                        selectedRows.includes(transaction.id) && "bg-gray-50"
                      )}
                    >
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(transaction.id)}
                          onChange={() => toggleRowSelection(transaction.id)}
                          className="h-4 w-4 rounded border-gray-300 text-gray-700 focus:ring-gray-700"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>{transaction.description}</div>
                        {transaction.reference && (
                          <div className="text-xs text-gray-500">
                            Ref: {transaction.reference}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-gray-50">
                          {transaction.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                      <TableCell>
                        <div className="text-sm">{transaction.account}</div>
                        <div className="text-xs text-gray-500 flex items-center">
                          {getPaymentMethodIcon(transaction.paymentMethod)}
                          {transaction.paymentMethod}
                        </div>
                      </TableCell>
                      <TableCell
                        className={cn(
                          "font-medium",
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        )}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(transaction.status)}
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
                              Edit Transaction
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              Generate Report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <X className="mr-2 h-4 w-4" />
                              Cancel Transaction
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
                        <Banknote className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-lg font-medium text-gray-600">
                          No transactions found
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
            {Math.min(indexOfLastItem, filteredTransactions.length)} of{" "}
            {filteredTransactions.length} transactions
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
    </div>
  );
}
