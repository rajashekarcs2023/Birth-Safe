"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/supabase-auth-provider"

export function LoginButton({ redirectTo = "/dashboard" }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signIn } = useAuth()

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      // Redirect to login page
      router.push(`/login?returnTo=${encodeURIComponent(redirectTo)}`)
    } catch (error) {
      console.error("Login error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleLogin} disabled={isLoading} className="w-full">
      {isLoading ? "Logging in..." : "Log In"}
    </Button>
  )
}

