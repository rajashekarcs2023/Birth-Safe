"use client"

import { useState } from "react"
import { FileX, Mic, Camera, Clock, Lock, Download, AlertTriangle, Info, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function ConsentLog() {
  const [logDialogOpen, setLogDialogOpen] = useState(false)
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false)
  const [consentType, setConsentType] = useState("no-explanation")
  const [recording, setRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  const handleSubmit = () => {
    setLogDialogOpen(false)
    setConfirmationDialogOpen(true)
  }

  const toggleRecording = () => {
    setRecording(!recording)
    if (!recording) {
      // Start recording timer
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)

      // Store interval ID in a ref or state to clear it later
      return () => clearInterval(interval)
    } else {
      setRecordingTime(0)
    }
  }

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-slate-800">Consent Log</h1>
        <p className="text-sm text-slate-500 mt-1">Document consent issues during your care</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="bg-blue-50 rounded-lg border border-blue-100 p-4">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Why document consent issues?</p>
              <p className="text-xs text-blue-700 mt-1">
                Creating a record of consent issues helps establish a pattern if needed later and empowers you to
                address these concerns with your healthcare providers.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Logs */}
        <h2 className="text-lg font-semibold text-slate-800 mt-2">Recent Logs</h2>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-red-100 p-2 rounded-full">
                  <FileX className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Procedure without full explanation</p>
                    <Badge className="bg-green-100 text-green-700">Verified</Badge>
                  </div>
                  <p className="text-xs text-slate-500">April 2, 2025 - Dr. Smith</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-8 gap-1">
                <Download className="h-4 w-4" />
              </Button>
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
                  <div className="flex items-center gap-2">
                    <p className="font-medium">Decision made without my input</p>
                    <Badge className="bg-green-100 text-green-700">Verified</Badge>
                  </div>
                  <p className="text-xs text-slate-500">March 15, 2025 - Midwife Jane</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="h-8 gap-1">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add New Log Button */}
        <Button className="w-full mt-4" onClick={() => setLogDialogOpen(true)}>
          Log New Consent Issue
        </Button>
      </div>

      {/* Log Dialog */}
      <Dialog open={logDialogOpen} onOpenChange={setLogDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Log Consent Issue</DialogTitle>
            <DialogDescription>Document when your consent rights weren't respected</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Type of consent issue:</Label>
              <RadioGroup defaultValue={consentType} onValueChange={setConsentType} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-explanation" id="no-explanation" />
                  <Label htmlFor="no-explanation">Procedure without full explanation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-input" id="no-input" />
                  <Label htmlFor="no-input">Decision made without my input</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pressure" id="pressure" />
                  <Label htmlFor="pressure">Pressured into consenting</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="refused" id="refused" />
                  <Label htmlFor="refused">My refusal was ignored</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other consent issue</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="provider">Healthcare provider involved:</Label>
              <Textarea id="provider" placeholder="Name and role (if known)" className="min-h-[60px]" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">What happened:</Label>
              <Textarea
                id="description"
                placeholder="Describe the situation in your own words..."
                className="min-h-[100px]"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className={`flex-1 gap-1 ${recording ? "bg-red-50 text-red-700 border-red-300" : ""}`}
                onClick={toggleRecording}
              >
                <Mic className="h-4 w-4" />
                {recording ? (
                  <span>
                    Recording... {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
                  </span>
                ) : (
                  <span>Voice Note</span>
                )}
              </Button>
              <Button variant="outline" className="flex-1 gap-1">
                <Camera className="h-4 w-4" />
                Add Photo
              </Button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="verification" className="text-sm font-medium">
                  Create verified record
                </Label>
                <Switch id="verification" defaultChecked />
              </div>
              <p className="text-xs text-slate-500">
                Creates a timestamped, tamper-proof record that can be used as evidence if needed
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setLogDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="bg-blue-600" onClick={handleSubmit}>
              <Lock className="h-4 w-4 mr-2" />
              Create Verified Log
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Consent Log Created</DialogTitle>
            <DialogDescription>Your record has been securely stored</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 p-3 rounded-md border border-green-200">
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-green-800 font-medium">Verification Status: Complete</p>
                  <p className="text-xs text-green-700 mt-1">
                    Your consent log has been timestamped and securely stored
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-500">Created</Label>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                <p className="text-sm">April 5, 2025 at 14:32:17 GMT</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-500">Next Steps</Label>
              <p className="text-sm text-slate-700">
                This log is now part of your secure medical record. You can download it, share it with your advocate, or
                use it in discussions with your healthcare provider.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setConfirmationDialogOpen(false)}>
              Close
            </Button>
            <Button type="button" className="bg-blue-600">
              <Download className="h-4 w-4 mr-2" />
              Download Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

