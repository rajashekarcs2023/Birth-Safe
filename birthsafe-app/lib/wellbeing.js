import { supabase } from "./supabase"

// Get all wellbeing assessments for the current user
export const getWellbeingAssessments = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("wellbeing_assessments")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching wellbeing assessments:", error)
    throw error
  }
}

// Get the latest wellbeing assessment for the current user
export const getLatestWellbeingAssessment = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("wellbeing_assessments")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "No rows returned" error
      throw error
    }

    return data || null
  } catch (error) {
    console.error("Error fetching latest wellbeing assessment:", error)
    throw error
  }
}

// Create a new wellbeing assessment
export const createWellbeingAssessment = async (assessmentData) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("wellbeing_assessments")
      .insert([
        {
          user_id: userData.user.id,
          ...assessmentData,
        },
      ])
      .select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error creating wellbeing assessment:", error)
    throw error
  }
}

