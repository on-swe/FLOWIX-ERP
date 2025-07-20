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
import { Package, Barcode, MapPin, AlertTriangle, Plus, X } from "lucide-react"

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
      title: "Inventory Item Added",
      description: "New inventory item has been successfully added to the system.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-w-[95vw] max-h-[90dvh] overflow-y-auto bg-background p-0 border border-muted-foreground/20">
        {/* Mobile close button - only shown on mobile */}
        <button 
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 rounded-full p-2 bg-muted hover:bg-muted/80 transition-colors sm:hidden"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <DialogHeader className="px-6 pt-6 pb-4 border-b border-muted-foreground/10">
          <DialogTitle className="flex items-center gap-3">
            <div className="p-2 bg-muted rounded-lg">
              <Package className="h-5 w-5" />
            </div>
            <span className="text-xl font-medium">Add Inventory Item</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="divide-y divide-muted-foreground/10">
          {/* Basic Information */}
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item Name *</Label>
                <Input
                  id="item-name"
                  placeholder="Enter item name"
                  required
                  className="border-muted-foreground/30 focus:border-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU *</Label>
                <div className="relative">
                  <Barcode className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="sku"
                    placeholder="SKU-001"
                    required
                    className="pl-10 border-muted-foreground/30 focus:border-muted-foreground/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select required>
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
                <Label htmlFor="unit">Unit of Measure</Label>
                <Select>
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Stock Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="current-stock">Current Stock *</Label>
                <Input
                  id="current-stock"
                  type="number"
                  placeholder="0"
                  required
                  className="border-muted-foreground/30 focus:border-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min-stock">Minimum Stock Level</Label>
                <Input
                  id="min-stock"
                  type="number"
                  placeholder="10"
                  className="border-muted-foreground/30 focus:border-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-stock">Maximum Stock Level</Label>
                <Input
                  id="max-stock"
                  type="number"
                  placeholder="1000"
                  className="border-muted-foreground/30 focus:border-muted-foreground/50"
                />
              </div>
            </div>
          </div>

          {/* Location & Notes */}
          <div className="p-6 space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location & Notes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Storage Location</Label>
                <Input
                  id="location"
                  placeholder="Warehouse A - Shelf 1"
                  className="border-muted-foreground/30 focus:border-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supplier">Primary Supplier</Label>
                <Select>
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Additional notes about this inventory item..."
                className="border-muted-foreground/30 focus:border-muted-foreground/50 min-h-[100px]"
              />
            </div>
          </div>

          {/* Submit Button - Full width on mobile, auto on desktop */}
          <div className="sticky bottom-0 bg-background p-4 border-t border-muted-foreground/10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setOpen(false)}
                className="w-full border-muted-foreground/30 hover:bg-muted"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
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