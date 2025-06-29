export interface User {
  id: string
  email: string
  name: string
  role: string
  tenantId: string
  permissions: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Tenant {
  id: string
  name: string
  domain: string
  settings: TenantSettings
  createdAt: Date
  updatedAt: Date
}

export interface TenantSettings {
  currency: string
  timezone: string
  language: string
  fiscalYearStart: string
  features: string[]
}

export interface Product {
  id: string
  tenantId: string
  sku: string
  name: string
  description?: string
  category: string
  price: number
  cost: number
  stock: number
  minStock: number
  maxStock?: number
  unit: string
  barcode?: string
  images: string[]
  status: "active" | "inactive" | "discontinued"
  createdAt: Date
  updatedAt: Date
}

export interface InventoryTransaction {
  id: string
  tenantId: string
  productId: string
  type: "in" | "out" | "adjustment"
  quantity: number
  reason: string
  reference?: string
  userId: string
  createdAt: Date
}

export interface AuditLog {
  id: string
  tenantId: string
  userId: string
  action: string
  resource: string
  resourceId: string
  changes: Record<string, any>
  ipAddress: string
  userAgent: string
  createdAt: Date
}
