"use client"

import { useState } from "react"
import { HROverview } from "@/components/hr/hr-overview"
import { EmployeeList } from "@/components/hr/employee-list"
import { AddEmployeeModal } from "@/components/modals/add-employee-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function HRPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Human Resources</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage employees, attendance, payroll, and HR processes</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <HROverview />
      <EmployeeList />

      <AddEmployeeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
