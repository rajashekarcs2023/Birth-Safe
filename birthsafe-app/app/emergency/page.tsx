"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, AlertTriangle, MessageSquare, Shield, Clock, ChevronRight, User, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function EmergencyPage() {
  const [showContacts, setShowContacts] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-red-500 py-4">
        <div className="container mx-auto px-4 flex items-center">
          <Link href="/dashboard" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-white" />
          </Link>
          <h1 className="text-xl font-semibold text-white">Emergency Help</h1>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 max-w-md">
        <div className="space-y-6">
          <div className="bg-red-50 rounded-lg border border-red-200 p-4">
            <p className="text-red-800 flex items-center gap-2 font-medium">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <span>If you're experiencing a medical emergency, call emergency services immediately.</span>
            </p>
          </div>

          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="bg-red-100 rounded-full p-4 mb-4">
                  <Phone className="h-10 w-10 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-red-800 mb-2">Emergency Services</h2>
                <p className="text-red-700 text-center mb-6">
                  Call your local emergency number for immediate medical assistance
                </p>
                <Button size="lg" className="w-full py-8 text-lg bg-red-600 hover:bg-red-700">
                  Call 911
                </Button>
              </div>
            </CardContent>
          </Card>

          <h2 className="text-lg font-semibold text-slate-800 mt-6">Emergency Contacts</h2>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Dr. Emily Smith</p>
                    <p className="text-sm text-slate-500">OB/GYN</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-8 gap-1">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Midwife Jane Cooper</p>
                    <p className="text-sm text-slate-500">Community Midwife</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-8 gap-1">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <User className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">John Davis</p>
                    <p className="text-sm text-slate-500">Partner (Emergency Contact)</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="h-8 gap-1">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full" onClick={() => setShowContacts(!showContacts)}>
            {showContacts ? "Hide all contacts" : "Show all contacts"}
            <ChevronRight className={`h-4 w-4 ml-2 transition-transform ${showContacts ? "rotate-90" : ""}`} />
          </Button>

          {showContacts && (
            <div className="space-y-3">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-full">
                        <MapPin className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium">Oxford University Hospital</p>
                        <p className="text-sm text-slate-500">Labor & Delivery</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 gap-1">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-slate-100 p-2 rounded-full">
                        <MessageSquare className="h-5 w-5 text-slate-600" />
                      </div>
                      <div>
                        <p className="font-medium">Maternity Triage</p>
                        <p className="text-sm text-slate-500">24/7 Advice Line</p>
                      </div>
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 gap-1">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <h2 className="text-lg font-semibold text-slate-800 mt-6">Emergency Information</h2>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">When to seek emergency care</CardTitle>
              <CardDescription>Call emergency services for these symptoms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-sm">Heavy vaginal bleeding</p>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-sm">Severe abdominal pain</p>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-sm">Seizures or loss of consciousness</p>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-sm">No fetal movement for 2+ hours after 28 weeks</p>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                <p className="text-sm">Severe headache with vision changes</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Your Medical Information</CardTitle>
              <CardDescription>Share this with emergency responders</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Blood type:</span>
                <span className="text-sm">A+</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm font-medium">Allergies:</span>
                <span className="text-sm">Penicillin</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm font-medium">Current medications:</span>
                <span className="text-sm">Prenatal vitamins, Iron</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm font-medium">Due date:</span>
                <span className="text-sm">June 15, 2025</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-sm font-medium">Risk factors:</span>
                <Badge variant="outline" className="text-amber-600">
                  Placenta previa
                </Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <Shield className="h-4 w-4 mr-2" />
                Show Emergency Card
              </Button>
            </CardFooter>
          </Card>

          <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
            <div className="flex items-start gap-2">
              <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-blue-800 font-medium">Emergency services response time</p>
                <p className="text-xs text-blue-700 mt-1">
                  Average response time in your area is 8-12 minutes. Stay on the line with emergency services until
                  help arrives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

