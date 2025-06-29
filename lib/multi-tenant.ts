export class TenantContext {
  private static instance: TenantContext
  private currentTenantId: string | null = null

  static getInstance(): TenantContext {
    if (!TenantContext.instance) {
      TenantContext.instance = new TenantContext()
    }
    return TenantContext.instance
  }

  setTenantId(tenantId: string) {
    this.currentTenantId = tenantId
  }

  getTenantId(): string | null {
    return this.currentTenantId
  }

  requireTenantId(): string {
    if (!this.currentTenantId) {
      throw new Error("Tenant context not set")
    }
    return this.currentTenantId
  }
}

export function withTenantScope<T extends Record<string, any>>(data: T, tenantId: string): T & { tenantId: string } {
  return { ...data, tenantId }
}

export function filterByTenant<T extends { tenantId: string }>(items: T[], tenantId: string): T[] {
  return items.filter((item) => item.tenantId === tenantId)
}
