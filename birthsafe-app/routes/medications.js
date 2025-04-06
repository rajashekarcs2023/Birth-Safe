import express from "express"
import { query } from "../db/index.js"
import { checkUserExists } from "../middleware/auth.js"

const router = express.Router()

// Apply middleware to all routes
router.use(checkUserExists)

// Get all medications for a user
router.get("/", async (req, res) => {
  try {
    const result = await query("SELECT * FROM medications WHERE user_id = $1 ORDER BY created_at DESC", [req.user.id])

    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Error getting medications:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Get a specific medication
router.get("/:id", async (req, res) => {
  try {
    const result = await query("SELECT * FROM medications WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Medication not found",
      })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error("Error getting medication:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Create a new medication
router.post("/", async (req, res) => {
  try {
    const { name, dosage, frequency, startDate, endDate, notes } = req.body

    // Check medication safety for pregnancy
    const safetyStatus = await checkMedicationSafety(name)

    const result = await query(
      `INSERT INTO medications (
        user_id, 
        name, 
        dosage, 
        frequency, 
        start_date, 
        end_date, 
        safety_status,
        notes
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [req.user.id, name, dosage, frequency, startDate, endDate, safetyStatus, notes],
    )

    res.status(201).json({
      message: "Medication added successfully",
      medication: result.rows[0],
    })
  } catch (error) {
    console.error("Error adding medication:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Update a medication
router.put("/:id", async (req, res) => {
  try {
    const { name, dosage, frequency, startDate, endDate, notes } = req.body

    // First check if the medication exists and belongs to the user
    const checkResult = await query("SELECT id, name FROM medications WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Medication not found or does not belong to user",
      })
    }

    // Check medication safety if name changed
    let safetyStatus = null
    if (name && name !== checkResult.rows[0].name) {
      safetyStatus = await checkMedicationSafety(name)
    }

    const result = await query(
      `UPDATE medications 
      SET 
        name = COALESCE($1, name),
        dosage = COALESCE($2, dosage),
        frequency = COALESCE($3, frequency),
        start_date = COALESCE($4, start_date),
        end_date = COALESCE($5, end_date),
        safety_status = COALESCE($6, safety_status),
        notes = COALESCE($7, notes),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $8 AND user_id = $9
      RETURNING *`,
      [name, dosage, frequency, startDate, endDate, safetyStatus, notes, req.params.id, req.user.id],
    )

    res.status(200).json({
      message: "Medication updated successfully",
      medication: result.rows[0],
    })
  } catch (error) {
    console.error("Error updating medication:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Delete a medication
router.delete("/:id", async (req, res) => {
  try {
    // First check if the medication exists and belongs to the user
    const checkResult = await query("SELECT id FROM medications WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Medication not found or does not belong to user",
      })
    }

    await query("DELETE FROM medications WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id])

    res.status(200).json({
      message: "Medication deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting medication:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Check medication interactions
router.post("/check", async (req, res) => {
  try {
    const { medications } = req.body

    if (!medications || !Array.isArray(medications)) {
      return res.status(400).json({
        error: "Bad request",
        message: "Medications array is required",
      })
    }

    // Check each medication for pregnancy safety
    const medicationResults = await Promise.all(
      medications.map(async (med) => {
        const safetyStatus = await checkMedicationSafety(med.name)
        return {
          ...med,
          safetyStatus,
        }
      }),
    )

    // Check for interactions between medications
    const interactions = checkMedicationInteractions(medications)

    res.status(200).json({
      medications: medicationResults,
      interactions,
      recommendations: getRecommendations(medicationResults, interactions),
    })
  } catch (error) {
    console.error("Error checking medications:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Helper function to check medication safety for pregnancy
// In a real app, this would call an external API or database
async function checkMedicationSafety(medicationName) {
  // This is a simplified version - in a real app, this would call an external API

  // For demo purposes, we'll use a hardcoded list
  const highRiskMedications = [
    "accutane",
    "isotretinoin",
    "thalidomide",
    "warfarin",
    "methotrexate",
    "misoprostol",
    "lithium",
    "tetracycline",
    "valproic acid",
    "carbamazepine",
  ]

  const mediumRiskMedications = [
    "ibuprofen",
    "aspirin",
    "albuterol",
    "fluconazole",
    "paroxetine",
    "lorazepam",
    "alprazolam",
    "codeine",
    "prednisone",
    "ciprofloxacin",
  ]

  const medicationLower = medicationName.toLowerCase()

  if (highRiskMedications.some((med) => medicationLower.includes(med))) {
    return "unsafe"
  }

  if (mediumRiskMedications.some((med) => medicationLower.includes(med))) {
    return "caution"
  }

  return "safe"
}

// Helper function to check for medication interactions
function checkMedicationInteractions(medications) {
  // This is a simplified version - in a real app, this would be more complex

  const interactions = []

  // Check each pair of medications
  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const med1 = medications[i].name.toLowerCase()
      const med2 = medications[j].name.toLowerCase()

      // Check for known interactions (simplified)
      if (
        (med1.includes("warfarin") && med2.includes("aspirin")) ||
        (med1.includes("aspirin") && med2.includes("warfarin"))
      ) {
        interactions.push({
          medications: [medications[i].name, medications[j].name],
          severity: "high",
          description: "Increased risk of bleeding",
        })
      }

      if (
        (med1.includes("lisinopril") && med2.includes("potassium")) ||
        (med1.includes("potassium") && med2.includes("lisinopril"))
      ) {
        interactions.push({
          medications: [medications[i].name, medications[j].name],
          severity: "high",
          description: "Risk of high potassium levels",
        })
      }

      // Add more interaction checks as needed
    }
  }

  return interactions
}

// Helper function to get recommendations
function getRecommendations(medications, interactions) {
  const recommendations = []

  // Check for unsafe medications
  const unsafeMeds = medications.filter((med) => med.safetyStatus === "unsafe")
  if (unsafeMeds.length > 0) {
    recommendations.push({
      type: "warning",
      message: `The following medications may be unsafe during pregnancy: ${unsafeMeds.map((med) => med.name).join(", ")}`,
      action: "Consult your healthcare provider immediately about these medications",
    })
  }

  // Check for caution medications
  const cautionMeds = medications.filter((med) => med.safetyStatus === "caution")
  if (cautionMeds.length > 0) {
    recommendations.push({
      type: "caution",
      message: `The following medications should be used with caution during pregnancy: ${cautionMeds.map((med) => med.name).join(", ")}`,
      action: "Discuss these medications with your healthcare provider",
    })
  }

  // Check for interactions
  if (interactions.length > 0) {
    const highSeverityInteractions = interactions.filter((int) => int.severity === "high")
    if (highSeverityInteractions.length > 0) {
      recommendations.push({
        type: "warning",
        message: "Potentially serious medication interactions detected",
        action: "Consult your healthcare provider about these medication interactions",
      })
    }
  }

  return recommendations
}

export default router

