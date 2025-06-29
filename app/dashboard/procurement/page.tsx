import { ProcurementOverview } from "@/components/procurement/procurement-overview"
import { PurchaseOrderList } from "@/components/procurement/purchase-order-list"
import { AddPurchaseOrderModal } from "@/components/modals/add-purchase-order-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ProcurementPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Procurement Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage purchase orders, vendor relationships, and procurement processes
          </p>
        </div>
        <AddPurchaseOrderModal>
          <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            New Purchase Order
          </Button>
        </AddPurchaseOrderModal>
      </div>

      <ProcurementOverview />
      <PurchaseOrderList />
    </div>
  )
}
