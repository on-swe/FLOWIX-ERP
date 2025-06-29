import { VendorList } from "@/components/vendors/vendor-list"
import { VendorStats } from "@/components/vendors/vendor-stats"
import { AddVendorModal } from "@/components/modals/add-vendor-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function VendorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Vendor Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage vendor relationships, contracts, and performance metrics
          </p>
        </div>
        <AddVendorModal>
          <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Vendor
          </Button>
        </AddVendorModal>
      </div>

      <VendorStats />
      <VendorList />
    </div>
  )
}
