"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Shield, ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SignupPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [userType, setUserType] = useState("expectant")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false)
      // Pass the user type and name to the onboarding page as query parameters
      const userType = document.querySelector('input[name="userType"]:checked')?.value || "expectant"
      const fullName = (document.getElementById("name") as HTMLInputElement)?.value || ""
      router.push(`/onboarding?userType=${userType}&name=${encodeURIComponent(fullName)}`)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to home</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg border p-8 w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <Shield className="h-10 w-10 text-blue-600" />
            <h1 className="text-2xl font-bold mt-4 text-slate-900">Create your BirthSafe account</h1>
            <p className="text-slate-500 mt-2 text-center">Your secure companion for safer maternity care</p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="name@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  Password must be at least 8 characters with a number and a special character
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link href="#" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Continue"}
              </Button>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-slate-500">Or continue with</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base">I am:</Label>
                <RadioGroup defaultValue={userType} onValueChange={setUserType} className="grid grid-cols-1 gap-4">
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${userType === "expectant" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="expectant" id="expectant" name="userType" required />
                    <Label htmlFor="expectant" className="flex items-center gap-3 cursor-pointer flex-1">
                      {userType === "expectant" && <CheckCircle className="h-5 w-5 text-blue-600" />}
                      {userType !== "expectant" && <div className="h-5 w-5 rounded-full border-2 border-slate-300" />}
                      <div>
                        <p className="font-medium">Expectant or new parent</p>
                        <p className="text-sm text-slate-500">I want to track and advocate for my maternity care</p>
                      </div>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${userType === "provider" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="provider" id="provider" name="userType" />
                    <Label htmlFor="provider" className="flex items-center gap-3 cursor-pointer flex-1">
                      {userType === "provider" && <CheckCircle className="h-5 w-5 text-blue-600" />}
                      {userType !== "provider" && <div className="h-5 w-5 rounded-full border-2 border-slate-300" />}
                      <div>
                        <p className="font-medium">Healthcare provider</p>
                        <p className="text-sm text-slate-500">I provide maternity care services</p>
                      </div>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${userType === "advocate" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="advocate" id="advocate" name="userType" />
                    <Label htmlFor="advocate" className="flex items-center gap-3 cursor-pointer flex-1">
                      {userType === "advocate" && <CheckCircle className="h-5 w-5 text-blue-600" />}
                      {userType !== "advocate" && <div className="h-5 w-5 rounded-full border-2 border-slate-300" />}
                      <div>
                        <p className="font-medium">Doula or birth advocate</p>
                        <p className="text-sm text-slate-500">I support parents through their maternity journey</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="Your full name" required />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Completing setup..." : "Complete Account Setup"}
              </Button>
            </form>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <footer className="bg-white border-t py-6">
        <div className="container mx-auto px-4 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} BirthSafe. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <Link href="#" className="hover:text-slate-900">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-900">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-slate-900">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

