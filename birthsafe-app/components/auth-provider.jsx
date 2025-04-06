"use client"

import { UserProvider } from "@auth0/nextjs-auth0"
import { useEffect } from "react"
import { useUser } from "@auth0/nextjs-auth0"
import { setSupabaseToken, clearSupabaseSession } from "@/lib/supabase-auth"

// Component to sync Auth0 token with Supabase
function AuthSync() {
  const { user, isLoading } = useUser()

  useEffect(() => {
    const syncAuth = async () => {
      if (isLoading) return

      if (user) {
        // Get the token from the client-side session
        const response = await fetch("/api/auth/token")
        const { token } = await response.json()

        if (token) {
          await setSupabaseToken(token)
        }
      } else {
        await clearSupabaseSession()
      }
    }

    syncAuth()
  }, [user, isLoading])

  return null
}

export function AuthProvider({ children }) {
  return (
    <UserProvider>
      <AuthSync />
      {children}
    </UserProvider>
  )
}

