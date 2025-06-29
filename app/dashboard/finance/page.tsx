"use client"

import { useState } from "react"
import { FinanceOverview } from "@/components/finance/finance-overview"
import { TransactionList } from "@/components/finance/transaction-list"
import { AddTransactionModal } from "@/components/modals/add-transaction-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function FinancePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Finance & Accounting</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage accounts, transactions, invoices, and financial reports
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </div>

      <FinanceOverview />
      <TransactionList />

      <AddTransactionModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
