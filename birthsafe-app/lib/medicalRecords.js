import { supabase } from "./supabase"

// Get all medical records for the current user
export const getMedicalRecords = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("medical_records")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("record_date", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching medical records:", error)
    throw error
  }
}

// Get a specific medical record
export const getMedicalRecord = async (recordId) => {
  try {
    const { data, error } = await supabase.from("medical_records").select("*").eq("id", recordId).single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching medical record:", error)
    throw error
  }
}

// Create a new medical record
export const createMedicalRecord = async (recordData) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("medical_records")
      .insert([
        {
          user_id: userData.user.id,
          ...recordData,
        },
      ])
      .select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error creating medical record:", error)
    throw error
  }
}

// Update a medical record
export const updateMedicalRecord = async (recordId, recordData) => {
  try {
    const { data, error } = await supabase.from("medical_records").update(recordData).eq("id", recordId).select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error updating medical record:", error)
    throw error
  }
}

// Delete a medical record
export const deleteMedicalRecord = async (recordId) => {
  try {
    const { error } = await supabase.from("medical_records").delete().eq("id", recordId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error deleting medical record:", error)
    throw error
  }
}

// Upload a file attachment for a medical record
export const uploadMedicalRecordAttachment = async (file) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const fileExt = file.name.split(".").pop()
    const fileName = `${userData.user.id}/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from("medical-records").upload(fileName, file)

    if (error) throw error

    // Get the public URL
    const { data: urlData } = supabase.storage.from("medical-records").getPublicUrl(fileName)

    return urlData.publicUrl
  } catch (error) {
    console.error("Error uploading attachment:", error)
    throw error
  }
}

