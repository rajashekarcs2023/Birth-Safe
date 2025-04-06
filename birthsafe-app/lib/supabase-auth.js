import { supabase } from "./supabase"

// Function to set the Auth0 token in Supabase
export const setSupabaseToken = async (token) => {
  if (token) {
    supabase.auth.setSession({
      access_token: token,
      refresh_token: "",
    })
  }
}

// Function to clear the Supabase session
export const clearSupabaseSession = async () => {
  await supabase.auth.signOut()
}

