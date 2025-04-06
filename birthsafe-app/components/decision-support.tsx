"use client"

import { useState } from "react"
import {
  Building,
  Home,
  Building2,
  Check,
  X,
  HelpCircle,
  BookmarkPlus,
  AlertTriangle,
  FileText,
  Info,
  MessageSquare,
  Download,
  Lock,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"

export default function DecisionSupport() {
  const [consentDialogOpen, setConsentDialogOpen] = useState(false)
  const [glossaryDialogOpen, setGlossaryDialogOpen] = useState("")
  const [selectedTerm, setSelectedTerm] = useState("")

  const handleTermClick = (term) => {
    setSelectedTerm(term)
    setGlossaryDialogOpen(true)
  }

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-slate-800">Journal & Decision Support</h1>
        <p className="text-sm text-slate-500 mt-1">Understanding your options</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* New Component: Decision Readiness */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-800">Decision Readiness</CardTitle>
            <CardDescription>How prepared you are to make this decision</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Information Level</span>
                  <span className="text-sm font-medium text-amber-600">68%</span>
                </div>
                <Progress value={68} className="h-2.5" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Questions Answered</span>
                  <span className="text-sm font-medium text-green-600">85%</span>
                </div>
                <Progress value={85} className="h-2.5" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Concerns Addressed</span>
                  <span className="text-sm font-medium text-red-600">42%</span>
                </div>
                <Progress value={42} className="h-2.5" />
              </div>

              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <p className="text-sm text-blue-800">
                  You still have some unanswered questions about your birth options. Addressing these will help you make
                  a more informed decision.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Accordion type="single" collapsible defaultValue="hospital" className="w-full">
          {/* Hospital Birth Unit */}
          <AccordionItem value="hospital" className="border rounded-lg mb-3 overflow-hidden">
            <div className="bg-white">
              <div className="p-4 flex items-center gap-3">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Building className="h-6 w-6 text-blue-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Hospital Birth Unit</h3>
                  <Badge className="bg-blue-100 text-blue-700 mt-1">Recommended for you</Badge>
                </div>
                <AccordionTrigger className="p-0" />
              </div>
            </div>
            <AccordionContent className="px-4 pb-4 pt-0">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Pros</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Emergency care available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Pain relief options</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        <span className="underline cursor-pointer" onClick={() => handleTermClick("NICU")}>
                          NICU
                        </span>{" "}
                        if needed
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-2">Cons</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm">More medical interventions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <X className="h-4 w-4 text-red-500" />
                      <span className="text-sm">Less private setting</span>
                    </div>
                  </div>
                </div>

                <Card className="bg-amber-50 border-amber-200">
                  <CardContent className="p-3">
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 text-amber-600">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm text-amber-800">
                          <span className="font-medium">Risk factors:</span> Recommended for high-risk pregnancies
                          including your
                          <span className="underline cursor-pointer" onClick={() => handleTermClick("placenta previa")}>
                            {" "}
                            placenta position
                          </span>
                        </p>
                        <p className="text-sm text-amber-800 mt-2">
                          Based on your personal risk profile, this option provides appropriate safety measures
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setConsentDialogOpen(true)}>
                    <BookmarkPlus className="h-4 w-4 mr-2" />
                    Save to Birth Plan
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="h-4 w-4 mr-2" />
                    Questions to Ask
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Midwife-Led Birth Center */}
          <AccordionItem value="birthcenter" className="border rounded-lg mb-3 overflow-hidden">
            <div className="bg-white">
              <div className="p-4 flex items-center gap-3">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Building2 className="h-6 w-6 text-purple-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Midwife-Led Birth Center</h3>
                  <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200 mt-1">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Not recommended for your risk profile
                  </Badge>
                </div>
                <AccordionTrigger className="p-0" />
              </div>
            </div>
            <AccordionContent className="px-4 pb-4 pt-0">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Home Birth */}
          <AccordionItem value="home" className="border rounded-lg mb-3 overflow-hidden">
            <div className="bg-white">
              <div className="p-4 flex items-center gap-3">
                <div className="bg-green-100 p-3 rounded-full">
                  <Home className="h-6 w-6 text-green-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">Home Birth</h3>
                  <Badge variant="outline" className="text-red-600 bg-red-50 border-red-200 mt-1">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    Not recommended for your risk profile
                  </Badge>
                </div>
                <AccordionTrigger className="p-0" />
              </div>
            </div>
            <AccordionContent className="px-4 pb-4 pt-0">
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {/* Questions Section */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Still have questions?</CardTitle>
            <CardDescription>Suggested questions for your provider</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm">What additional monitoring would I receive in a hospital setting?</span>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm">How does my placenta position affect my birth options?</span>
            </div>
            <Separator />
            <div className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm">What are the transfer protocols from birth center to hospital?</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <MessageSquare className="h-4 w-4 mr-2" />
              Prepare for Discussion
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Informed Consent Dialog - New Component */}
      <Dialog open={consentDialogOpen} onOpenChange={setConsentDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Informed Consent Documentation</DialogTitle>
            <DialogDescription>Record your understanding and preferences</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">I understand that:</Label>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Checkbox id="consent-1" className="mt-1" />
                  <Label htmlFor="consent-1" className="text-sm">
                    A hospital birth is recommended due to my placenta position, which increases risks of bleeding
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="consent-2" className="mt-1" />
                  <Label htmlFor="consent-2" className="text-sm">
                    Emergency interventions may be necessary and I've been informed of their risks and benefits
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="consent-3" className="mt-1" />
                  <Label htmlFor="consent-3" className="text-sm">
                    I can still create preferences for my birth while acknowledging medical needs
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">My preferences include:</Label>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <Checkbox id="pref-1" className="mt-1" />
                  <Label htmlFor="pref-1" className="text-sm">
                    Having my partner present at all times
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="pref-2" className="mt-1" />
                  <Label htmlFor="pref-2" className="text-sm">
                    Being informed before any intervention
                  </Label>
                </div>
                <div className="flex items-start gap-2">
                  <Checkbox id="pref-3" className="mt-1" />
                  <Label htmlFor="pref-3" className="text-sm">
                    Delayed cord clamping if safely possible
                  </Label>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="verification" className="text-sm font-medium">
                  Create verified consent record
                </Label>
                <Switch id="verification" defaultChecked />
              </div>
              <p className="text-xs text-slate-500">
                This creates a timestamped record of your informed consent that can be shared with your care team
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setConsentDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="bg-blue-600">
              <Lock className="h-4 w-4 mr-2" />
              Save Consent Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Medical Terms Glossary Dialog - New Component */}
      <Dialog open={glossaryDialogOpen} onOpenChange={setGlossaryDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Medical Term Explained</DialogTitle>
            <DialogDescription>Plain language explanation</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedTerm === "NICU" && (
              <div>
                <h3 className="font-medium mb-2">NICU (Neonatal Intensive Care Unit)</h3>
                <p className="text-sm mb-3">
                  A specialized unit in a hospital that provides intensive medical care for newborns who are premature
                  or have health complications.
                </p>
                <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                  <div className="flex gap-2">
                    <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Why it matters to you: Given your high-risk pregnancy, having immediate access to NICU care
                      provides an important safety net if your baby needs specialized care after birth.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedTerm === "placenta previa" && (
              <div>
                <h3 className="font-medium mb-2">Placenta Previa</h3>
                <p className="text-sm mb-3">
                  A condition where the placenta partially or completely covers the cervix (the opening to the birth
                  canal). This can cause serious bleeding during pregnancy or birth.
                </p>
                <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                  <div className="flex gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                    <p className="text-sm text-amber-800">
                      Why it matters to you: Your placenta position increases the risk of bleeding during birth, which
                      is why a hospital birth with immediate access to emergency care is recommended.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setGlossaryDialogOpen(false)}>
              Close
            </Button>
            <Button type="button" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Save to My Glossary
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

