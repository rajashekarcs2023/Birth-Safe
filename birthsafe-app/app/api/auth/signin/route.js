import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    
    console.log('API signin request for:', email)
    
    // Direct Supabase call to sign in the user
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) {
      console.error('API signin error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    console.log('API signin success for:', email)
    
    // Check if the user has completed onboarding
    console.log('Checking profile for user:', data.user.id);
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('onboarding_completed')
      .eq('user_id', data.user.id)
      .single()
    
    if (profileError) {
      console.error('Error fetching profile:', profileError)
    }
    
    console.log('Profile data:', profileData);
    
    // Determine where to redirect the user
    // If we can't find a profile or there's an error, default to onboarding
    const redirectTo = profileData?.onboarding_completed === true ? '/feed' : '/onboarding';
    console.log('Determined redirect:', redirectTo);
    
    // Return the user data and redirect info
    return NextResponse.json({ 
      data, 
      redirectTo 
    }, { status: 200 })
  } catch (error) {
    console.error('Unexpected API error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
