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
import { BarChart3, Calendar, Filter, FileText, Plus, X } from "lucide-react"

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
      title: "Report Created",
      description: "Custom report has been generated and is ready for viewing.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-w-[95vw] max-h-[90dvh] overflow-y-auto bg-background border border-muted-foreground/20">
        {/* Mobile close button */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 sm:hidden"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="border-b border-muted-foreground/10 pb-4">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <BarChart3 className="h-5 w-5" />
            </div>
            <span className="text-xl font-medium">Create Custom Report</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="divide-y divide-muted-foreground/10">
          {/* Report Information */}
          <div className=" space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Report Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="report-name">Report Name *</Label>
                <Input
                  id="report-name"
                  placeholder="Enter report name"
                  required
                  className="border-muted-foreground/30 focus:border-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type *</Label>
                <Select required>
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
                <Label htmlFor="frequency">Frequency</Label>
                <Select>
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
                <Label htmlFor="format">Output Format</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
          <div className=" space-y-4 my-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Filter className="h-4 w-4" />
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
                  <Label htmlFor={module.id} className="text-sm">
                    {module.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className=" space-y-4 my-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range & Filters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="start-date"
                    type="date"
                    className="pl-10 border-muted-foreground/30 focus:border-muted-foreground/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="end-date"
                    type="date"
                    className="pl-10 border-muted-foreground/30 focus:border-muted-foreground/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="department-filter">Department Filter</Label>
                <Select>
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
                <Label htmlFor="status-filter">Status Filter</Label>
                <Select>
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
          <div className=" space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Report Description & Notes
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what this report will analyze and its purpose..."
                  className="border-muted-foreground/30 focus:border-muted-foreground/50 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipients">Email Recipients</Label>
                <Input
                  id="recipients"
                  placeholder="email1@company.com, email2@company.com"
                  className="border-muted-foreground/30 focus:border-muted-foreground/50"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-background py-4 border-t border-muted-foreground/10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="border-muted-foreground/30 hover:bg-muted"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-foreground text-background hover:bg-foreground/90"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}