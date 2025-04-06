import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    console.log('API signup request:', { email })
    
    // Direct Supabase call to sign up the user - no metadata yet
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?redirectTo=/onboarding`
      }
    })
    
    if (error) {
      console.error('API signup error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    console.log('API signup success:', data)
    
    // Return the user data
    return NextResponse.json({ data }, { status: 200 })
  } catch (error) {
    console.error('Unexpected API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
