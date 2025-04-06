import { supabase } from "./supabase"

// Get all medications for the current user
export const getMedications = async () => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    const { data, error } = await supabase
      .from("medications")
      .select("*")
      .eq("user_id", userData.user.id)
      .order("created_at", { ascending: false })

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching medications:", error)
    throw error
  }
}

// Get a specific medication
export const getMedication = async (medicationId) => {
  try {
    const { data, error } = await supabase.from("medications").select("*").eq("id", medicationId).single()

    if (error) throw error

    return data
  } catch (error) {
    console.error("Error fetching medication:", error)
    throw error
  }
}

// Create a new medication
export const createMedication = async (medicationData) => {
  try {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user) throw new Error("Not authenticated")

    // Check medication safety
    const safetyStatus = await checkMedicationSafety(medicationData.name)

    const { data, error } = await supabase
      .from("medications")
      .insert([
        {
          user_id: userData.user.id,
          safety_status: safetyStatus,
          ...medicationData,
        },
      ])
      .select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error creating medication:", error)
    throw error
  }
}

// Update a medication
export const updateMedication = async (medicationId, medicationData) => {
  try {
    // If medication name changed, recalculate safety status
    const updatedData = { ...medicationData }

    if (medicationData.name) {
      updatedData.safety_status = await checkMedicationSafety(medicationData.name)
    }

    const { data, error } = await supabase.from("medications").update(updatedData).eq("id", medicationId).select()

    if (error) throw error

    return data[0]
  } catch (error) {
    console.error("Error updating medication:", error)
    throw error
  }
}

// Delete a medication
export const deleteMedication = async (medicationId) => {
  try {
    const { error } = await supabase.from("medications").delete().eq("id", medicationId)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error("Error deleting medication:", error)
    throw error
  }
}

// Check medication interactions
export const checkMedicationInteractions = async (medicationList) => {
  try {
    // In a real app, this would call an external API like RxNav or MedlinePlus
    // For now, we'll simulate with a simple check

    const highRiskCombinations = [
      ["ibuprofen", "aspirin"],
      ["warfarin", "aspirin"],
      ["lisinopril", "spironolactone"],
    ]

    const interactions = []

    // Check each pair of medications
    for (let i = 0; i < medicationList.length; i++) {
      for (let j = i + 1; j < medicationList.length; j++) {
        const med1 = medicationList[i].toLowerCase()
        const med2 = medicationList[j].toLowerCase()

        // Check if this pair is in our high-risk combinations
        const isHighRisk = highRiskCombinations.some(
          (combo) => (combo[0] === med1 && combo[1] === med2) || (combo[0] === med2 && combo[1] === med1),
        )

        if (isHighRisk) {
          interactions.push({
            medications: [medicationList[i], medicationList[j]],
            severity: "high",
            description: `Potential harmful interaction between ${medicationList[i]} and ${medicationList[j]}`,
          })
        }
      }
    }

    return interactions
  } catch (error) {
    console.error("Error checking medication interactions:", error)
    throw error
  }
}

// Helper function to check medication safety during pregnancy
const checkMedicationSafety = async (medicationName) => {
  // In a real app, this would call an external API like FDA or MedlinePlus
  // For now, we'll use a simple lookup table

  const medicationSafety = {
    // Safe medications
    acetaminophen: "safe",
    tylenol: "safe",
    tums: "safe",
    pepcid: "safe",
    benadryl: "safe",
    cetirizine: "safe",
    "prenatal vitamin": "safe",
    "folic acid": "safe",

    // Caution medications
    ibuprofen: "caution", // Safe in early pregnancy, avoid in third trimester
    advil: "caution",
    motrin: "caution",
    zoloft: "caution",
    fluoxetine: "caution",
    albuterol: "caution",

    // Unsafe medications
    accutane: "unsafe",
    isotretinoin: "unsafe",
    warfarin: "unsafe",
    coumadin: "unsafe",
    lisinopril: "unsafe",
    hydrochlorothiazide: "unsafe",
  }

  const medLower = medicationName.toLowerCase()

  // Check if the medication is in our lookup table
  for (const [med, safety] of Object.entries(medicationSafety)) {
    if (medLower.includes(med)) {
      return safety
    }
  }

  // Default to caution if we don't know
  return "caution"
}

