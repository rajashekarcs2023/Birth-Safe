"use client"

import { useState } from "react"
import { FileText, Mic, Clock, Heart, Download, Play, Pause, Sparkles, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

type ReflectionEntry = {
  id: string
  date: string
  title: string
  content: string
  milestone: string
  hasAudio: boolean
  audioLength?: string
  emotion: "positive" | "neutral" | "negative"
}

export default function ReflectionJournal() {
  const [newEntryDialogOpen, setNewEntryDialogOpen] = useState(false)
  const [viewEntryDialogOpen, setViewEntryDialogOpen] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<ReflectionEntry | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Sample reflection entries
  const reflectionEntries: ReflectionEntry[] = [
    {
      id: "1",
      date: "April 2, 2025",
      title: "Feelings about missed scan",
      content:
        "Today I found out my 32-week scan wasn't scheduled. I feel anxious and unheard. The midwife didn't seem to understand why I was concerned, even though I explained about my placenta position. I wish they would listen to me more.",
      milestone: "32-week appointment",
      hasAudio: true,
      audioLength: "1:42",
      emotion: "negative",
    },
    {
      id: "2",
      date: "March 15, 2025",
      title: "Hospital tour reflections",
      content:
        "The hospital tour was informative but overwhelming. I'm glad I got to see the delivery rooms, but I'm still nervous about the birth. The midwife was kind and answered all my questions.",
      milestone: "Hospital tour",
      hasAudio: false,
      emotion: "neutral",
    },
    {
      id: "3",
      date: "February 28, 2025",
      title: "First felt strong kicks!",
      content:
        "Today I felt really strong kicks for the first time! It's such an amazing feeling to connect with my baby this way. I recorded the kicks with the kick counter and everything looks normal.",
      milestone: "Baby movement",
      hasAudio: true,
      audioLength: "0:58",
      emotion: "positive",
    },
  ]

  const handleViewEntry = (entry: ReflectionEntry) => {
    setSelectedEntry(entry)
    setViewEntryDialogOpen(true)
  }

  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      // In a real app, we would save the recording here
    } else {
      // Start recording
      setIsRecording(true)
      setRecordingTime(0)
      // In a real app, we would start the recording here
    }
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    // In a real app, we would play/pause the audio here
  }

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-slate-800">In Their Words: Your Reflection Journal</h1>
        <p className="text-sm text-slate-500 mt-1">Document your journey in your own voice</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="bg-purple-50 rounded-lg border border-purple-100 p-4">
          <div className="flex gap-2">
            <Heart className="h-5 w-5 text-purple-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-purple-800 font-medium">Why keep a reflection journal?</p>
              <p className="text-xs text-purple-700 mt-1">
                Your feelings and experiences matter. This journal helps you process emotions, document your care
                journey, and create a record of your experience in your own words.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-slate-800">Your Reflections</h2>
          <Button onClick={() => setNewEntryDialogOpen(true)}>
            <FileText className="h-4 w-4 mr-2" />
            New Entry
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="feelings">Feelings</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-3">
            {reflectionEntries.map((entry) => (
              <Card
                key={entry.id}
                className={`cursor-pointer hover:border-blue-300 transition-colors ${
                  entry.emotion === "positive"
                    ? "border-green-200"
                    : entry.emotion === "negative"
                      ? "border-red-200"
                      : ""
                }`}
                onClick={() => handleViewEntry(entry)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        entry.emotion === "positive"
                          ? "bg-green-100"
                          : entry.emotion === "negative"
                            ? "bg-red-100"
                            : "bg-blue-100"
                      }`}
                    >
                      {entry.hasAudio ? (
                        <Mic
                          className={`h-5 w-5 ${
                            entry.emotion === "positive"
                              ? "text-green-600"
                              : entry.emotion === "negative"
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        />
                      ) : (
                        <FileText
                          className={`h-5 w-5 ${
                            entry.emotion === "positive"
                              ? "text-green-600"
                              : entry.emotion === "negative"
                                ? "text-red-600"
                                : "text-blue-600"
                          }`}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{entry.title}</h3>
                        <Badge variant="outline" className="text-slate-500">
                          {entry.date}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{entry.milestone}</p>
                      <p className="text-sm text-slate-700 mt-2 line-clamp-2">{entry.content}</p>
                      {entry.hasAudio && (
                        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                          <Play className="h-3 w-3" />
                          <span>Audio: {entry.audioLength}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Other tab contents would be similar but filtered */}
          <TabsContent value="appointments" className="space-y-3">
            {reflectionEntries
              .filter((entry) => entry.milestone.includes("appointment"))
              .map((entry) => (
                <Card
                  key={entry.id}
                  className="cursor-pointer hover:border-blue-300 transition-colors"
                  onClick={() => handleViewEntry(entry)}
                >
                  {/* Same card content as above */}
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* New Entry Dialog */}
      <Dialog open={newEntryDialogOpen} onOpenChange={setNewEntryDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>New Reflection Entry</DialogTitle>
            <DialogDescription>Capture your thoughts, feelings, and experiences</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <input className="w-full p-2 border rounded-md" placeholder="Give your reflection a title" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Milestone or Event</label>
              <input
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 32-week appointment, ultrasound, etc."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Your Reflection</label>
              <Textarea
                placeholder="How do you feel? What happened? What are your thoughts?"
                className="min-h-[100px]"
              />
            </div>

            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <div className="flex gap-2">
                <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-800">
                  You can also record your thoughts as a voice memo. Sometimes speaking is easier than writing.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-4 border rounded-md">
              <div className="flex items-center gap-2">
                {isRecording ? (
                  <>
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-sm font-medium">
                      Recording... {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, "0")}
                    </span>
                  </>
                ) : (
                  <span className="text-sm font-medium">Record Voice Memo</span>
                )}
              </div>
              <Button variant={isRecording ? "destructive" : "outline"} className="gap-2" onClick={toggleRecording}>
                <Mic className="h-4 w-4" />
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">How are you feeling about this?</label>
              <div className="flex justify-between">
                <button className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                    <span className="text-xl">😔</span>
                  </div>
                  <span className="text-xs mt-1">Concerned</span>
                </button>
                <button className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                    <span className="text-xl">😕</span>
                  </div>
                  <span className="text-xs mt-1">Mixed</span>
                </button>
                <button className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl">😐</span>
                  </div>
                  <span className="text-xs mt-1">Neutral</span>
                </button>
                <button className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xl">🙂</span>
                  </div>
                  <span className="text-xs mt-1">Good</span>
                </button>
                <button className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                    <span className="text-xl">😀</span>
                  </div>
                  <span className="text-xs mt-1">Great</span>
                </button>
              </div>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setNewEntryDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="bg-blue-600">
              Save Reflection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Entry Dialog */}
      <Dialog open={viewEntryDialogOpen} onOpenChange={setViewEntryDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedEntry && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEntry.title}</DialogTitle>
                <DialogDescription>
                  {selectedEntry.milestone} • {selectedEntry.date}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {selectedEntry.hasAudio && (
                  <div className="bg-slate-50 p-3 rounded-md border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 rounded-full" onClick={togglePlayback}>
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: isPlaying ? "45%" : "0%", transition: "width 0.1s linear" }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-xs text-slate-500">{selectedEntry.audioLength}</span>
                    </div>
                  </div>
                )}

                <ScrollArea className="h-60">
                  <p className="text-sm whitespace-pre-line">{selectedEntry.content}</p>
                </ScrollArea>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="h-4 w-4" />
                  <span>Recorded on {selectedEntry.date}</span>
                </div>

                <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                  <div className="flex gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <p className="text-sm text-blue-800">
                      Your reflections help create a complete picture of your pregnancy journey and can be valuable if
                      you need to discuss concerns with your healthcare team.
                    </p>
                  </div>
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                <Button variant="ghost" onClick={() => setViewEntryDialogOpen(false)}>
                  Close
                </Button>
                <Button type="button" variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

