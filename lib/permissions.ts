export interface Permission {
  module: string
  action: "read" | "write" | "delete" | "manage"
}

export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission) || userPermissions.includes("admin")
}

export function checkModuleAccess(userPermissions: string[], module: string, action: string): boolean {
  const permission = `${module}.${action}`
  return hasPermission(userPermissions, permission)
}

export const PERMISSIONS = {
  INVENTORY: {
    READ: "inventory.read",
    WRITE: "inventory.write",
    DELETE: "inventory.delete",
    MANAGE: "inventory.manage",
  },
  USERS: {
    READ: "users.read",
    WRITE: "users.write",
    DELETE: "users.delete",
    MANAGE: "users.manage",
  },
  SETTINGS: {
    READ: "settings.read",
    WRITE: "settings.write",
    MANAGE: "settings.manage",
  },
  FINANCE: {
    READ: "finance.read",
    WRITE: "finance.write",
    MANAGE: "finance.manage",
  },
} as const
