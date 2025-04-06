"use client"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { OverviewChart } from "@/components/overview-chart"
import { RecentUpdates } from "@/components/recent-updates"

export default function DashboardPage() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">Export Data</Button>
          <Button>Emergency Contact</Button>
        </div>
      </div>

      <Alert variant="destructive" className="bg-red-50 dark:bg-red-950">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important Notice</AlertTitle>
        <AlertDescription>
          BirthSafe is a support tool and does not replace professional medical advice. Always consult your healthcare
          provider for medical decisions.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weeks Pregnant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{user.weeksPregnant || "Not set"}</div>
            <p className="text-xs text-muted-foreground">
              {user.weeksPregnant && user.weeksPregnant >= 27
                ? "3rd Trimester"
                : user.weeksPregnant && user.weeksPregnant >= 14
                  ? "2nd Trimester"
                  : user.weeksPregnant && user.weeksPregnant > 0
                    ? "1st Trimester"
                    : ""}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{user.riskLevel || "Not assessed"}</div>
            <p className="text-xs text-muted-foreground">Based on current data</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {user.dueDate ? new Date(user.dueDate).toLocaleDateString() : "Not set"}
            </div>
            <p className="text-xs text-muted-foreground">
              {user.dueDate && new Date(user.dueDate) > new Date()
                ? `${Math.ceil((new Date(user.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining`
                : ""}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Review required</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="updates" className="space-y-4">
        <TabsList>
          {/*<TabsTrigger value="overview">Overview</TabsTrigger>*/}
          <TabsTrigger value="updates">Recent Updates</TabsTrigger>
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
        </TabsList>
        {/*<TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Health Metrics</CardTitle>
                <CardDescription>Your health data over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Things to do for your pregnancy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Complete glucose screening test</p>
                      <p className="text-sm text-muted-foreground">Due in 3 days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Schedule 30-week checkup</p>
                      <p className="text-sm text-muted-foreground">Due in 5 days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Complete birth plan</p>
                      <p className="text-sm text-muted-foreground">Due in 14 days</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>*/}
        <TabsContent value="updates" className="space-y-4">
          <RecentUpdates />
        </TabsContent>
        <TabsContent value="appointments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
              <CardDescription>Your scheduled medical appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Dr. Sarah Smith - OB/GYN</p>
                    <p className="text-sm text-muted-foreground">Regular checkup</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">May 15, 2023</p>
                    <p className="text-sm text-muted-foreground">2:30 PM</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">Dr. James Wilson - Ultrasound</p>
                    <p className="text-sm text-muted-foreground">Growth scan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">May 22, 2023</p>
                    <p className="text-sm text-muted-foreground">10:00 AM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

