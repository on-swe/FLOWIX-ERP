import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Authentication disabled for demo
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
}
