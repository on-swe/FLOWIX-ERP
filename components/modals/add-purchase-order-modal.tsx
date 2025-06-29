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
import { ShoppingCart, Calendar, DollarSign, Package, Plus, Minus } from "lucide-react"

interface AddPurchaseOrderModalProps {
  children: React.ReactNode
}

export function AddPurchaseOrderModal({ children }: AddPurchaseOrderModalProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState([{ product: "", quantity: 1, unitPrice: 0 }])
  const { toast } = useToast()

  const addItem = () => {
    setItems([...items, { product: "", quantity: 1, unitPrice: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: string, value: any) => {
    const updatedItems = [...items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setItems(updatedItems)
  }

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Purchase Order Created!",
      description: "New purchase order has been successfully created and sent to vendor.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-xl border-0 shadow-2xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg">
              <ShoppingCart className="h-5 w-5 text-white" />
            </div>
            New Purchase Order
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Order Information */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-indigo-600" />
              Order Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="po-number" className="text-sm font-medium text-gray-700">
                  PO Number *
                </Label>
                <Input
                  id="po-number"
                  placeholder="PO-2024-001"
                  required
                  className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor" className="text-sm font-medium text-gray-700">
                  Vendor *
                </Label>
                <Select required>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400">
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendor1">ABC Supplies Co.</SelectItem>
                    <SelectItem value="vendor2">Global Materials Ltd.</SelectItem>
                    <SelectItem value="vendor3">Premium Parts Inc.</SelectItem>
                    <SelectItem value="vendor4">Tech Solutions Corp.</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="order-date" className="text-sm font-medium text-gray-700">
                  Order Date *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="order-date"
                    type="date"
                    required
                    className="pl-10 bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expected-date" className="text-sm font-medium text-gray-700">
                  Expected Delivery
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="expected-date"
                    type="date"
                    className="pl-10 bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                  Priority
                </Label>
                <Select>
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                  Status
                </Label>
                <Select defaultValue="draft">
                  <SelectTrigger className="bg-white/80 border-gray-200 focus:border-indigo-400 focus:ring-indigo-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending Approval</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="sent">Sent to Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Package className="h-5 w-5 text-green-600" />
                Order Items
              </h3>
              <Button
                type="button"
                onClick={addItem}
                variant="outline"
                size="sm"
                className="text-green-600 border-green-300 hover:bg-green-50 bg-transparent"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="bg-white/80 p-4 rounded-lg border border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-sm font-medium text-gray-700">Product *</Label>
                      <Select
                        value={item.product}
                        onValueChange={(value) => updateItem(index, "product", value)}
                        required
                      >
                        <SelectTrigger className="bg-white border-gray-200">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="laptop">Laptop Computer</SelectItem>
                          <SelectItem value="desk">Office Desk</SelectItem>
                          <SelectItem value="chair">Office Chair</SelectItem>
                          <SelectItem value="printer">Printer</SelectItem>
                          <SelectItem value="supplies">Office Supplies</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Quantity *</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 0)}
                        min="1"
                        required
                        className="bg-white border-gray-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Unit Price *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                          required
                          className="pl-10 bg-white border-gray-200"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700">
                        Total: ${(item.quantity * item.unitPrice).toFixed(2)}
                      </div>
                      {items.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeItem(index)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Order Total:</span>
                <span className="text-2xl font-bold text-indigo-600">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shipping-address" className="text-sm font-medium text-gray-700">
                  Shipping Address
                </Label>
                <Textarea
                  id="shipping-address"
                  placeholder="Enter shipping address..."
                  className="bg-white/80 border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="special-instructions" className="text-sm font-medium text-gray-700">
                  Special Instructions
                </Label>
                <Textarea
                  id="special-instructions"
                  placeholder="Any special instructions for the vendor..."
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
              className="px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Order...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Purchase Order
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
