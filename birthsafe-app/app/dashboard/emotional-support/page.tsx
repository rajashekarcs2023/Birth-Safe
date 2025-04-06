"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Heart, Users, BookOpen, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function EmotionalSupportPage() {
  const [activeTab, setActiveTab] = useState("check-in")
  const [showCheckInDialog, setShowCheckInDialog] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [assessmentResults, setAssessmentResults] = useState({
    anxiety: 30,
    depression: 15,
    stress: 45,
  })
  const { toast } = useToast()

  const startCheckIn = () => {
    setCurrentQuestion(1)
    setShowCheckInDialog(true)
  }

  const nextQuestion = () => {
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      completeAssessment()
    }
  }

  const completeAssessment = () => {
    setShowCheckInDialog(false)
    toast({
      title: "Assessment Complete",
      description: "Your mental health check-in has been recorded.",
    })
    // In a real app, we would calculate actual scores based on responses
    setAssessmentResults({
      anxiety: Math.floor(Math.random() * 40) + 10,
      depression: Math.floor(Math.random() * 30) + 5,
      stress: Math.floor(Math.random() * 50) + 20,
    })
  }

  const joinGroup = (groupName: string) => {
    toast({
      title: "Group Joined",
      description: `You have successfully joined the ${groupName} group.`,
    })
  }

  const visitWebsite = (websiteName: string) => {
    toast({
      title: "Opening Website",
      description: `Redirecting to ${websiteName}...`,
    })
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Emotional Safety Net</h2>
        <Button onClick={startCheckIn}>Start Check-in</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="check-in">Mental Health Check-in</TabsTrigger>
          <TabsTrigger value="resources">Support Resources</TabsTrigger>
          <TabsTrigger value="community">Peer Support</TabsTrigger>
        </TabsList>

        <TabsContent value="check-in" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mental Health Assessment</CardTitle>
              <CardDescription>Regular check-ins to monitor your emotional well-being</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">Last check-in: 7 days ago</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Assessment History",
                          description: "Viewing your previous assessment results.",
                        })
                      }}
                    >
                      View History
                    </Button>
                  </div>
                  <Progress value={33} className="h-2" />
                  <p className="text-xs text-muted-foreground">Next scheduled check-in: 2 days</p>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium">Recent Assessment Results</h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Anxiety Level</p>
                        <p className="text-sm font-medium">Mild</p>
                      </div>
                      <Progress value={assessmentResults.anxiety} className="h-2 mt-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Depression Screening</p>
                        <p className="text-sm font-medium">Low Risk</p>
                      </div>
                      <Progress value={assessmentResults.depression} className="h-2 mt-1" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Stress Level</p>
                        <p className="text-sm font-medium">Moderate</p>
                      </div>
                      <Progress value={assessmentResults.stress} className="h-2 mt-1" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Recommendations:</p>
                    <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                      <li>Practice daily relaxation techniques</li>
                      <li>Maintain social connections</li>
                      <li>Consider joining a pregnancy support group</li>
                    </ul>
                  </div>
                </div>

                <Button className="w-full" onClick={startCheckIn}>
                  Start New Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Specialized Support Resources</CardTitle>
              <CardDescription>Access resources for birth trauma, loss, and emotional well-being</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Birth Trauma Support</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Resources for processing and healing from difficult or traumatic birth experiences.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="rounded border p-2">
                      <p className="text-sm font-medium">Birth Trauma Association</p>
                      <p className="text-xs text-muted-foreground">
                        Support network and resources for birth trauma recovery
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1"
                        onClick={() => visitWebsite("Birth Trauma Association")}
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Visit Website
                      </Button>
                    </div>
                    <div className="rounded border p-2">
                      <p className="text-sm font-medium">Trauma-Informed Care Guide</p>
                      <p className="text-xs text-muted-foreground">Information on finding trauma-informed providers</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1"
                        onClick={() => {
                          toast({
                            title: "Guide Downloaded",
                            description: "The Trauma-Informed Care Guide has been downloaded.",
                          })
                        }}
                      >
                        Download Guide
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
                    <h3 className="font-medium">Pregnancy & Postpartum Mental Health</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Resources for managing anxiety, depression, and other mental health concerns during pregnancy and
                    postpartum.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="rounded border p-2">
                      <p className="text-sm font-medium">Postpartum Support International</p>
                      <p className="text-xs text-muted-foreground">Support for perinatal mood and anxiety disorders</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1"
                        onClick={() => visitWebsite("Postpartum Support International")}
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Visit Website
                      </Button>
                    </div>
                    <div className="rounded border p-2">
                      <p className="text-sm font-medium">Mindfulness for Pregnancy</p>
                      <p className="text-xs text-muted-foreground">Guided meditations and exercises</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1"
                        onClick={() => {
                          toast({
                            title: "Resources Available",
                            description: "Accessing mindfulness resources...",
                          })
                        }}
                      >
                        Access Resources
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center">
                    <Heart className="mr-2 h-5 w-5 text-red-500" />
                    <h3 className="font-medium">Pregnancy & Infant Loss Support</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Compassionate resources for those experiencing miscarriage, stillbirth, or infant loss.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="rounded border p-2">
                      <p className="text-sm font-medium">Share Pregnancy & Infant Loss Support</p>
                      <p className="text-xs text-muted-foreground">Support groups and resources</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1"
                        onClick={() => visitWebsite("Share Pregnancy & Infant Loss Support")}
                      >
                        <ExternalLink className="mr-2 h-3 w-3" />
                        Visit Website
                      </Button>
                    </div>
                    <div className="rounded border p-2">
                      <p className="text-sm font-medium">Grief Counseling Directory</p>
                      <p className="text-xs text-muted-foreground">Find specialized counselors in your area</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-1"
                        onClick={() => {
                          toast({
                            title: "Directory Search",
                            description: "Opening grief counseling directory search...",
                          })
                        }}
                      >
                        Search Directory
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Peer Support Networks</CardTitle>
              <CardDescription>Connect with others who share similar experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    <h3 className="font-medium">Support Groups</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Join moderated groups based on shared experiences and concerns.
                  </p>
                  <div className="mt-4 space-y-2">
                    <div className="rounded border p-2">
                      <p className="text-sm font-medium">High-Risk Pregnancy Support</p>
                      <p className="text-xs text-muted-foreground">For those navigating complicated pregnancies</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button variant="outline" size="sm" onClick={() => joinGroup("High-Risk Pregnancy Support")}>
                          Join Group
                        </Button>
                        <span className="text-xs text-muted-foreground">243 members</span>
                      </div>
                    </div>
                    <div className="rounded border p-2">
                      <p className="text-sm font-medium">First-Time Parents</p>
                      <p className="text-xs text-muted-foreground">Support and advice for new parents</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button variant="outline" size="sm" onClick={() => joinGroup("First-Time Parents")}>
                          Join Group
                        </Button>
                        <span className="text-xs text-muted-foreground">512 members</span>
                      </div>
                    </div>
                    <div className="rounded border p-2">
                      <p className="text-sm font-medium">Birth Trauma Recovery</p>
                      <p className="text-xs text-muted-foreground">Healing and support after difficult births</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button variant="outline" size="sm" onClick={() => joinGroup("Birth Trauma Recovery")}>
                          Join Group
                        </Button>
                        <span className="text-xs text-muted-foreground">178 members</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    <h3 className="font-medium">One-on-One Support</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Connect with a peer mentor who has experienced similar situations.
                  </p>
                  <div className="mt-4">
                    <p className="text-sm">A peer mentor can provide:</p>
                    <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                      <li>Emotional support from someone who understands</li>
                      <li>Practical advice based on lived experience</li>
                      <li>Companionship throughout your journey</li>
                    </ul>
                    <Button
                      className="w-full mt-4"
                      onClick={() => {
                        toast({
                          title: "Mentor Request Sent",
                          description: "Your request for a peer mentor has been submitted.",
                        })
                      }}
                    >
                      Request a Peer Mentor
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showCheckInDialog} onOpenChange={setShowCheckInDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Mental Health Check-in</DialogTitle>
            <DialogDescription>Question {currentQuestion} of 5</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {currentQuestion === 1 && (
              <div className="space-y-4">
                <p>Over the past 2 weeks, how often have you felt nervous, anxious, or on edge?</p>
                <RadioGroup defaultValue="not-at-all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-at-all" id="q1-1" />
                    <Label htmlFor="q1-1">Not at all</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="several-days" id="q1-2" />
                    <Label htmlFor="q1-2">Several days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="more-than-half" id="q1-3" />
                    <Label htmlFor="q1-3">More than half the days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nearly-every-day" id="q1-4" />
                    <Label htmlFor="q1-4">Nearly every day</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentQuestion === 2 && (
              <div className="space-y-4">
                <p>Over the past 2 weeks, how often have you felt down, depressed, or hopeless?</p>
                <RadioGroup defaultValue="not-at-all">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-at-all" id="q2-1" />
                    <Label htmlFor="q2-1">Not at all</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="several-days" id="q2-2" />
                    <Label htmlFor="q2-2">Several days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="more-than-half" id="q2-3" />
                    <Label htmlFor="q2-3">More than half the days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="nearly-every-day" id="q2-4" />
                    <Label htmlFor="q2-4">Nearly every day</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentQuestion === 3 && (
              <div className="space-y-4">
                <p>How would you rate your current stress level related to your pregnancy?</p>
                <RadioGroup defaultValue="low">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="q3-1" />
                    <Label htmlFor="q3-1">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="q3-2" />
                    <Label htmlFor="q3-2">Moderate</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="q3-3" />
                    <Label htmlFor="q3-3">High</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-high" id="q3-4" />
                    <Label htmlFor="q3-4">Very high</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentQuestion === 4 && (
              <div className="space-y-4">
                <p>How well are you sleeping?</p>
                <RadioGroup defaultValue="well">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-well" id="q4-1" />
                    <Label htmlFor="q4-1">Very well</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="well" id="q4-2" />
                    <Label htmlFor="q4-2">Well</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="poorly" id="q4-3" />
                    <Label htmlFor="q4-3">Poorly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very-poorly" id="q4-4" />
                    <Label htmlFor="q4-4">Very poorly</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {currentQuestion === 5 && (
              <div className="space-y-4">
                <p>How connected do you feel to your support system (family, friends, healthcare providers)?</p>
                <RadioGroup defaultValue="somewhat">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="very" id="q5-1" />
                    <Label htmlFor="q5-1">Very connected</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="somewhat" id="q5-2" />
                    <Label htmlFor="q5-2">Somewhat connected</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="not-very" id="q5-3" />
                    <Label htmlFor="q5-3">Not very connected</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="isolated" id="q5-4" />
                    <Label htmlFor="q5-4">Feeling isolated</Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowCheckInDialog(false)}>
              Cancel
            </Button>
            <Button onClick={nextQuestion}>{currentQuestion < 5 ? "Next Question" : "Complete Assessment"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

