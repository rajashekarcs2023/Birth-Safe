"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"

export default function RiskMonitorPage() {
  const [activeTab, setActiveTab] = useState("current")
  const [showAlert, setShowAlert] = useState(true)
  const [showUpdateDialog, setShowUpdateDialog] = useState(false)
  const [bloodPressure, setBloodPressure] = useState({ systolic: "135", diastolic: "85" })
  const { toast } = useToast()

  const handleUpdateHealth = () => {
    setShowUpdateDialog(false)
    toast({
      title: "Health data updated",
      description: "Your health data has been successfully updated.",
    })
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Risk Monitor</h2>
        <Button onClick={() => setShowUpdateDialog(true)}>Update Health Data</Button>
      </div>

      {showAlert && (
        <Alert variant="destructive" className="bg-red-50 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Attention Required</AlertTitle>
          <AlertDescription>
            Your latest blood pressure reading is slightly elevated. Please review the recommendations below.
          </AlertDescription>
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => setShowAlert(false)}>
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="current">Current Risks</TabsTrigger>
          <TabsTrigger value="guidelines">Guidelines Checker</TabsTrigger>
          <TabsTrigger value="history">Risk History</TabsTrigger>
        </TabsList>

        <TabsContent value="guidelines" className="space-y-4">
        {/* Risk Monitoring Status */}
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-slate-800">Risk Monitoring Status</CardTitle>
                <Button variant="ghost" size="sm" className="h-8 gap-1">
                  <span className="text-xs">View All</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>Recommended vs. actual care</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Weekly blood pressure monitoring</span>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">COMPLETED</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                  <span className="text-sm">Ultrasound scan at 32 weeks</span>
                </div>
                <Badge className="bg-red-100 text-red-700 hover:bg-red-100">MISSED</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-sm">Gestational diabetes test</span>
                </div>
                <Badge className="bg-green-100 text-green-700 hover:bg-green-100">COMPLETED</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-slate-500" />
                  <span className="text-sm">Placenta position check</span>
                </div>
                <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">PENDING</Badge>
              </div>
            </CardContent>
          </Card>
          {/*<Card>
            <CardHeader>
              <CardTitle>Guidelines Compliance</CardTitle>
              <CardDescription>Comparing your care against evidence-based guidelines</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p>Regular prenatal visits</p>
                  </div>
                  <span className="text-sm text-green-500">Compliant</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p>Gestational diabetes screening</p>
                  </div>
                  <span className="text-sm text-green-500">Compliant</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <p>Blood pressure monitoring frequency</p>
                  </div>
                  <span className="text-sm text-amber-500">Needs Improvement</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <p>Fetal growth assessment</p>
                  </div>
                  <span className="text-sm text-green-500">Compliant</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    <p>Anemia screening</p>
                  </div>
                  <span className="text-sm text-blue-500">Due Soon</span>
                </div>
                <Button
                  className="w-full mt-4"
                  onClick={() => {
                    toast({
                      title: "Guidelines Report",
                      description: "A detailed guidelines compliance report has been generated.",
                    })
                  }}
                >
                  Generate Detailed Report
                </Button>
              </div>
            </CardContent>
          </Card>*/}
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Risk Factors</CardTitle>
                <CardDescription>Your current pregnancy risk factors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <div>
                      <p className="font-medium">Elevated Blood Pressure</p>
                      <p className="text-sm text-muted-foreground">
                        Latest reading: {bloodPressure.systolic}/{bloodPressure.diastolic} mmHg
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="font-medium">Family History of Gestational Diabetes</p>
                      <p className="text-sm text-muted-foreground">Monitoring glucose levels regularly</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="font-medium">Normal Fetal Growth</p>
                      <p className="text-sm text-muted-foreground">Last ultrasound showed normal development</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
                <CardDescription>Steps to address your current risk factors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Monitor Blood Pressure Daily</p>
                    <p className="text-sm text-muted-foreground">Record readings in the morning and evening</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowUpdateDialog(true)}>
                      Log Blood Pressure
                    </Button>
                  </div>
                  <div>
                    <p className="font-medium">Reduce Sodium Intake</p>
                    <p className="text-sm text-muted-foreground">Limit processed foods and added salt</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Diet Recommendations",
                          description: "Recommendations for reducing sodium have been sent to your email.",
                        })
                      }}
                    >
                      View Diet Recommendations
                    </Button>
                  </div>
                  <div>
                    <p className="font-medium">Schedule Follow-up Appointment</p>
                    <p className="text-sm text-muted-foreground">Consult with your healthcare provider within 1 week</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Appointment Scheduler",
                          description: "Opening appointment scheduler...",
                        })
                      }}
                    >
                      Schedule Appointment
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment History</CardTitle>
              <CardDescription>Changes in your risk profile over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                      <span className="text-sm font-medium">28w</span>
                    </div>
                    <div className="h-full w-px bg-border"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Risk Level: Low to Moderate</p>
                    <p className="text-sm text-muted-foreground">
                      Elevated blood pressure detected. Increased monitoring recommended.
                    </p>
                    <p className="text-xs text-muted-foreground">2 days ago</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Assessment Details",
                          description: "Viewing detailed assessment from 2 days ago.",
                        })
                      }}
                    >
                      View Details
                    </Button>
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
                    <p className="text-sm font-medium leading-none">Risk Level: Low</p>
                    <p className="text-sm text-muted-foreground">
                      All parameters within normal range. Continue regular monitoring.
                    </p>
                    <p className="text-xs text-muted-foreground">4 weeks ago</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Assessment Details",
                          description: "Viewing detailed assessment from 4 weeks ago.",
                        })
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-4 flex flex-col items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                      <span className="text-sm font-medium">20w</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Risk Level: Low</p>
                    <p className="text-sm text-muted-foreground">
                      Anatomy scan completed. No structural abnormalities detected.
                    </p>
                    <p className="text-xs text-muted-foreground">8 weeks ago</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        toast({
                          title: "Assessment Details",
                          description: "Viewing detailed assessment from 8 weeks ago.",
                        })
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showUpdateDialog} onOpenChange={setShowUpdateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Health Data</DialogTitle>
            <DialogDescription>Enter your latest health measurements below.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="systolic">Systolic (mmHg)</Label>
                <Input
                  id="systolic"
                  value={bloodPressure.systolic}
                  onChange={(e) => setBloodPressure({ ...bloodPressure, systolic: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                <Input
                  id="diastolic"
                  value={bloodPressure.diastolic}
                  onChange={(e) => setBloodPressure({ ...bloodPressure, diastolic: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" defaultValue="64.3" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="glucose">Blood Glucose (mg/dL)</Label>
              <Input id="glucose" defaultValue="95" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowUpdateDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateHealth}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

