import express from "express"
import { query } from "../db/index.js"
import { checkUserExists } from "../middleware/auth.js"

const router = express.Router()

// Apply middleware to all routes
router.use(checkUserExists)

// Get all clinical tasks for a user
router.get("/", async (req, res) => {
  try {
    const result = await query("SELECT * FROM clinical_tasks WHERE user_id = $1 ORDER BY due_date ASC", [req.user.id])

    res.status(200).json(result.rows)
  } catch (error) {
    console.error("Error getting clinical tasks:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Get a specific clinical task
router.get("/:id", async (req, res) => {
  try {
    const result = await query("SELECT * FROM clinical_tasks WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Clinical task not found",
      })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error("Error getting clinical task:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Create a new clinical task
router.post("/", async (req, res) => {
  try {
    const { title, description, importance, dueDate } = req.body

    const result = await query(
      `INSERT INTO clinical_tasks (
        user_id, 
        title, 
        description, 
        importance, 
        due_date
      ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [req.user.id, title, description, importance, dueDate],
    )

    res.status(201).json({
      message: "Clinical task created successfully",
      task: result.rows[0],
    })
  } catch (error) {
    console.error("Error creating clinical task:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Update a clinical task
router.put("/:id", async (req, res) => {
  try {
    const { title, description, importance, dueDate, completed } = req.body

    // First check if the task exists and belongs to the user
    const checkResult = await query("SELECT id FROM clinical_tasks WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Clinical task not found or does not belong to user",
      })
    }

    // Set completed_at if task is being marked as completed
    const completedAt = completed ? "CURRENT_TIMESTAMP" : null

    const result = await query(
      `UPDATE clinical_tasks 
      SET 
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        importance = COALESCE($3, importance),
        due_date = COALESCE($4, due_date),
        completed = COALESCE($5, completed),
        completed_at = ${completed ? completedAt : "completed_at"}
      WHERE id = $6 AND user_id = $7
      RETURNING *`,
      [title, description, importance, dueDate, completed, req.params.id, req.user.id],
    )

    res.status(200).json({
      message: "Clinical task updated successfully",
      task: result.rows[0],
    })
  } catch (error) {
    console.error("Error updating clinical task:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

// Delete a clinical task
router.delete("/:id", async (req, res) => {
  try {
    // First check if the task exists and belongs to the user
    const checkResult = await query("SELECT id FROM clinical_tasks WHERE id = $1 AND user_id = $2", [
      req.params.id,
      req.user.id,
    ])

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        error: "Not found",
        message: "Clinical task not found or does not belong to user",
      })
    }

    await query("DELETE FROM clinical_tasks WHERE id = $1 AND user_id = $2", [req.params.id, req.user.id])

    res.status(200).json({
      message: "Clinical task deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting clinical task:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

export default router

