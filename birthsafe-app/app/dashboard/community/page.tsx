"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Users, Shield } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"

export default function CommunityPage() {
  const [activeTab, setActiveTab] = useState("patterns")
  const [showShareDialog, setShowShareDialog] = useState(false)
  const [showDetailsDialog, setShowDetailsDialog] = useState(false)
  const [currentDetail, setCurrentDetail] = useState({ title: "", content: "" })
  const { toast } = useToast()

  const shareExperience = () => {
    setShowShareDialog(false)
    toast({
      title: "Experience Shared",
      description: "Thank you for sharing your experience. It has been anonymously added to our database.",
    })
  }

  const showDetails = (title: string, content: string) => {
    setCurrentDetail({ title, content })
    setShowDetailsDialog(true)
  }

  const connectWithAdvocate = (advocateName: string) => {
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${advocateName} has been sent.`,
    })
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Community Pattern Recognition</h2>
        <Button onClick={() => setShowShareDialog(true)}>Share Experience</Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="experiences">Shared Experiences</TabsTrigger>
          <TabsTrigger value="advocates">Patient Advocates</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Identified Patterns</CardTitle>
              <CardDescription>Common experiences and issues identified across patient reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-amber-500" />
                      Delayed Preeclampsia Diagnosis
                    </h3>
                    <Badge>High Priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Multiple patients report symptoms of preeclampsia being dismissed or not recognized until severe
                    symptoms developed.
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Common signs missed:</p>
                    <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                      <li>Persistent headaches</li>
                      <li>Visual disturbances</li>
                      <li>Sudden swelling</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        showDetails(
                          "Delayed Preeclampsia Diagnosis",
                          "Our system has identified a concerning pattern where symptoms of preeclampsia are being dismissed or not recognized by healthcare providers until patients develop severe symptoms requiring emergency intervention. This pattern has been reported across multiple healthcare systems and geographic regions.\n\nCommon patient experiences include:\n- Reporting headaches, visual changes, or sudden swelling that were attributed to normal pregnancy discomforts\n- Blood pressure readings that were elevated but not acted upon\n- Being told that protein in urine was not significant\n\nThis pattern suggests a need for improved provider education and standardized screening protocols for preeclampsia risk factors.",
                        )
                      }
                    >
                      View Details
                    </Button>
                    <Button size="sm" onClick={() => connectWithAdvocate("Maternal Health Advocacy Network")}>
                      Connect with Advocate
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center">
                      <Shield className="mr-2 h-4 w-4 text-amber-500" />
                      Inconsistent Gestational Diabetes Monitoring
                    </h3>
                    <Badge>Medium Priority</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Variation in how gestational diabetes is monitored and managed across different providers and
                    facilities.
                  </p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">Common issues:</p>
                    <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                      <li>Inconsistent glucose testing protocols</li>
                      <li>Delayed referrals to specialists</li>
                      <li>Limited nutritional guidance</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        showDetails(
                          "Inconsistent Gestational Diabetes Monitoring",
                          "Our analysis has revealed significant variations in how gestational diabetes is screened for, diagnosed, and managed across different healthcare providers and facilities. These inconsistencies may lead to delayed interventions and suboptimal outcomes.\n\nKey variations include:\n- Different thresholds used for diagnosis from the glucose tolerance test\n- Varying frequencies of blood glucose monitoring recommendations\n- Inconsistent timing for specialist referrals\n- Wide variation in nutritional guidance provided to patients\n\nThis pattern suggests a need for standardized protocols for gestational diabetes management and better coordination between primary care providers and specialists.",
                        )
                      }
                    >
                      View Details
                    </Button>
                    <Button size="sm" onClick={() => connectWithAdvocate("Maternal Health Advocacy Network")}>
                      Connect with Advocate
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experiences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anonymous Shared Experiences</CardTitle>
              <CardDescription>Learn from others' experiences and share your own</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Birth Plan Ignored During Delivery
                    </h3>
                    <span className="text-xs text-muted-foreground">2 days ago</span>
                  </div>
                  <p className="text-sm mt-2">
                    "I had a detailed birth plan that was discussed and approved by my doctor, but when I arrived at the
                    hospital in labor, the staff seemed unaware of my preferences. Several interventions I wanted to
                    avoid were performed without proper discussion."
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">Birth Plan</Badge>
                    <Badge variant="outline">Communication</Badge>
                    <Badge variant="outline">Consent</Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        showDetails(
                          "Similar Experiences: Birth Plan Ignored",
                          "24 similar experiences have been reported in our database over the past 6 months. Common themes include:\n\n- Birth plans not being transferred from provider's office to hospital staff\n- Shift changes resulting in new staff being unaware of birth plan details\n- Emergency situations where birth plans were set aside without explanation\n- Patients feeling pressured to accept interventions they had previously declined in their birth plan\n\nThese experiences highlight the need for better systems to ensure birth plans are communicated effectively between providers and respected throughout labor and delivery.",
                        )
                      }
                    >
                      Similar Experiences (24)
                    </Button>
                    <Button size="sm" onClick={() => setShowShareDialog(true)}>
                      Add Your Experience
                    </Button>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Postpartum Concerns Dismissed
                    </h3>
                    <span className="text-xs text-muted-foreground">1 week ago</span>
                  </div>
                  <p className="text-sm mt-2">
                    "After giving birth, I experienced severe pain and excessive bleeding, but when I called my
                    provider, they told me it was normal. It turned out I had retained placenta that required emergency
                    surgery. I wish my concerns had been taken seriously from the beginning."
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline">Postpartum</Badge>
                    <Badge variant="outline">Emergency</Badge>
                    <Badge variant="outline">Dismissal</Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        showDetails(
                          "Similar Experiences: Postpartum Concerns Dismissed",
                          "37 similar experiences have been reported in our database over the past year. Common themes include:\n\n- Postpartum pain being attributed to normal recovery without proper assessment\n- Bleeding concerns being minimized until they reached emergency levels\n- Difficulty distinguishing between normal recovery and complications\n- Delayed follow-up appointments for reported concerns\n- Emotional distress from not being believed about physical symptoms\n\nThese experiences highlight the need for better postpartum care protocols and more responsive systems for addressing patient concerns in the critical weeks after birth.",
                        )
                      }
                    >
                      Similar Experiences (37)
                    </Button>
                    <Button size="sm" onClick={() => setShowShareDialog(true)}>
                      Add Your Experience
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advocates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Advocates</CardTitle>
              <CardDescription>Connect with advocates who can help with your specific concerns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Maternal Health Advocacy Network</h3>
                      <p className="text-sm text-muted-foreground">
                        Specializes in ensuring quality care and proper informed consent
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Areas of focus:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline">Birth Trauma</Badge>
                      <Badge variant="outline">Informed Consent</Badge>
                      <Badge variant="outline">High-Risk Pregnancy</Badge>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4"
                    onClick={() => connectWithAdvocate("Maternal Health Advocacy Network")}
                  >
                    Connect
                  </Button>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="flex items-center">
                    <div className="mr-4">
                      <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                        <Users className="h-6 w-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium">Birth Rights Legal Coalition</h3>
                      <p className="text-sm text-muted-foreground">
                        Legal advocates specializing in maternal healthcare rights
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm font-medium">Areas of focus:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="outline">Medical Negligence</Badge>
                      <Badge variant="outline">Birth Injury</Badge>
                      <Badge variant="outline">Patient Rights</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-4" onClick={() => connectWithAdvocate("Birth Rights Legal Coalition")}>
                    Connect
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Share Your Experience</DialogTitle>
            <DialogDescription>
              Your experience will be shared anonymously to help identify patterns and improve care.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="experience-title">Title</Label>
              <Input id="experience-title" placeholder="Brief description of your experience" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience-description">Description</Label>
              <Textarea id="experience-description" placeholder="Describe what happened..." className="min-h-[150px]" />
            </div>
            <div className="space-y-2">
              <Label>Categories (select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="category-birth" />
                  <Label htmlFor="category-birth" className="text-sm">
                    Birth Experience
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="category-prenatal" />
                  <Label htmlFor="category-prenatal" className="text-sm">
                    Prenatal Care
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="category-postpartum" />
                  <Label htmlFor="category-postpartum" className="text-sm">
                    Postpartum
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="category-consent" />
                  <Label htmlFor="category-consent" className="text-sm">
                    Informed Consent
                  </Label>
                </div>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I understand that my experience will be shared anonymously and may be used to identify patterns in
                maternal care.
              </Label>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowShareDialog(false)}>
              Cancel
            </Button>
            <Button onClick={shareExperience}>Share Experience</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentDetail.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="whitespace-pre-line">{currentDetail.content}</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setShowDetailsDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

