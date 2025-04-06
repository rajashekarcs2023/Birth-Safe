"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  AlertTriangle,
  CheckCircle,
  Pill,
  Activity,
  Scissors,
  WormIcon as Virus,
  Info,
  Download,
  Filter,
  Calendar,
  X,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AIMonitoringPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [timeRange, setTimeRange] = useState("7d")
  const [showAlerts, setShowAlerts] = useState(true)
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [infoContent, setInfoContent] = useState({ title: "", content: "" })
  const [showAlertDetails, setShowAlertDetails] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState<any>(null)
  const { toast } = useToast()

  const showInfo = (title: string, content: string) => {
    setInfoContent({ title, content })
    setShowInfoDialog(true)
  }

  const viewAlertDetails = (alert: any) => {
    setSelectedAlert(alert)
    setShowAlertDetails(true)
  }

  const dismissAlert = (id: number) => {
    toast({
      title: "Alert Dismissed",
      description: "The alert has been dismissed and will be logged.",
    })
  }

  const exportData = (dataType: string) => {
    toast({
      title: "Exporting Data",
      description: `Your ${dataType} data is being exported as CSV.`,
    })
  }

  // Sample data for alerts
  const recentAlerts = [
    {
      id: 1,
      category: "Diagnostic Error",
      title: "Potential Missed Diagnosis",
      description: "AI detected patterns consistent with preeclampsia that may have been overlooked.",
      severity: "high",
      timestamp: "2 hours ago",
      recommendations: [
        "Review blood pressure readings from the past 2 weeks",
        "Check for protein in urine",
        "Evaluate for headaches, visual changes, or upper abdominal pain",
        "Consider consultation with maternal-fetal medicine specialist",
      ],
    },
    {
      id: 2,
      category: "Medication",
      title: "Medication Dosage Alert",
      description: "Prescribed iron supplement dosage exceeds recommended guidelines for gestational age.",
      severity: "medium",
      timestamp: "5 hours ago",
      recommendations: [
        "Review current iron supplement dosage",
        "Check recent hemoglobin and ferritin levels",
        "Consider reducing dosage to 60mg elemental iron daily",
        "Monitor for gastrointestinal side effects",
      ],
    },
    {
      id: 3,
      category: "Patient Care",
      title: "VTE Risk Detected",
      description: "Multiple risk factors for venous thromboembolism identified.",
      severity: "medium",
      timestamp: "1 day ago",
      recommendations: [
        "Evaluate for additional VTE risk factors",
        "Consider prophylactic anticoagulation",
        "Recommend compression stockings",
        "Educate patient on signs/symptoms of DVT and PE",
      ],
    },
  ]

  // Sample data for charts
  const diagnosticAccuracyData = [
    { month: "Jan", accuracy: 92 },
    { month: "Feb", accuracy: 93 },
    { month: "Mar", accuracy: 94 },
    { month: "Apr", accuracy: 95 },
    { month: "May", accuracy: 97 },
  ]

  const alertsByCategory = [
    { name: "Diagnostic Error", value: 35, color: "#3b82f6" },
    { name: "Medication", value: 44, color: "#8b5cf6" },
    { name: "Patient Care", value: 23, color: "#10b981" },
    { name: "Procedure/Surgery", value: 22, color: "#f59e0b" },
    { name: "Infection", value: 11, color: "#ef4444" },
  ]

  const interventionOutcomesData = [
    { month: "Jan", success: 78, neutral: 15, negative: 7 },
    { month: "Feb", success: 80, neutral: 14, negative: 6 },
    { month: "Mar", success: 83, neutral: 12, negative: 5 },
    { month: "Apr", success: 85, neutral: 11, negative: 4 },
    { month: "May", success: 88, neutral: 9, negative: 3 },
  ]

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">AI Monitoring & Early Intervention</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {showAlerts && recentAlerts.length > 0 && (
        <Alert variant="destructive" className="bg-red-50 dark:bg-red-950 border-red-300 dark:border-red-800">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle className="flex items-center gap-2">
            Active Alerts Requiring Attention
            <Badge variant="destructive" className="ml-2">
              {recentAlerts.length}
            </Badge>
          </AlertTitle>
          <AlertDescription>
            AI has detected potential issues that require review. Please check the alerts below.
          </AlertDescription>
          <Button variant="ghost" size="icon" className="absolute right-2 top-2" onClick={() => setShowAlerts(false)}>
            <X className="h-4 w-4" />
          </Button>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Diagnostic Monitoring</CardTitle>
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-1">
              <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">97% Accuracy</div>
            <p className="text-xs text-muted-foreground">1 potential missed diagnosis</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medication Safety</CardTitle>
            <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-1">
              <Pill className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 Dosage Alert</div>
            <p className="text-xs text-muted-foreground">Iron supplement dosage review</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patient Care</CardTitle>
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-1">
              <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">VTE Risk Alert</div>
            <p className="text-xs text-muted-foreground">Multiple risk factors detected</p>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Procedure Safety</CardTitle>
            <div className="rounded-full bg-amber-100 dark:bg-amber-900 p-1">
              <Scissors className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">No Alerts</div>
            <p className="text-xs text-muted-foreground">All procedures within guidelines</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="diagnostic">Diagnostic Error</TabsTrigger>
          <TabsTrigger value="medication">Medication</TabsTrigger>
          <TabsTrigger value="patient-care">Patient Care</TabsTrigger>
          <TabsTrigger value="procedure">Procedure/Surgery</TabsTrigger>
          <TabsTrigger value="infection">Infection</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>AI-detected issues requiring attention</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    showInfo(
                      "AI Alert System",
                      "The AI monitoring system continuously analyzes your health data and compares it against evidence-based guidelines. When potential issues are detected, alerts are generated with specific recommendations for action. Each alert is categorized by type and severity to help prioritize responses.",
                    )
                  }
                >
                  <Info className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className={`rounded-lg border p-4 ${
                        alert.severity === "high"
                          ? "border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950"
                          : alert.severity === "medium"
                            ? "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950"
                            : "border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div
                            className={`rounded-full p-1 mr-2 ${
                              alert.category === "Diagnostic Error"
                                ? "bg-blue-100 dark:bg-blue-900"
                                : alert.category === "Medication"
                                  ? "bg-purple-100 dark:bg-purple-900"
                                  : alert.category === "Patient Care"
                                    ? "bg-green-100 dark:bg-green-900"
                                    : alert.category === "Procedure/Surgery"
                                      ? "bg-amber-100 dark:bg-amber-900"
                                      : "bg-red-100 dark:bg-red-900"
                            }`}
                          >
                            {alert.category === "Diagnostic Error" && (
                              <AlertTriangle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            )}
                            {alert.category === "Medication" && (
                              <Pill className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            )}
                            {alert.category === "Patient Care" && (
                              <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                            )}
                            {alert.category === "Procedure/Surgery" && (
                              <Scissors className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                            )}
                            {alert.category === "Infection" && (
                              <Virus className="h-4 w-4 text-red-600 dark:text-red-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium">{alert.title}</h3>
                            <p className="text-xs text-muted-foreground">
                              {alert.category} • {alert.timestamp}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant={
                            alert.severity === "high"
                              ? "destructive"
                              : alert.severity === "medium"
                                ? "default"
                                : "outline"
                          }
                        >
                          {alert.severity === "high" ? "High" : alert.severity === "medium" ? "Medium" : "Low"} Priority
                        </Badge>
                      </div>
                      <p className="text-sm mt-2">{alert.description}</p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" onClick={() => viewAlertDetails(alert)}>
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => dismissAlert(alert.id)}>
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alerts by Category</CardTitle>
                <CardDescription>Distribution of detected issues</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={alertsByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {alertsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Diagnostic Accuracy Trend</CardTitle>
                  <CardDescription>AI diagnostic accuracy over time</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => exportData("diagnostic accuracy")}>
                  <Download className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={diagnosticAccuracyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[80, 100]} unit="%" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                      name="Diagnostic Accuracy"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Intervention Outcomes</CardTitle>
                  <CardDescription>Results of AI-recommended interventions</CardDescription>
                </div>
                <Button variant="ghost" size="icon" onClick={() => exportData("intervention outcomes")}>
                  <Download className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={interventionOutcomesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis unit="%" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="success" name="Positive Outcome" fill="#10b981" />
                    <Bar dataKey="neutral" name="Neutral Outcome" fill="#f59e0b" />
                    <Bar dataKey="negative" name="Negative Outcome" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="diagnostic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Diagnostic Error Monitoring</CardTitle>
              <CardDescription>AI-powered detection of missed, delayed, or incorrect diagnoses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Missed Diagnoses</p>
                      <Badge variant="outline">1 Alert</Badge>
                    </div>
                    <Progress value={5} className="h-2" />
                    <p className="text-xs text-muted-foreground">5% of potential diagnoses flagged</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Delayed Diagnoses</p>
                      <Badge variant="outline">0 Alerts</Badge>
                    </div>
                    <Progress value={2} className="h-2" />
                    <p className="text-xs text-muted-foreground">2% of diagnoses flagged as delayed</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Incorrect Diagnoses</p>
                      <Badge variant="outline">0 Alerts</Badge>
                    </div>
                    <Progress value={1} className="h-2" />
                    <p className="text-xs text-muted-foreground">1% of diagnoses flagged for review</p>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <h3 className="font-medium">Potential Missed Diagnosis: Preeclampsia</h3>
                    </div>
                    <Badge variant="destructive">High Priority</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    AI has detected patterns consistent with preeclampsia that may have been overlooked. Recent blood
                    pressure readings show an upward trend, and protein has been detected in urine samples.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">AI Recommendations:</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                      <li>Review blood pressure readings from the past 2 weeks</li>
                      <li>Check for protein in urine</li>
                      <li>Evaluate for headaches, visual changes, or upper abdominal pain</li>
                      <li>Consider consultation with maternal-fetal medicine specialist</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button>Implement Recommendations</Button>
                    <Button variant="outline">Dismiss Alert</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">How Diagnostic Error Detection Works</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI system continuously analyzes patient data, symptoms, test results, and medical history to
                    identify potential diagnostic errors. It compares clinical patterns against evidence-based
                    guidelines and uses machine learning algorithms trained on millions of patient cases to detect
                    subtle signs that might be missed.
                  </p>
                  <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Pattern Recognition</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Identifies symptom clusters and correlations that may indicate overlooked conditions based on
                        historical data.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Guideline Comparison</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Compares patient care against evidence-based clinical guidelines to identify potential gaps in
                        diagnosis.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Risk Stratification</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Prioritizes alerts based on potential severity and impact on maternal and fetal outcomes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Medication Error Prevention</CardTitle>
              <CardDescription>AI monitoring for medication safety and adverse events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Wrong Drug</p>
                      <Badge variant="outline">0 Alerts</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Wrong Dose</p>
                      <Badge variant="outline">1 Alert</Badge>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Wrong Route</p>
                      <Badge variant="outline">0 Alerts</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Wrong Timing</p>
                      <Badge variant="outline">0 Alerts</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Pill className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                      <h3 className="font-medium">Medication Dosage Alert: Iron Supplement</h3>
                    </div>
                    <Badge>Medium Priority</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Prescribed iron supplement dosage (120mg elemental iron daily) exceeds recommended guidelines for
                    gestational age and current hemoglobin levels. Current hemoglobin is 11.2 g/dL, which indicates mild
                    anemia.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">AI Recommendations:</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                      <li>Review current iron supplement dosage</li>
                      <li>Check recent hemoglobin and ferritin levels</li>
                      <li>Consider reducing dosage to 60mg elemental iron daily</li>
                      <li>Monitor for gastrointestinal side effects</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button>Implement Recommendations</Button>
                    <Button variant="outline">Dismiss Alert</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Medication Monitoring Features</h3>
                  <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Medication Reconciliation</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Automatically cross-checks all medications for potential interactions, contraindications, and
                        appropriate dosing for pregnancy.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Adverse Event Detection</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monitors for signs of medication-related adverse events including delirium, hypoglycemia, and
                        acute kidney injury.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Pregnancy-Specific Safety</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Evaluates all medications against pregnancy safety databases and FDA pregnancy categories.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Current Medication List</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Prenatal Vitamin</p>
                        <p className="text-xs text-muted-foreground">1 tablet daily</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      >
                        Safe
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Iron Supplement</p>
                        <p className="text-xs text-muted-foreground">120mg elemental iron daily</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                      >
                        Dosage Alert
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Vitamin D</p>
                        <p className="text-xs text-muted-foreground">2000 IU daily</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      >
                        Safe
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="patient-care" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Patient Care Monitoring</CardTitle>
              <CardDescription>Tracking for pressure injuries, blood clots, and falls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Pressure Injury Risk</p>
                      <Badge variant="outline">Low</Badge>
                    </div>
                    <Progress value={15} className="h-2" />
                    <p className="text-xs text-muted-foreground">15% risk based on current factors</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">VTE/PE Risk</p>
                      <Badge variant="outline">Medium</Badge>
                    </div>
                    <Progress value={45} className="h-2" />
                    <p className="text-xs text-muted-foreground">45% risk based on current factors</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Fall Risk</p>
                      <Badge variant="outline">Low</Badge>
                    </div>
                    <Progress value={20} className="h-2" />
                    <p className="text-xs text-muted-foreground">20% risk based on current factors</p>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Activity className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                      <h3 className="font-medium">VTE Risk Alert</h3>
                    </div>
                    <Badge>Medium Priority</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Multiple risk factors for venous thromboembolism (VTE) have been identified, including reduced
                    mobility in third trimester, family history of clotting disorders, and BMI &gt; 30.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium">AI Recommendations:</h4>
                    <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                      <li>Evaluate for additional VTE risk factors</li>
                      <li>Consider prophylactic anticoagulation</li>
                      <li>Recommend compression stockings</li>
                      <li>Educate patient on signs/symptoms of DVT and PE</li>
                    </ul>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button>Implement Recommendations</Button>
                    <Button variant="outline">Dismiss Alert</Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Patient Care Monitoring Features</h3>
                  <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">VTE Risk Assessment</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Continuously evaluates risk factors for venous thromboembolism and pulmonary embolism using
                        validated risk assessment models.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Pressure Injury Prevention</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monitors mobility, position changes, and tissue perfusion to prevent pressure injuries during
                        extended bed rest.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Fall Prevention</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Assesses balance, medication side effects, and environmental factors to reduce fall risk during
                        pregnancy.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">VTE Risk Factors Identified</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-500 mr-2" />
                      <p className="text-sm">Reduced mobility in third trimester</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-500 mr-2" />
                      <p className="text-sm">Family history of clotting disorders</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-red-500 mr-2" />
                      <p className="text-sm">BMI > 30</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">No history of previous VTE (protective factor)</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">No known thrombophilia (protective factor)</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="procedure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Procedure/Surgery Safety</CardTitle>
              <CardDescription>Monitoring for procedure-related complications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Bleeding Risk</p>
                      <Badge variant="outline">Low</Badge>
                    </div>
                    <Progress value={10} className="h-2" />
                    <p className="text-xs text-muted-foreground">10% risk based on current factors</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Infection Risk</p>
                      <Badge variant="outline">Low</Badge>
                    </div>
                    <Progress value={15} className="h-2" />
                    <p className="text-xs text-muted-foreground">15% risk based on current factors</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Anesthesia Risk</p>
                      <Badge variant="outline">Low</Badge>
                    </div>
                    <Progress value={12} className="h-2" />
                    <p className="text-xs text-muted-foreground">12% risk based on current factors</p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Upcoming Procedures</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Amniocentesis</p>
                        <p className="text-xs text-muted-foreground">Scheduled for May 15, 2023</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                        >
                          Low Risk
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Procedure Safety Monitoring</h3>
                  <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Pre-Procedure Risk Assessment</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Evaluates patient-specific risk factors before procedures to identify potential complications
                        and recommend preventive measures.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Complication Detection</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monitors for early signs of procedure-related complications such as excessive bleeding,
                        infection, or adverse reactions.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Recovery Tracking</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Tracks post-procedure recovery metrics against expected timelines to identify delayed healing or
                        complications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Procedure Safety Checklist</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Pre-procedure consent obtained and documented</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Allergy and medication review completed</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Fasting guidelines confirmed</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Site marking verified (if applicable)</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      <p className="text-sm">Equipment and supplies checked</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Infection Monitoring</CardTitle>
              <CardDescription>Tracking for respiratory, surgical site, and other infections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Respiratory Infection Risk</p>
                      <Badge variant="outline">Low</Badge>
                    </div>
                    <Progress value={8} className="h-2" />
                    <p className="text-xs text-muted-foreground">8% risk based on current factors</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Urinary Tract Infection Risk</p>
                      <Badge variant="outline">Low</Badge>
                    </div>
                    <Progress value={12} className="h-2" />
                    <p className="text-xs text-muted-foreground">12% risk based on current factors</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Surgical Site Infection Risk</p>
                      <Badge variant="outline">N/A</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                    <p className="text-xs text-muted-foreground">No recent surgical procedures</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Infection Prevention Measures</h3>
                  <div className="grid gap-4 md:grid-cols-3 mt-4">
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Early Detection</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Monitors vital signs, laboratory values, and reported symptoms to detect early signs of
                        infection.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Risk Stratification</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Identifies patients at higher risk for specific infections based on medical history and current
                        conditions.
                      </p>
                    </div>
                    <div className="rounded-lg border p-3">
                      <h4 className="text-sm font-medium">Preventive Recommendations</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Provides personalized recommendations for infection prevention based on individual risk factors.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Infection Prevention Recommendations</h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      <p className="text-sm">
                        Maintain good hand hygiene, especially before eating and after using the restroom
                      </p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      <p className="text-sm">Stay up-to-date on recommended vaccinations during pregnancy</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      <p className="text-sm">Avoid contact with people who have respiratory infections</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      <p className="text-sm">Practice proper food safety to prevent foodborne illness</p>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2" />
                      <p className="text-sm">Maintain good urinary hygiene to prevent UTIs</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Infection Monitoring Parameters</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Temperature</p>
                        <p className="text-xs text-muted-foreground">Last reading: 98.6°F (37.0°C)</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      >
                        Normal
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">White Blood Cell Count</p>
                        <p className="text-xs text-muted-foreground">Last reading: 10,500/μL</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      >
                        Normal for Pregnancy
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Urinalysis</p>
                        <p className="text-xs text-muted-foreground">Last reading: Normal</p>
                      </div>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                      >
                        Normal
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{infoContent.title}</DialogTitle>
            <DialogDescription>{infoContent.content}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowInfoDialog(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAlertDetails} onOpenChange={setShowAlertDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedAlert?.category === "Diagnostic Error" && (
                <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              )}
              {selectedAlert?.category === "Medication" && (
                <Pill className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              )}
              {selectedAlert?.category === "Patient Care" && (
                <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
              )}
              {selectedAlert?.category === "Procedure/Surgery" && (
                <Scissors className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              )}
              {selectedAlert?.category === "Infection" && <Virus className="h-5 w-5 text-red-600 dark:text-red-400" />}
              {selectedAlert?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedAlert?.category} • {selectedAlert?.timestamp} •
              <Badge
                className="ml-2"
                variant={
                  selectedAlert?.severity === "high"
                    ? "destructive"
                    : selectedAlert?.severity === "medium"
                      ? "default"
                      : "outline"
                }
              >
                {selectedAlert?.severity === "high" ? "High" : selectedAlert?.severity === "medium" ? "Medium" : "Low"}{" "}
                Priority
              </Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Alert Description</h3>
              <p className="text-sm mt-1">{selectedAlert?.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium">AI Analysis</h3>
              <p className="text-sm mt-1">
                This alert was generated based on pattern recognition of clinical data, comparison with evidence-based
                guidelines, and machine learning algorithms trained on similar cases. The AI system has identified this
                as a potential issue requiring clinical attention.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium">Recommendations</h3>
              <ul className="text-sm list-disc pl-5 space-y-1 mt-1">
                {selectedAlert?.recommendations.map((rec: string, index: number) => (
                  <li key={index}>{rec}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium">Supporting Evidence</h3>
              <div className="rounded-lg border p-3 mt-1 text-sm">
                <p>This recommendation is based on clinical guidelines from:</p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>American College of Obstetricians and Gynecologists (ACOG)</li>
                  <li>Society for Maternal-Fetal Medicine (SMFM)</li>
                  <li>Analysis of similar cases in the clinical database</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowAlertDetails(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                setShowAlertDetails(false)
                toast({
                  title: "Recommendations Implemented",
                  description: "The AI recommendations have been added to your care plan.",
                })
              }}
            >
              Implement Recommendations
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

