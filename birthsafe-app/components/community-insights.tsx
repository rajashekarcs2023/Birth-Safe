"use client"

import { useState } from "react"
import {
  Info,
  ExternalLink,
  Users,
  BarChart3,
  Shield,
  AlertTriangle,
  MessageSquare,
  FileText,
  Lock,
  Search,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function CommunityInsights() {
  const [patternDialogOpen, setPatternDialogOpen] = useState(false)
  const [reportDialogOpen, setReportDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("resources")

  // Sample community insights data
  const communityInsights = [
    {
      id: "1",
      author: "Jessica M",
      date: "April 2, 2025",
      content:
        "Has anyone else experienced pressure from their provider to schedule a cesarean due to placenta previa? I'm feeling really anxious about it.",
      replies: 8,
    },
    {
      id: "2",
      author: "Tanya W",
      date: "March 28, 2025",
      content:
        "I'm looking for recommendations for doulas in the Oxford area who have experience with high-risk pregnancies. Any suggestions?",
      replies: 12,
    },
    {
      id: "3",
      author: "Sarah K",
      date: "March 15, 2025",
      content:
        "I'm struggling to find reliable information about the risks and benefits of different birth positions with placenta previa. Can anyone point me to some resources?",
      replies: 5,
    },
  ]

  const filteredInsights = communityInsights.filter((insight) =>
    insight.content.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="flex flex-col h-full pb-16">
      {/* Header */}
      <div className="bg-white p-4 border-b">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Community & Resources</h1>
            <p className="text-sm text-slate-500 mt-1">Insights from similar experiences and support resources</p>
          </div>
          <Badge variant="outline" className="text-slate-500 flex items-center gap-1">
            <Shield className="h-3 w-3" />
            Anonymous
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-screen-xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full max-w-md mx-auto">
              <TabsTrigger value="resources">Resources & Insights</TabsTrigger>
              <TabsTrigger value="discussions">Community Discussions</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {activeTab === "resources" ? (
          <>
            {/* New Component: Pattern Alert */}
            <Card className="border-amber-200 bg-amber-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  New Pattern Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-amber-700 mb-3">
                  15 other patients with similar risk profiles have reported missing the same 32-week scan at Oxford
                  University Hospitals in the past 6 months.
                </p>
                <div className="bg-white rounded-md p-3 border border-amber-200">
                  <h4 className="text-sm font-medium text-amber-800 mb-1">Potential system issue:</h4>
                  <p className="text-xs text-amber-700">
                    This may indicate a scheduling or protocol issue affecting high-risk pregnancies at this facility.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4" asChild>
                  <Link href="/wellbeing">Complete Wellbeing Check</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-amber-300 bg-white text-amber-800"
                  onClick={() => setPatternDialogOpen(true)}
                >
                  View Pattern Details
                </Button>
              </CardFooter>
            </Card>

            {/* Similar Experiences */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Similar Experiences
                </CardTitle>
                <CardDescription>From patients with similar conditions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                  <p className="text-sm text-amber-800">
                    <span className="font-medium">15 other patients</span> reported missing 32-week scans for high-risk
                    pregnancies at Oxford University Hospitals in the past 6 months
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-md p-3">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">8 patients</span> with placenta issues reported being told monitoring
                    was unnecessary after 36 weeks
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-md p-3">
                  <p className="text-sm text-slate-700">
                    <span className="font-medium">12 patients</span> with similar risk profiles successfully advocated
                    for additional monitoring
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Facility Safety Trends */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Facility Safety Trends
                </CardTitle>
                <CardDescription>Monitoring compliance across local hospitals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Oxford University Hospital</span>
                      <span className="text-sm text-slate-500">68%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "68%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">St. Mary's Hospital</span>
                      <span className="text-sm text-slate-500">82%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Royal Berkshire Hospital</span>
                      <span className="text-sm text-slate-500">91%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "91%" }}></div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-2">
                    View Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Connect With Support */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Connect With Support</CardTitle>
                <CardDescription>Resources and advocacy groups</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">Patient Advocacy Group</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Contact
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">Birth Rights Legal Support</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Info
                  </Button>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium">Connect with Similar Experiences</span>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => setActiveTab("discussions")}>
                    Join
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Share Experience */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="share-experience" className="text-blue-800 font-medium">
                      Share My Experience Anonymously
                    </Label>
                    <Info className="h-4 w-4 text-blue-600" />
                  </div>
                  <Switch id="share-experience" />
                </div>
                <p className="text-sm text-blue-700 mt-2">
                  Your experiences help identify patterns that can improve care for others. All data is anonymized.
                </p>
              </CardContent>
            </Card>

            {/* Why This Matters */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-blue-600" />
                  Why This Matters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700">
                  Pattern recognition helps identify systematic issues in maternity care. When multiple patients report
                  similar experiences, it can highlight gaps in care protocols that might otherwise go unnoticed.
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Community Discussions Tab */}
            <div className="relative mb-4">
              <Input
                placeholder="Search community discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Community Discussions</CardTitle>
                <CardDescription>Connect with others who share similar experiences</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {filteredInsights.length > 0 ? (
                      filteredInsights.map((insight) => (
                        <Card key={insight.id}>
                          <CardHeader className="pb-2">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{insight.author.substring(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-sm font-medium">{insight.author}</CardTitle>
                                <CardDescription className="text-xs text-slate-500">{insight.date}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="p-3 pt-0">
                            <p className="text-sm text-slate-700">{insight.content}</p>
                          </CardContent>
                          <CardFooter className="flex justify-between items-center">
                            <div className="flex items-center text-xs text-slate-500">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {insight.replies} replies
                            </div>
                            <Button variant="outline" size="sm">
                              View Discussion
                            </Button>
                          </CardFooter>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-slate-500">No results found for "{searchQuery}"</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Share Your Experience</CardTitle>
                <CardDescription>Connect with others and offer support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your thoughts or ask a question..."
                    className="min-h-[100px]"
                  />
                  <Button className="w-full">Post to Community</Button>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Pattern Details Dialog - New Component */}
      <Dialog open={patternDialogOpen} onOpenChange={setPatternDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Pattern Analysis</DialogTitle>
            <DialogDescription>Detailed breakdown of the identified pattern</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Pattern: Missed 32-week scans</h3>
              <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
                <p className="text-sm text-amber-800">
                  <span className="font-medium">15 patients</span> with high-risk pregnancies reported missing
                  recommended 32-week ultrasound scans at Oxford University Hospitals.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Timeline</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="text-xs text-slate-500 w-20">Jan 2025</div>
                  <div className="text-sm">First reports (2 patients)</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-xs text-slate-500 w-20">Feb 2025</div>
                  <div className="text-sm">Pattern continues (5 patients)</div>
                </div>
                <div className="flex gap-3">
                  <div className="text-xs text-slate-500 w-20">Mar 2025</div>
                  <div className="text-sm">Increasing frequency (8 patients)</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Potential Causes</h3>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-sm">Scheduling system error for high-risk patients</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-sm">Staff shortage in ultrasound department</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                    <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  </div>
                  <p className="text-sm">Protocol change not aligned with guidelines</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Actions Taken</h3>
              <p className="text-sm">
                This pattern has been reported to the Patient Safety Team at Oxford University Hospitals and the Care
                Quality Commission.
              </p>
            </div>
          </div>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setPatternDialogOpen(false)}>
              Close
            </Button>
            <Button type="button" className="bg-blue-600">
              <FileText className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Report Experience Dialog - New Component */}
      <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Report Your Experience</DialogTitle>
            <DialogDescription>Contribute to pattern identification</DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="missed-scan" className="w-full">
            <TabsList className="grid grid-cols-2 h-9 mb-4">
              <TabsTrigger value="missed-scan" className="text-xs">
                Missed Scan
              </TabsTrigger>
              <TabsTrigger value="other" className="text-xs">
                Other Issue
              </TabsTrigger>
            </TabsList>
            <TabsContent value="missed-scan" className="space-y-4">
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200">
                <div className="flex gap-2">
                  <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    Your report will be anonymized and added to our database to help identify patterns in care.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">We'll add these details from your records:</h3>
                <div className="space-y-2 text-sm">
                  <p>• Missing 32-week ultrasound scan</p>
                  <p>• High-risk pregnancy due to placenta position</p>
                  <p>• Care received at Oxford University Hospitals</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="verification" className="text-sm font-medium">
                    Anonymize all personal details
                  </Label>
                  <Switch id="verification" defaultChecked />
                </div>
                <p className="text-xs text-slate-500">Your name and identifying information will be removed</p>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="sm:justify-between">
            <Button variant="ghost" onClick={() => setReportDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="button" className="bg-blue-600">
              <Lock className="h-4 w-4 mr-2" />
              Submit Anonymous Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

