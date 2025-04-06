"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Shield, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/supabase-auth-provider"
import { supabase } from "@/lib/supabase"

export default function OnboardingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isLoading } = useAuth()

  // Check if we have data from URL parameters (old flow)
  const userNameFromParams = searchParams.get("name") || ""
  const userTypeFromParams = searchParams.get("userType") || "expectant"
  
  // Always start at step 1 for the new flow
  const initialStep = 1

  const [step, setStep] = useState(initialStep)
  const [progress, setProgress] = useState(Math.round(initialStep * (100 / 7))) // Now 7 steps total
  const [userName, setUserName] = useState(userNameFromParams || user?.user_metadata?.name || user?.email || "")
  const [userType, setUserType] = useState(userTypeFromParams || user?.user_metadata?.user_type || "expectant")
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
      router.push("/login?returnTo=/onboarding")
    }
  }, [user, isLoading, router])

  // Check if user has already completed onboarding
  useEffect(() => {
    if (user) {
      console.log("Onboarding user data:", user);
      // Check if user has already completed onboarding
      // This would be a call to your API, but for now we'll just log
      console.log("Checking if user has completed onboarding");
    }
  }, [user])

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

      // First, make sure we have a valid session
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        console.log("No active session, attempting to refresh")
        const { data: refreshData } = await supabase.auth.refreshSession()
        if (!refreshData.session) {
          throw new Error("Your session has expired. Please log in again.")
        }
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

      console.log("Submitting onboarding data:", onboardingData)

      // Try direct Supabase update first
      try {
        const { data: userData } = await supabase.auth.getUser()
        if (userData?.user) {
          console.log("Updating profile directly via Supabase")
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              name: onboardingData.userName,
              user_type: onboardingData.userType,
              pregnancy_stage: onboardingData.pregnancyStage,
              pregnancy_profile: onboardingData.pregnancyProfile,
              previous_loss: onboardingData.previousLoss,
              knows_due_date: onboardingData.knowsDueDate,
              due_date: onboardingData.dueDate,
              risk_factors: onboardingData.riskFactors,
              tracking_preferences: onboardingData.trackingPreferences,
              onboarding_completed: true,
              updated_at: new Date().toISOString()
            })
            .eq('user_id', userData.user.id)
          
          if (!updateError) {
            console.log("Profile updated successfully via direct Supabase call")
            window.location.href = "/feed"
            return
          } else {
            console.error("Error updating profile directly:", updateError)
          }
        }
      } catch (directError) {
        console.error("Error with direct update:", directError)
      }

      // Fall back to API route if direct update fails
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(onboardingData),
        credentials: 'include', // Important for sending cookies
      })

      // Check if response is OK
      if (!response.ok) {
        // Try to parse error as JSON
        let errorMessage = "Failed to save onboarding data"
        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (e) {
          // If parsing fails, use text
          const errorText = await response.text()
          console.error("Error response:", errorText)
          errorMessage = `Server error: ${response.status}`
        }
        throw new Error(errorMessage)
      }

      const data = await response.json()
      console.log("Onboarding completed successfully:", data)

      // Use window.location for a hard redirect to avoid any routing issues
      window.location.href = "/feed"
    } catch (error) {
      console.error("Error submitting onboarding data:", error)
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Get user metadata
  const userData = user?.user_metadata || {}
  console.log("Onboarding page - User data:", user)
  console.log("Onboarding page - User metadata:", userData)
  
  // Show loading state while authentication is being checked
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }
  
  // Don't require authentication for onboarding if we have parameters
  // This allows users to complete onboarding right after signup
  const hasOnboardingParams = userNameFromParams || userTypeFromParams

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
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Your pregnancy journey</h2>
              <p className="text-slate-600 mt-2">Tell us about your pregnancy stage</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Where are you in your pregnancy journey?</Label>
                <RadioGroup 
                  value={pregnancyStage} 
                  onValueChange={setPregnancyStage} 
                  className="grid gap-3 mt-3"
                >
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${pregnancyStage === "trying" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="trying" id="trying" />
                    <Label htmlFor="trying" className="cursor-pointer flex-1">
                      <p className="font-medium">Trying to conceive</p>
                      <p className="text-sm text-slate-500">Planning for pregnancy</p>
                    </Label>
                  </div>
                  
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${pregnancyStage === "confirmed" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="confirmed" id="confirmed" />
                    <Label htmlFor="confirmed" className="cursor-pointer flex-1">
                      <p className="font-medium">Confirmed pregnancy</p>
                      <p className="text-sm text-slate-500">I know I'm pregnant</p>
                    </Label>
                  </div>
                  
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${pregnancyStage === "postpartum" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="postpartum" id="postpartum" />
                    <Label htmlFor="postpartum" className="cursor-pointer flex-1">
                      <p className="font-medium">Postpartum</p>
                      <p className="text-sm text-slate-500">I've given birth recently</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Pregnancy Profile */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Your pregnancy profile</h2>
              <p className="text-slate-600 mt-2">Help us personalize your experience</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Is this your first pregnancy?</Label>
                <RadioGroup 
                  value={pregnancyProfile} 
                  onValueChange={setPregnancyProfile} 
                  className="grid gap-3 mt-3"
                >
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${pregnancyProfile === "first-time" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="first-time" id="first-time" />
                    <Label htmlFor="first-time" className="cursor-pointer flex-1">
                      <p className="font-medium">Yes, this is my first pregnancy</p>
                    </Label>
                  </div>
                  
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${pregnancyProfile === "experienced" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="experienced" id="experienced" />
                    <Label htmlFor="experienced" className="cursor-pointer flex-1">
                      <p className="font-medium">No, I've been pregnant before</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="pt-2">
                <Label className="text-base font-medium">Have you experienced pregnancy loss before?</Label>
                <RadioGroup 
                  value={previousLoss ? "yes" : "no"} 
                  onValueChange={(val) => setPreviousLoss(val === "yes")} 
                  className="grid gap-3 mt-3"
                >
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${previousLoss ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="yes" id="loss-yes" />
                    <Label htmlFor="loss-yes" className="cursor-pointer flex-1">
                      <p className="font-medium">Yes</p>
                    </Label>
                  </div>
                  
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${!previousLoss ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="no" id="loss-no" />
                    <Label htmlFor="loss-no" className="cursor-pointer flex-1">
                      <p className="font-medium">No</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Due Date */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Your due date</h2>
              <p className="text-slate-600 mt-2">Help us track your pregnancy timeline</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-base font-medium">Do you know your due date?</Label>
                <RadioGroup 
                  value={knowsDueDate} 
                  onValueChange={setKnowsDueDate} 
                  className="grid gap-3 mt-3"
                >
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${knowsDueDate === "exact" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="exact" id="exact" />
                    <Label htmlFor="exact" className="cursor-pointer flex-1">
                      <p className="font-medium">Yes, I know my exact due date</p>
                    </Label>
                  </div>
                  
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${knowsDueDate === "estimate" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="estimate" id="estimate" />
                    <Label htmlFor="estimate" className="cursor-pointer flex-1">
                      <p className="font-medium">I know my last period date</p>
                      <p className="text-sm text-slate-500">We can estimate your due date</p>
                    </Label>
                  </div>
                  
                  <div
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${knowsDueDate === "unsure" ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  >
                    <RadioGroupItem value="unsure" id="unsure" />
                    <Label htmlFor="unsure" className="cursor-pointer flex-1">
                      <p className="font-medium">I'm not sure yet</p>
                      <p className="text-sm text-slate-500">You can update this later</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {knowsDueDate === "exact" && (
                <div className="pt-2">
                  <Label htmlFor="due-date" className="text-base font-medium">Enter your due date</Label>
                  <Input
                    id="due-date"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="mt-2"
                  />
                </div>
              )}
              
              {knowsDueDate === "estimate" && (
                <div className="pt-2">
                  <Label htmlFor="last-period" className="text-base font-medium">When was the first day of your last period?</Label>
                  <Input
                    id="last-period"
                    type="date"
                    value={lastPeriod}
                    onChange={(e) => setLastPeriod(e.target.value)}
                    className="mt-2"
                  />
                  {lastPeriod && (
                    <p className="text-sm text-green-600 mt-2">
                      Based on this date, your estimated due date would be {new Date(new Date(lastPeriod).setDate(new Date(lastPeriod).getDate() + 280)).toLocaleDateString()}
                    </p>
                  )}
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 5: Risk Factors */}
        {step === 5 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Health factors</h2>
              <p className="text-slate-600 mt-2">Help us personalize your care recommendations</p>
            </div>
            
            <div className="space-y-4">
              <Label className="text-base font-medium">Do you have any of these health factors? (Select all that apply)</Label>
              <div className="grid gap-3 mt-2">
                <div
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${riskFactors.includes("hypertension") ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  onClick={() => handleRiskFactorChange("hypertension")}
                >
                  <input 
                    type="checkbox" 
                    checked={riskFactors.includes("hypertension")} 
                    onChange={() => {}} 
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <Label className="cursor-pointer flex-1">
                    <p className="font-medium">Hypertension (High blood pressure)</p>
                  </Label>
                </div>
                
                <div
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${riskFactors.includes("diabetes") ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  onClick={() => handleRiskFactorChange("diabetes")}
                >
                  <input 
                    type="checkbox" 
                    checked={riskFactors.includes("diabetes")} 
                    onChange={() => {}} 
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <Label className="cursor-pointer flex-1">
                    <p className="font-medium">Diabetes or gestational diabetes</p>
                  </Label>
                </div>
                
                <div
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${riskFactors.includes("thyroid") ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  onClick={() => handleRiskFactorChange("thyroid")}
                >
                  <input 
                    type="checkbox" 
                    checked={riskFactors.includes("thyroid")} 
                    onChange={() => {}} 
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <Label className="cursor-pointer flex-1">
                    <p className="font-medium">Thyroid condition</p>
                  </Label>
                </div>
                
                <div
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${riskFactors.includes("autoimmune") ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  onClick={() => handleRiskFactorChange("autoimmune")}
                >
                  <input 
                    type="checkbox" 
                    checked={riskFactors.includes("autoimmune")} 
                    onChange={() => {}} 
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <Label className="cursor-pointer flex-1">
                    <p className="font-medium">Autoimmune disorder</p>
                  </Label>
                </div>
                
                <div
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${riskFactors.includes("none") ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  onClick={() => setRiskFactors(["none"])}
                >
                  <input 
                    type="checkbox" 
                    checked={riskFactors.includes("none")} 
                    onChange={() => {}} 
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <Label className="cursor-pointer flex-1">
                    <p className="font-medium">None of the above</p>
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 6: Tracking Preferences */}
        {step === 6 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Tracking preferences</h2>
              <p className="text-slate-600 mt-2">What would you like to track during your journey?</p>
            </div>
            
            <div className="space-y-4">
              <Label className="text-base font-medium">Select what you'd like to track (Select all that apply)</Label>
              <div className="grid gap-3 mt-2">
                <div
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${trackingPreferences.includes("symptoms") ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  onClick={() => handleTrackingPreferenceChange("symptoms")}
                >
                  <input 
                    type="checkbox" 
                    checked={trackingPreferences.includes("symptoms")} 
                    onChange={() => {}} 
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <Label className="cursor-pointer flex-1">
                    <p className="font-medium">Pregnancy symptoms</p>
                    <p className="text-sm text-slate-500">Track how you're feeling day to day</p>
                  </Label>
                </div>
                
                <div
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${trackingPreferences.includes("appointments") ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  onClick={() => handleTrackingPreferenceChange("appointments")}
                >
                  <input 
                    type="checkbox" 
                    checked={trackingPreferences.includes("appointments")} 
                    onChange={() => {}} 
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <Label className="cursor-pointer flex-1">
                    <p className="font-medium">Appointments and care timeline</p>
                    <p className="text-sm text-slate-500">Keep track of your prenatal visits</p>
                  </Label>
                </div>
                
                <div
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${trackingPreferences.includes("missed-care") ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  onClick={() => handleTrackingPreferenceChange("missed-care")}
                >
                  <input 
                    type="checkbox" 
                    checked={trackingPreferences.includes("missed-care")} 
                    onChange={() => {}} 
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <Label className="cursor-pointer flex-1">
                    <p className="font-medium">Missed or delayed care</p>
                    <p className="text-sm text-slate-500">Document when your care needs aren't met</p>
                  </Label>
                </div>
                
                <div
                  className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer ${trackingPreferences.includes("emergency") ? "border-blue-600 bg-blue-50" : "border-slate-200"}`}
                  onClick={() => handleTrackingPreferenceChange("emergency")}
                >
                  <input 
                    type="checkbox" 
                    checked={trackingPreferences.includes("emergency")} 
                    onChange={() => {}} 
                    className="h-4 w-4 text-blue-600 rounded"
                  />
                  <Label className="cursor-pointer flex-1">
                    <p className="font-medium">Emergency situations</p>
                    <p className="text-sm text-slate-500">Quick access to emergency resources</p>
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep}>
                Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 7: Completion */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900">You're all set!</h2>
              <p className="text-slate-600 mt-2 max-w-md mx-auto">
                Thank you for completing your profile. We've personalized your BirthSafe experience based on your information.
              </p>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 max-w-md mx-auto">
              <h3 className="font-medium text-blue-800">What's next?</h3>
              <ul className="mt-2 space-y-2 text-sm text-blue-700">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Explore your personalized dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Track your symptoms and appointments</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Access educational resources tailored to your stage</span>
                </li>
              </ul>
            </div>
            
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

