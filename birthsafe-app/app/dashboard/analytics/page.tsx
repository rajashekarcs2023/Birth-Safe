"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Calendar, Download, Filter, Info } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Sample data for charts
const weightData = [
  { week: "Week 20", weight: 60.2, average: 59.5 },
  { week: "Week 21", weight: 60.8, average: 60.1 },
  { week: "Week 22", weight: 61.3, average: 60.7 },
  { week: "Week 23", weight: 61.9, average: 61.3 },
  { week: "Week 24", weight: 62.5, average: 61.9 },
  { week: "Week 25", weight: 63.1, average: 62.5 },
  { week: "Week 26", weight: 63.8, average: 63.1 },
  { week: "Week 27", weight: 64.3, average: 63.7 },
  { week: "Week 28", weight: 64.9, average: 64.3 },
]

const bloodPressureData = [
  { week: "Week 20", systolic: 110, diastolic: 70, avgSystolic: 112, avgDiastolic: 72 },
  { week: "Week 21", systolic: 112, diastolic: 72, avgSystolic: 112, avgDiastolic: 72 },
  { week: "Week 22", systolic: 110, diastolic: 70, avgSystolic: 113, avgDiastolic: 73 },
  { week: "Week 23", systolic: 114, diastolic: 74, avgSystolic: 113, avgDiastolic: 73 },
  { week: "Week 24", systolic: 116, diastolic: 76, avgSystolic: 114, avgDiastolic: 74 },
  { week: "Week 25", systolic: 118, diastolic: 78, avgSystolic: 114, avgDiastolic: 74 },
  { week: "Week 26", systolic: 120, diastolic: 80, avgSystolic: 115, avgDiastolic: 75 },
  { week: "Week 27", systolic: 122, diastolic: 82, avgSystolic: 115, avgDiastolic: 75 },
  { week: "Week 28", systolic: 125, diastolic: 85, avgSystolic: 116, avgDiastolic: 76 },
]

const nutritionData = [
  { name: "Protein", value: 25, recommended: 30 },
  { name: "Carbs", value: 45, recommended: 40 },
  { name: "Fats", value: 20, recommended: 25 },
  { name: "Fiber", value: 10, recommended: 15 },
]

const symptomsData = [
  { date: "May 1", nausea: 3, fatigue: 4, backPain: 2, headache: 1 },
  { date: "May 2", nausea: 2, fatigue: 3, backPain: 2, headache: 0 },
  { date: "May 3", nausea: 1, fatigue: 3, backPain: 3, headache: 2 },
  { date: "May 4", nausea: 1, fatigue: 2, backPain: 3, headache: 1 },
  { date: "May 5", nausea: 0, fatigue: 2, backPain: 4, headache: 2 },
  { date: "May 6", nausea: 0, fatigue: 1, backPain: 4, headache: 1 },
  { date: "May 7", nausea: 0, fatigue: 1, backPain: 3, headache: 0 },
]

const riskFactorsData = [
  { subject: "Blood Pressure", A: 80, fullMark: 150 },
  { subject: "Blood Sugar", A: 60, fullMark: 150 },
  { subject: "Weight Gain", A: 70, fullMark: 150 },
  { subject: "Fetal Growth", A: 90, fullMark: 150 },
  { subject: "Amniotic Fluid", A: 85, fullMark: 150 },
  { subject: "Placenta Health", A: 95, fullMark: 150 },
]

const appointmentData = [
  { name: "Completed", value: 8, color: "#4ade80" },
  { name: "Upcoming", value: 4, color: "#60a5fa" },
  { name: "Missed", value: 1, color: "#f87171" },
]

const COLORS = ["#4ade80", "#60a5fa", "#f87171"]

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("health")
  const [timeRange, setTimeRange] = useState("3m")
  const [showInfoDialog, setShowInfoDialog] = useState(false)
  const [infoContent, setInfoContent] = useState({ title: "", content: "" })
  const { toast } = useToast()

  const showInfo = (title: string, content: string) => {
    setInfoContent({ title, content })
    setShowInfoDialog(true)
  }

  const exportData = (dataType: string) => {
    toast({
      title: "Exporting Data",
      description: `Your ${dataType} data is being exported as CSV.`,
    })
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics & Insights</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last Month</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Week 28</div>
            <p className="text-xs text-muted-foreground">3rd Trimester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weight Gain</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7.2 kg</div>
            <p className="text-xs text-muted-foreground">Within recommended range</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blood Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125/85 mmHg</div>
            <p className="text-xs text-muted-foreground text-amber-500">Slightly elevated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fetal Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">~1.1 kg</div>
            <p className="text-xs text-muted-foreground">Normal for gestational age</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="health">Health Metrics</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="health" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Weight Progression</CardTitle>
                  <CardDescription>Your weight compared to average</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      showInfo(
                        "Weight Progression",
                        "This chart shows your weight progression throughout your pregnancy compared to the average weight for your gestational age. The recommended weight gain depends on your pre-pregnancy BMI. For women with a normal BMI, the recommended total weight gain is 25-35 pounds (11.5-16 kg).",
                      )
                    }
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => exportData("weight")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weightData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis unit="kg" />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} name="Your Weight" />
                    <Line
                      type="monotone"
                      dataKey="average"
                      stroke="#82ca9d"
                      strokeDasharray="5 5"
                      name="Average Weight"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Blood Pressure</CardTitle>
                  <CardDescription>Systolic and diastolic readings</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      showInfo(
                        "Blood Pressure",
                        "This chart shows your blood pressure readings throughout your pregnancy. Normal blood pressure during pregnancy is around 120/80 mmHg. Readings consistently above 140/90 mmHg may indicate pregnancy-induced hypertension or preeclampsia and should be discussed with your healthcare provider.",
                      )
                    }
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => exportData("blood pressure")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bloodPressureData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis unit="mmHg" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="systolic"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                      name="Your Systolic"
                    />
                    <Line
                      type="monotone"
                      dataKey="diastolic"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                      name="Your Diastolic"
                    />
                    <Line
                      type="monotone"
                      dataKey="avgSystolic"
                      stroke="#8884d8"
                      strokeDasharray="5 5"
                      name="Avg Systolic"
                    />
                    <Line
                      type="monotone"
                      dataKey="avgDiastolic"
                      stroke="#82ca9d"
                      strokeDasharray="5 5"
                      name="Avg Diastolic"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Appointment Adherence</CardTitle>
                <CardDescription>Your appointment history and upcoming schedule</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    showInfo(
                      "Appointment Adherence",
                      "This chart shows your appointment history, including completed, upcoming, and missed appointments. Regular prenatal appointments are crucial for monitoring your health and your baby's development throughout pregnancy.",
                    )
                  }
                >
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => exportData("appointments")}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex justify-center">
              <div className="w-full max-w-md">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={appointmentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {appointmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Macronutrient Distribution</CardTitle>
                  <CardDescription>Your average daily intake</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      showInfo(
                        "Macronutrient Distribution",
                        "This chart shows the distribution of macronutrients (protein, carbohydrates, fats, and fiber) in your diet compared to recommended values. During pregnancy, a balanced diet is essential for your health and your baby's development. Aim for a diet rich in whole grains, lean proteins, healthy fats, and plenty of fruits and vegetables.",
                      )
                    }
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => exportData("nutrition")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={nutritionData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" unit="%" />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Your Intake" fill="#8884d8" />
                    <Bar dataKey="recommended" name="Recommended" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Nutrient Intake</CardTitle>
                  <CardDescription>Key vitamins and minerals</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      showInfo(
                        "Nutrient Intake",
                        "This chart shows your intake of essential vitamins and minerals compared to recommended daily allowances for pregnant women. Key nutrients during pregnancy include folic acid, iron, calcium, vitamin D, and DHA. Your prenatal vitamin helps fill gaps, but getting nutrients from food is ideal when possible.",
                      )
                    }
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => exportData("nutrients")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    outerRadius={90}
                    data={[
                      { nutrient: "Folic Acid", value: 95, fullMark: 100 },
                      { nutrient: "Iron", value: 80, fullMark: 100 },
                      { nutrient: "Calcium", value: 75, fullMark: 100 },
                      { nutrient: "Vitamin D", value: 70, fullMark: 100 },
                      { nutrient: "DHA", value: 65, fullMark: 100 },
                      { nutrient: "Protein", value: 85, fullMark: 100 },
                    ]}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="nutrient" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} unit="%" />
                    <Radar name="Your Intake" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hydration Tracking</CardTitle>
                <CardDescription>Daily water intake</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    showInfo(
                      "Hydration Tracking",
                      "This chart shows your daily water intake. Staying well-hydrated during pregnancy is essential for amniotic fluid levels, preventing constipation, reducing risk of urinary tract infections, and helping your body absorb essential nutrients. Aim for 8-12 cups (64-96 ounces) of water daily.",
                    )
                  }
                >
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => exportData("hydration")}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={[
                    { day: "Mon", intake: 2.1, target: 2.5 },
                    { day: "Tue", intake: 2.3, target: 2.5 },
                    { day: "Wed", intake: 2.6, target: 2.5 },
                    { day: "Thu", intake: 2.4, target: 2.5 },
                    { day: "Fri", intake: 2.2, target: 2.5 },
                    { day: "Sat", intake: 2.7, target: 2.5 },
                    { day: "Sun", intake: 2.5, target: 2.5 },
                  ]}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis unit="L" />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="intake" stroke="#8884d8" fill="#8884d8" name="Water Intake" />
                  <Area
                    type="monotone"
                    dataKey="target"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.3}
                    name="Target"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Symptom Tracking</CardTitle>
                <CardDescription>Severity of common symptoms (0-5 scale)</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    showInfo(
                      "Symptom Tracking",
                      "This chart shows the severity of common pregnancy symptoms you've reported over time on a scale of 0-5 (0 being none, 5 being severe). Tracking symptoms helps identify patterns and allows your healthcare provider to offer appropriate support and interventions when needed.",
                    )
                  }
                >
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => exportData("symptoms")}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={symptomsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="nausea" stroke="#8884d8" name="Nausea" />
                  <Line type="monotone" dataKey="fatigue" stroke="#82ca9d" name="Fatigue" />
                  <Line type="monotone" dataKey="backPain" stroke="#ffc658" name="Back Pain" />
                  <Line type="monotone" dataKey="headache" stroke="#ff8042" name="Headache" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sleep Quality</CardTitle>
                  <CardDescription>Hours of sleep and quality rating</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      showInfo(
                        "Sleep Quality",
                        "This chart shows your reported sleep duration and quality. Good sleep is essential during pregnancy but can become challenging as your pregnancy progresses. Aim for 7-9 hours of sleep per night. If you're struggling with sleep, consider pregnancy pillows, consistent sleep schedules, and relaxation techniques before bed.",
                      )
                    }
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => exportData("sleep")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={[
                      { day: "Mon", hours: 7.5, quality: 3.5 },
                      { day: "Tue", hours: 6.8, quality: 3.0 },
                      { day: "Wed", hours: 7.2, quality: 3.8 },
                      { day: "Thu", hours: 6.5, quality: 2.5 },
                      { day: "Fri", hours: 7.0, quality: 3.2 },
                      { day: "Sat", hours: 8.2, quality: 4.0 },
                      { day: "Sun", hours: 7.8, quality: 3.7 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="hours" fill="#8884d8" name="Sleep Hours" />
                    <Line yAxisId="right" type="monotone" dataKey="quality" stroke="#82ca9d" name="Quality (0-5)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Mood Tracking</CardTitle>
                  <CardDescription>Emotional wellbeing over time</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      showInfo(
                        "Mood Tracking",
                        "This chart tracks your emotional wellbeing throughout your pregnancy. Pregnancy can bring significant mood changes due to hormonal fluctuations, physical discomfort, and anticipation of life changes. While mood swings are normal, persistent feelings of sadness or anxiety should be discussed with your healthcare provider.",
                      )
                    }
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => exportData("mood")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { week: "Week 22", happiness: 4.0, anxiety: 2.5, irritability: 3.0 },
                      { week: "Week 23", happiness: 3.8, anxiety: 2.8, irritability: 3.2 },
                      { week: "Week 24", happiness: 3.5, anxiety: 3.0, irritability: 3.5 },
                      { week: "Week 25", happiness: 3.7, anxiety: 2.7, irritability: 3.3 },
                      { week: "Week 26", happiness: 4.2, anxiety: 2.3, irritability: 2.8 },
                      { week: "Week 27", happiness: 4.0, anxiety: 2.5, irritability: 3.0 },
                      { week: "Week 28", happiness: 3.8, anxiety: 2.9, irritability: 3.1 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="happiness" stroke="#4ade80" name="Happiness (0-5)" />
                    <Line type="monotone" dataKey="anxiety" stroke="#f87171" name="Anxiety (0-5)" />
                    <Line type="monotone" dataKey="irritability" stroke="#fb923c" name="Irritability (0-5)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Risk Factor Analysis</CardTitle>
                  <CardDescription>Current risk assessment</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      showInfo(
                        "Risk Factor Analysis",
                        "This chart shows your current risk assessment across various factors. Lower values indicate higher risk, while higher values indicate lower risk. This analysis helps identify areas that may need additional monitoring or intervention. Regular prenatal care is essential for managing these risk factors effectively.",
                      )
                    }
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => exportData("risk factors")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart outerRadius={90} data={riskFactorsData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Risk Assessment" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Risk Trend Analysis</CardTitle>
                  <CardDescription>Changes in risk factors over time</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      showInfo(
                        "Risk Trend Analysis",
                        "This chart shows how your risk factors have changed over time. Tracking these trends helps identify whether interventions are working or if additional measures are needed. Discuss any concerning trends with your healthcare provider promptly.",
                      )
                    }
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => exportData("risk trends")}>
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={[
                      { week: "Week 20", bloodPressure: 85, bloodSugar: 90, weightGain: 88 },
                      { week: "Week 22", bloodPressure: 83, bloodSugar: 88, weightGain: 85 },
                      { week: "Week 24", bloodPressure: 80, bloodSugar: 85, weightGain: 80 },
                      { week: "Week 26", bloodPressure: 78, bloodSugar: 75, weightGain: 75 },
                      { week: "Week 28", bloodPressure: 75, bloodSugar: 70, weightGain: 70 },
                    ]}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="bloodPressure" stroke="#8884d8" name="Blood Pressure Risk" />
                    <Line type="monotone" dataKey="bloodSugar" stroke="#82ca9d" name="Blood Sugar Risk" />
                    <Line type="monotone" dataKey="weightGain" stroke="#ffc658" name="Weight Gain Risk" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Guideline Compliance</CardTitle>
                <CardDescription>Adherence to recommended care guidelines</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    showInfo(
                      "Guideline Compliance",
                      "This chart shows your adherence to recommended prenatal care guidelines. Following these guidelines ensures you receive appropriate screening, monitoring, and interventions at the right times during your pregnancy. High compliance is associated with better pregnancy outcomes.",
                    )
                  }
                >
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => exportData("guideline compliance")}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={[
                    { name: "Prenatal Visits", compliance: 100 },
                    { name: "Screenings", compliance: 90 },
                    { name: "Vaccinations", compliance: 100 },
                    { name: "Nutrition", compliance: 85 },
                    { name: "Exercise", compliance: 70 },
                    { name: "Monitoring", compliance: 95 },
                  ]}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit="%" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="compliance" name="Compliance Rate" fill="#8884d8">
                    {[
                      { name: "Prenatal Visits", compliance: 100 },
                      { name: "Screenings", compliance: 90 },
                      { name: "Vaccinations", compliance: 100 },
                      { name: "Nutrition", compliance: 85 },
                      { name: "Exercise", compliance: 70 },
                      { name: "Monitoring", compliance: 95 },
                    ].map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.compliance >= 90 ? "#4ade80" : entry.compliance >= 70 ? "#fb923c" : "#f87171"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
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
    </div>
  )
}

