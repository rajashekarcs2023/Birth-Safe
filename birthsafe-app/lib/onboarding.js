import { supabase } from "./supabase"
import { getSession } from "@auth0/nextjs-auth0"

// Save onboarding data to Supabase
export const saveOnboardingData = async (req, onboardingData) => {
  try {
    const session = await getSession(req)

    if (!session) {
      throw new Error("Not authenticated")
    }

    // Get the user's profile ID
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("auth0_id", session.user.sub)
      .single()

    if (profileError) {
      throw profileError
    }

    // Update the profile with onboarding data
    const { error: updateError } = await supabase
      .from("profiles")
      .update({
        name: onboardingData.userName,
        user_type: onboardingData.userType,
        pregnancy_stage: onboardingData.pregnancyStage,
        pregnancy_profile: onboardingData.pregnancyProfile,
        previous_loss: onboardingData.previousLoss,
        knows_due_date: onboardingData.knowsDueDate,
        due_date: onboardingData.dueDate || null,
        high_risk: onboardingData.riskFactors && onboardingData.riskFactors.length > 0,
        risk_factors: onboardingData.riskFactors || [],
        tracking_preferences: onboardingData.trackingPreferences || [],
        onboarding_completed: true,
      })
      .eq("id", profileData.id)

    if (updateError) {
      throw updateError
    }

    return { success: true }
  } catch (error) {
    console.error("Error saving onboarding data:", error)
    throw error
  }
}

// Get onboarding status
export const getOnboardingStatus = async (req) => {
  try {
    const session = await getSession(req)

    if (!session) {
      throw new Error("Not authenticated")
    }

    // Get the user's profile
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("auth0_id", session.user.sub)
      .single()

    if (profileError) {
      throw profileError
    }

    return {
      completed: profileData.onboarding_completed,
    }
  } catch (error) {
    console.error("Error getting onboarding status:", error)
    throw error
  }
}

