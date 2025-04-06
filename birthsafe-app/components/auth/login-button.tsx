"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"

export function LoginButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async () => {
    setIsLoading(true)
    // In a real implementation, this would redirect to Auth0
    // window.location.href = '/api/auth/login'

    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
      setIsLoading(false)
      // Mock successful login
      localStorage.setItem(
        "mockUser",
        JSON.stringify({
          name: "Jane Doe",
          email: "jane@example.com",
          picture: "/placeholder.svg?height=50&width=50",
        }),
      )
      window.location.href = "/dashboard"
    }, 1500)
  }

  return (
    <Button onClick={handleLogin} disabled={isLoading} className="w-full">
      {isLoading ? "Logging in..." : "Log In with Auth0"}
    </Button>
  )
}

