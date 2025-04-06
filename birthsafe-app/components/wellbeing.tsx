"use client"

import { useState } from "react"
import { Heart, Users, Play, AlertTriangle, FileText, MessageSquare, Info, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

export default function Wellbeing() {
  const [supportDialogOpen, setSupportDialogOpen] = useState(false)
  const [traumaScreeningOpen, setTraumaScreeningOpen] = useState(false)

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-slate-800">Profile & Wellbeing</h1>
        <p className="text-sm text-slate-500 mt-1">April 5, 2025</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* New Component: Wellbeing Status */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-800">Emotional Wellbeing Status</CardTitle>
            <CardDescription>Based on your recent check-ins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xl">😕</span>
                  </div>
                  <div>
                    <p className="font-medium">Current Status: Concerned</p>
                    <p className="text-xs text-slate-500">Based on your last 3 check-ins</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  History
                </Button>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Anxiety Level</span>
                  <span className="text-sm font-medium text-amber-600">65%</span>
                </div>
                <Progress value={65} className="h-2.5" />
              </div>

              <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-amber-800 font-medium">Elevated anxiety detected</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Your recent check-ins show increased anxiety about your birth plan and safety concerns.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setSupportDialogOpen(true)}>
                Connect with Support Resources
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mood Tracking */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>How are you feeling today?</CardTitle>
            <CardDescription>Track your emotional wellbeing</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="difficult" className="flex justify-between">
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="struggling" id="struggling" className="sr-only" />
                <Label htmlFor="struggling" className="cursor-pointer flex flex-col items-center gap-1">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-xl">😔</span>
                  </div>
                  <span className="text-xs">Struggling</span>
                </Label>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="difficult" id="difficult" className="sr-only" />
                <Label htmlFor="difficult" className="cursor-pointer flex flex-col items-center gap-1">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-500">
                    <span className="text-xl">😕</span>
                  </div>
                  <span className="text-xs font-medium">Difficult</span>
                </Label>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="neutral" id="neutral" className="sr-only" />
                <Label htmlFor="neutral" className="cursor-pointer flex flex-col items-center gap-1">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl">😐</span>
                  </div>
                  <span className="text-xs">Neutral</span>
                </Label>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="good" id="good" className="sr-only" />
                <Label htmlFor="good" className="cursor-pointer flex flex-col items-center gap-1">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xl">🙂</span>
                  </div>
                  <span className="text-xs">Good</span>
                </Label>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RadioGroupItem value="great" id="great" className="sr-only" />
                <Label htmlFor="great" className="cursor-pointer flex flex-col items-center gap-1">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xl">😀</span>
                  </div>
                  <span className="text-xs">Great</span>
                </Label>
              </div>
            </RadioGroup>

            <div className="mt-4">
              <Textarea
                placeholder="What's on your mind today? How are you feeling about your pregnancy and care?"
                className="min-h-[100px]"
                defaultValue="I'm feeling anxious about the missed scan. I don't understand why it wasn't scheduled, and I'm worried about my baby's safety."
              />
            </div>

            <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-200">
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">We've detected concerns about your care</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Would you like to connect with a birth trauma specialist to discuss your feelings?
                  </p>
                  <Button
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-xs h-8"
                    onClick={() => setTraumaScreeningOpen(true)}
                  >
                    Yes, I'd like support
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Resources */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Support Resources</CardTitle>
            <CardDescription>Help when you need it</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Birth Trauma Support Group</h3>
                    <p className="text-xs text-slate-500">Online meeting tomorrow, 7PM</p>
                  </div>
                  <Button size="sm" variant="outline" className="h-8">
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Heart className="h-5 w-5 text-purple-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Perinatal Mental Health Specialist</h3>
                    <p className="text-xs text-slate-500">Professional support</p>
                  </div>
                  <Button size="sm" variant="outline" className="h-8">
                    Book
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Play className="h-5 w-5 text-green-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium">Guided Meditation for Anxiety</h3>
                    <p className="text-xs text-slate-500">10 minute audio</p>
                  </div>
                  <Button size="sm" variant="outline" className="h-8">
                    Play
                  </Button>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>

        {/* Your Support Circle */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Support Circle</CardTitle>
            <CardDescription>People you've added to your network</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Davis</p>
                  <p className="text-xs text-slate-500">Partner</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>MW</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Mary Williams</p>
                  <p className="text-xs text-slate-500">Mother</p>
                </div>
              </div>
              <Button size="sm" variant="ghost">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              Share Today's Update
            </Button>
          </CardContent>
        </Card>

        {/* Journal Prompts */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Journal Prompts</CardTitle>
            <CardDescription>Reflect on your journey</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="text-sm italic text-slate-700">
                What aspects of your care plan make you feel most supported?
              </p>
            </div>
            <div className="bg-slate-50 p-3 rounded-md">
              <p className="text-sm italic text-slate-700">
                What concerns about your birth plan would you like to discuss with your provider?
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
              <p className="text-sm italic text-blue-700">
                How has the missed scan affected your feelings about your pregnancy and care?
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Previous Check-ins */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Previous Check-ins</CardTitle>
            <CardDescription>Your emotional wellbeing over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-40 flex items-end justify-between gap-1">
              <div className="flex flex-col items-center gap-1">
                <div className="bg-blue-500 w-8 h-20 rounded-t-md"></div>
                <span className="text-xs">Mar 5</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-green-500 w-8 h-28 rounded-t-md"></div>
                <span className="text-xs">Mar 12</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-green-500 w-8 h-32 rounded-t-md"></div>
                <span className="text-xs">Mar 19</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-amber-500 w-8 h-16 rounded-t-md"></div>
                <span className="text-xs">Mar 26</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-amber-500 w-8 h-12 rounded-t-md"></div>
                <span className="text-xs">Apr 2</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="bg-amber-500 w-8 h-16 rounded-t-md border-2 border-amber-700"></div>
                <span className="text-xs font-medium">Today</span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>Struggling</span>
              <span>Neutral</span>
              <span>Great</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Resources Dialog - New Component */}
      <Dialog open={supportDialogOpen} onOpenChange={setSupportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Support Resources</DialogTitle>
            <DialogDescription>Personalized for your current needs</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-800 font-medium">Based on your check-ins</p>
                  <p className="text-xs text-amber-700 mt-1">
                    We've identified anxiety related to your care safety and the missed scan. Here are resources that
                    may help.
                  </p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full justify-between text-left font-normal">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <MessageSquare className="h-4 w-4 text-blue-700" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Perinatal Anxiety Specialist</p>
                  <p className="text-xs text-slate-500">Virtual appointment available today</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button variant="outline" className="w-full justify-between text-left font-normal">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-purple-700" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Birth Trauma Support Group</p>
                  <p className="text-xs text-slate-500">Online meeting tomorrow at 7PM</p>
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
                  <p className="font-medium">Coping with Uncertainty Guide</p>
                  <p className="text-xs text-slate-500">Techniques for managing pregnancy anxiety</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
              <p className="text-sm text-blue-800">
                All support resources are confidential and not shared with your healthcare providers unless you choose
                to share them.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="secondary" onClick={() => setSupportDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Trauma Screening Dialog - New Component */}
      <Dialog open={traumaScreeningOpen} onOpenChange={setTraumaScreeningOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Birth Trauma Support</DialogTitle>
            <DialogDescription>Confidential assessment and resources</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm">
              Many people experience anxiety, fear, or trauma related to pregnancy and birth. Your feelings are valid
              and support is available.
            </p>

            <div className="space-y-3">
              <h3 className="text-sm font-medium">Please indicate if you're experiencing:</h3>
              <div className="flex items-start gap-2">
                <RadioGroupItem value="yes" id="anxiety" className="mt-1" />
                <Label htmlFor="anxiety" className="text-sm">
                  Anxiety or fear about your safety during pregnancy or birth
                </Label>
              </div>
              <div className="flex items-start gap-2">
                <RadioGroupItem value="yes" id="trust" className="mt-1" />
                <Label htmlFor="trust" className="text-sm">
                  Difficulty trusting your healthcare providers
                </Label>
              </div>
              <div className="flex items-start gap-2">
                <RadioGroupItem value="no" id="flashbacks" className="mt-1" />
                <Label htmlFor="flashbacks" className="text-sm">
                  Flashbacks or intrusive thoughts about previous birth experiences
                </Label>
              </div>
              <div className="flex items-start gap-2">
                <RadioGroupItem value="yes" id="control" className="mt-1" />
                <Label htmlFor="control" className="text-sm">
                  Feeling a loss of control over your pregnancy or birth plan
                </Label>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Based on your responses</p>
                  <p className="text-xs text-blue-700 mt-1">
                    You may benefit from speaking with a perinatal mental health specialist about your concerns
                    regarding care safety and control.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setTraumaScreeningOpen(false)}>
              Not Now
            </Button>
            <Button type="button" className="bg-blue-600">
              Connect with Specialist
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

