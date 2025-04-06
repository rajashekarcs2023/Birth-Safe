import { supabase } from "./supabase"

// Register a new user
export const registerUser = async (email, password, userData) => {
  try {
    // Register with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    })

    if (authError) throw authError

    // Create the user profile
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: authData.user.id,
        name: userData.name,
        dob: userData.dob,
        gestational_age: userData.gestationalAge,
        due_date: userData.dueDate,
        high_risk: userData.highRisk || false,
        risk_factors: userData.riskFactors || "",
        preferred_language: userData.preferredLanguage || "en",
        phone_number: userData.phoneNumber || "",
        emergency_contact_name: userData.emergencyContactName || "",
        emergency_contact_phone: userData.emergencyContactPhone || "",
        healthcare_provider: userData.healthcareProvider || "",
      },
    ])

    if (profileError) throw profileError

    return { user: authData.user }
  } catch (error) {
    console.error("Error registering user:", error)
    throw error
  }
}

// Login a user
export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { user: data.user, session: data.session }
  } catch (error) {
    console.error("Error logging in:", error)
    throw error
  }
}

// Logout a user
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  } catch (error) {
    console.error("Error logging out:", error)
    throw error
  }
}

// Get the current user
export const getCurrentUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser()

    if (error) throw error

    if (!data.user) return null

    // Get the user profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single()

    if (profileError) throw profileError

    return { ...data.user, profile: profileData }
  } catch (error) {
    console.error("Error getting current user:", error)
    return null
  }
}

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase.from("profiles").update(profileData).eq("id", userData.user.id)

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error updating profile:", error)
    throw error
  }
}

// Reset password
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error("Error resetting password:", error)
    throw error
  }
}

