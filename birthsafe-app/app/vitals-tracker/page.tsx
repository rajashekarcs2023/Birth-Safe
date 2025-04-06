"use client"

import { useState } from "react"
import { LineChart, Heart, Activity, Scale, Droplet, Plus, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function VitalsTrackerPage() {
  const [activeTab, setActiveTab] = useState("blood-pressure")
  const [showAddForm, setShowAddForm] = useState(false)

  // Sample data for the vitals
  const vitalsData = {
    bloodPressure: [
      { date: "Apr 2", value: "120/80", status: "normal" },
      { date: "Mar 28", value: "118/78", status: "normal" },
      { date: "Mar 21", value: "125/82", status: "normal" },
      { date: "Mar 14", value: "130/85", status: "elevated" },
    ],
    weight: [
      { date: "Apr 1", value: "68 kg", change: "+0.5 kg", status: "normal" },
      { date: "Mar 25", value: "67.5 kg", change: "+0.7 kg", status: "normal" },
      { date: "Mar 18", value: "66.8 kg", change: "+0.6 kg", status: "normal" },
      { date: "Mar 11", value: "66.2 kg", change: "+0.5 kg", status: "normal" },
    ],
    heartRate: [
      { date: "Apr 2", value: "78 bpm", status: "normal" },
      { date: "Mar 28", value: "82 bpm", status: "normal" },
      { date: "Mar 21", value: "75 bpm", status: "normal" },
      { date: "Mar 14", value: "80 bpm", status: "normal" },
    ],
    bloodTests: [
      { date: "Mar 15", test: "Hemoglobin", value: "11.2 g/dL", status: "low" },
      { date: "Mar 15", test: "Iron", value: "45 μg/dL", status: "low" },
      { date: "Mar 15", test: "Vitamin D", value: "28 ng/mL", status: "normal" },
      { date: "Mar 15", test: "Glucose", value: "85 mg/dL", status: "normal" },
      { date: "Feb 15", test: "Hemoglobin", value: "11.0 g/dL", status: "low" },
      { date: "Feb 15", test: "Iron", value: "40 μg/dL", status: "low" },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "normal":
        return <Badge className="bg-green-100 text-green-700">Normal</Badge>
      case "elevated":
        return <Badge className="bg-amber-100 text-amber-700">Elevated</Badge>
      case "low":
        return <Badge className="bg-amber-100 text-amber-700">Low</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-700">High</Badge>
      default:
        return <Badge className="bg-slate-100 text-slate-700">Unknown</Badge>
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-3 rounded-full">
          <LineChart className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Vitals Tracker</h1>
          <p className="text-slate-600">Monitor and track your vital signs throughout pregnancy</p>
        </div>
      </div>

      <Tabs defaultValue="blood-pressure" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="blood-pressure">Blood Pressure</TabsTrigger>
          <TabsTrigger value="weight">Weight</TabsTrigger>
          <TabsTrigger value="heart-rate">Heart Rate</TabsTrigger>
          <TabsTrigger value="blood-tests">Blood Tests</TabsTrigger>
        </TabsList>

        {/* Blood Pressure Tab */}
        <TabsContent value="blood-pressure">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    Blood Pressure Log
                  </CardTitle>
                  <CardDescription>Track your blood pressure readings</CardDescription>
                </div>
                <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Reading
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddForm && activeTab === "blood-pressure" && (
                <div className="bg-slate-50 p-4 rounded-md mb-4 border">
                  <h3 className="font-medium mb-3">Add New Blood Pressure Reading</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="systolic">Systolic (mmHg)</Label>
                      <Input id="systolic" type="number" placeholder="120" />
                    </div>
                    <div>
                      <Label htmlFor="diastolic">Diastolic (mmHg)</Label>
                      <Input id="diastolic" type="number" placeholder="80" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button>Save Reading</Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {vitalsData.bloodPressure.map((reading, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <div className="font-medium">{reading.value} mmHg</div>
                      <div className="text-sm text-slate-500">{reading.date}</div>
                    </div>
                    {getStatusBadge(reading.status)}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-blue-50 border-t">
              <div className="flex items-start gap-2 text-sm text-blue-700">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Normal blood pressure during pregnancy is around 120/80 mmHg. Readings above 140/90 mmHg may indicate
                  preeclampsia and should be reported to your healthcare provider immediately.
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Weight Tab */}
        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5 text-blue-500" />
                    Weight Tracker
                  </CardTitle>
                  <CardDescription>Monitor your weight changes during pregnancy</CardDescription>
                </div>
                <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Reading
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddForm && activeTab === "weight" && (
                <div className="bg-slate-50 p-4 rounded-md mb-4 border">
                  <h3 className="font-medium mb-3">Add New Weight Reading</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input id="weight" type="number" step="0.1" placeholder="68.5" />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button>Save Reading</Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {vitalsData.weight.map((reading, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <div className="font-medium">{reading.value}</div>
                      <div className="text-sm text-slate-500">
                        {reading.date} ({reading.change})
                      </div>
                    </div>
                    {getStatusBadge(reading.status)}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-blue-50 border-t">
              <div className="flex items-start gap-2 text-sm text-blue-700">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Healthy weight gain during pregnancy varies based on your pre-pregnancy BMI. For women with a normal
                  BMI, a total gain of 11.5-16 kg (25-35 pounds) is recommended. Consult your provider for personalized
                  guidance.
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Heart Rate Tab */}
        <TabsContent value="heart-rate">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Heart Rate Monitor
                  </CardTitle>
                  <CardDescription>Track your heart rate during pregnancy</CardDescription>
                </div>
                <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Reading
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddForm && activeTab === "heart-rate" && (
                <div className="bg-slate-50 p-4 rounded-md mb-4 border">
                  <h3 className="font-medium mb-3">Add New Heart Rate Reading</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="heartRate">Heart Rate (bpm)</Label>
                      <Input id="heartRate" type="number" placeholder="78" />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button>Save Reading</Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {vitalsData.heartRate.map((reading, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <div className="font-medium">{reading.value}</div>
                      <div className="text-sm text-slate-500">{reading.date}</div>
                    </div>
                    {getStatusBadge(reading.status)}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-blue-50 border-t">
              <div className="flex items-start gap-2 text-sm text-blue-700">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  During pregnancy, your heart rate may increase by 15-20 beats per minute. A normal resting heart rate
                  during pregnancy is typically between 70-90 beats per minute. Report any rapid or irregular heartbeats
                  to your provider.
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Blood Tests Tab */}
        <TabsContent value="blood-tests">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Droplet className="h-5 w-5 text-red-500" />
                    Blood Test Results
                  </CardTitle>
                  <CardDescription>Track your blood test results and nutrient levels</CardDescription>
                </div>
                <Button size="sm" onClick={() => setShowAddForm(!showAddForm)}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Result
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showAddForm && activeTab === "blood-tests" && (
                <div className="bg-slate-50 p-4 rounded-md mb-4 border">
                  <h3 className="font-medium mb-3">Add New Blood Test Result</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="testType">Test Type</Label>
                      <Select>
                        <SelectTrigger id="testType">
                          <SelectValue placeholder="Select test" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hemoglobin">Hemoglobin</SelectItem>
                          <SelectItem value="iron">Iron</SelectItem>
                          <SelectItem value="vitamin-d">Vitamin D</SelectItem>
                          <SelectItem value="glucose">Glucose</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="value">Value</Label>
                      <Input id="value" placeholder="11.2" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="unit">Unit</Label>
                      <Input id="unit" placeholder="g/dL" />
                    </div>
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button>Save Result</Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {vitalsData.bloodTests.map((test, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-3 last:border-0">
                    <div>
                      <div className="font-medium">
                        {test.test}: {test.value}
                      </div>
                      <div className="text-sm text-slate-500">{test.date}</div>
                    </div>
                    {getStatusBadge(test.status)}
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-blue-50 border-t">
              <div className="flex items-start gap-2 text-sm text-blue-700">
                <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  Regular blood tests during pregnancy help monitor for anemia, gestational diabetes, and other
                  conditions. Low iron or hemoglobin levels may require supplementation. Discuss all results with your
                  healthcare provider.
                </p>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

