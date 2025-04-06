"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function SignupButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async () => {
    setIsLoading(true)
    // In a real implementation, this would redirect to Auth0
    // window.location.href = '/api/auth/login?screen_hint=signup'

    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
      setIsLoading(false)
      // Mock successful signup and login
      localStorage.setItem(
        "mockUser",
        JSON.stringify({
          name: "New User",
          email: "newuser@example.com",
          picture: "/placeholder.svg?height=50&width=50",
        }),
      )
      window.location.href = "/onboarding"
    }, 1500)
  }

  return (
    <Button onClick={handleSignup} disabled={isLoading} variant="outline" className="w-full">
      {isLoading ? "Creating account..." : "Sign Up with Auth0"}
    </Button>
  )
}

