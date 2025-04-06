"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

type User = {
  id: string
  name: string
  email: string
  dueDate?: string
  weeksPregnant?: number
  riskLevel?: "low" | "medium" | "high"
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate checking for an existing session
  useEffect(() => {
    // In a real app, this would check for a valid session token
    const checkSession = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500))

        // For demo purposes, we'll set a mock user
        // In production, this would verify a session token with your backend
        const mockUser = {
          id: "user_1",
          name: "Sarah Johnson",
          email: "sarah@example.com",
          dueDate: "2023-12-15",
          weeksPregnant: 28,
          riskLevel: "low" as const,
        }

        setUser(mockUser)
      } catch (error) {
        console.error("Session check failed:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkSession()
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful login
      setUser({
        id: "user_1",
        name: "Sarah Johnson",
        email,
        dueDate: "2023-12-15",
        weeksPregnant: 28,
        riskLevel: "low",
      })
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock successful signup
      setUser({
        id: "user_" + Date.now(),
        name,
        email,
        weeksPregnant: 0,
      })
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setUser(null)
    } catch (error) {
      console.error("Logout failed:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

