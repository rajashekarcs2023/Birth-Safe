import express from "express"
import { query } from "../db/index.js"
import { checkUserExists } from "../middleware/auth.js"

const router = express.Router()

// Apply middleware to all routes
router.use(checkUserExists)

// Get user profile
router.get("/profile", async (req, res) => {
  try {
    const result = await query(
      `SELECT 
        id, 
        email, 
        name, 
        dob, 
        gestational_age, 
        due_date, 
        high_risk, 
        risk_factors,
        preferred_language,
        phone_number,
        emergency_contact_name,
        emergency_contact_phone,
        healthcare_provider,
        created_at
      FROM users 
      WHERE id = $1`,
      [req.user.id],
    )

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error("Error getting profile:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Update user profile
router.put("/profile", async (req, res) => {
  try {
    const {
      name,
      dob,
      gestationalAge,
      dueDate,
      highRisk,
      riskFactors,
      preferredLanguage,
      phoneNumber,
      emergencyContactName,
      emergencyContactPhone,
      healthcareProvider,
    } = req.body

    const result = await query(
      `UPDATE users 
      SET 
        name = COALESCE($1, name),
        dob = COALESCE($2, dob),
        gestational_age = COALESCE($3, gestational_age),
        due_date = COALESCE($4, due_date),
        high_risk = COALESCE($5, high_risk),
        risk_factors = COALESCE($6, risk_factors),
        preferred_language = COALESCE($7, preferred_language),
        phone_number = COALESCE($8, phone_number),
        emergency_contact_name = COALESCE($9, emergency_contact_name),
        emergency_contact_phone = COALESCE($10, emergency_contact_phone),
        healthcare_provider = COALESCE($11, healthcare_provider),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $12
      RETURNING *`,
      [
        name,
        dob,
        gestationalAge,
        dueDate,
        highRisk,
        riskFactors,
        preferredLanguage,
        phoneNumber,
        emergencyContactName,
        emergencyContactPhone,
        healthcareProvider,
        req.user.id,
      ],
    )

    res.status(200).json({
      message: "Profile updated successfully",
      user: result.rows[0],
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Get user safety score
router.get("/safety-score", async (req, res) => {
  try {
    // Calculate safety score based on various factors
    // This is a simplified version - in a real app, this would be more complex

    // Get count of completed clinical tasks
    const tasksResult = await query("SELECT COUNT(*) FROM clinical_tasks WHERE user_id = $1 AND completed = true", [
      req.user.id,
    ])

    // Get count of reported symptoms
    const symptomsResult = await query("SELECT COUNT(*) FROM symptoms WHERE user_id = $1", [req.user.id])

    // Get count of medications
    const medicationsResult = await query("SELECT COUNT(*) FROM medications WHERE user_id = $1", [req.user.id])

    // Get count of consent logs
    const consentResult = await query("SELECT COUNT(*) FROM consent_logs WHERE user_id = $1", [req.user.id])

    // Calculate safety score (simplified algorithm)
    const tasksCount = Number.parseInt(tasksResult.rows[0].count)
    const symptomsCount = Number.parseInt(symptomsResult.rows[0].count)
    const medicationsCount = Number.parseInt(medicationsResult.rows[0].count)
    const consentCount = Number.parseInt(consentResult.rows[0].count)

    // Simple algorithm: base score + points for each completed item
    let safetyScore = 50 // Base score
    safetyScore += tasksCount * 5 // 5 points per completed task
    safetyScore += symptomsCount * 2 // 2 points per tracked symptom
    safetyScore += medicationsCount * 3 // 3 points per tracked medication
    safetyScore += consentCount * 4 // 4 points per consent log

    // Cap at 100
    safetyScore = Math.min(safetyScore, 100)

    res.status(200).json({
      safetyScore,
      components: {
        tasksCompleted: tasksCount,
        symptomsTracked: symptomsCount,
        medicationsTracked: medicationsCount,
        consentLogsCreated: consentCount,
      },
    })
  } catch (error) {
    console.error("Error calculating safety score:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

export default router

