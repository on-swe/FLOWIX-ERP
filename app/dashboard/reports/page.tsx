"use client"


import { ReportsList } from "@/components/reports/reports-list"
import { AddReportModal } from "@/components/modals/add-report-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Stats } from "@/components/common/stats"
import { reportsStats } from "@/mock/stats"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row justify-between items-end md:items-center">
      <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate insights, custom reports, and business intelligence dashboards
          </p>
        </div>
        <AddReportModal>
          <Button className="bg-black hover:bg-gray-800 text-white shadow-lg transition-all duration-200">
            <Plus className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </AddReportModal>
      </div>

      <Stats stats={reportsStats} />
      <ReportsList />
    </div>
  )
}
