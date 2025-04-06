import { supabase } from "./supabase"

// Get all symptoms for the current user
export const getSymptoms = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("symptoms")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("reported_at", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching symptoms:", error)
    throw error
  }
}

// Get a specific symptom
export const getSymptom = async (symptomId) => {
  try {
    const { data, error } = await supabase.from("symptoms").select("*").eq("id", symptomId).single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching symptom:", error)
    throw error
  }
}

// Create a new symptom
export const createSymptom = async (symptomData) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    // Determine risk level based on symptom and severity
    const riskLevel = determineRiskLevel(symptomData.symptom_name, symptomData.severity)

    const { data, error } = await supabase
      .from("symptoms")
      .insert([
        {
          user_id: userData.user.id,
          risk_level: riskLevel,
          ...symptomData,
        },
      ])
      .select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error creating symptom:", error)
    throw error
  }
}

// Update a symptom
export const updateSymptom = async (symptomId, symptomData) => {
  try {
    // If symptom name or severity changed, recalculate risk level
    const updatedData = { ...symptomData }

    if (symptomData.symptom_name || symptomData.severity) {
      // Get the current symptom data
      const { data: currentSymptom } = await supabase
        .from("symptoms")
        .select("symptom_name, severity")
        .eq("id", symptomId)
        .single()

      const symptomName = symptomData.symptom_name || currentSymptom.symptom_name
      const severity = symptomData.severity || currentSymptom.severity

      updatedData.risk_level = determineRiskLevel(symptomName, severity)
    }

    const { data, error } = await supabase.from("symptoms").update(updatedData).eq("id", symptomId).select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error updating symptom:", error)
    throw error
  }
}

// Mark a symptom as resolved
export const resolveSymptom = async (symptomId) => {
  try {
    const { data, error } = await supabase
      .from("symptoms")
      .update({
        resolved: true,
        resolved_at: new Date().toISOString(),
      })
      .eq("id", symptomId)
      .select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error resolving symptom:", error)
    throw error
  }
}

// Helper function to determine risk level based on symptom and severity
const determineRiskLevel = (symptomName, severity) => {
  // High-risk symptoms regardless of severity
  const highRiskSymptoms = [
    "vaginal bleeding",
    "severe headache",
    "vision changes",
    "chest pain",
    "difficulty breathing",
    "severe abdominal pain",
    "decreased fetal movement",
    "seizure",
    "loss of consciousness",
  ]

  // Medium-risk symptoms
  const mediumRiskSymptoms = ["fever", "persistent vomiting", "swelling", "urinary problems", "dizziness"]

  const symptomLower = symptomName.toLowerCase()

  if (highRiskSymptoms.some((s) => symptomLower.includes(s))) {
    return "high"
  }

  if (mediumRiskSymptoms.some((s) => symptomLower.includes(s))) {
    return severity === "severe" ? "high" : "medium"
  }

  return severity === "severe" ? "medium" : "low"
}

