"use client"

import type React from "react"

import { useState } from "react"
import { Shield, ThumbsUp, ThumbsDown, MessageSquare, Send, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function PostnatalDignity() {
  const [feedbackType, setFeedbackType] = useState<string | null>(null)
  const [feedbackText, setFeedbackText] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setDialogOpen(true)
  }

  const dignityAreas = [
    {
      id: "privacy",
      title: "Privacy Respect",
      description: "Were your privacy needs respected during examinations and procedures?",
    },
    {
      id: "communication",
      title: "Communication",
      description: "Were you informed before procedures and examinations?",
    },
    {
      id: "consent",
      title: "Consent",
      description: "Was your consent obtained for all procedures?",
    },
    {
      id: "respect",
      title: "Respectful Care",
      description: "Were you treated with dignity and respect by all staff?",
    },
    {
      id: "support",
      title: "Emotional Support",
      description: "Were your emotional needs addressed during your postnatal care?",
    },
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-slate-800">Postnatal Dignity & Privacy Feedback</h1>
        <p className="text-sm text-slate-500 mt-1">Help improve care for yourself and others</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-700">New</Badge>
              <CardTitle className="text-lg">Your Postnatal Experience Matters</CardTitle>
            </div>
            <CardDescription>
              Your feedback helps improve care practices and ensures dignity and privacy are respected
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 p-3 rounded-md border border-blue-200 mb-4">
              <div className="flex gap-2">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  Your feedback is confidential and can be anonymous. It will be used to improve care practices and
                  advocate for better standards.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {dignityAreas.map((area) => (
                  <div key={area.id} className="space-y-2">
                    <h3 className="font-medium text-slate-800">{area.title}</h3>
                    <p className="text-sm text-slate-600 mb-2">{area.description}</p>
                    <RadioGroup
                      defaultValue={feedbackType}
                      onValueChange={(value) => setFeedbackType(value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={`${area.id}-positive`} id={`${area.id}-positive`} />
                        <Label
                          htmlFor={`${area.id}-positive`}
                          className="flex items-center gap-1 cursor-pointer text-green-700"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>Yes</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={`${area.id}-negative`} id={`${area.id}-negative`} />
                        <Label
                          htmlFor={`${area.id}-negative`}
                          className="flex items-center gap-1 cursor-pointer text-red-700"
                        >
                          <ThumbsDown className="h-4 w-4" />
                          <span>No</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={`${area.id}-neutral`} id={`${area.id}-neutral`} />
                        <Label htmlFor={`${area.id}-neutral`} className="cursor-pointer text-slate-600">
                          Not applicable
                        </Label>
                      </div>
                    </RadioGroup>
                    <Separator className="mt-4" />
                  </div>
                ))}

                <div className="space-y-2">
                  <Label htmlFor="feedback" className="font-medium">
                    Additional Comments
                  </Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share more details about your experience..."
                    className="min-h-[100px]"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="gap-2">
                    <Send className="h-4 w-4" />
                    Submit Feedback
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Why Your Feedback Matters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded-full">
                <MessageSquare className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Improving Care Standards</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your feedback helps healthcare providers understand where they can improve postnatal care practices.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-slate-800">Advocating for Change</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Collective feedback can lead to policy changes that better protect dignity and privacy in maternity
                  care.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Submitted Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback Submitted</DialogTitle>
            <DialogDescription>Thank you for sharing your experience</DialogDescription>
          </DialogHeader>
          <div className="py-4 flex flex-col items-center text-center">
            <div className="bg-green-100 p-3 rounded-full mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-slate-700">
              Your feedback has been recorded and will help improve postnatal care practices. Thank you for taking the
              time to share your experience.
            </p>
          </div>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

