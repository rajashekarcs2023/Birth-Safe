"use client"

import { useState } from "react"
import { AlertTriangle, Check, Copy, Sparkles, Volume2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample symptom categories and their associated medical terms
const symptomCategories = [
  {
    id: "pain",
    name: "Pain or Discomfort",
    symptoms: [
      { id: "abdominal-pain", name: "Abdominal Pain", medicalTerm: "Abdominal pain" },
      { id: "pelvic-pressure", name: "Pelvic Pressure", medicalTerm: "Pelvic pressure" },
      { id: "back-pain", name: "Back Pain", medicalTerm: "Lower back pain" },
      { id: "headache", name: "Headache", medicalTerm: "Cephalgia" },
      { id: "chest-pain", name: "Chest Pain", medicalTerm: "Chest pain" },
    ],
  },
  {
    id: "bleeding",
    name: "Bleeding or Discharge",
    symptoms: [
      { id: "vaginal-bleeding", name: "Vaginal Bleeding", medicalTerm: "Vaginal bleeding" },
      { id: "spotting", name: "Spotting", medicalTerm: "Minimal vaginal bleeding" },
      { id: "discharge", name: "Unusual Discharge", medicalTerm: "Abnormal vaginal discharge" },
      { id: "mucus-plug", name: "Mucus Plug", medicalTerm: "Passage of mucus plug" },
    ],
  },
  {
    id: "movement",
    name: "Fetal Movement",
    symptoms: [
      { id: "reduced-movement", name: "Reduced Movement", medicalTerm: "Decreased fetal movement" },
      { id: "no-movement", name: "No Movement", medicalTerm: "Absent fetal movement" },
      { id: "excessive-movement", name: "Excessive Movement", medicalTerm: "Increased fetal activity" },
      { id: "pattern-change", name: "Pattern Change", medicalTerm: "Change in fetal movement pattern" },
    ],
  },
  {
    id: "contractions",
    name: "Contractions",
    symptoms: [
      { id: "braxton-hicks", name: "Braxton Hicks", medicalTerm: "Braxton Hicks contractions" },
      { id: "regular-contractions", name: "Regular Contractions", medicalTerm: "Regular uterine contractions" },
      { id: "painful-contractions", name: "Painful Contractions", medicalTerm: "Painful uterine contractions" },
      { id: "frequent-contractions", name: "Frequent Contractions", medicalTerm: "Frequent uterine contractions" },
    ],
  },
  {
    id: "other",
    name: "Other Symptoms",
    symptoms: [
      { id: "swelling", name: "Swelling", medicalTerm: "Edema" },
      { id: "vision-changes", name: "Vision Changes", medicalTerm: "Visual disturbances" },
      { id: "fever", name: "Fever", medicalTerm: "Pyrexia" },
      { id: "dizziness", name: "Dizziness", medicalTerm: "Vertigo" },
      { id: "nausea", name: "Nausea/Vomiting", medicalTerm: "Nausea and vomiting" },
    ],
  },
]

// Sample concerns that might be raised
const concernTypes = [
  { id: "missed-test", name: "Missed Test or Scan" },
  { id: "medication-question", name: "Medication Question" },
  { id: "birth-plan", name: "Birth Plan Discussion" },
  { id: "second-opinion", name: "Request Second Opinion" },
  { id: "symptom-report", name: "Report Concerning Symptom" },
]

// Sample tone options
const toneOptions = [
  { id: "assertive", name: "Assertive", description: "Direct and confident" },
  { id: "collaborative", name: "Collaborative", description: "Partnership-focused" },
  { id: "inquiring", name: "Inquiring", description: "Question-based approach" },
]

// Sample urgency levels
const urgencyLevels = [
  { id: "routine", name: "Routine", description: "For regular check-ins" },
  { id: "concerned", name: "Concerned", description: "Needs attention soon" },
  { id: "urgent", name: "Urgent", description: "Requires immediate attention" },
]

export function AdvocacyScriptGenerator() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [concernType, setConcernType] = useState("symptom-report")
  const [tone, setTone] = useState("collaborative")
  const [urgency, setUrgency] = useState("concerned")
  const [additionalContext, setAdditionalContext] = useState("")
  const [formality, setFormality] = useState(50)
  const [includeData, setIncludeData] = useState(true)
  const [includePlan, setIncludePlan] = useState(true)
  const [generatedScript, setGeneratedScript] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>("pain")

  // Toggle symptom selection
  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptomId) ? prev.filter((id) => id !== symptomId) : [...prev, symptomId],
    )
  }

  // Find the medical term for a symptom ID
  const findMedicalTerm = (symptomId: string) => {
    for (const category of symptomCategories) {
      const symptom = category.symptoms.find((s) => s.id === symptomId)
      if (symptom) return symptom.medicalTerm
    }
    return ""
  }

  // Generate the advocacy script
  const generateScript = () => {
    setIsGenerating(true)

    // Simulate API call delay
    setTimeout(() => {
      // Get selected symptoms with their medical terms
      const selectedSymptomTerms = selectedSymptoms.map((id) => findMedicalTerm(id))

      // Get the selected concern type
      const selectedConcern = concernTypes.find((c) => c.id === concernType)?.name || ""

      // Generate introduction based on tone and urgency
      let intro = ""
      if (tone === "assertive") {
        intro =
          urgency === "urgent"
            ? "I need to speak with you urgently about a serious concern."
            : "I'd like to discuss an important health concern with you."
      } else if (tone === "collaborative") {
        intro =
          urgency === "urgent"
            ? "I'm experiencing concerning symptoms that I believe require immediate attention."
            : "I'd like to work with you to address some health concerns I've been having."
      } else {
        intro =
          urgency === "urgent"
            ? "Could you please help me understand these urgent symptoms I'm experiencing?"
            : "I'm wondering if you could help me understand some symptoms I've been experiencing."
      }

      // Generate symptom description
      let symptoms = ""
      if (selectedSymptomTerms.length > 0) {
        symptoms = `I'm experiencing ${selectedSymptomTerms.join(", ")}. `

        // Add context if provided
        if (additionalContext) {
          symptoms += `Specifically, ${additionalContext}. `
        }
      }

      // Generate data inclusion if selected
      let data = ""
      if (includeData && selectedSymptoms.length > 0) {
        if (selectedSymptoms.includes("reduced-movement")) {
          data =
            "I've been monitoring fetal movements and noticed a decrease from an average of 10 kicks per hour yesterday to only 3 kicks in the past two hours. "
        } else if (selectedSymptoms.includes("regular-contractions")) {
          data =
            "I've been timing my contractions and they're currently 5 minutes apart, lasting 45 seconds each, and have been consistent for the past hour. "
        } else if (selectedSymptoms.includes("swelling")) {
          data =
            "The swelling in my hands and face has increased significantly in the past 24 hours, and my wedding ring no longer fits. "
        } else {
          data = "These symptoms began approximately 24 hours ago and have been [increasing/consistent] in intensity. "
        }
      }

      // Generate action plan request if selected
      let plan = ""
      if (includePlan) {
        if (urgency === "urgent") {
          plan =
            "Given these symptoms, I believe this requires prompt attention. Could you please advise on the immediate next steps I should take?"
        } else if (urgency === "concerned") {
          plan = "I'm concerned about these symptoms and would appreciate your guidance on what we should do next."
        } else {
          plan = "I'd like to know if these symptoms are normal or if they require any follow-up."
        }
      }

      // Adjust formality based on slider
      let script = `${intro} ${symptoms}${data}${plan}`

      if (formality > 75) {
        // More formal
        script = script
          .replace("I'd like", "I would like")
          .replace("I'm", "I am")
          .replace("Could you", "Would you be able to")
          .replace("help me", "assist me in")
      } else if (formality < 25) {
        // Less formal
        script = script
          .replace("I would like", "I want")
          .replace("I am experiencing", "I have")
          .replace("Would you be able to", "Can you")
          .replace("I believe", "I think")
      }

      setGeneratedScript(script)
      setIsGenerating(false)
    }, 1500)
  }

  // Copy script to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedScript)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Text-to-speech function
  const speakScript = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(generatedScript)
      window.speechSynthesis.speak(utterance)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="create">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="create">Create Script</TabsTrigger>
          <TabsTrigger value="library">Script Library</TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-500" />
                AI Advocacy Script Generator
              </CardTitle>
              <CardDescription>
                Create a personalized script to effectively communicate with your healthcare provider
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Concern Type Selection */}
              <div>
                <h3 className="text-sm font-medium mb-3">What would you like to discuss?</h3>
                <RadioGroup
                  value={concernType}
                  onValueChange={setConcernType}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2"
                >
                  {concernTypes.map((concern) => (
                    <div key={concern.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={concern.id} id={concern.id} />
                      <Label htmlFor={concern.id}>{concern.name}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* Symptom Selection */}
              {concernType === "symptom-report" && (
                <div>
                  <h3 className="text-sm font-medium mb-3">Select your symptoms:</h3>
                  <Accordion type="single" collapsible value={expandedCategory} onValueChange={setExpandedCategory}>
                    {symptomCategories.map((category) => (
                      <AccordionItem key={category.id} value={category.id}>
                        <AccordionTrigger className="text-sm hover:no-underline">
                          {category.name}
                          {selectedSymptoms.some((id) => category.symptoms.some((s) => s.id === id)) && (
                            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                              {category.symptoms.filter((s) => selectedSymptoms.includes(s.id)).length} selected
                            </Badge>
                          )}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                            {category.symptoms.map((symptom) => (
                              <div key={symptom.id} className="flex items-center space-x-2">
                                <Checkbox
                                  id={symptom.id}
                                  checked={selectedSymptoms.includes(symptom.id)}
                                  onCheckedChange={() => toggleSymptom(symptom.id)}
                                />
                                <Label htmlFor={symptom.id} className="cursor-pointer">
                                  {symptom.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}

              {/* Additional Context */}
              <div>
                <Label htmlFor="context" className="text-sm font-medium block mb-2">
                  Additional details or context:
                </Label>
                <Textarea
                  id="context"
                  placeholder="Describe your situation in more detail..."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              {/* Communication Style */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tone Selection */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Communication tone:</h3>
                  <RadioGroup value={tone} onValueChange={setTone} className="space-y-2">
                    {toneOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.id} id={`tone-${option.id}`} />
                        <div>
                          <Label htmlFor={`tone-${option.id}`}>{option.name}</Label>
                          <p className="text-xs text-slate-500">{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {/* Urgency Selection */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Level of urgency:</h3>
                  <RadioGroup value={urgency} onValueChange={setUrgency} className="space-y-2">
                    {urgencyLevels.map((level) => (
                      <div key={level.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={level.id} id={`urgency-${level.id}`} />
                        <div>
                          <Label htmlFor={`urgency-${level.id}`}>{level.name}</Label>
                          <p className="text-xs text-slate-500">{level.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>

              {/* Advanced Options */}
              <div>
                <h3 className="text-sm font-medium mb-3">Advanced options:</h3>
                <div className="space-y-4">
                  {/* Formality Slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label htmlFor="formality" className="text-xs">
                        Formality level:
                      </Label>
                      <span className="text-xs text-slate-500">
                        {formality < 33 ? "Casual" : formality < 66 ? "Balanced" : "Formal"}
                      </span>
                    </div>
                    <Slider
                      id="formality"
                      min={0}
                      max={100}
                      step={1}
                      value={[formality]}
                      onValueChange={(value) => setFormality(value[0])}
                    />
                  </div>

                  {/* Include Options */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-data"
                        checked={includeData}
                        onCheckedChange={(checked) => setIncludeData(checked as boolean)}
                      />
                      <Label htmlFor="include-data">Include relevant data points</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="include-plan"
                        checked={includePlan}
                        onCheckedChange={(checked) => setIncludePlan(checked as boolean)}
                      />
                      <Label htmlFor="include-plan">Include request for action plan</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={generateScript}
                disabled={isGenerating || (concernType === "symptom-report" && selectedSymptoms.length === 0)}
                className="w-full"
              >
                {isGenerating ? (
                  <>Generating script...</>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Advocacy Script
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* Generated Script */}
          {generatedScript && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Advocacy Script</CardTitle>
                <CardDescription>Use this script when speaking with your healthcare provider</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-slate-50 p-4 rounded-md border">
                  <p className="text-slate-800 whitespace-pre-line">{generatedScript}</p>
                </div>

                {urgency === "urgent" && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3">
                    <div className="flex gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                      <p className="text-sm text-red-800">
                        Your selected symptoms indicate this may be urgent. If you're experiencing a medical emergency,
                        call emergency services immediately.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={speakScript}>
                    <Volume2 className="h-4 w-4 mr-1" />
                    Listen
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
                <Button variant="default" size="sm">
                  Save to Library
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="library" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Saved Scripts</CardTitle>
              <CardDescription>Access your previously created advocacy scripts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md p-4 hover:bg-slate-50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Discussing Reduced Fetal Movement</h3>
                      <p className="text-sm text-slate-500 mt-1">Created 2 days ago</p>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Concerned</Badge>
                  </div>
                  <p className="text-sm mt-3 line-clamp-2">
                    I'm experiencing decreased fetal movement. I've been monitoring fetal movements and noticed a
                    decrease from an average of 10 kicks per hour yesterday to only 3 kicks in the past two hours...
                  </p>
                </div>

                <div className="border rounded-md p-4 hover:bg-slate-50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Request for Additional Ultrasound</h3>
                      <p className="text-sm text-slate-500 mt-1">Created 1 week ago</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Routine</Badge>
                  </div>
                  <p className="text-sm mt-3 line-clamp-2">
                    I would like to discuss the possibility of an additional ultrasound scan. Based on my research and
                    previous placenta position, I understand that an additional scan at 32 weeks is recommended...
                  </p>
                </div>

                <div className="border rounded-md p-4 hover:bg-slate-50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Birth Plan Discussion</h3>
                      <p className="text-sm text-slate-500 mt-1">Created 2 weeks ago</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Routine</Badge>
                  </div>
                  <p className="text-sm mt-3 line-clamp-2">
                    I'd like to discuss my birth preferences and create a plan that respects my wishes while ensuring
                    safety. I have some specific requests regarding pain management and immediate postpartum care...
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

