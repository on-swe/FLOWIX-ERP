"use client";

import { useState } from "react";
import { AddTransactionModal } from "@/components/modals/add-transaction-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Stats } from "@/components/common/stats";
import { financeStats } from "@/mock/stats";
import { TransactionTable } from "@/components/finance/transaction-list";

export default function FinancePage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
      <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Finance & Accounting
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage accounts, transactions, invoices, and financial reports
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </div>
      <Stats stats={financeStats} />
      <TransactionTable />

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
