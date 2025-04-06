import { supabase } from "./supabase"

// Get all clinical tasks for the current user
export const getClinicalTasks = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("clinical_tasks")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("due_date", { ascending: true })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching clinical tasks:", error)
    throw error
  }
}

// Get a specific clinical task
export const getClinicalTask = async (taskId) => {
  try {
    const { data, error } = await supabase.from("clinical_tasks").select("*").eq("id", taskId).single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching clinical task:", error)
    throw error
  }
}

// Create a new clinical task
export const createClinicalTask = async (taskData) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("clinical_tasks")
      .insert([
        {
          user_id: userData.user.id,
          ...taskData,
        },
      ])
      .select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error creating clinical task:", error)
    throw error
  }
}

// Update a clinical task
export const updateClinicalTask = async (taskId, taskData) => {
  try {
    const { data, error } = await supabase.from("clinical_tasks").update(taskData).eq("id", taskId).select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error updating clinical task:", error)
    throw error
  }
}

// Mark a clinical task as completed
export const completeClinicalTask = async (taskId) => {
  try {
    const { data, error } = await supabase
      .from("clinical_tasks")
      .update({
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .eq("id", taskId)
      .select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error completing clinical task:", error)
    throw error
  }
}

// Delete a clinical task
export const deleteClinicalTask = async (taskId) => {
  try {
    const { error } = await supabase.from("clinical_tasks").delete().eq("id", taskId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error deleting clinical task:", error)
    throw error
  }
}

