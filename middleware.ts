import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Public routes that don't need auth
  const publicRoutes = ["/login", "/register", "/api/auth/login", "/api/auth/register"];
  
  // Check if the current path is a public route
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    // If user is already logged in and tries to access login/register, redirect to dashboard
    if (token && (pathname === "/login" || pathname === "/register")) {
       try {
        const secret = new TextEncoder().encode(JWT_SECRET);
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/dashboard", req.url));
      } catch (e) {
        // Token invalid, let them stay on login/register
      }
    }
    return NextResponse.next();
  }

  // Protected routes (dashboard, etc.)
  if (!token) {
    // Redirect to login if no token
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    
    const roles = payload.roles as string[];
    const userId = payload.userId as string;

    // Role-based redirection for /dashboard root
    if (pathname === "/dashboard") {
      if (roles.includes("SUPER_ADMIN")) {
        // Super admin might stay on /dashboard or go to a specific one, 
        // but for now let's keep them on /dashboard or redirect to /dashboard/admin?
        // The user requirement says: "As admin after login go to /dashboard/admin"
        // Let's redirect ADMIN and SUPER_ADMIN to /dashboard/admin for now, or handle in page.tsx
        // Actually, let's redirect based on priority
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      } else if (roles.includes("ADMIN")) {
        return NextResponse.redirect(new URL("/dashboard/admin", req.url));
      } else if (roles.includes("TEACHER")) {
        return NextResponse.redirect(new URL("/dashboard/teacher", req.url));
      } else if (roles.includes("STUDENT")) {
        return NextResponse.redirect(new URL("/dashboard/student", req.url));
      }
    }

    // Role-based access control for sub-routes
    if (pathname.startsWith("/dashboard/admin") && !roles.includes("ADMIN") && !roles.includes("SUPER_ADMIN")) {
       return NextResponse.redirect(new URL("/dashboard", req.url)); // Access denied
    }
    if (pathname.startsWith("/dashboard/teacher") && !roles.includes("TEACHER") && !roles.includes("SUPER_ADMIN") && !roles.includes("ADMIN")) {
       return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    if (pathname.startsWith("/dashboard/student") && !roles.includes("STUDENT") && !roles.includes("SUPER_ADMIN") && !roles.includes("ADMIN")) {
       return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Add user info to headers for downstream use
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-user-id", userId);
    requestHeaders.set("x-user-roles", JSON.stringify(roles));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  } catch (error) {
    // Token verification failed
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (except login/register which are handled above)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
