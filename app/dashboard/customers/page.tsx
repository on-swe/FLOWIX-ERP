"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AddCustomerModal } from "@/components/modals/add-customer-modal";
import { Stats } from "@/components/common/stats";
import { customerStats } from "@/mock/stats";
import { CustomerTable } from "@/components/customers/customer-list";


export default function CustomersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);



  return (
    <div className="flex-1 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
      <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Customers
          </h2>
          <p className="text-muted-foreground">
            Manage your customer relationships and contacts
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>
      <Stats stats={customerStats} />
      <CustomerTable />

      <AddCustomerModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </div>
  );
}
