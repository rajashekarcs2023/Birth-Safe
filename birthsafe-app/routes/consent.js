import express from "express"
import { query } from "../db/index.js"
import { checkUserExists } from "../middleware/auth.js"
import crypto from "crypto"

const router = express.Router()

// Apply middleware to all routes
router.use(checkUserExists)

// Get all consent logs for a user
router.get("/", async (req, res) => {
  try {
    const result = await query("SELECT * FROM consent_logs WHERE user_id = $1 ORDER BY created_at DESC", [req.user.id])

    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Error getting consent logs:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Get a specific consent log
router.get("/:id", async (req, res) => {
  try {
    const result = await query("SELECT * FROM consent_logs WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Consent log not found",
      })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error("Error getting consent log:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Create a new consent log
router.post("/", async (req, res) => {
  try {
    const { issueType, provider, description, evidenceType, evidenceUrl } = req.body

    // Create a hash of the content for integrity verification
    const contentToHash = `${issueType}|${provider}|${description}|${evidenceType}|${evidenceUrl}|${req.user.id}|${new Date().toISOString()}`
    const hash = crypto.createHash("sha256").update(contentToHash).digest("hex")

    const result = await query(
      `INSERT INTO consent_logs (
        user_id, 
        issue_type, 
        provider, 
        description, 
        evidence_type, 
        evidence_url,
        hash
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [req.user.id, issueType, provider, description, evidenceType, evidenceUrl, hash],
    )

    // Update pattern data (anonymized)
    await updatePatternData(provider, issueType)

    res.status(201).json({
      message: "Consent log created successfully",
      consentLog: result.rows[0],
    })
  } catch (error) {
    console.error("Error creating consent log:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Verify a consent log
router.post("/:id/verify", async (req, res) => {
  try {
    // First check if the consent log exists and belongs to the user
    const checkResult = await query("SELECT id FROM consent_logs WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Consent log not found or does not belong to user",
      })
    }

    const result = await query(
      `UPDATE consent_logs 
      SET verified = true
      WHERE id = $1 AND user_id = $2
      RETURNING *`,
      [req.params.id, req.user.id],
    )

    res.status(200).json({
      message: "Consent log verified successfully",
      consentLog: result.rows[0],
    })
  } catch (error) {
    console.error("Error verifying consent log:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Helper function to update pattern data
async function updatePatternData(provider, issueType) {
  try {
    // Check if pattern already exists
    const checkResult = await query(
      "SELECT id, occurrence_count FROM pattern_data WHERE facility = $1 AND issue_type = $2",
      [provider, issueType],
    )

    if (checkResult.rows.length > 0) {
      // Update existing pattern
      const newCount = checkResult.rows[0].occurrence_count + 1
      await query(
        `UPDATE pattern_data 
        SET 
          occurrence_count = $1,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $2`,
        [newCount, checkResult.rows[0].id],
      )
    } else {
      // Create new pattern
      await query(
        `INSERT INTO pattern_data (
          facility, 
          issue_type, 
          occurrence_count
        ) VALUES ($1, $2, $3)`,
        [provider, issueType, 1],
      )
    }
  } catch (error) {
    console.error("Error updating pattern data:", error)
    // Don't throw error to prevent blocking the main operation
  }
}

export default router

