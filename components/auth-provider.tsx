"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

interface User {
  id: string
  email: string
  name: string
  first_name?: string
  last_name?: string
  role: string
  tenantId: string
  permissions: string[]
}

export type AuthMode = "sign-in" | "sign-up";

interface AuthContextType {
  user: User | null
  login: (email: string | { email: string; password?: string }) => Promise<void>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
  isAuthOpen: boolean
  setIsAuthOpen: (open: boolean) => void
  authMode: AuthMode
  setAuthMode: (mode: AuthMode) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [authMode, setAuthMode] = useState<AuthMode>("sign-in")

  useEffect(() => {
    // Auto-login for demo purposes - bypass authentication
    const mockUser: User = {
      id: "1",
      email: "demo@company.com",
      name: "Demo User",
      first_name: "Demo",
      last_name: "User",
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

  const login = async (credentials: string | { email: string; password?: string }) => {
    const email = typeof credentials === 'string' ? credentials : credentials.email;
    // Auto-login for demo
    const mockUser: User = {
      id: "1",
      email,
      name: "Demo User",
      first_name: "Demo",
      last_name: "User",
      role: "admin",
      tenantId: "tenant-1",
      permissions: ["admin"],
    }
    setUser(mockUser)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
