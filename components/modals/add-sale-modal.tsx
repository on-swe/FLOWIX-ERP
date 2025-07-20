"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal, ModalContent, ModalHeader, ModalTitle } from "@/components/ui/modal"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, X } from "lucide-react"

interface AddSaleModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddSaleModal({ open, onOpenChange }: AddSaleModalProps) {
  const [formData, setFormData] = useState({
    customer: "",
    product: "",
    quantity: "",
    unitPrice: "",
    discount: "",
    taxRate: "10",
    paymentMethod: "credit_card",
    dueDate: "",
    notes: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const calculateTotal = () => {
    const quantity = Number.parseFloat(formData.quantity) || 0
    const unitPrice = Number.parseFloat(formData.unitPrice) || 0
    const discount = Number.parseFloat(formData.discount) || 0
    const taxRate = Number.parseFloat(formData.taxRate) || 0

    const subtotal = quantity * unitPrice
    const discountAmount = (subtotal * discount) / 100
    const taxableAmount = subtotal - discountAmount
    const taxAmount = (taxableAmount * taxRate) / 100
    const total = taxableAmount + taxAmount

    return {
      subtotal: subtotal.toFixed(2),
      discount: discountAmount.toFixed(2),
      tax: taxAmount.toFixed(2),
      total: total.toFixed(2),
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const totals = calculateTotal()
    toast({
      title: "Sale Created",
      description: `Sale order for $${totals.total} has been created.`,
    })

    setFormData({
      customer: "",
      product: "",
      quantity: "",
      unitPrice: "",
      discount: "",
      taxRate: "10",
      paymentMethod: "credit_card",
      dueDate: "",
      notes: "",
    })
    setIsLoading(false)
    onOpenChange(false)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const totals = calculateTotal()

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="h-full left-1/2 top-1/2 w-[95vw] max-w-md max-h-[90dvh] overflow-y-auto sm:max-h-none sm:max-w-2xl">
        {/* Mobile close button */}
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 sm:hidden"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </button>

        <ModalHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-5 w-5" />
            <ModalTitle className="text-xl font-medium">New Sales Order</ModalTitle>
          </div>
        </ModalHeader>

        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          {/* Customer & Product Selection */}
          <div className="py-4 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Order Details
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="customer">Customer *</Label>
                <Select 
                  value={formData.customer} 
                  onValueChange={(value) => handleInputChange("customer", value)}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectItem value="john-smith">John Smith</SelectItem>
                    <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                    <SelectItem value="michael-brown">Michael Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="product">Product *</Label>
                <Select 
                  value={formData.product} 
                  onValueChange={(value) => handleInputChange("product", value)}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectItem value="wireless-headphones">Wireless Headphones</SelectItem>
                    <SelectItem value="office-chair">Office Chair</SelectItem>
                    <SelectItem value="laptop-stand">Laptop Stand</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="py-4 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Pricing Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="1"
                  required
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="unitPrice">Unit Price *</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  value={formData.unitPrice}
                  onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                  placeholder="0.00"
                  required
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.discount}
                  onChange={(e) => handleInputChange("discount", e.target.value)}
                  placeholder="0"
                  className="border-gray-300 focus:ring-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Select 
                  value={formData.taxRate} 
                  onValueChange={(value) => handleInputChange("taxRate", value)}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectItem value="0">0% - Tax Exempt</SelectItem>
                    <SelectItem value="10">10% - Standard</SelectItem>
                    <SelectItem value="15">15% - Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <SelectTrigger className="border-gray-300 focus:ring-gray-400">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200">
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="py-4 space-y-4">
            <div className="border-b border-gray-200 pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                Order Summary
              </h3>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>${totals.subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Discount:</span>
                <span>-${totals.discount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax:</span>
                <span>${totals.tax}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>${totals.total}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                className="border-gray-300 focus:ring-gray-400"
              />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Additional notes..."
                className="border-gray-300 focus:ring-gray-400 min-h-[100px]"
              />
            </div>
          </div>

          <div className="sticky bottom-0 bg-white py-4 border-t border-gray-200">
            <div className="flex justify-end gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)} 
                disabled={isLoading}
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-500"
              >
                {isLoading ? "Processing..." : "Create Order"}
              </Button>
            </div>
          </div>
        </form>
      </ModalContent>
    </Modal>
  )
}