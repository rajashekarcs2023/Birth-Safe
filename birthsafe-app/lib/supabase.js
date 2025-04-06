import { createClient } from "@supabase/supabase-js"

// Make sure we're using the correct environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key (first 10 chars):', supabaseAnonKey?.substring(0, 10))

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create the Supabase client with proper configuration
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    // Disable redirect to Supabase's hosted UI
    flowType: 'pkce'
  }
})

// Authentication helper functions
export const signUp = async (email, password, options = {}) => {
  console.log('Signing up with options:', options);
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: options,
        // Don't use email confirmation for now to simplify the flow
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    })
    
    if (error) throw error;
    
    console.log('Signup successful:', data);
    
    // If we have a session, user is automatically signed in
    if (data.session) {
      return { success: true, data }
    }
    
    // Otherwise they need to confirm their email
    return { 
      success: true, 
      message: "Please check your email for verification link",
      data
    }
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, error: error.message }
  }
}

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) throw error;
    
    console.log('Sign in successful:', data);
    return { success: true, data }
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, error: error.message }
  }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession()
  return { session: data.session, error }
}

export const getUser = async () => {
  const { data } = await supabase.auth.getUser()
  return data.user
}
