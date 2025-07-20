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
import { Building, Users, User, MapPin, Plus, X } from "lucide-react"

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
      title: "Department Created",
      description: "New department has been successfully added to the organization.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-w-[95vw] max-h-[90dvh] overflow-y-auto bg-background p-0 border-none">
        {/* Mobile close button */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 bg-muted hover:bg-muted/80 transition-colors sm:hidden"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="px-6 pt-6 pb-4 border-b border-muted">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <Building className="h-5 w-5" />
            </div>
            <span className="text-xl font-medium">Create New Department</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="divide-y divide-muted">
          {/* Basic Information */}
          <div className="p-6 space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Building className="h-4 w-4" />
              Department Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dept-name">Department Name *</Label>
                <Input
                  id="dept-name"
                  placeholder="Enter department name"
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dept-code">Department Code *</Label>
                <Input
                  id="dept-code"
                  placeholder="DEPT-001"
                  required
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent-dept">Parent Department</Label>
                <Select>
                  <SelectTrigger className="bg-background">
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
                <Label htmlFor="dept-type">Department Type</Label>
                <Select>
                  <SelectTrigger className="bg-background">
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
          <div className="p-6 space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <User className="h-4 w-4" />
              Management & Staffing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dept-head">Department Head</Label>
                <Select>
                  <SelectTrigger className="bg-background">
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
                <Label htmlFor="assistant-head">Assistant Head</Label>
                <Select>
                  <SelectTrigger className="bg-background">
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
                <Label htmlFor="current-staff">Current Staff Count</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current-staff"
                    type="number"
                    placeholder="0"
                    className="pl-10 bg-background"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-capacity">Maximum Capacity</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="max-capacity"
                    type="number"
                    placeholder="50"
                    className="pl-10 bg-background"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Location & Budget */}
          <div className="p-6 space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Location & Budget
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="office-location">Office Location</Label>
                <Input
                  id="office-location"
                  placeholder="Building A, Floor 3"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost-center">Cost Center</Label>
                <Input
                  id="cost-center"
                  placeholder="CC-001"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="annual-budget">Annual Budget</Label>
                <Input
                  id="annual-budget"
                  type="number"
                  placeholder="500000"
                  className="bg-background"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="active">
                  <SelectTrigger className="bg-background">
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
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">
              Description & Responsibilities
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Department Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the department's purpose and main functions..."
                  className="bg-background min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsibilities">Key Responsibilities</Label>
                <Textarea
                  id="responsibilities"
                  placeholder="List the main responsibilities and duties of this department..."
                  className="bg-background min-h-[100px]"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="sticky bottom-0 bg-background p-4 border-t border-muted shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)} 
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="px-6 bg-black"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Department
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