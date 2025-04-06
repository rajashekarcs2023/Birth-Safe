"use client"

import { useState } from "react"
import {
  Search,
  Plus,
  Mic,
  Camera,
  FileText,
  CalendarIcon,
  Play,
  Flag,
  CheckCircle,
  Lock,
  Download,
  Share2,
  AlertTriangle,
  MessageSquare,
  Shield,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export default function Timeline() {
  const [recordDialogOpen, setRecordDialogOpen] = useState(false)
  const [verificationDialogOpen, setVerificationDialogOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState(null)

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry)
    setVerificationDialogOpen(true)
  }

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-slate-800">Your Pregnancy Timeline</h1>
        <p className="text-sm text-slate-500 mt-1">April 5, 2025</p>

        <div className="flex gap-2 mt-3">
          <Tabs defaultValue="all" className="flex-1">
            <TabsList className="grid grid-cols-4 h-9 w-full">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="appointments" className="text-xs">
                Appointments
              </TabsTrigger>
              <TabsTrigger value="tests" className="text-xs">
                Tests
              </TabsTrigger>
              <TabsTrigger value="concerns" className="text-xs">
                Concerns
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* April 5 Entry */}
        <div className="relative pl-6 border-l-2 border-blue-200 pb-6">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
          <div className="text-sm font-medium text-slate-500 mb-2 flex items-center justify-between">
            <span>April 5, 2025</span>
            <Badge variant="outline" className="text-slate-500">
              Today
            </Badge>
          </div>
          <Card className="bg-white" onClick={() => handleEntryClick("voice-memo")}>
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-700">Voice Memo</Badge>
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">Verified</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex items-center gap-3 mt-2">
                <div className="bg-blue-100 rounded-full p-2">
                  <Mic className="h-4 w-4 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Conversation with Dr. Miller</p>
                  <p className="text-xs text-slate-500">about birth plan concerns</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* April 2 Entry */}
        <div className="relative pl-6 border-l-2 border-amber-200 pb-6">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-amber-500"></div>
          <div className="text-sm font-medium text-slate-500 mb-2 flex items-center justify-between">
            <span>April 2, 2025</span>
            <Badge variant="outline" className="text-amber-500 border-amber-200">
              Concern
            </Badge>
          </div>
          <Card className="bg-white border-amber-200" onClick={() => handleEntryClick("symptom-log")}>
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-amber-100 text-amber-700">Symptom Log</Badge>
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">Verified</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex items-center gap-3 mt-2">
                <div className="bg-amber-100 rounded-full p-2">
                  <Flag className="h-4 w-4 text-amber-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Noticed reduced movement</p>
                  <p className="text-xs text-slate-500">called midwife</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <MessageSquare className="h-3 w-3 mr-1" /> Provider Response
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Share2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* March 22 Entry */}
        <div className="relative pl-6 border-l-2 border-red-200 pb-6">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-red-500"></div>
          <div className="text-sm font-medium text-slate-500 mb-2 flex items-center justify-between">
            <span>March 22, 2025</span>
            <Badge variant="outline" className="text-red-500 border-red-200">
              Flag
            </Badge>
          </div>
          <Card className="bg-white border-red-200" onClick={() => handleEntryClick("blood-test")}>
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-red-100 text-red-700">Blood Test Results</Badge>
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">Verified</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex items-center gap-3 mt-2">
                <div className="bg-slate-100 rounded-md h-12 w-12 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-slate-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Lab Results</p>
                  <p className="text-xs text-red-500">Iron levels low</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <AlertTriangle className="h-3 w-3 mr-1" /> Clinical Significance
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Share2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* March 15 Entry */}
        <div className="relative pl-6 border-l-2 border-blue-200 pb-6">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
          <div className="text-sm font-medium text-slate-500 mb-2 flex items-center justify-between">
            <span>March 15, 2025</span>
            <Badge variant="outline" className="text-slate-500">
              Important
            </Badge>
          </div>
          <Card className="bg-white" onClick={() => handleEntryClick("appointment")}>
            <CardHeader className="p-3 pb-2">
              <div className="flex items-center justify-between">
                <Badge className="bg-blue-100 text-blue-700">Hospital Appointment</Badge>
                <div className="flex items-center gap-1">
                  <Lock className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">Verified</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="flex items-center gap-3 mt-2">
                <div className="bg-blue-100 rounded-full p-2">
                  <CalendarIcon className="h-4 w-4 text-blue-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Dr. Smith</p>
                  <p className="text-xs text-slate-500">Discussed cesarean birth options due to placenta position</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0 flex justify-between">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                  <FileText className="h-3 w-3 mr-1" /> Notes
                </Button>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Share2 className="h-3 w-3" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <Download className="h-3 w-3" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Add New Entry Button */}
      <div className="fixed bottom-20 right-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
              onClick={() => setRecordDialogOpen(true)}
            >
              <Plus className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              <span>Text Note</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Mic className="mr-2 h-4 w-4" />
              <span>Voice Recording</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Camera className="mr-2 h-4 w-4" />
              <span>Photo Upload</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              <span>Document Scan</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>Appointment Details</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Record Dialog - New Component */}
      <Dialog open={recordDialogOpen} onOpenChange={setRecordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Record</DialogTitle>
            <DialogDescription>Create a verified record of your care</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="record-type">Record Type</Label>
              <Tabs defaultValue="appointment" className="w-full">
                <TabsList className="grid grid-cols-3 h-9">
                  <TabsTrigger value="appointment" className="text-xs">
                    Appointment
                  </TabsTrigger>
                  <TabsTrigger value="test" className="text-xs">
                    Test Result
                  </TabsTrigger>
                  <TabsTrigger value="concern" className="text-xs">
                    Concern
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="e.g., Midwife Appointment" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What happened during this interaction?"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="verification" className="text-sm font-medium">
                  Tamper-proof verification
                </Label>
                <Switch id="verification" defaultChecked />
              </div>
              <p className="text-xs text-slate-500">Creates a timestamped, immutable record that cannot be altered</p>
            </div>

            <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
              <div className="flex gap-2">
                <Shield className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-800 font-medium">Why verification matters</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Verified records provide legal protection and ensure your documentation cannot be disputed later.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setRecordDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="bg-blue-600">
              <Lock className="h-4 w-4 mr-2" />
              Create Verified Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verification Dialog - New Component */}
      <Dialog open={verificationDialogOpen} onOpenChange={setVerificationDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Verified Record</DialogTitle>
            <DialogDescription>This record is tamper-proof and timestamped</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="bg-green-50 p-3 rounded-md border border-green-200">
              <div className="flex gap-2">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-sm text-green-800 font-medium">Verification Status: Authentic</p>
                  <p className="text-xs text-green-700 mt-1">This record has not been altered since creation</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-500">Created</Label>
              <p className="text-sm">April 2, 2025 at 14:32:17 GMT</p>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-500">Verification Hash</Label>
              <div className="bg-slate-100 p-2 rounded-md">
                <p className="text-xs font-mono break-all">
                  e7d81c22a6f55b3e2d5d7a7a3c7a3b5e7d81c22a6f55b3e2d5d7a7a3c7a3b5
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs text-slate-500">Legal Status</Label>
              <p className="text-sm">
                This record can be used as evidence of your care interactions and cannot be altered by any party.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setVerificationDialogOpen(false)}>
              Close
            </Button>
            <Button type="button" className="bg-blue-600">
              <Download className="h-4 w-4 mr-2" />
              Export Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4" asChild>
        <Link href="/wellbeing">Complete Wellbeing Check</Link>
      </Button>
    </div>
  )
}

