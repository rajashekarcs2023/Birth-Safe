"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Shield, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useUser } from "@auth0/nextjs-auth0/client"

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isLoading } = useUser()

  // Get user data from URL parameters
  const userNameFromParams = searchParams.get("name") || ""
  const userTypeFromParams = searchParams.get("userType") || "expectant"

  // Start at step 2 if we have data from signup
  const initialStep = userNameFromParams ? 2 : 1

  const [step, setStep] = useState(initialStep)
  const [progress, setProgress] = useState(Math.round(initialStep * (100 / 7))) // Now 7 steps total
  const [userName, setUserName] = useState(userNameFromParams || user?.name || "")
  const [userType, setUserType] = useState(userTypeFromParams)
  const [knowsDueDate, setKnowsDueDate] = useState("unsure")
  const [dueDate, setDueDate] = useState("")
  const [lastPeriod, setLastPeriod] = useState("")
  const [pregnancyStage, setPregnancyStage] = useState("confirmed")
  const [pregnancyProfile, setPregnancyProfile] = useState("first-time")
  const [previousLoss, setPreviousLoss] = useState(false)
  const [riskFactors, setRiskFactors] = useState([])
  const [trackingPreferences, setTrackingPreferences] = useState(["missed-care", "symptoms", "emergency"])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  // Update progress when step changes
  useEffect(() => {
    setProgress(Math.round(step * (100 / 7)))
  }, [step])

  // Check if user is authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/api/auth/login?returnTo=/onboarding")
    }
  }, [user, isLoading, router])

  // Check if user has already completed onboarding
  useEffect(() => {
    if (user) {
      fetch("/api/onboarding")
        .then((res) => res.json())
        .then((data) => {
          if (data.completed) {
            router.push("/dashboard")
          }
        })
        .catch((err) => {
          console.error("Error checking onboarding status:", err)
        })
    }
  }, [user, router])

  const nextStep = () => {
    if (step < 7) {
      setStep(step + 1)
    } else {
      submitOnboardingData()
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleRiskFactorChange = (value) => {
    setRiskFactors((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const handleTrackingPreferenceChange = (value) => {
    setTrackingPreferences((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  const submitOnboardingData = async () => {
    try {
      setIsSubmitting(true)
      setError(null)

      // Calculate due date from last period if needed
      let calculatedDueDate = dueDate
      if (knowsDueDate === "estimate" && lastPeriod) {
        const periodDate = new Date(lastPeriod)
        calculatedDueDate = new Date(periodDate.setDate(periodDate.getDate() + 280)).toISOString().split("T")[0]
      }

      const onboardingData = {
        userName,
        userType,
        pregnancyStage,
        pregnancyProfile,
        previousLoss,
        knowsDueDate,
        dueDate: calculatedDueDate || null,
        riskFactors,
        trackingPreferences,
      }

      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(onboardingData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to save onboarding data")
      }

      // Redirect to dashboard after successful submission
      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting onboarding data:", error)
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // If still loading or not authenticated, show loading state
  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-purple-50 to-white flex flex-col">
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-blue-600">BirthSafe</span>
          </div>
          <div className="text-sm text-slate-500">Step {step} of 7</div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-2">
        <Progress value={progress} className="h-2" />
      </div>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
        {/* Only show Step 1 if we don't have user data from signup */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 rounded-full p-4">
                  <Heart className="h-10 w-10 text-blue-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-slate-900">Welcome to BirthSafe</h1>
              <p className="text-slate-600 max-w-md mx-auto">
                You deserve a safe, respectful, and informed pregnancy journey. We're here to help you track, ask
                questions, and speak up when it matters most.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <div className="space-y-4">
                <Label htmlFor="name" className="text-base">
                  Let's start with your name
                </Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="text-lg"
                />
                <p className="text-sm text-slate-500">We'll use this to personalize your experience</p>
              </div>

              <div className="space-y-4">
                <Label className="text-base">I am:</Label>
                <RadioGroup defaultValue={userType} onValueChange={setUserType} className="grid grid-cols-1 gap-4">
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${userType === "expectant" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="expectant" id="expectant" />
                    <Label htmlFor="expectant" className="flex items-center gap-3 cursor-pointer flex-1">
                      <div>
                        <p className="font-medium">Expectant or new parent</p>
                        <p className="text-sm text-slate-500">I want to track and advocate for my maternity care</p>
                      </div>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${userType === "provider" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="provider" id="provider" />
                    <Label htmlFor="provider" className="flex items-center gap-3 cursor-pointer flex-1">
                      <div>
                        <p className="font-medium">Healthcare provider</p>
                        <p className="text-sm text-slate-500">I provide maternity care services</p>
                      </div>
                    </Label>
                  </div>
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${userType === "advocate" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="advocate" id="advocate" />
                    <Label htmlFor="advocate" className="flex items-center gap-3 cursor-pointer flex-1">
                      <div>
                        <p className="font-medium">Doula or birth advocate</p>
                        <p className="text-sm text-slate-500">I support parents through their maternity journey</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="ghost" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button onClick={nextStep} disabled={!userName}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Pregnancy Stage */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Content for Step 2 */}
            {/* ... (rest of the onboarding steps) ... */}
            <div className="flex justify-between">
              {userNameFromParams ? (
                <Button variant="ghost" onClick={() => router.push("/")}>
                  Cancel
                </Button>
              ) : (
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
              )}
              <Button onClick={nextStep}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* ... (Steps 3-7) ... */}

        {/* Step 7: Completion */}
        {step === 7 && (
          <div className="space-y-6">
            {/* Content for Step 7 */}
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button
                onClick={submitOnboardingData}
                className="bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Go to Dashboard"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">{error}</div>}
          </div>
        )}
      </main>
    </div>
  )
}

