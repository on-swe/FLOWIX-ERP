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
import { Package, Barcode, MapPin, AlertTriangle, Plus } from "lucide-react"

interface AddInventoryModalProps {
  children: React.ReactNode
}

export function AddInventoryModal({ children }: AddInventoryModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Inventory Item Added!",
      description: "New inventory item has been successfully added to the system.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
            Add Inventory Item
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="h-5 w-5 text-blue-600" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-name" className="text-sm font-medium text-gray-700">
                  Item Name *
                </Label>
                <Input
                  id="item-name"
                  placeholder="Enter item name"
                  required
                  className="bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku" className="text-sm font-medium text-gray-700">
                  SKU *
                </Label>
                <div className="relative">
                  <Barcode className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="sku"
                    placeholder="SKU-001"
                    required
                    className="pl-10 bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium text-gray-700">
                  Category *
                </Label>
                <Select required>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="supplies">Office Supplies</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="materials">Raw Materials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="unit" className="text-sm font-medium text-gray-700">
                  Unit of Measure
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-blue-400 focus:ring-blue-400">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pieces">Pieces</SelectItem>
                    <SelectItem value="kg">Kilograms</SelectItem>
                    <SelectItem value="liters">Liters</SelectItem>
                    <SelectItem value="meters">Meters</SelectItem>
                    <SelectItem value="boxes">Boxes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Stock Information */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-green-600" />
              Stock Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-stock" className="text-sm font-medium text-gray-700">
                  Current Stock *
                </Label>
                <Input
                  id="current-stock"
                  type="number"
                  placeholder="0"
                  required
                  className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-stock" className="text-sm font-medium text-gray-700">
                  Minimum Stock Level
                </Label>
                <Input
                  id="min-stock"
                  type="number"
                  placeholder="10"
                  className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-stock" className="text-sm font-medium text-gray-700">
                  Maximum Stock Level
                </Label>
                <Input
                  id="max-stock"
                  type="number"
                  placeholder="1000"
                  className="bg-white/80 border-gray-200 focus:border-green-400 focus:ring-green-400"
                />
              </div>
            </div>
          </div>

          {/* Location & Notes */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              Location & Notes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                  Storage Location
                </Label>
                <Input
                  id="location"
                  placeholder="Warehouse A - Shelf 1"
                  className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier" className="text-sm font-medium text-gray-700">
                  Primary Supplier
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supplier1">ABC Supplies Co.</SelectItem>
                    <SelectItem value="supplier2">Global Materials Ltd.</SelectItem>
                    <SelectItem value="supplier3">Premium Parts Inc.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2 mt-4">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this inventory item..."
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
              className="px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Item...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Inventory Item
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
