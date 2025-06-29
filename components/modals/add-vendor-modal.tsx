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

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Vendor Added Successfully!",
      description: "New vendor has been added to your vendor database.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            Add New Vendor
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-orange-600" />
              Company Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company-name" className="text-sm font-medium text-gray-700">
                  Company Name *
                </Label>
                <Input
                  id="company-name"
                  placeholder="Enter company name"
                  required
                  className="bg-white/80 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor-code" className="text-sm font-medium text-gray-700">
                  Vendor Code *
                </Label>
                <Input
                  id="vendor-code"
                  placeholder="VEN-001"
                  required
                  className="bg-white/80 border-gray-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-sm font-medium text-gray-700">
                  Industry
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-orange-400 focus:ring-orange-400">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="services">Services</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor-type" className="text-sm font-medium text-gray-700">
                  Vendor Type
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-orange-400 focus:ring-orange-400">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier">Supplier</SelectItem>
                    <SelectItem value="contractor">Contractor</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="service-provider">Service Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-blue-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-person" className="text-sm font-medium text-gray-700">
                  Contact Person *
                </Label>
                <Input
                  id="contact-person"
                  placeholder="John Doe"
                  required
                  className="bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    required
                    className="pl-10 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="contact@company.com"
                    required
                    className="pl-10 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                  Website
                </Label>
                <Input
                  id="website"
                  placeholder="https://company.com"
                  className="bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              Address Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Street Address
                </Label>
                <Input
                  id="address"
                  placeholder="123 Business Street"
                  className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                  City
                </Label>
                <Input
                  id="city"
                  placeholder="New York"
                  className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                  State/Province
                </Label>
                <Input
                  id="state"
                  placeholder="NY"
                  className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip" className="text-sm font-medium text-gray-700">
                  ZIP/Postal Code
                </Label>
                <Input
                  id="zip"
                  placeholder="10001"
                  className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                  Country
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-600" />
              Payment Terms & Notes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="payment-terms" className="text-sm font-medium text-gray-700">
                  Payment Terms
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                    <SelectValue placeholder="Select payment terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="net-30">Net 30 Days</SelectItem>
                    <SelectItem value="net-15">Net 15 Days</SelectItem>
                    <SelectItem value="net-7">Net 7 Days</SelectItem>
                    <SelectItem value="cod">Cash on Delivery</SelectItem>
                    <SelectItem value="prepaid">Prepaid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="credit-limit" className="text-sm font-medium text-gray-700">
                  Credit Limit
                </Label>
                <Input
                  id="credit-limit"
                  type="number"
                  placeholder="50000"
                  className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this vendor..."
                className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                rows={3}
              />
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
              className="px-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Vendor...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Vendor
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
