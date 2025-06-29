"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { BarChart3, Calendar, Filter, FileText, Plus } from "lucide-react"

interface AddReportModalProps {
  children: React.ReactNode
}

export function AddReportModal({ children }: AddReportModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedModules, setSelectedModules] = useState<string[]>([])
  const { toast } = useToast()

  const handleModuleChange = (module: string, checked: boolean) => {
    if (checked) {
      setSelectedModules([...selectedModules, module])
    } else {
      setSelectedModules(selectedModules.filter((m) => m !== module))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Report Created!",
      description: "Custom report has been generated and is ready for viewing.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            Create Custom Report
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Report Information */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              Report Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-name" className="text-sm font-medium text-gray-700">
                  Report Name *
                </Label>
                <Input
                  id="report-name"
                  placeholder="Enter report name"
                  required
                  className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-type" className="text-sm font-medium text-gray-700">
                  Report Type *
                </Label>
                <Select required>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="summary">Summary Report</SelectItem>
                    <SelectItem value="detailed">Detailed Report</SelectItem>
                    <SelectItem value="analytical">Analytical Report</SelectItem>
                    <SelectItem value="comparative">Comparative Report</SelectItem>
                    <SelectItem value="dashboard">Dashboard Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="frequency" className="text-sm font-medium text-gray-700">
                  Frequency
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="one-time">One Time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="format" className="text-sm font-medium text-gray-700">
                  Output Format
                </Label>
                <Select defaultValue="pdf">
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-emerald-400 focus:ring-emerald-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Data Sources
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: "inventory", label: "Inventory" },
                { id: "sales", label: "Sales" },
                { id: "customers", label: "Customers" },
                { id: "finance", label: "Finance" },
                { id: "hr", label: "Human Resources" },
                { id: "projects", label: "Projects" },
                { id: "support", label: "Support" },
                { id: "procurement", label: "Procurement" },
                { id: "vendors", label: "Vendors" },
              ].map((module) => (
                <div key={module.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={module.id}
                    checked={selectedModules.includes(module.id)}
                    onCheckedChange={(checked) => handleModuleChange(module.id, checked as boolean)}
                  />
                  <Label htmlFor={module.id} className="text-sm font-medium text-gray-700">
                    {module.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              Date Range & Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date" className="text-sm font-medium text-gray-700">
                  Start Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="start-date"
                    type="date"
                    className="pl-10 bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-sm font-medium text-gray-700">
                  End Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="end-date"
                    type="date"
                    className="pl-10 bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department-filter" className="text-sm font-medium text-gray-700">
                  Department Filter
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="hr">Human Resources</SelectItem>
                    <SelectItem value="it">IT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status-filter" className="text-sm font-medium text-gray-700">
                  Status Filter
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                    <SelectValue placeholder="All statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Report Description */}
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Report Description & Notes</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this report will analyze and its purpose..."
                  className="bg-white/80 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipients" className="text-sm font-medium text-gray-700">
                  Email Recipients
                </Label>
                <Input
                  id="recipients"
                  placeholder="email1@company.com, email2@company.com"
                  className="bg-white/80 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="px-6">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Generating Report...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Report
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
