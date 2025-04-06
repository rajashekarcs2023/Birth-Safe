"use client"

import { useState } from "react"
import { Users, Shield, MessageSquare, Phone, AlertTriangle, Info, Mail } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AllyMode() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false)
  const [briefingDialogOpen, setBriefingDialogOpen] = useState(false)
  const [selectedAlly, setSelectedAlly] = useState<string | null>(null)

  const handleInvite = () => {
    setInviteDialogOpen(false)
    // Would handle the invitation process here
  }

  const openBriefing = (allyName: string) => {
    setSelectedAlly(allyName)
    setBriefingDialogOpen(true)
  }

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-slate-800">Partner & Family Ally Mode</h1>
        <p className="text-sm text-slate-500 mt-1">Empower your support system to advocate for you</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">What is Ally Mode?</p>
              <p className="text-xs text-blue-700 mt-1">
                Ally Mode allows trusted family members or friends to receive alerts and advocacy guidance when you need
                support. They'll know exactly what to say and do in critical moments.
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="allies">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="allies">Your Allies</TabsTrigger>
            <TabsTrigger value="settings">Alert Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="allies" className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Davis</p>
                      <p className="text-xs text-slate-500">Partner • Primary Ally</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" className="h-8 gap-1" onClick={() => openBriefing("John Davis")}>
                      <Shield className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 gap-1">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>MW</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Mary Williams</p>
                      <p className="text-xs text-slate-500">Mother • Secondary Ally</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 gap-1"
                      onClick={() => openBriefing("Mary Williams")}
                    >
                      <Shield className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 gap-1">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={() => setInviteDialogOpen(true)}>
              <Users className="h-4 w-4 mr-2" />
              Invite New Ally
            </Button>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Alert Settings</CardTitle>
                <CardDescription>Control what your allies are notified about</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="emergency-alerts" className="font-normal">
                      Emergency alerts
                    </Label>
                    <Badge className="bg-red-100 text-red-700">Critical</Badge>
                  </div>
                  <Switch id="emergency-alerts" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="missed-care" className="font-normal">
                      Missed care alerts
                    </Label>
                    <Badge className="bg-amber-100 text-amber-700">Important</Badge>
                  </div>
                  <Switch id="missed-care" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="appointment-reminders" className="font-normal">
                      Appointment reminders
                    </Label>
                  </div>
                  <Switch id="appointment-reminders" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="wellbeing-alerts" className="font-normal">
                      Wellbeing concerns
                    </Label>
                  </div>
                  <Switch id="wellbeing-alerts" defaultChecked />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Ally Access Level</Label>
                  <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                    <p className="text-sm text-blue-800">
                      Your allies can view alerts and advocacy guidance, but cannot access your full medical records
                      without specific permission.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recent Alerts */}
        <h2 className="text-lg font-semibold text-slate-800 mt-4">Recent Ally Alerts</h2>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Reduced fetal movement alert</p>
                  <p className="text-xs text-slate-500">Sent to John Davis • April 2, 2025</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Responded</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-amber-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium">Missed scan notification</p>
                  <p className="text-xs text-slate-500">Sent to all allies • March 22, 2025</p>
                </div>
              </div>
              <Badge className="bg-green-100 text-green-700">Responded</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Invite a Trusted Ally</DialogTitle>
            <DialogDescription>They'll be able to receive alerts and advocacy guidance</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ally-name">Name</Label>
              <Input id="ally-name" placeholder="Their full name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ally-relationship">Relationship</Label>
              <Input id="ally-relationship" placeholder="e.g., Partner, Mother, Sister, Friend" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ally-email">Email</Label>
              <Input id="ally-email" type="email" placeholder="Their email address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ally-phone">Phone Number (optional)</Label>
              <Input id="ally-phone" type="tel" placeholder="Their phone number" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="primary-ally" className="text-sm font-medium">
                  Make primary ally
                </Label>
                <Switch id="primary-ally" />
              </div>
              <p className="text-xs text-slate-500">
                Primary allies receive all critical alerts and have priority access
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="bg-blue-600" onClick={handleInvite}>
              <Mail className="h-4 w-4 mr-2" />
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Briefing Dialog */}
      <Dialog open={briefingDialogOpen} onOpenChange={setBriefingDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Ally Briefing: {selectedAlly}</DialogTitle>
            <DialogDescription>Advocacy guidance for your support person</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <div className="flex gap-2">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">How to be an effective ally</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Your role is to support Sarah's voice and ensure her concerns are heard, especially when she's
                    unable to advocate for herself.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Key Medical Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-600">High-risk pregnancy</span>
                  <span className="font-medium">Placenta previa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Current week</span>
                  <span className="font-medium">32 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Blood type</span>
                  <span className="font-medium">A+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Allergies</span>
                  <span className="font-medium">Penicillin</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Current Concerns</h3>
              <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-amber-800">
                    <span className="font-medium">Missed 32-week scan:</span> This scan is critical for monitoring
                    Sarah's placenta position and should not have been skipped.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">What to Say</h3>
              <div className="bg-slate-50 p-3 rounded-md border">
                <p className="text-sm italic">
                  "Sarah has a high-risk pregnancy with placenta previa. The NICE guidelines recommend a 32-week scan
                  which was missed. We need this scan scheduled as soon as possible."
                </p>
              </div>
              <div className="bg-slate-50 p-3 rounded-md border">
                <p className="text-sm italic">
                  "We understand you're busy, but this is a safety concern. Who can we speak to about getting this scan
                  scheduled today?"
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Emergency Contacts</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Dr. Emily Smith</span>
                </div>
                <Button size="sm" variant="ghost" className="h-8">
                  Call
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Hospital Maternity Unit</span>
                </div>
                <Button size="sm" variant="ghost" className="h-8">
                  Call
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setBriefingDialogOpen(false)}>
              Close
            </Button>
            <Button type="button" className="bg-blue-600">
              Share Briefing
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

