import { supabase } from "./supabase"
import { auth0 } from "./auth0"

// Get user profile
export const getUserProfile = async (req) => {
  try {
    const session = await auth0.getSession(req)

    if (!session) {
      throw new Error("Not authenticated")
    }

    // Get the user's profile
    const { data, error } = await supabase.from("profiles").select("*").eq("auth0_id", session.user.sub).single()

    if (error) {
      throw error
    }

    return data
  } catch (error) {
    console.error("Error getting user profile:", error)
    throw error
  }
}

// Update user profile
export const updateUserProfile = async (req, profileData) => {
  try {
    const session = await auth0.getSession(req)

    if (!session) {
      throw new Error("Not authenticated")
    }

    // Update the user's profile
    const { data, error } = await supabase.from("profiles").update(profileData).eq("auth0_id", session.user.sub)

    if (error) {
      throw error
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating user profile:", error)
    throw error
  }
}

