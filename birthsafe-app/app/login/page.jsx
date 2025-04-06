"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Get return URL from query params
  const returnTo = searchParams.get("returnTo") || "/dashboard"

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setMessage(null)
    setIsLoading(true)

    try {
      // Direct Supabase authentication
      console.log("Signing in with direct Supabase call:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        throw new Error(error.message || "Failed to sign in")
      }
      
      console.log("Login successful:", data);
      setMessage("Login successful! Redirecting...");
      
      // Check if user has completed onboarding
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('user_id', data.user.id)
        .single();
      
      if (profileError) {
        console.error("Error checking profile:", profileError);
      }
      
      console.log("Profile data:", profileData);
      
      // Determine where to redirect
      let destination;
      if (profileData?.onboarding_completed) {
        destination = '/feed';
      } else {
        destination = '/onboarding';
      }
      
      console.log("Redirecting to:", destination);
      
      // Use direct window location for reliable redirect
      window.location.href = destination;
    } catch (error) {
      console.error("Login error:", error)
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 rounded-full p-4">
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-600 mt-2">Sign in to your BirthSafe account</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {message && (
              <div className="bg-green-50 text-green-600 p-3 rounded-md text-sm">
                {message}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-slate-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
