import { InventoryList } from "@/components/inventory/inventory-list"
import { InventoryStats } from "@/components/inventory/inventory-stats"
import { AddInventoryModal } from "@/components/modals/add-inventory-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Inventory Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your products, stock levels, and inventory operations
          </p>
        </div>
        <AddInventoryModal>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Inventory Item
          </Button>
        </AddInventoryModal>
      </div>

      <InventoryStats />
      <InventoryList />
    </div>
  )
}
