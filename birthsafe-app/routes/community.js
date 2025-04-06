import express from "express"
import { query } from "../db/index.js"
import { checkUserExists } from "../middleware/auth.js"

const router = express.Router()

// Apply middleware to all routes
router.use(checkUserExists)

// Get all community insights
router.get("/insights", async (req, res) => {
  try {
    const result = await query(
      `SELECT 
        ci.id, 
        ci.topic, 
        ci.content, 
        ci.reply_count, 
        ci.anonymous, 
        ci.created_at,
        CASE WHEN ci.anonymous THEN 'Anonymous' ELSE u.name END as author_name
      FROM community_insights ci
      JOIN users u ON ci.user_id = u.id
      ORDER BY ci.created_at DESC`,
      [],
    )

    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Error getting community insights:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Get a specific community insight with replies
router.get("/insights/:id", async (req, res) => {
  try {
    // Get the insight
    const insightResult = await query(
      `SELECT 
        ci.id, 
        ci.topic, 
        ci.content, 
        ci.reply_count, 
        ci.anonymous, 
        ci.created_at,
        CASE WHEN ci.anonymous THEN 'Anonymous' ELSE u.name END as author_name
      FROM community_insights ci
      JOIN users u ON ci.user_id = u.id
      WHERE ci.id = $1`,
      [req.params.id],
    )

    if (insightResult.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Community insight not found",
      })
    }

    // Get the replies
    const repliesResult = await query(
      `SELECT 
        cr.id, 
        cr.content, 
        cr.anonymous, 
        cr.created_at,
        CASE WHEN cr.anonymous THEN 'Anonymous' ELSE u.name END as author_name
      FROM community_replies cr
      JOIN users u ON cr.user_id = u.id
      WHERE cr.insight_id = $1
      ORDER BY cr.created_at ASC`,
      [req.params.id],
    )

    res.status(200).json({
      insight: insightResult.rows[0],
      replies: repliesResult.rows,
    })
  } catch (error) {
    console.error("Error getting community insight:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Create a new community insight
router.post("/insights", async (req, res) => {
  try {
    const { topic, content, anonymous } = req.body

    const result = await query(
      `INSERT INTO community_insights (
        user_id, 
        topic, 
        content, 
        anonymous
      ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.user.id, topic, content, anonymous || false],
    )

    res.status(201).json({
      message: "Community insight created successfully",
      insight: result.rows[0],
    })
  } catch (error) {
    console.error("Error creating community insight:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Reply to a community insight
router.post("/insights/:id/reply", async (req, res) => {
  try {
    const { content, anonymous } = req.body

    // First check if the insight exists
    const checkResult = await query("SELECT id FROM community_insights WHERE id = $1", [req.params.id])

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Community insight not found",
      })
    }

    // Create the reply
    const replyResult = await query(
      `INSERT INTO community_replies (
        insight_id,
        user_id, 
        content, 
        anonymous
      ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [req.params.id, req.user.id, content, anonymous || false],
    )

    // Update the reply count
    await query(
      `UPDATE community_insights 
      SET reply_count = reply_count + 1
      WHERE id = $1`,
      [req.params.id],
    )

    res.status(201).json({
      message: "Reply added successfully",
      reply: replyResult.rows[0],
    })
  } catch (error) {
    console.error("Error adding reply:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Get pattern analysis data
router.get("/patterns", async (req, res) => {
  try {
    const result = await query(
      `SELECT 
        facility, 
        issue_type, 
        occurrence_count, 
        safety_score
      FROM pattern_data
      ORDER BY occurrence_count DESC`,
      [],
    )

    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Error getting pattern data:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Get pattern analysis by facility
router.get("/patterns/facilities", async (req, res) => {
  try {
    const result = await query(
      `SELECT 
        facility, 
        SUM(occurrence_count) as total_issues,
        AVG(safety_score) as average_safety_score
      FROM pattern_data
      GROUP BY facility
      ORDER BY total_issues DESC`,
      [],
    )

    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Error getting facility pattern data:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

export default router

