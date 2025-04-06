"use client"

import { useUser } from "@auth0/nextjs-auth0"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function useAuth() {
  const { user, error, isLoading } = useUser()
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(false)

  useEffect(() => {
    // If we have an Auth0 user but no profile yet, fetch or create the profile
    const fetchOrCreateProfile = async () => {
      if (user && !profile && !profileLoading) {
        setProfileLoading(true)

        try {
          // Check if user exists in Supabase
          const { data, error } = await supabase.from("profiles").select("*").eq("auth0_id", user.sub).single()

          if (error && error.code !== "PGRST116") {
            // PGRST116 is the error code for "no rows returned"
            console.error("Error fetching profile:", error)
            setProfileLoading(false)
            return
          }

          if (data) {
            // User exists, set profile
            setProfile(data)
          } else {
            // User doesn't exist, create profile
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert([
                {
                  auth0_id: user.sub,
                  email: user.email,
                  name: user.name || "",
                  picture: user.picture || "",
                  created_at: new Date().toISOString(),
                },
              ])
              .select()
              .single()

            if (createError) {
              console.error("Error creating profile:", createError)
            } else {
              setProfile(newProfile)
            }
          }
        } catch (err) {
          console.error("Unexpected error in profile fetch:", err)
        }

        setProfileLoading(false)
      }
    }

    fetchOrCreateProfile()
  }, [user, profile, profileLoading])

  return {
    user,
    profile,
    isLoading: isLoading || profileLoading,
    error,
  }
}

