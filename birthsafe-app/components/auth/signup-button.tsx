"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/supabase-auth-provider"

export function SignupButton() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSignup = async () => {
    setIsLoading(true)
    try {
      // Redirect to signup page
      router.push('/signup')
    } catch (error) {
      console.error("Signup error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleSignup} disabled={isLoading} variant="outline" className="w-full">
      {isLoading ? "Creating account..." : "Sign Up"}
    </Button>
  )
}

