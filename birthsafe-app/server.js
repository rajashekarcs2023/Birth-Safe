import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import dotenv from "dotenv"
import { Pool } from "pg"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import medicalRecordRoutes from "./routes/medicalRecords.js"
import symptomRoutes from "./routes/symptoms.js"
import medicationRoutes from "./routes/medications.js"
import consentRoutes from "./routes/consent.js"
import taskRoutes from "./routes/tasks.js"
import communityRoutes from "./routes/community.js"
import { verifyToken } from "./middleware/auth.js"

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 5000

// Database connection
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Middleware
app.use(cors())
app.use(helmet()) // Security headers
app.use(express.json()) // Parse JSON bodies
app.use(morgan("dev")) // Logging

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date() })
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", verifyToken, userRoutes)
app.use("/api/medical-records", verifyToken, medicalRecordRoutes)
app.use("/api/symptoms", verifyToken, symptomRoutes)
app.use("/api/medications", verifyToken, medicationRoutes)
app.use("/api/consent-logs", verifyToken, consentRoutes)
app.use("/api/clinical-tasks", verifyToken, taskRoutes)
app.use("/api/community", verifyToken, communityRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: "Server error",
    message: process.env.NODE_ENV === "development" ? err.message : "An unexpected error occurred",
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

