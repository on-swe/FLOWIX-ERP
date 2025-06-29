"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Building, Users, User, MapPin, Plus } from "lucide-react"

interface AddDepartmentModalProps {
  children: React.ReactNode
}

export function AddDepartmentModal({ children }: AddDepartmentModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Department Created!",
      description: "New department has been successfully added to the organization.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg">
              <Building className="h-5 w-5 text-white" />
            </div>
            Add Department
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Building className="h-5 w-5 text-teal-600" />
              Department Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dept-name" className="text-sm font-medium text-gray-700">
                  Department Name *
                </Label>
                <Input
                  id="dept-name"
                  placeholder="Enter department name"
                  required
                  className="bg-white/80 border-gray-200 focus:border-teal-400 focus:ring-teal-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept-code" className="text-sm font-medium text-gray-700">
                  Department Code *
                </Label>
                <Input
                  id="dept-code"
                  placeholder="DEPT-001"
                  required
                  className="bg-white/80 border-gray-200 focus:border-teal-400 focus:ring-teal-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent-dept" className="text-sm font-medium text-gray-700">
                  Parent Department
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-teal-400 focus:ring-teal-400">
                    <SelectValue placeholder="Select parent department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept-type" className="text-sm font-medium text-gray-700">
                  Department Type
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-teal-400 focus:ring-teal-400">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="support">Support</SelectItem>
                    <SelectItem value="administrative">Administrative</SelectItem>
                    <SelectItem value="strategic">Strategic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Management Information */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" />
              Management & Staffing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dept-head" className="text-sm font-medium text-gray-700">
                  Department Head
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue placeholder="Select department head" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-doe">John Doe</SelectItem>
                    <SelectItem value="jane-smith">Jane Smith</SelectItem>
                    <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                    <SelectItem value="sarah-wilson">Sarah Wilson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assistant-head" className="text-sm font-medium text-gray-700">
                  Assistant Head
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue placeholder="Select assistant head" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="alice-brown">Alice Brown</SelectItem>
                    <SelectItem value="bob-davis">Bob Davis</SelectItem>
                    <SelectItem value="carol-miller">Carol Miller</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="current-staff" className="text-sm font-medium text-gray-700">
                  Current Staff Count
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="current-staff"
                    type="number"
                    placeholder="0"
                    className="pl-10 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-capacity" className="text-sm font-medium text-gray-700">
                  Maximum Capacity
                </Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="max-capacity"
                    type="number"
                    placeholder="50"
                    className="pl-10 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location & Budget */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Location & Budget
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="office-location" className="text-sm font-medium text-gray-700">
                  Office Location
                </Label>
                <Input
                  id="office-location"
                  placeholder="Building A, Floor 3"
                  className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost-center" className="text-sm font-medium text-gray-700">
                  Cost Center
                </Label>
                <Input
                  id="cost-center"
                  placeholder="CC-001"
                  className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annual-budget" className="text-sm font-medium text-gray-700">
                  Annual Budget
                </Label>
                <Input
                  id="annual-budget"
                  type="number"
                  placeholder="500000"
                  className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <Select defaultValue="active">
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="restructuring">Restructuring</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Description & Responsibilities</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Department Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe the department's purpose and main functions..."
                  className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsibilities" className="text-sm font-medium text-gray-700">
                  Key Responsibilities
                </Label>
                <Textarea
                  id="responsibilities"
                  placeholder="List the main responsibilities and duties of this department..."
                  className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  rows={3}
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
              className="px-6 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Department...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Department
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
