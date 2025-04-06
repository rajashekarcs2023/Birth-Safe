import admin from "firebase-admin"
import dotenv from "dotenv"

dotenv.config()

// Initialize Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
})

// Middleware to verify Firebase token
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized", message: "No token provided" })
    }

    const token = authHeader.split("Bearer ")[1]
    const decodedToken = await admin.auth().verifyIdToken(token)

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
    }

    next()
  } catch (error) {
    console.error("Error verifying token:", error)
    return res.status(403).json({ error: "Forbidden", message: "Invalid token" })
  }
}

// Middleware to check if user exists in our database
export const checkUserExists = async (req, res, next) => {
  try {
    const { query } = require("../db")
    const { rows } = await query("SELECT id FROM users WHERE firebase_uid = $1", [req.user.uid])

    if (rows.length === 0) {
      return res.status(404).json({ error: "Not Found", message: "User not found in database" })
    }

    req.user.id = rows[0].id
    next()
  } catch (error) {
    console.error("Error checking user:", error)
    return res.status(500).json({ error: "Server Error", message: "Error checking user" })
  }
}

