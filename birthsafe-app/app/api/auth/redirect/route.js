import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

// This route will handle direct redirects after login with proper session handling
export async function GET(request) {
  try {
    // Get the URL to redirect to
    const url = new URL(request.url)
    const to = url.searchParams.get('to') || '/dashboard'
    
    console.log('Redirect API: Redirecting to:', to)
    
    // Get the Supabase client with cookies
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get: (name) => cookieStore.get(name)?.value,
          set: (name, value, options) => cookieStore.set(name, value, options),
          remove: (name, options) => cookieStore.set(name, '', { ...options, maxAge: 0 }),
        },
      }
    )
    
    // Check if the user is authenticated
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      console.log('Redirect API: No session found, redirecting to login')
      return NextResponse.redirect(new URL('/login', url.origin))
    }
    
    console.log('Redirect API: Session found, redirecting to:', to)
    
    // Create the response with the redirect
    const response = NextResponse.redirect(new URL(to, url.origin))
    
    return response
  } catch (error) {
    console.error('Redirect error:', error)
    // If there's an error, redirect to dashboard
    return NextResponse.redirect(new URL('/dashboard', new URL(request.url).origin))
  }
}
