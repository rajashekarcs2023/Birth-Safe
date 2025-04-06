import express from "express"
import admin from "firebase-admin"
import { query } from "../db/index.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
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

    // Create user in Firebase
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: name,
      emailVerified: false,
    })

    // Create user in our database
    const result = await query(
      `INSERT INTO users (
        email, 
        firebase_uid, 
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
        healthcare_provider
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
      [
        email,
        userRecord.uid,
        name,
        dob,
        gestationalAge,
        dueDate,
        highRisk || false,
        riskFactors || "",
        preferredLanguage || "en",
        phoneNumber || "",
        emergencyContactName || "",
        emergencyContactPhone || "",
        healthcareProvider || "",
      ],
    )

    // Create custom token for initial login
    const customToken = await admin.auth().createCustomToken(userRecord.uid)

    res.status(201).json({
      message: "User registered successfully",
      userId: result.rows[0].id,
      token: customToken,
    })
  } catch (error) {
    console.error("Error registering user:", error)
    res.status(500).json({
      error: "Registration failed",
      message: error.message,
    })
  }
})

// Login endpoint (Firebase handles this on the client, but we'll add a server endpoint for completeness)
router.post("/login", async (req, res) => {
  try {
    // This endpoint would typically be handled by Firebase Authentication on the client
    // Here we're just checking if the user exists in our database
    const { idToken } = req.body

    const decodedToken = await admin.auth().verifyIdToken(idToken)
    const { uid, email } = decodedToken

    const result = await query("SELECT id FROM users WHERE firebase_uid = $1", [uid])

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
        message: "User exists in Firebase but not in our database",
      })
    }

    res.status(200).json({
      message: "Login successful",
      userId: result.rows[0].id,
    })
  } catch (error) {
    console.error("Error logging in:", error)
    res.status(401).json({
      error: "Authentication failed",
      message: error.message,
    })
  }
})

// Get current user
router.get("/me", verifyToken, async (req, res) => {
  try {
    const result = await query(
      "SELECT id, email, name, dob, gestational_age, due_date, high_risk, risk_factors, preferred_language FROM users WHERE firebase_uid = $1",
      [req.user.uid],
    )

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
        message: "User not found in database",
      })
    }

    res.status(200).json(result.rows[0])
  } catch (error) {
    console.error("Error getting user:", error)
    res.status(500).json({
      error: "Server error",
      message: error.message,
    })
  }
})

export default router

