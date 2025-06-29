import type { AuditLog } from "@/types"

export class AuditLogger {
  static async log(params: {
    tenantId: string
    userId: string
    action: string
    resource: string
    resourceId: string
    changes?: Record<string, any>
    ipAddress?: string
    userAgent?: string
  }) {
    const auditLog: Omit<AuditLog, "id" | "createdAt"> = {
      tenantId: params.tenantId,
      userId: params.userId,
      action: params.action,
      resource: params.resource,
      resourceId: params.resourceId,
      changes: params.changes || {},
      ipAddress: params.ipAddress || "unknown",
      userAgent: params.userAgent || "unknown",
    }

    // In a real application, this would save to the database
    console.log("Audit Log:", auditLog)

    // Example: await db.auditLog.create({ data: auditLog })
  }
}

export const AUDIT_ACTIONS = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  LOGIN: "login",
  LOGOUT: "logout",
  EXPORT: "export",
  IMPORT: "import",
} as const
