"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createBrowserClient } from "@supabase/ssr"
import { supabase, getSession, getUser, signIn, signOut, signUp } from "@/lib/supabase"

// Create auth context
const AuthContext = createContext()

// Auth provider component
export function SupabaseAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true)
      try {
        // Get session from Supabase
        const { session, error } = await getSession()
        
        if (error) {
          console.error("Error getting session:", error)
          setUser(null)
        } else if (session) {
          // Get user data
          const userData = await getUser()
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Auth initialization error:", error)
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    initAuth()

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          const userData = await getUser()
          setUser(userData)
        } else {
          setUser(null)
        }
        setIsLoading(false)
      }
    )

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  // Sign up function
  const handleSignUp = async (email, password, metadata = {}) => {
    setIsLoading(true)
    try {
      console.log("Signing up with metadata:", metadata);
      const { data, error } = await signUp(email, password, metadata)
      
      if (error) {
        throw error
      }
      
      // If email confirmation is required
      if (!data.session) {
        return { success: true, message: "Please check your email for verification link" }
      }
      
      setUser(data.user)
      return { success: true, user: data.user, metadata }
    } catch (error) {
      console.error("Sign up error:", error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  // Sign in function
  const handleSignIn = async (email, password) => {
    setIsLoading(true)
    try {
      const { data, error } = await signIn(email, password)
      
      if (error) {
        throw error
      }
      
      setUser(data.user)
      return { success: true }
    } catch (error) {
      console.error("Sign in error:", error)
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out function
  const handleSignOut = async () => {
    try {
      const { error } = await signOut()
      
      if (error) {
        throw error
      }
      
      setUser(null)
      router.push("/")
      return { success: true }
    } catch (error) {
      console.error("Sign out error:", error)
      return { success: false, error: error.message }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signUp: handleSignUp,
        signIn: handleSignIn,
        signOut: handleSignOut
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
