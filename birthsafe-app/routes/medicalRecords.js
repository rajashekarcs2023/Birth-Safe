import express from "express"
import { query } from "../db/index.js"
import { checkUserExists } from "../middleware/auth.js"

const router = express.Router()

// Apply middleware to all routes
router.use(checkUserExists)

// Get all medical records for a user
router.get("/", async (req, res) => {
  try {
    const result = await query("SELECT * FROM medical_records WHERE user_id = $1 ORDER BY record_date DESC", [
      req.user.id,
    ])

    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Error getting medical records:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Get a specific medical record
router.get("/:id", async (req, res) => {
  try {
    const result = await query("SELECT * FROM medical_records WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Medical record not found",
      })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error("Error getting medical record:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Create a new medical record
router.post("/", async (req, res) => {
  try {
    const { recordType, provider, recordDate, notes, attachments } = req.body

    const result = await query(
      `INSERT INTO medical_records (
        user_id, 
        record_type, 
        provider, 
        record_date, 
        notes, 
        attachments
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.id, recordType, provider, recordDate, notes, attachments],
    )

    res.status(201).json({
      message: "Medical record created successfully",
      record: result.rows[0],
    })
  } catch (error) {
    console.error("Error creating medical record:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Update a medical record
router.put("/:id", async (req, res) => {
  try {
    const { recordType, provider, recordDate, notes, attachments } = req.body

    // First check if the record exists and belongs to the user
    const checkResult = await query("SELECT id FROM medical_records WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Medical record not found or does not belong to user",
      })
    }

    const result = await query(
      `UPDATE medical_records 
      SET 
        record_type = COALESCE($1, record_type),
        provider = COALESCE($2, provider),
        record_date = COALESCE($3, record_date),
        notes = COALESCE($4, notes),
        attachments = COALESCE($5, attachments)
      WHERE id = $6 AND user_id = $7
      RETURNING *`,
      [recordType, provider, recordDate, notes, attachments, req.params.id, req.user.id],
    )

    res.status(200).json({
      message: "Medical record updated successfully",
      record: result.rows[0],
    })
  } catch (error) {
    console.error("Error updating medical record:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Delete a medical record
router.delete("/:id", async (req, res) => {
  try {
    // First check if the record exists and belongs to the user
    const checkResult = await query("SELECT id FROM medical_records WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Medical record not found or does not belong to user",
      })
    }

    await query("DELETE FROM medical_records WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id])

    res.status(200).json({
      message: "Medical record deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting medical record:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Get timeline (combines medical records with other events)
router.get("/timeline", async (req, res) => {
  try {
    // Get medical records
    const medicalRecordsResult = await query(
      `SELECT 
        id, 
        'medical_record' as type, 
        record_date as date, 
        record_type as title, 
        provider, 
        notes as description 
      FROM medical_records 
      WHERE user_id = $1`,
      [req.user.id],
    )

    // Get symptoms
    const symptomsResult = await query(
      `SELECT 
        id, 
        'symptom' as type, 
        reported_at as date, 
        symptom_name as title, 
        severity, 
        description 
      FROM symptoms 
      WHERE user_id = $1`,
      [req.user.id],
    )

    // Get medications
    const medicationsResult = await query(
      `SELECT 
        id, 
        'medication' as type, 
        start_date as date, 
        name as title, 
        dosage, 
        notes as description 
      FROM medications 
      WHERE user_id = $1`,
      [req.user.id],
    )

    // Get consent logs
    const consentResult = await query(
      `SELECT 
        id, 
        'consent' as type, 
        created_at as date, 
        issue_type as title, 
        provider, 
        description 
      FROM consent_logs 
      WHERE user_id = $1`,
      [req.user.id],
    )

    // Combine all events
    const timeline = [
      ...medicalRecordsResult.rows,
      ...symptomsResult.rows,
      ...medicationsResult.rows,
      ...consentResult.rows,
    ]

    // Sort by date (newest first)
    timeline.sort((a, b) => new Date(b.date) - new Date(a.date))

    res.status(200).json(timeline)
  } catch (error) {
    console.error("Error getting timeline:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

export default router

