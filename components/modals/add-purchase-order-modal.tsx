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
import { ShoppingCart, Calendar, DollarSign, Package, Plus, Minus, X } from "lucide-react"

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
      title: "Purchase Order Created",
      description: "New purchase order has been successfully created and sent to vendor.",
    })

    setLoading(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-4xl max-w-[95vw] max-h-[90dvh] overflow-y-auto bg-background border border-muted-foreground/20">
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
              <ShoppingCart className="h-5 w-5" />
            </div>
            <span className="text-xl font-medium">New Purchase Order</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="divide-y divide-muted-foreground/10">
          {/* Order Information */}
          <div className=" space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Order Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="po-number">PO Number *</Label>
                <Input
                  id="po-number"
                  placeholder="PO-2024-001"
                  required
                  className="border-muted-foreground/30 focus:border-muted-foreground/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor *</Label>
                <Select required>
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
                <Label htmlFor="order-date">Order Date *</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="order-date"
                    type="date"
                    required
                    className="pl-10 border-muted-foreground/30 focus:border-muted-foreground/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expected-date">Expected Delivery</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="expected-date"
                    type="date"
                    className="pl-10 border-muted-foreground/30 focus:border-muted-foreground/50"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="draft">
                  <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
          <div className=" space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                <Package className="h-4 w-4" />
                Order Items
              </h3>
              <Button
                type="button"
                onClick={addItem}
                variant="outline"
                size="sm"
                className="border-muted-foreground/30 hover:bg-muted"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="bg-muted/10 p-4 rounded-lg border border-muted-foreground/20">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                    <div className="space-y-2 md:col-span-2">
                      <Label>Product *</Label>
                      <Select
                        value={item.product}
                        onValueChange={(value) => updateItem(index, "product", value)}
                        required
                      >
                        <SelectTrigger className="border-muted-foreground/30 focus:border-muted-foreground/50">
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
                      <Label>Quantity *</Label>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(index, "quantity", Number.parseInt(e.target.value) || 0)}
                        min="1"
                        required
                        className="border-muted-foreground/30 focus:border-muted-foreground/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Unit Price *</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                          min="0"
                          step="0.01"
                          required
                          className="pl-10 border-muted-foreground/30 focus:border-muted-foreground/50"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">
                        Total: ${(item.quantity * item.unitPrice).toFixed(2)}
                      </div>
                      {items.length > 1 && (
                        <Button
                          type="button"
                          onClick={() => removeItem(index)}
                          variant="outline"
                          size="sm"
                          className="text-muted-foreground border-muted-foreground/30 hover:bg-muted"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-muted-foreground/20">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Order Total:</span>
                <span className="text-2xl font-bold">${calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className=" space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shipping-address">Shipping Address</Label>
                <Textarea
                  id="shipping-address"
                  placeholder="Enter shipping address..."
                  className="border-muted-foreground/30 focus:border-muted-foreground/50 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="special-instructions">Special Instructions</Label>
                <Textarea
                  id="special-instructions"
                  placeholder="Any special instructions for the vendor..."
                  className="border-muted-foreground/30 focus:border-muted-foreground/50 min-h-[100px]"
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
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Purchase Order
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