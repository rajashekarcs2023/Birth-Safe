import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function POST(request) {
  try {
    // Get the request body
    const onboardingData = await request.json()
    
    // Get cookies from the request
    const cookieStore = cookies()
    
    // Initialize Supabase client with cookies from the request
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get: (name) => cookieStore.get(name)?.value,
          set: () => {}, // We don't need to set cookies in this context
          remove: () => {}, // We don't need to remove cookies in this context
        },
      }
    )
    
    // Get the current user's session
    const { data: { session } } = await supabase.auth.getSession()
    
    console.log('Session in API:', session ? 'Found' : 'Not found')
    
    // For debugging, try to get user directly if session is not found
    if (!session) {
      const { data: user } = await supabase.auth.getUser()
      console.log('User from getUser:', user ? 'Found' : 'Not found')
      
      if (!user?.user) {
        return NextResponse.json(
          { error: 'Not authenticated' },
          { status: 401 }
        )
      }
      
      // Use the user ID from getUser if available
      var userId = user.user.id
    } else {
      var userId = session.user.id
    }
    
    // Update the user's profile with onboarding data
    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: onboardingData.userName,
        user_type: onboardingData.userType,
        pregnancy_stage: onboardingData.pregnancyStage,
        pregnancy_profile: onboardingData.pregnancyProfile,
        previous_loss: onboardingData.previousLoss,
        knows_due_date: onboardingData.knowsDueDate,
        due_date: onboardingData.dueDate,
        risk_factors: onboardingData.riskFactors,
        tracking_preferences: onboardingData.trackingPreferences,
        onboarding_completed: true,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
    
    if (error) {
      console.error('Error updating profile:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Onboarding completed successfully',
      data
    })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
