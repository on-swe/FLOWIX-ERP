"use client"

import { PurchaseOrderList } from "@/components/procurement/purchase-order-list"
import { AddPurchaseOrderModal } from "@/components/modals/add-purchase-order-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Stats } from "@/components/common/stats"
import { procurementStats } from "@/mock/stats"
export default function ProcurementPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Procurement Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage purchase orders, vendor relationships, and procurement processes
          </p>
        </div>
        <AddPurchaseOrderModal>
          <Button className="bg-black hover:bg-gray-800 text-white shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Order
          </Button>
        </AddPurchaseOrderModal>
      </div>

      <Stats stats={procurementStats} />
      <PurchaseOrderList />
    </div>
  )
}
