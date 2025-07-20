"use client"

import { useState } from "react"
import {  EmployeeTable } from "@/components/hr/employee-list"
import { AddEmployeeModal } from "@/components/modals/add-employee-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Stats } from "@/components/common/stats"
import { hrStats } from "@/mock/stats"

export default function HRPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Human Resources</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage employees, attendance, payroll, and HR processes</p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>

      <Stats stats={hrStats} />

      <EmployeeTable />

      <AddEmployeeModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
