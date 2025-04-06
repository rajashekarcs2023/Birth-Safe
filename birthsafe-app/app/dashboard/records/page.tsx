"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Mic, Camera, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"

export default function RecordsPage() {
  const [activeTab, setActiveTab] = useState("timeline")
  const [showNewEntryDialog, setShowNewEntryDialog] = useState(false)
  const [showDocumentDialog, setShowDocumentDialog] = useState(false)
  const [showPhotoDialog, setShowPhotoDialog] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [journalEntries, setJournalEntries] = useState([
    {
      id: 1,
      title: "Doctor's Appointment Notes",
      date: "May 2, 2023",
      content:
        "Today's appointment went well. Dr. Smith said the baby is growing perfectly and is very active. My blood pressure was slightly elevated (135/85) so she wants me to monitor it at home. She also recommended reducing salt intake and getting more rest.",
    },
    {
      id: 2,
      title: "Symptoms Log",
      date: "April 28, 2023",
      content:
        "Experiencing more Braxton Hicks contractions today. They're not painful but definitely noticeable. Also having some swelling in my ankles by the end of the day. Making sure to elevate my feet when resting.",
    },
  ])
  const { toast } = useToast()

  const addJournalEntry = (title: string, content: string) => {
    const newEntry = {
      id: journalEntries.length + 1,
      title,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      content,
    }
    setJournalEntries([newEntry, ...journalEntries])
    setShowNewEntryDialog(false)
    toast({
      title: "Journal Entry Added",
      description: "Your journal entry has been saved.",
    })
  }

  const deleteJournalEntry = (id: number) => {
    setJournalEntries(journalEntries.filter((entry) => entry.id !== id))
    toast({
      title: "Journal Entry Deleted",
      description: "Your journal entry has been removed.",
    })
  }

  const uploadDocument = () => {
    setShowDocumentDialog(false)
    toast({
      title: "Document Uploaded",
      description: "Your document has been successfully uploaded.",
    })
  }

  const uploadPhoto = () => {
    setShowPhotoDialog(false)
    toast({
      title: "Photo Uploaded",
      description: "Your photo has been successfully uploaded.",
    })
  }

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false)
      toast({
        title: "Voice Note Saved",
        description: "Your voice note has been recorded and saved.",
      })
    } else {
      setIsRecording(true)
      toast({
        title: "Recording Started",
        description: "Recording your voice note...",
      })
    }
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Record Keeping</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Records Exported",
                description: "Your records have been exported and are ready to download.",
              })
            }}
          >
            Export Records
          </Button>
          <Button onClick={() => setShowNewEntryDialog(true)}>Add New Entry</Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="journal">Journal</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pregnancy Timeline</CardTitle>
              <CardDescription>A chronological record of your pregnancy journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                      <span className="text-sm font-medium">28w</span>
                    </div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Regular Checkup</p>
                    <p className="text-sm text-muted-foreground">
                      Dr. Sarah Smith - All measurements within normal range. Blood pressure: 116/75.
                    </p>
                    <p className="text-xs text-muted-foreground">May 2, 2023</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Event Details",
                            description: "Viewing details of your regular checkup.",
                          })
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Added to Journal",
                            description: "Event details added to your journal.",
                          })
                        }}
                      >
                        Add to Journal
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                      <span className="text-sm font-medium">27w</span>
                    </div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Glucose Tolerance Test</p>
                    <p className="text-sm text-muted-foreground">Results: Normal. No signs of gestational diabetes.</p>
                    <p className="text-xs text-muted-foreground">April 25, 2023</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Test Results",
                            description: "Viewing your glucose tolerance test results.",
                          })
                        }}
                      >
                        View Results
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Added to Journal",
                            description: "Test results added to your journal.",
                          })
                        }}
                      >
                        Add to Journal
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                      <span className="text-sm font-medium">24w</span>
                    </div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Ultrasound Scan</p>
                    <p className="text-sm text-muted-foreground">
                      Baby is growing well. Estimated weight: 1.5 lbs. All organs developing normally.
                    </p>
                    <p className="text-xs text-muted-foreground">April 4, 2023</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Ultrasound Images",
                            description: "Viewing your ultrasound images.",
                          })
                        }}
                      >
                        View Images
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Added to Journal",
                            description: "Ultrasound details added to your journal.",
                          })
                        }}
                      >
                        Add to Journal
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                      <span className="text-sm font-medium">20w</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Anatomy Scan</p>
                    <p className="text-sm text-muted-foreground">
                      Detailed ultrasound. All structures appear normal. Gender revealed: Girl.
                    </p>
                    <p className="text-xs text-muted-foreground">March 7, 2023</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Anatomy Scan Report",
                            description: "Viewing your anatomy scan report and images.",
                          })
                        }}
                      >
                        View Report
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Added to Journal",
                            description: "Anatomy scan details added to your journal.",
                          })
                        }}
                      >
                        Add to Journal
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pregnancy Journal</CardTitle>
              <CardDescription>Record your thoughts, symptoms, and provider interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setShowNewEntryDialog(true)}>
                      <FileText className="mr-2 h-4 w-4" />
                      Text Entry
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleRecording}
                      className={
                        isRecording
                          ? "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                          : ""
                      }
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      {isRecording ? "Stop Recording" : "Voice Note"}
                    </Button>
                  </div>
                  <Button size="sm" onClick={() => setShowNewEntryDialog(true)}>
                    New Entry
                  </Button>
                </div>

                <div className="space-y-4">
                  {journalEntries.map((entry) => (
                    <div key={entry.id} className="rounded-lg border p-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{entry.title}</h3>
                        <span className="text-xs text-muted-foreground">{entry.date}</span>
                      </div>
                      <p className="text-sm mt-2">{entry.content}</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Edit Entry",
                              description: "Editing journal entry...",
                            })
                          }}
                        >
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => deleteJournalEntry(entry.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medical Documents</CardTitle>
              <CardDescription>Store and organize your medical records and test results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowDocumentDialog(true)}>
                    <FileText className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Documents Sorted",
                        description: "Documents are now sorted by date.",
                      })
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Sort by Date
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Glucose Tolerance Test Results</h3>
                      <span className="text-xs text-muted-foreground">April 25, 2023</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">PDF Document - 2 pages</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Viewing Document",
                            description: "Opening glucose tolerance test results...",
                          })
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Downloading Document",
                            description: "Your document is being downloaded.",
                          })
                        }}
                      >
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Ultrasound Report</h3>
                      <span className="text-xs text-muted-foreground">April 4, 2023</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">PDF Document - 3 pages</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Viewing Document",
                            description: "Opening ultrasound report...",
                          })
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Downloading Document",
                            description: "Your document is being downloaded.",
                          })
                        }}
                      >
                        Download
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Blood Test Results</h3>
                      <span className="text-xs text-muted-foreground">March 15, 2023</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">PDF Document - 4 pages</p>
                    <div className="flex gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Viewing Document",
                            description: "Opening blood test results...",
                          })
                        }}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "Downloading Document",
                            description: "Your document is being downloaded.",
                          })
                        }}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Photo Documentation</CardTitle>
              <CardDescription>
                Store photos of test results, written instructions, and pregnancy progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowPhotoDialog(true)}>
                    <Camera className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      toast({
                        title: "Photos Sorted",
                        description: "Photos are now sorted by date.",
                      })
                    }}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Sort by Date
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="rounded-lg border overflow-hidden">
                    <div className="aspect-square bg-gray-100 relative">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Ultrasound"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium">24-Week Ultrasound</p>
                      <p className="text-xs text-muted-foreground">April 4, 2023</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Viewing Photo",
                              description: "Opening ultrasound image...",
                            })
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Downloading Photo",
                              description: "Your photo is being downloaded.",
                            })
                          }}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <div className="aspect-square bg-gray-100 relative">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Prescription"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium">Prenatal Vitamin Prescription</p>
                      <p className="text-xs text-muted-foreground">March 20, 2023</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Viewing Photo",
                              description: "Opening prescription image...",
                            })
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Downloading Photo",
                              description: "Your photo is being downloaded.",
                            })
                          }}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border overflow-hidden">
                    <div className="aspect-square bg-gray-100 relative">
                      <img
                        src="/placeholder.svg?height=200&width=200"
                        alt="Belly progress"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium">20-Week Bump Photo</p>
                      <p className="text-xs text-muted-foreground">March 7, 2023</p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Viewing Photo",
                              description: "Opening bump photo...",
                            })
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            toast({
                              title: "Downloading Photo",
                              description: "Your photo is being downloaded.",
                            })
                          }}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showNewEntryDialog} onOpenChange={setShowNewEntryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Journal Entry</DialogTitle>
            <DialogDescription>Record your thoughts, symptoms, or provider interactions.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="entry-title">Title</Label>
              <Input id="entry-title" placeholder="e.g., Doctor's Visit, Symptoms Today" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entry-content">Entry</Label>
              <Textarea id="entry-content" placeholder="Write your journal entry here..." className="min-h-[150px]" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowNewEntryDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                const titleInput = document.getElementById("entry-title") as HTMLInputElement
                const contentInput = document.getElementById("entry-content") as HTMLTextAreaElement
                if (titleInput.value && contentInput.value) {
                  addJournalEntry(titleInput.value, contentInput.value)
                } else {
                  toast({
                    title: "Missing Information",
                    description: "Please provide both a title and content for your entry.",
                    variant: "destructive",
                  })
                }
              }}
            >
              Save Entry
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDocumentDialog} onOpenChange={setShowDocumentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document</DialogTitle>
            <DialogDescription>Upload medical records, test results, or other important documents.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="doc-title">Document Title</Label>
              <Input id="doc-title" placeholder="e.g., Blood Test Results" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-date">Document Date</Label>
              <Input id="doc-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="doc-file">File</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                <FileText className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">PDF, JPG, PNG (max. 10MB)</p>
                <Input id="doc-file" type="file" className="hidden" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowDocumentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={uploadDocument}>Upload</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showPhotoDialog} onOpenChange={setShowPhotoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Photo</DialogTitle>
            <DialogDescription>
              Upload photos of test results, written instructions, or pregnancy progress.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="photo-title">Photo Title</Label>
              <Input id="photo-title" placeholder="e.g., 30-Week Bump Photo" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo-date">Photo Date</Label>
              <Input id="photo-date" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo-file">Photo</Label>
              <div className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">JPG, PNG (max. 5MB)</p>
                <Input id="photo-file" type="file" accept="image/*" className="hidden" />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPhotoDialog(false)}>
              Cancel
            </Button>
            <Button onClick={uploadPhoto}>Upload</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

