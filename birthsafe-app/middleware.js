import { NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(req) {
  const res = NextResponse.next()
  
  // Create a Supabase client for the middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get: (name) => req.cookies.get(name)?.value,
        set: (name, value, options) => {
          res.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove: (name, options) => {
          res.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )
  
  // Refresh session if expired - required for Server Components
  const { data: { session } } = await supabase.auth.getSession()
  
  // If we have a session and the request is for an API route
  if (session && req.nextUrl.pathname.startsWith("/api/")) {
    // Add the user ID to the request headers
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-auth-user-id", session.user.id)
    
    // Return the response with the modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }
  
  // For protected routes that are not API routes, redirect to login if no session
  // IMPORTANT: Don't redirect if we're coming from the login page to avoid redirect loops
  const referer = req.headers.get('referer') || ''
  const isFromLogin = referer.includes('/login')
  
  if (!session && (
    req.nextUrl.pathname.startsWith("/dashboard") ||
    req.nextUrl.pathname.startsWith("/onboarding")
  ) && !isFromLogin) {
    console.log('Middleware: No session, redirecting to login')
    const redirectUrl = new URL("/login", req.url)
    redirectUrl.searchParams.set("returnTo", req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }
  
  // Debug session state
  console.log(`Middleware: Path=${req.nextUrl.pathname}, HasSession=${!!session}`)
  
  return res
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
}

