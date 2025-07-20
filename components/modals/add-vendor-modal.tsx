"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Building2, Phone, Mail, MapPin, CreditCard, Plus } from "lucide-react"

interface AddVendorModalProps {
  children: React.ReactNode
}

export function AddVendorModal({ children }: AddVendorModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Vendor Added",
      description: "New vendor has been added to your database.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto border border-gray-200 shadow-lg">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-xl font-medium flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Add New Vendor
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Company Information */}
          <div className="py-4 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Company Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="company-name">Company Name *</Label>
                <Input
                  id="company-name"
                  placeholder="Enter company name"
                  required
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="vendor-code">Vendor Code *</Label>
                <Input
                  id="vendor-code"
                  placeholder="VEN-001"
                  required
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="industry">Industry</Label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="vendor-type">Vendor Type</Label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="py-4 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Contact Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="contact-person">Contact Person *</Label>
                <Input
                  id="contact-person"
                  placeholder="John Doe"
                  required
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    required
                    className="pl-10 border-gray-300 focus:ring-gray-400"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@company.com"
                    required
                    className="pl-10 border-gray-300 focus:ring-gray-400"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  placeholder="https://company.com"
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="py-4 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Address Information
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  placeholder="123 Business Street"
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  placeholder="New York"
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  placeholder="NY"
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="zip">ZIP/Postal Code</Label>
                <Input
                  id="zip"
                  placeholder="10001"
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="py-4 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Terms
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="payment-terms">Payment Terms</Label>
                <Select>
                  <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectItem value="net-30">Net 30 Days</SelectItem>
                    <SelectItem value="net-15">Net 15 Days</SelectItem>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="credit-limit">Credit Limit</Label>
                <Input
                  id="credit-limit"
                  type="number"
                  placeholder="50000"
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this vendor..."
                className="border-gray-300 focus:ring-gray-400 min-h-[100px]"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Vendor
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