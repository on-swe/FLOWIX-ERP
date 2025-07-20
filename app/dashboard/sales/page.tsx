"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AddSaleModal } from "@/components/modals/add-sale-modal";
import { Stats } from "@/components/common/stats";
import { salesStats as salesStatsData } from "@/mock/stats";
import { SalesTable } from "@/components/sales/sales-order-list";
import { sales } from "@/mock/sales";



export default function SalesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);



  return (
    <div className="flex-1 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
        <div className="w-full flex flex-col gap-2">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            Sales
          </h2>
          <p className="text-muted-foreground">
            Manage your sales orders and track revenue
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Sale
          </Button>
        </div>
      </div>

      <Stats stats={salesStatsData} />

      <SalesTable sales={sales} />
      <AddSaleModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
    </div>
  );
}
