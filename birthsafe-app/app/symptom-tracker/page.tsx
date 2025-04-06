"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle, CheckCircle, Info, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function SymptomTrackerPage() {
  const [step, setStep] = useState(1)
  const [selectedSymptom, setSelectedSymptom] = useState("")
  const [severity, setSeverity] = useState("moderate")
  const [duration, setDuration] = useState("hours")
  const [riskLevel, setRiskLevel] = useState("")

  const handleSymptomSelect = (symptom: string) => {
    setSelectedSymptom(symptom)
    setStep(2)

    // Set risk level based on symptom
    if (["reduced movement", "vaginal bleeding", "severe headache"].includes(symptom)) {
      setRiskLevel("high")
    } else if (["swelling", "vision changes", "abdominal pain"].includes(symptom)) {
      setRiskLevel("medium")
    } else {
      setRiskLevel("low")
    }
  }

  const handleSubmit = () => {
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-800">Symptom Tracker</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-md">
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
              <p className="text-blue-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>
                  Select the symptom you're experiencing. We'll help you track it and determine if you need medical
                  attention.
                </span>
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="font-medium text-slate-800">Common pregnancy symptoms</h2>

              <Card
                className="cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => handleSymptomSelect("reduced movement")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Reduced or no fetal movement</p>
                      <p className="text-sm text-slate-500">Baby moving less than usual or stopped</p>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-700">Urgent</Badge>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => handleSymptomSelect("vaginal bleeding")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Vaginal bleeding</p>
                      <p className="text-sm text-slate-500">Any bleeding during pregnancy</p>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-700">Urgent</Badge>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => handleSymptomSelect("severe headache")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-red-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Severe headache</p>
                      <p className="text-sm text-slate-500">Especially with vision changes</p>
                    </div>
                  </div>
                  <Badge className="bg-red-100 text-red-700">Urgent</Badge>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => handleSymptomSelect("swelling")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Swelling</p>
                      <p className="text-sm text-slate-500">In face, hands, or feet</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700">Monitor</Badge>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => handleSymptomSelect("abdominal pain")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Abdominal pain</p>
                      <p className="text-sm text-slate-500">Cramping or sharp pain</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700">Monitor</Badge>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => handleSymptomSelect("vision changes")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-100 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Vision changes</p>
                      <p className="text-sm text-slate-500">Blurry vision, spots, or flashes</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-100 text-amber-700">Monitor</Badge>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer hover:border-blue-300 transition-colors"
                onClick={() => handleSymptomSelect("other")}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Info className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Other symptom</p>
                      <p className="text-sm text-slate-500">Describe your symptom</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-800">
              {selectedSymptom === "other" ? "Describe your symptom" : `Tell us about your ${selectedSymptom}`}
            </h2>

            {riskLevel === "high" && (
              <div className="bg-red-50 rounded-lg border border-red-200 p-4">
                <p className="text-red-800 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <span>This symptom may require immediate medical attention.</span>
                </p>
              </div>
            )}

            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label>How severe is it?</Label>
                  <RadioGroup defaultValue={severity} onValueChange={setSeverity} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mild" id="severity-mild" />
                      <Label htmlFor="severity-mild">Mild</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="severity-moderate" />
                      <Label htmlFor="severity-moderate">Moderate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="severe" id="severity-severe" />
                      <Label htmlFor="severity-severe">Severe</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>How long have you had it?</Label>
                  <RadioGroup defaultValue={duration} onValueChange={setDuration} className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="minutes" id="duration-minutes" />
                      <Label htmlFor="duration-minutes">Minutes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hours" id="duration-hours" />
                      <Label htmlFor="duration-hours">Hours</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="days" id="duration-days" />
                      <Label htmlFor="duration-days">Days</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Additional details</Label>
                  <Textarea placeholder="Describe your symptom in more detail..." className="min-h-[100px]" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>Submit</Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex justify-center">
              {riskLevel === "high" ? (
                <div className="bg-red-100 rounded-full p-4">
                  <AlertTriangle className="h-10 w-10 text-red-600" />
                </div>
              ) : riskLevel === "medium" ? (
                <div className="bg-amber-100 rounded-full p-4">
                  <AlertTriangle className="h-10 w-10 text-amber-600" />
                </div>
              ) : (
                <div className="bg-green-100 rounded-full p-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              )}
            </div>

            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-800 mb-2">
                {riskLevel === "high"
                  ? "Seek medical attention now"
                  : riskLevel === "medium"
                    ? "Contact your provider today"
                    : "Monitor your symptoms"}
              </h2>
              <p className="text-slate-600">
                {riskLevel === "high"
                  ? "This symptom requires immediate medical attention."
                  : riskLevel === "medium"
                    ? "This symptom should be evaluated by a healthcare provider."
                    : "Keep track of this symptom and contact your provider if it worsens."}
              </p>
            </div>

            <Card
              className={`${
                riskLevel === "high"
                  ? "bg-red-50 border-red-200"
                  : riskLevel === "medium"
                    ? "bg-amber-50 border-amber-200"
                    : "bg-blue-50 border-blue-200"
              }`}
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">What to do next</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {riskLevel === "high" && (
                  <>
                    <div className="flex items-start gap-2">
                      <div className="bg-red-100 rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-red-600"></div>
                      </div>
                      <p className="text-sm text-red-800">
                        Go to the emergency room or call your healthcare provider immediately.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-red-100 rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-red-600"></div>
                      </div>
                      <p className="text-sm text-red-800">
                        Tell them: "I'm {32} weeks pregnant with {selectedSymptom}. I have a high-risk pregnancy due to
                        placenta position."
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-red-100 rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-red-600"></div>
                      </div>
                      <p className="text-sm text-red-800">
                        Do not drive yourself if you feel unwell. Call for emergency transport.
                      </p>
                    </div>
                  </>
                )}

                {riskLevel === "medium" && (
                  <>
                    <div className="flex items-start gap-2">
                      <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                      </div>
                      <p className="text-sm text-amber-800">
                        Call your healthcare provider today to discuss your symptoms.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                      </div>
                      <p className="text-sm text-amber-800">
                        Say: "I'm experiencing {selectedSymptom} that is {severity} and has lasted for {duration}. I
                        have a high-risk pregnancy."
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-amber-600"></div>
                      </div>
                      <p className="text-sm text-amber-800">
                        If symptoms worsen before you speak to your provider, seek emergency care.
                      </p>
                    </div>
                  </>
                )}

                {riskLevel === "low" && (
                  <>
                    <div className="flex items-start gap-2">
                      <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      </div>
                      <p className="text-sm text-blue-800">Continue to monitor your symptoms and track any changes.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      </div>
                      <p className="text-sm text-blue-800">Mention this symptom at your next prenatal appointment.</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                      </div>
                      <p className="text-sm text-blue-800">
                        If the symptom worsens or new symptoms develop, reassess using this tool.
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Advocacy phrases</CardTitle>
                <CardDescription>Use these phrases when speaking with healthcare providers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-slate-50 p-3 rounded-md border">
                  <p className="text-sm italic">
                    "I'm concerned about {selectedSymptom} because it's {severity} and has lasted for {duration}."
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-md border">
                  <p className="text-sm italic">
                    "I have a high-risk pregnancy due to my placenta position. How does this symptom affect my
                    condition?"
                  </p>
                </div>
                <div className="bg-slate-50 p-3 rounded-md border">
                  <p className="text-sm italic">
                    "What tests or monitoring do you recommend for this symptom given my risk factors?"
                  </p>
                </div>
              </CardContent>
            </Card>
            {riskLevel !== "low" && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Could this be medication-related?</CardTitle>
                  <CardDescription>
                    If you recently started a new medication, this symptom could be a side effect
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Pill className="h-5 w-5 text-blue-600" />
                    </div>
                    <p className="text-sm">Check if your symptom could be related to your medications</p>
                  </div>
                  <Button className="w-full" asChild>
                    <Link href="/medication?tab=side-effects">Report as medication side effect</Link>
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                Track another symptom
              </Button>
              <Button className="flex-1" asChild>
                <Link href="/dashboard">Return to dashboard</Link>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

