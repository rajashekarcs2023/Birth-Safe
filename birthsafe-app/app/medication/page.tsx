"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Search,
  Pill,
  CheckCircle,
  AlertTriangle,
  Info,
  Camera,
  Clock,
  Plus,
  AlertCircle,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MedicationPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [selectedMed, setSelectedMed] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("check")
  const [reportStep, setReportStep] = useState(1)
  const [selectedSideEffect, setSelectedSideEffect] = useState("")
  const [selectedMedForReport, setSelectedMedForReport] = useState("")
  const [interactionResults, setInteractionResults] = useState<any[]>([])
  const [showInteractionWarning, setShowInteractionWarning] = useState(false)

  // Mock medication search
  const handleSearch = () => {
    if (searchQuery.toLowerCase().includes("ibuprofen")) {
      setSearchResults([
        {
          name: "Ibuprofen",
          brand: "Advil, Motrin",
          safety: "caution",
          safetyText: "Not recommended after 28 weeks",
          details:
            "May cause premature closure of the ductus arteriosus and other complications in the third trimester.",
        },
      ])
    } else if (
      searchQuery.toLowerCase().includes("paracetamol") ||
      searchQuery.toLowerCase().includes("acetaminophen")
    ) {
      setSearchResults([
        {
          name: "Paracetamol (Acetaminophen)",
          brand: "Tylenol",
          safety: "safe",
          safetyText: "Generally safe during pregnancy",
          details: "Considered safe at recommended doses throughout pregnancy. Use only as needed.",
        },
      ])
    } else if (searchQuery.toLowerCase().includes("aspirin")) {
      setSearchResults([
        {
          name: "Aspirin (low-dose)",
          brand: "Baby Aspirin",
          safety: "prescription",
          safetyText: "Only use if prescribed",
          details: "Low-dose aspirin may be prescribed for specific conditions. Regular aspirin should be avoided.",
        },
      ])
    } else {
      setSearchResults([])
    }
  }

  const handleMedSelect = (med: any) => {
    setSelectedMed(med)
  }

  // Check for drug interactions
  const checkInteractions = () => {
    // Mock interaction check
    setInteractionResults([
      {
        medications: "Iron supplement + Calcium supplement",
        severity: "moderate",
        description: "Iron absorption may be decreased when taken with calcium supplements.",
        recommendation: "Take iron supplements at least 2 hours before or 4 hours after calcium supplements.",
      },
      {
        medications: "Prenatal vitamin + Levothyroxine",
        severity: "mild",
        description: "Prenatal vitamins containing iron and calcium may decrease levothyroxine absorption.",
        recommendation: "Take levothyroxine 4 hours before or after prenatal vitamins.",
      },
    ])
    setShowInteractionWarning(true)
  }

  const handleReportSideEffect = (medication: string) => {
    setSelectedMedForReport(medication)
    setActiveTab("side-effects")
    setReportStep(1)
  }

  const submitSideEffectReport = () => {
    setReportStep(3)
    // In a real implementation, this would send the report to the backend
  }

  // Mock medication data
  const myMedications = [
    {
      name: "Prenatal vitamin",
      dosage: "1 tablet",
      frequency: "Daily",
      nextDose: "Today, 8:00 PM",
      status: "due",
    },
    {
      name: "Iron supplement",
      dosage: "1 tablet",
      frequency: "Twice daily",
      nextDose: "Today, 2:00 PM",
      status: "overdue",
    },
    {
      name: "Folic acid",
      dosage: "400mcg",
      frequency: "Daily",
      nextDose: "Tomorrow, 8:00 AM",
      status: "taken",
    },
  ]

  // Common side effects for reporting
  const commonSideEffects = [
    "Nausea/vomiting",
    "Dizziness",
    "Headache",
    "Rash/itching",
    "Stomach pain",
    "Diarrhea",
    "Constipation",
    "Drowsiness",
    "Insomnia",
  ]

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-slate-600" />
          </Link>
          <h1 className="text-xl font-semibold text-slate-800">Medication Safety</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-md">
        <Tabs defaultValue="check" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="check">Check Safety</TabsTrigger>
            <TabsTrigger value="my-meds">My Medications</TabsTrigger>
            <TabsTrigger value="interactions">Interactions</TabsTrigger>
            <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
          </TabsList>

          <TabsContent value="check" className="space-y-6">
            <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
              <p className="text-blue-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>
                  Check if a medication is safe during pregnancy. Always consult your healthcare provider before taking
                  any medication.
                </span>
              </p>
            </div>

            <div className="relative">
              <Input
                placeholder="Search medication name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Search
                className="absolute right-3 top-2.5 h-5 w-5 text-slate-400 cursor-pointer"
                onClick={handleSearch}
              />
            </div>

            <div className="space-y-3">
              {searchResults.length > 0 ? (
                searchResults.map((med, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer hover:border-blue-300 transition-colors"
                    onClick={() => handleMedSelect(med)}
                  >
                    <CardContent className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                        ${
                          med.safety === "safe"
                            ? "bg-green-100"
                            : med.safety === "caution"
                              ? "bg-amber-100"
                              : "bg-blue-100"
                        } 
                        p-2 rounded-full
                      `}
                        >
                          <Pill
                            className={`
                          h-5 w-5 
                          ${
                            med.safety === "safe"
                              ? "text-green-600"
                              : med.safety === "caution"
                                ? "text-amber-600"
                                : "text-blue-600"
                          }
                        `}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-slate-500">{med.brand}</p>
                        </div>
                      </div>
                      <Badge
                        className={`
                      ${
                        med.safety === "safe"
                          ? "bg-green-100 text-green-700"
                          : med.safety === "caution"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }
                    `}
                      >
                        {med.safetyText}
                      </Badge>
                    </CardContent>
                  </Card>
                ))
              ) : searchQuery ? (
                <div className="text-center py-8">
                  <p className="text-slate-500">No results found for "{searchQuery}"</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Try another medication name or consult your healthcare provider
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-slate-500">Common searches:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={() => setSearchQuery("Paracetamol")}>
                      Paracetamol
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSearchQuery("Ibuprofen")}>
                      Ibuprofen
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSearchQuery("Aspirin")}>
                      Aspirin
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setSearchQuery("Acetaminophen")}>
                      Acetaminophen
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {selectedMed && (
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>{selectedMed.name}</CardTitle>
                    <Badge
                      className={`
                    ${
                      selectedMed.safety === "safe"
                        ? "bg-green-100 text-green-700"
                        : selectedMed.safety === "caution"
                          ? "bg-amber-100 text-amber-700"
                          : "bg-blue-100 text-blue-700"
                    }
                  `}
                    >
                      {selectedMed.safetyText}
                    </Badge>
                  </div>
                  <CardDescription>{selectedMed.brand}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`
                  ${
                    selectedMed.safety === "safe"
                      ? "bg-green-50 border-green-200"
                      : selectedMed.safety === "caution"
                        ? "bg-amber-50 border-amber-200"
                        : "bg-blue-50 border-blue-200"
                  } 
                  rounded-md p-3 border
                `}
                  >
                    <div className="flex gap-2">
                      {selectedMed.safety === "safe" ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                      ) : selectedMed.safety === "caution" ? (
                        <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                      ) : (
                        <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                      )}
                      <p
                        className={`
                      text-sm 
                      ${
                        selectedMed.safety === "safe"
                          ? "text-green-800"
                          : selectedMed.safety === "caution"
                            ? "text-amber-800"
                            : "text-blue-800"
                      }
                    `}
                      >
                        {selectedMed.details}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Trimester safety:</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div
                        className={`
                      p-2 rounded-md text-center text-sm
                      ${
                        selectedMed.safety === "safe"
                          ? "bg-green-50 text-green-700"
                          : selectedMed.safety === "caution"
                            ? "bg-green-50 text-green-700"
                            : "bg-blue-50 text-blue-700"
                      }
                    `}
                      >
                        1st Trimester
                      </div>
                      <div
                        className={`
                      p-2 rounded-md text-center text-sm
                      ${
                        selectedMed.safety === "safe"
                          ? "bg-green-50 text-green-700"
                          : selectedMed.safety === "caution"
                            ? "bg-green-50 text-green-700"
                            : "bg-blue-50 text-blue-700"
                      }
                    `}
                      >
                        2nd Trimester
                      </div>
                      <div
                        className={`
                      p-2 rounded-md text-center text-sm
                      ${
                        selectedMed.safety === "safe"
                          ? "bg-green-50 text-green-700"
                          : selectedMed.safety === "caution"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                      }
                    `}
                      >
                        3rd Trimester
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Common side effects:</h3>
                    <ul className="space-y-1 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center">•</div>
                        <span>Nausea or upset stomach</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center">•</div>
                        <span>Drowsiness or dizziness</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center">•</div>
                        <span>Headache</span>
                      </li>
                    </ul>
                    <Button
                      variant="link"
                      className="text-blue-600 p-0 h-auto mt-1"
                      onClick={() => {
                        setSelectedMedForReport(selectedMed.name)
                        setActiveTab("side-effects")
                        setReportStep(1)
                      }}
                    >
                      Report a side effect
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Always remember:</h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center">•</div>
                        <span>Consult your healthcare provider before taking any medication</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center">•</div>
                        <span>Take the lowest effective dose for the shortest time needed</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-5 w-5 flex items-center justify-center">•</div>
                        <span>Report any side effects to your healthcare provider</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setSelectedMed(null)}>
                    Back to results
                  </Button>
                  <Button>Add to my medications</Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="my-meds" className="space-y-6">
            <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
              <p className="text-blue-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>Track your medications and get reminders for your next doses.</span>
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-800">My Medications</h2>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              {myMedications.map((med, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Pill className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{med.name}</p>
                          <p className="text-sm text-slate-500">
                            {med.dosage}, {med.frequency}
                          </p>
                        </div>
                      </div>
                      <Badge
                        className={`
                      ${
                        med.status === "taken"
                          ? "bg-green-100 text-green-700"
                          : med.status === "due"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                      }
                    `}
                      >
                        {med.status === "taken" ? "Taken" : med.status === "due" ? "Due" : "Overdue"}
                      </Badge>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                      <Clock className="h-4 w-4" />
                      <span>Next dose: {med.nextDose}</span>
                    </div>

                    <div className="mt-3 flex gap-2">
                      {med.status !== "taken" && <Button className="flex-1">Mark as taken</Button>}
                      <Button variant="outline" className="flex-1" onClick={() => handleReportSideEffect(med.name)}>
                        Report side effect
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Medication Reminders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="reminder-toggle" className="font-normal">
                        Enable reminders
                      </Label>
                    </div>
                    <Switch id="reminder-toggle" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="missed-toggle" className="font-normal">
                        Alert for missed doses
                      </Label>
                    </div>
                    <Switch id="missed-toggle" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="caregiver-toggle" className="font-normal">
                        Notify caregiver
                      </Label>
                    </div>
                    <Switch id="caregiver-toggle" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-6">
            <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
              <p className="text-blue-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>
                  Check for potential interactions between your medications. Some medications can affect how others
                  work.
                </span>
              </p>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Check Drug Interactions</CardTitle>
                <CardDescription>Select medications to check for potential interactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {myMedications.map((med, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input type="checkbox" id={`med-${index}`} className="rounded" defaultChecked />
                      <Label htmlFor={`med-${index}`}>{med.name}</Label>
                    </div>
                  ))}
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="med-additional" className="rounded" />
                    <Label htmlFor="med-additional">Calcium supplement</Label>
                  </div>
                </div>

                <Button onClick={checkInteractions} className="w-full">
                  Check Interactions
                </Button>
              </CardContent>
            </Card>

            {showInteractionWarning && (
              <div className="bg-amber-50 rounded-lg border border-amber-200 p-4">
                <p className="text-amber-800 flex items-center gap-2 font-medium">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <span>Potential interactions found</span>
                </p>
              </div>
            )}

            {interactionResults.map((interaction, index) => (
              <Card key={index} className="border-amber-200">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base">{interaction.medications}</CardTitle>
                    <Badge
                      className={
                        interaction.severity === "severe"
                          ? "bg-red-100 text-red-700"
                          : interaction.severity === "moderate"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }
                    >
                      {interaction.severity} interaction
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-slate-600">{interaction.description}</p>
                  <div className="bg-amber-50 p-3 rounded-md border border-amber-100">
                    <p className="text-sm text-amber-800 flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span>{interaction.recommendation}</span>
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Discuss with provider
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="side-effects" className="space-y-6">
            {reportStep === 1 && (
              <>
                <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
                  <p className="text-blue-800 flex items-center gap-2">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span>
                      Report side effects you experience from medications. This helps track your health and informs your
                      provider.
                    </span>
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Report a Side Effect</CardTitle>
                    <CardDescription>
                      {selectedMedForReport
                        ? `Reporting side effect for ${selectedMedForReport}`
                        : "Select the medication causing side effects"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {!selectedMedForReport && (
                      <Select onValueChange={setSelectedMedForReport}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select medication" />
                        </SelectTrigger>
                        <SelectContent>
                          {myMedications.map((med, index) => (
                            <SelectItem key={index} value={med.name}>
                              {med.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {selectedMedForReport && (
                      <>
                        <div className="space-y-2">
                          <Label>What side effect are you experiencing?</Label>
                          <Select onValueChange={setSelectedSideEffect}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select side effect" />
                            </SelectTrigger>
                            <SelectContent>
                              {commonSideEffects.map((effect, index) => (
                                <SelectItem key={index} value={effect}>
                                  {effect}
                                </SelectItem>
                              ))}
                              <SelectItem value="other">Other (specify)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {selectedSideEffect === "other" && (
                          <div className="space-y-2">
                            <Label>Describe the side effect</Label>
                            <Textarea placeholder="Describe what you're experiencing..." />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label>How severe is it?</Label>
                          <RadioGroup defaultValue="moderate">
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
                          <Label>When did it start?</Label>
                          <RadioGroup defaultValue="after-dose">
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="after-dose" id="timing-after" />
                              <Label htmlFor="timing-after">Shortly after taking dose</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="same-day" id="timing-same" />
                              <Label htmlFor="timing-same">Same day</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="days-later" id="timing-days" />
                              <Label htmlFor="timing-days">Days later</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <div className="space-y-2">
                          <Label>Additional notes</Label>
                          <Textarea placeholder="Any other details about the side effect..." />
                        </div>
                      </>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setActiveTab("my-meds")}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => setReportStep(2)}
                      disabled={!selectedMedForReport || (!selectedSideEffect && selectedSideEffect !== "other")}
                    >
                      Continue
                    </Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {reportStep === 2 && (
              <>
                <div className="bg-amber-50 rounded-lg border border-amber-200 p-4">
                  <p className="text-amber-800 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <span>If you're experiencing severe symptoms, contact your healthcare provider immediately.</span>
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Review and Submit</CardTitle>
                    <CardDescription>Review your side effect report before submitting</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Medication:</span>
                        <span className="font-medium">{selectedMedForReport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Side Effect:</span>
                        <span className="font-medium">{selectedSideEffect || "Other"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Severity:</span>
                        <span className="font-medium">Moderate</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-500">Timing:</span>
                        <span className="font-medium">Shortly after taking dose</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 p-3 rounded-md border">
                      <p className="text-sm italic">Additional notes will appear here...</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="share-provider" className="rounded" defaultChecked />
                        <Label htmlFor="share-provider">Share with healthcare provider</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="track-symptoms" className="rounded" defaultChecked />
                        <Label htmlFor="track-symptoms">Track in symptom history</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="reminder-followup" className="rounded" defaultChecked />
                        <Label htmlFor="reminder-followup">Remind me to follow up</Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => setReportStep(1)}>
                      Back
                    </Button>
                    <Button onClick={submitSideEffectReport}>Submit Report</Button>
                  </CardFooter>
                </Card>
              </>
            )}

            {reportStep === 3 && (
              <>
                <div className="text-center py-8">
                  <div className="bg-green-100 rounded-full p-4 inline-flex mb-4">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-2">Side Effect Reported</h2>
                  <p className="text-slate-600 mb-6">
                    Your report has been saved and will be shared with your healthcare provider.
                  </p>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">What happens next?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <p className="text-sm text-slate-600">
                          Your side effect will be tracked in your symptom history
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <p className="text-sm text-slate-600">
                          You'll receive a reminder to check if the side effect has improved
                        </p>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                          <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                        </div>
                        <p className="text-sm text-slate-600">
                          This information will be available at your next appointment
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="mt-6 space-y-3">
                    <Button className="w-full" onClick={() => setActiveTab("my-meds")}>
                      Return to My Medications
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/symptom-tracker">
                        Track Related Symptoms
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="scan" className="space-y-6">
            <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
              <p className="text-blue-800 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>Scan a pill or medication barcode to check if it's safe during pregnancy.</span>
              </p>
            </div>

            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="bg-slate-100 rounded-lg w-full aspect-square flex items-center justify-center mb-4 border-2 border-dashed border-slate-300">
                  <div className="text-center">
                    <Camera className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-500">Tap to scan pill or barcode</p>
                  </div>
                </div>

                <Button className="w-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Start Camera
                </Button>
              </CardContent>
            </Card>

            <div className="text-center">
              <p className="text-sm text-slate-500">You can also upload a photo from your gallery</p>
              <Button variant="outline" className="mt-2">
                Upload from gallery
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

