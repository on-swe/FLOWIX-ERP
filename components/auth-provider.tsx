"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  role: string
  tenantId: string
  permissions: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Auto-login for demo purposes - bypass authentication
    const mockUser: User = {
      id: "1",
      email: "demo@company.com",
      name: "Demo User",
      role: "admin",
      tenantId: "tenant-1",
      permissions: [
        "inventory.read",
        "inventory.write",
        "inventory.manage",
        "products.read",
        "products.write",
        "products.manage",
        "sales.read",
        "sales.write",
        "sales.manage",
        "customers.read",
        "customers.write",
        "customers.manage",
        "vendors.read",
        "vendors.write",
        "vendors.manage",
        "finance.read",
        "finance.write",
        "finance.manage",
        "hr.read",
        "hr.write",
        "hr.manage",
        "projects.read",
        "projects.write",
        "projects.manage",
        "support.read",
        "support.write",
        "support.manage",
        "reports.read",
        "reports.write",
        "reports.manage",
        "organization.read",
        "organization.write",
        "organization.manage",
        "users.manage",
        "settings.manage",
        "admin",
      ],
    }
    setUser(mockUser)
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Auto-login for demo
    const mockUser: User = {
      id: "1",
      email,
      name: "Demo User",
      role: "admin",
      tenantId: "tenant-1",
      permissions: ["admin"],
    }
    setUser(mockUser)
  }

  const logout = () => {
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
