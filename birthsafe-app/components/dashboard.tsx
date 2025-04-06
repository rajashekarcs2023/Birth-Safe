"use client"

import { useState } from "react"
import Link from "next/link"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  ChevronRight,
  ArrowRight,
  FileText,
  MessageSquare,
  Phone,
  Shield,
  ExternalLink,
  HelpCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Dashboard() {
  const [escalationOpen, setEscalationOpen] = useState(false)

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* Care Safety Score - New Component */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-slate-800">Care Safety Score</CardTitle>
              <HelpCircle className="h-4 w-4 text-slate-400" />
            </div>
            <CardDescription>Based on guideline adherence for your risk profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current Score</span>
                <span className="text-sm font-medium text-amber-600">72%</span>
              </div>
              <Progress value={72} className="h-2.5" />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Needs Attention</span>
                <span>Optimal</span>
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    Your care plan is missing 2 recommended monitoring steps for your risk profile.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Risk Monitoring Status */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-slate-800">Risk Monitoring Status</CardTitle>
              <Button variant="ghost" size="sm" className="h-8 gap-1">
                <span className="text-xs">View All</span>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <CardDescription>Recommended vs. actual care</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Weekly blood pressure monitoring</span>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">COMPLETED</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="text-sm">Ultrasound scan at 32 weeks</span>
              </div>
              <Badge className="bg-red-100 text-red-700 hover:bg-red-100">MISSED</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm">Gestational diabetes test</span>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">COMPLETED</Badge>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-slate-500" />
                <span className="text-sm">Placenta position check</span>
              </div>
              <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">PENDING</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Safety Alerts - Enhanced with more actionable steps */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Critical Safety Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-700 mb-3">
              Based on your placenta position, clinical guidelines recommend an additional ultrasound scan at 32 weeks.
              This scan appears to be missing from your care plan.
            </p>
            <div className="bg-white rounded-md p-3 border border-amber-200 mb-3">
              <h4 className="text-sm font-medium text-amber-800 mb-1">Why this matters:</h4>
              <p className="text-xs text-amber-700">
                For patients with your placenta position, regular monitoring is essential to detect potential
                complications early. Missing this scan could delay important interventions.
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-amber-200">
                <AccordionTrigger className="text-sm font-medium text-amber-800 py-2">
                  Evidence-based guidelines
                </AccordionTrigger>
                <AccordionContent className="text-xs text-amber-700">
                  <p>
                    According to the Royal College of Obstetricians and Gynaecologists (RCOG) Guideline No. 27, patients
                    with placenta previa should receive ultrasound monitoring every 2-4 weeks after 28 weeks gestation.
                  </p>
                  <Button variant="link" className="text-xs p-0 h-auto mt-1 text-amber-800">
                    View Source <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setEscalationOpen(true)}>
              Take Action Now
            </Button>
            <Button variant="outline" className="w-full border-amber-300 bg-white text-amber-800">
              Add to Birth Plan
            </Button>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4" asChild>
              <Link href="/wellbeing">Complete Wellbeing Check</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* New Component: Care Coordination */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-800">Care Coordination</CardTitle>
            <CardDescription>Your healthcare team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <MessageSquare className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Dr. Emily Smith</p>
                  <p className="text-xs text-slate-500">OB/GYN - Last seen: March 15</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-8 gap-1">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 rounded-full p-2">
                  <MessageSquare className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">Midwife Jane Cooper</p>
                  <p className="text-xs text-slate-500">Community Midwife - Last seen: April 2</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-8 gap-1">
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Message Healthcare Team
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Escalation Dialog - New Component */}
      <Dialog open={escalationOpen} onOpenChange={setEscalationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Take Action on Missing Scan</DialogTitle>
            <DialogDescription>Choose how you'd like to address this safety concern</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <Button variant="outline" className="w-full justify-between text-left font-normal">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Phone className="h-4 w-4 text-blue-700" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Call Midwife</p>
                  <p className="text-xs text-slate-500">Speak directly about your concerns</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="w-full justify-between text-left font-normal">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full">
                  <FileText className="h-4 w-4 text-green-700" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Prepare Discussion Guide</p>
                  <p className="text-xs text-slate-500">Get talking points for your next appointment</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="w-full justify-between text-left font-normal">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Shield className="h-4 w-4 text-purple-700" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Contact Patient Advocate</p>
                  <p className="text-xs text-slate-500">Get support from a trained advocate</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="w-full justify-between text-left font-normal">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <ExternalLink className="h-4 w-4 text-amber-700" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Request Second Opinion</p>
                  <p className="text-xs text-slate-500">Find another provider for consultation</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary" onClick={() => setEscalationOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

