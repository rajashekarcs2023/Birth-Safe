import { NextResponse } from "next/server"
import { getSession } from "@auth0/nextjs-auth0"

export async function middleware(req) {
  // Check if the request is for an API route
  if (req.nextUrl.pathname.startsWith("/api/") && !req.nextUrl.pathname.startsWith("/api/auth/")) {
    try {
      // Get the session from Auth0
      const session = await getSession(req, NextResponse.next())

      // If there's no session, return a 401
      if (!session) {
        return new NextResponse(JSON.stringify({ error: "Not authenticated" }), {
          status: 401,
          headers: { "Content-Type": "application/json" },
        })
      }

      // Add the user ID to the request headers
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set("x-auth-user-id", session.user.sub)

      // Return the response with the modified headers
      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      console.error("Middleware error:", error)
      return new NextResponse(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      })
    }
  }

  // For non-API routes, just continue
  return NextResponse.next()
}

export const config = {
  matcher: ["/api/:path*"],
}

