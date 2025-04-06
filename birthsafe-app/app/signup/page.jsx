"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/components/supabase-auth-provider"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { signUp } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    setSuccess(false)

    try {
      // Simple signup with just email and password
      console.log("Submitting signup with:", { email });
      
      // Use the API route for signup
      const { data, error } = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then(res => res.json());
      
      console.log("Signup API result:", { data, error });
      
      if (error) {
        throw new Error(error || "Failed to sign up")
      }
      
      // Show success message instead of redirecting
      setSuccess(true)
    } catch (error) {
      console.error("Signup error:", error)
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
          <h1 className="text-3xl font-bold text-slate-900">Create an account</h1>
          <p className="text-slate-600 mt-2">Join BirthSafe for a safer pregnancy journey</p>
        </div>

        {success ? (
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
              <h2 className="font-bold text-lg mb-2">Account Created Successfully!</h2>
              <p>Please check your email to confirm your account.</p>
              <p className="mt-2">After confirming, you can sign in to complete your profile.</p>
            </div>
            <Button 
              onClick={() => router.push('/login')} 
              className="mt-4"
            >
              Go to Login
            </Button>
          </div>
        ) : (
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                />
                <p className="text-xs text-slate-500">Must be at least 8 characters</p>
              </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-slate-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}
