import express from "express"
import { query } from "../db/index.js"
import { checkUserExists } from "../middleware/auth.js"

const router = express.Router()

// Apply middleware to all routes
router.use(checkUserExists)

// Get all symptoms for a user
router.get("/", async (req, res) => {
  try {
    const result = await query("SELECT * FROM symptoms WHERE user_id = $1 ORDER BY reported_at DESC", [req.user.id])

    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Error getting symptoms:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Get a specific symptom
router.get("/:id", async (req, res) => {
  try {
    const result = await query("SELECT * FROM symptoms WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id])

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Symptom not found",
      })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error("Error getting symptom:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Create a new symptom
router.post("/", async (req, res) => {
  try {
    const { symptomName, severity, duration, description } = req.body

    // Determine risk level based on symptom and severity
    const riskLevel = determineRiskLevel(symptomName, severity)

    const result = await query(
      `INSERT INTO symptoms (
        user_id, 
        symptom_name, 
        severity, 
        duration, 
        description,
        risk_level
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.id, symptomName, severity, duration, description, riskLevel],
    )

    res.status(201).json({
      message: "Symptom recorded successfully",
      symptom: result.rows[0],
    })
  } catch (error) {
    console.error("Error recording symptom:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Update a symptom
router.put("/:id", async (req, res) => {
  try {
    const { symptomName, severity, duration, description, resolved } = req.body

    // First check if the symptom exists and belongs to the user
    const checkResult = await query("SELECT id FROM symptoms WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Symptom not found or does not belong to user",
      })
    }

    // Determine risk level if symptom name or severity changed
    let riskLevel = null
    if (symptomName && severity) {
      riskLevel = determineRiskLevel(symptomName, severity)
    }

    // Set resolved_at if symptom is being marked as resolved
    const resolvedAt = resolved ? "CURRENT_TIMESTAMP" : null

    const result = await query(
      `UPDATE symptoms 
      SET 
        symptom_name = COALESCE($1, symptom_name),
        severity = COALESCE($2, severity),
        duration = COALESCE($3, duration),
        description = COALESCE($4, description),
        risk_level = COALESCE($5, risk_level),
        resolved = COALESCE($6, resolved),
        resolved_at = ${resolved ? resolvedAt : "resolved_at"}
      WHERE id = $7 AND user_id = $8
      RETURNING *`,
      [symptomName, severity, duration, description, riskLevel, resolved, req.params.id, req.user.id],
    )

    res.status(200).json({
      message: "Symptom updated successfully",
      symptom: result.rows[0],
    })
  } catch (error) {
    console.error("Error updating symptom:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Assess symptoms for risk
router.post("/assess", async (req, res) => {
  try {
    const { symptoms } = req.body

    if (!symptoms || !Array.isArray(symptoms)) {
      return res.status(400).json({
        error: "Bad request",
        message: "Symptoms array is required",
      })
    }

    // Assess each symptom
    const assessedSymptoms = symptoms.map((symptom) => {
      const { name, severity } = symptom
      const riskLevel = determineRiskLevel(name, severity)

      return {
        ...symptom,
        riskLevel,
        recommendations: getRecommendations(name, severity, riskLevel),
      }
    })

    // Calculate overall risk level
    const riskLevels = assessedSymptoms.map((s) => s.riskLevel)
    let overallRisk = "low"

    if (riskLevels.includes("high")) {
      overallRisk = "high"
    } else if (riskLevels.includes("medium")) {
      overallRisk = "medium"
    }

    res.status(200).json({
      assessedSymptoms,
      overallRisk,
      recommendations: getOverallRecommendations(overallRisk),
    })
  } catch (error) {
    console.error("Error assessing symptoms:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Helper function to determine risk level
function determineRiskLevel(symptomName, severity) {
  // This is a simplified version - in a real app, this would be more complex
  // and would likely use a medical database or AI

  // High-risk symptoms regardless of severity
  const highRiskSymptoms = [
    "vaginal bleeding",
    "severe headache",
    "vision changes",
    "chest pain",
    "difficulty breathing",
    "seizure",
    "loss of consciousness",
    "severe abdominal pain",
  ]

  // Medium-risk symptoms
  const mediumRiskSymptoms = [
    "fever",
    "persistent vomiting",
    "reduced fetal movement",
    "swelling",
    "urinary problems",
    "dizziness",
  ]

  const symptomLower = symptomName.toLowerCase()

  if (highRiskSymptoms.some((s) => symptomLower.includes(s))) {
    return "high"
  }

  if (mediumRiskSymptoms.some((s) => symptomLower.includes(s))) {
    return severity === "severe" ? "high" : "medium"
  }

  return severity === "severe" ? "medium" : "low"
}

// Helper function to get recommendations
function getRecommendations(symptomName, severity, riskLevel) {
  // This is a simplified version - in a real app, this would be more complex

  if (riskLevel === "high") {
    return [
      "Seek immediate medical attention",
      "Contact your healthcare provider right away",
      "Do not drive yourself to the hospital if experiencing severe symptoms",
    ]
  }

  if (riskLevel === "medium") {
    return [
      "Contact your healthcare provider within 24 hours",
      "Rest and monitor your symptoms",
      "If symptoms worsen, seek immediate medical attention",
    ]
  }

  return [
    "Monitor your symptoms",
    "Rest and stay hydrated",
    "Contact your healthcare provider if symptoms persist or worsen",
  ]
}

// Helper function to get overall recommendations
function getOverallRecommendations(overallRisk) {
  if (overallRisk === "high") {
    return [
      "Seek immediate medical attention",
      "Call emergency services if necessary",
      "Have someone accompany you to the hospital if possible",
    ]
  }

  if (overallRisk === "medium") {
    return [
      "Contact your healthcare provider today",
      "Have someone stay with you to monitor your condition",
      "Prepare to go to the hospital if symptoms worsen",
    ]
  }

  return [
    "Continue to monitor your symptoms",
    "Follow up with your healthcare provider at your next appointment",
    "Practice self-care and rest",
  ]
}

export default router

