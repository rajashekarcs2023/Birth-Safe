import { supabase } from "./supabase"
import { createHash } from "crypto"

// Get all consent logs for the current user
export const getConsentLogs = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("consent_logs")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching consent logs:", error)
    throw error
  }
}

// Get a specific consent log
export const getConsentLog = async (logId) => {
  try {
    const { data, error } = await supabase.from("consent_logs").select("*").eq("id", logId).single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching consent log:", error)
    throw error
  }
}

// Create a new consent log
export const createConsentLog = async (logData) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    // Generate a hash for verification
    const contentToHash = JSON.stringify({
      userId: userData.user.id,
      issueType: logData.issue_type,
      description: logData.description,
      timestamp: new Date().toISOString(),
    })

    const hash = createHash("sha256").update(contentToHash).digest("hex")

    const { data, error } = await supabase
      .from("consent_logs")
      .insert([
        {
          user_id: userData.user.id,
          hash,
          ...logData,
        },
      ])
      .select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error creating consent log:", error)
    throw error
  }
}

// Upload evidence for a consent log
export const uploadConsentEvidence = async (logId, file, evidenceType) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const fileExt = file.name.split(".").pop()
    const fileName = `${userData.user.id}/${logId}/${Date.now()}.${fileExt}`

    const { data, error } = await supabase.storage.from("consent-evidence").upload(fileName, file)

    if (error) throw error

    // Get the public URL
    const { data: urlData } = supabase.storage.from("consent-evidence").getPublicUrl(fileName)

    // Update the consent log with the evidence URL
    const { error: updateError } = await supabase
      .from("consent_logs")
      .update({
        evidence_type: evidenceType,
        evidence_url: urlData.publicUrl,
      })
      .eq("id", logId)

    if (updateError) throw updateError

    return urlData.publicUrl
  } catch (error) {
    console.error("Error uploading evidence:", error)
    throw error
  }
}

// Verify a consent log
export const verifyConsentLog = async (logId) => {
  try {
    const { data, error } = await supabase.from("consent_logs").update({ verified: true }).eq("id", logId).select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error verifying consent log:", error)
    throw error
  }
}

