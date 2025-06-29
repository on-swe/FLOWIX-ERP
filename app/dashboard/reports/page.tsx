import { ReportsOverview } from "@/components/reports/reports-overview"
import { ReportsList } from "@/components/reports/reports-list"
import { AddReportModal } from "@/components/modals/add-report-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Generate insights, custom reports, and business intelligence dashboards
          </p>
        </div>
        <AddReportModal>
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Create Report
          </Button>
        </AddReportModal>
      </div>

      <ReportsOverview />
      <ReportsList />
    </div>
  )
}
