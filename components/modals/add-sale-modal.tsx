"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Modal, ModalContent, ModalDescription, ModalFooter, ModalHeader, ModalTitle } from "@/components/ui/modal"
import { useToast } from "@/hooks/use-toast"
import { ShoppingCart, User, Package, Calendar, Sparkles } from "lucide-react"

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
      title: "Sale Created Successfully! 💰",
      description: `Sale order for $${totals.total} has been created and saved.`,
      className: "border-green-200 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100",
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
      <ModalContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <ModalHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <ModalTitle className="text-xl font-bold">Create New Sale</ModalTitle>
              <ModalDescription className="text-base">Create a new sales order for your customer</ModalDescription>
            </div>
          </div>
        </ModalHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer & Product Selection */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <User className="h-4 w-4 text-blue-600" />
              <h3 className="font-medium text-sm">Order Details</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer" className="text-sm font-medium">
                  Customer *
                </Label>
                <Select value={formData.customer} onValueChange={(value) => handleInputChange("customer", value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="john-smith">John Smith - Tech Solutions Inc.</SelectItem>
                    <SelectItem value="sarah-johnson">Sarah Johnson - Design Studio</SelectItem>
                    <SelectItem value="michael-brown">Michael Brown - Global Corp</SelectItem>
                    <SelectItem value="emily-davis">Emily Davis - Innovation Labs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="product" className="text-sm font-medium">
                  Product *
                </Label>
                <Select value={formData.product} onValueChange={(value) => handleInputChange("product", value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wireless-headphones">Wireless Headphones - $299.99</SelectItem>
                    <SelectItem value="office-chair">Office Chair - $599.99</SelectItem>
                    <SelectItem value="laptop-stand">Laptop Stand - $89.99</SelectItem>
                    <SelectItem value="bluetooth-speaker">Bluetooth Speaker - $149.99</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Pricing Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Package className="h-4 w-4 text-blue-600" />
              <h3 className="font-medium text-sm">Pricing Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Quantity *
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  placeholder="1"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="unitPrice" className="text-sm font-medium">
                  Unit Price *
                </Label>
                <Input
                  id="unitPrice"
                  type="number"
                  step="0.01"
                  value={formData.unitPrice}
                  onChange={(e) => handleInputChange("unitPrice", e.target.value)}
                  placeholder="0.00"
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount" className="text-sm font-medium">
                  Discount (%)
                </Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={formData.discount}
                  onChange={(e) => handleInputChange("discount", e.target.value)}
                  placeholder="0"
                  className="h-11"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="taxRate" className="text-sm font-medium">
                  Tax Rate (%)
                </Label>
                <Select value={formData.taxRate} onValueChange={(value) => handleInputChange("taxRate", value)}>
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0% - Tax Exempt</SelectItem>
                    <SelectItem value="5">5% - Reduced Rate</SelectItem>
                    <SelectItem value="10">10% - Standard Rate</SelectItem>
                    <SelectItem value="15">15% - Premium Rate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethod" className="text-sm font-medium">
                  Payment Method
                </Label>
                <Select
                  value={formData.paymentMethod}
                  onValueChange={(value) => handleInputChange("paymentMethod", value)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="debit_card">Debit Card</SelectItem>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="check">Check</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-3">
              <Calendar className="h-4 w-4 text-blue-600" />
              <h3 className="font-medium text-sm">Order Summary</h3>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-2">
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
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span>${totals.total}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate" className="text-sm font-medium">
                Due Date
              </Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => handleInputChange("dueDate", e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-sm font-medium">
                Notes
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange("notes", e.target.value)}
                placeholder="Additional notes for this sale..."
                rows={3}
                className="resize-none"
              />
            </div>
          </div>

          <ModalFooter className="pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-purple-600 hover:bg-purple-700">
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Create Sale
                </>
              )}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}
