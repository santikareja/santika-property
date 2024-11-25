import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Simplified middleware that only handles auth
export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get("santika_auth");
  const { pathname } = request.nextUrl;

  // Only protect admin routes
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !authCookie) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};