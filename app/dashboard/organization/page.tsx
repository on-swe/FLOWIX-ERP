"use client"

import { DepartmentList } from "@/components/organization/department-list"
import { AddDepartmentModal } from "@/components/modals/add-department-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Stats } from "@/components/common/stats"
import { organizationStats } from "@/mock/stats"

export default function OrganizationPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
      <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Organization Management</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage organizational structure, departments, and hierarchy
          </p>
        </div>
        <AddDepartmentModal>
          <Button className="bg-black hover:bg-gray-800 text-white shadow-lg transition-all duration-200">
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        </AddDepartmentModal>
      </div>

      <Stats stats={organizationStats} />
      <DepartmentList />
    </div>
  );
}
