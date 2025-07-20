"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Ticket, User, AlertCircle, Clock } from "lucide-react"

interface AddTicketModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddTicketModal({ isOpen, onClose }: AddTicketModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Support Ticket Created",
      description: "New support ticket has been created and assigned.",
    })

    setIsLoading(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-xl font-medium flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            New Support Ticket
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Ticket Information */}
          <div className="py-4 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Ticket className="h-4 w-4" />
                Ticket Details
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject *</Label>
                <Input 
                  id="subject" 
                  placeholder="Brief description of the issue" 
                  className="border-gray-300 focus:ring-gray-400"
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Detailed description of the issue..."
                  className="min-h-[120px] border-gray-300 focus:ring-gray-400"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Priority *</Label>
                  <Select required>
                    <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Category *</Label>
                  <Select required>
                    <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="border-gray-200">
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                      <SelectItem value="feature-request">Feature Request</SelectItem>
                      <SelectItem value="bug-report">Bug Report</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information */}
          <div className="py-4 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <User className="h-4 w-4" />
                Customer Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="customerName">Name *</Label>
                <Input 
                  id="customerName" 
                  placeholder="John Doe" 
                  className="border-gray-300 focus:ring-gray-400"
                  required 
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="customerEmail">Email *</Label>
                <Input 
                  id="customerEmail" 
                  type="email" 
                  placeholder="john@example.com" 
                  className="border-gray-300 focus:ring-gray-400"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="customerPhone">Phone</Label>
                <Input 
                  id="customerPhone" 
                  placeholder="+1 (555) 123-4567" 
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company">Company</Label>
                <Input 
                  id="company" 
                  placeholder="Acme Corporation" 
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Assignment */}
          <div className="py-4 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Assignment
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Assign To</Label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                    <SelectValue placeholder="Select agent" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectItem value="support-team">Support Team</SelectItem>
                    <SelectItem value="john-smith">John Smith</SelectItem>
                    <SelectItem value="jane-doe">Jane Doe</SelectItem>
                    <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Department</Label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectItem value="technical-support">Technical Support</SelectItem>
                    <SelectItem value="billing">Billing</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="general">General Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  id="dueDate" 
                  type="datetime-local" 
                  className="pl-10 border-gray-300 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onClose}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500"
              >
                {isLoading ? "Creating Ticket..." : "Create Ticket"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}