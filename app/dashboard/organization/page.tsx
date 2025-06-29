import { OrganizationOverview } from "@/components/organization/organization-overview"
import { DepartmentList } from "@/components/organization/department-list"
import { AddDepartmentModal } from "@/components/modals/add-department-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function OrganizationPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Organization Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage organizational structure, departments, and hierarchy
          </p>
        </div>
        <AddDepartmentModal>
          <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        </AddDepartmentModal>
      </div>

      <OrganizationOverview />
      <DepartmentList />
    </div>
  )
}
