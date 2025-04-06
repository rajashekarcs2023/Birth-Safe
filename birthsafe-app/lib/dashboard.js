import { supabase } from "./supabase"
import { auth0 } from "./auth0"

// Get dashboard data
export const getDashboardData = async (req) => {
  try {
    const session = await auth0.getSession(req)

    if (!session) {
      throw new Error("Not authenticated")
    }

    // Get the user's profile ID
    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("id, name, user_type, pregnancy_stage, due_date, high_risk, risk_factors")
      .eq("auth0_id", session.user.sub)
      .single()

    if (profileError) {
      throw profileError
    }

    // Get clinical tasks
    const { data: tasksData, error: tasksError } = await supabase
      .from("clinical_tasks")
      .select("*")
      .eq("profile_id", profileData.id)
      .order("due_date", { ascending: true })

    if (tasksError) {
      throw tasksError
    }

    // Get recent symptoms
    const { data: symptomsData, error: symptomsError } = await supabase
      .from("symptoms")
      .select("*")
      .eq("profile_id", profileData.id)
      .order("date", { ascending: false })
      .limit(5)

    if (symptomsError) {
      throw symptomsError
    }

    // Get recent medical records
    const { data: recordsData, error: recordsError } = await supabase
      .from("medical_records")
      .select("*")
      .eq("profile_id", profileData.id)
      .order("date", { ascending: false })
      .limit(5)

    if (recordsError) {
      throw recordsError
    }

    // Calculate safety score
    const completedTasks = tasksData.filter((task) => task.completed).length
    const totalTasks = tasksData.length
    const taskScore = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 100

    const safetyScore = Math.round(taskScore)

    return {
      profile: profileData,
      tasks: tasksData,
      symptoms: symptomsData,
      records: recordsData,
      safetyScore,
    }
  } catch (error) {
    console.error("Error getting dashboard data:", error)
    throw error
  }
}

