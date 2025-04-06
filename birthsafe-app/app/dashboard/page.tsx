"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Bell,
  Info,
  AlertTriangle,
  Shield,
  Activity,
  Pill,
  CheckCircle,
  Clock,
  Book,
  FileX,
  CheckSquare,
  MessageCircle,
  LineChart,
  MessageSquare,
  Heart,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/contexts/language-context"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const { t } = useLanguage()
  const [showNotifications, setShowNotifications] = useState(false)
  const [completedTasks, setCompletedTasks] = useState<string[]>([
    "blood-pressure-week-30",
    "iron-levels-week-28",
    "glucose-test-week-26",
  ])

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks((prev) => (prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]))
  }

  const handleEmergencyHelp = () => {
    router.push("/emergency")
  }

  const clinicalTasks = [
    {
      id: "blood-pressure-week-30",
      title: "Blood pressure check",
      timing: "Week 30",
      importance: "high",
    },
    {
      id: "ultrasound-week-32",
      title: "Ultrasound scan",
      timing: "Week 32",
      importance: "critical",
    },
    {
      id: "iron-levels-week-28",
      title: "Iron levels test",
      timing: "Week 28",
      importance: "medium",
    },
    {
      id: "glucose-test-week-26",
      title: "Glucose tolerance test",
      timing: "Week 26",
      importance: "high",
    },
    {
      id: "growth-scan-week-34",
      title: "Fetal growth scan",
      timing: "Week 34",
      importance: "high",
    },
  ]

  const getTaskIcon = (taskId: string) => {
    if (completedTasks.includes(taskId)) {
      return <CheckCircle className="h-5 w-5 text-green-500" />
    }
    if (taskId === "ultrasound-week-32") {
      return <AlertTriangle className="h-5 w-5 text-red-500" />
    }
    return <Clock className="h-5 w-5 text-slate-500" />
  }

  const getTaskBadge = (taskId: string, importance: string) => {
    if (completedTasks.includes(taskId)) {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">COMPLETED</Badge>
    }
    if (importance === "critical") {
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">URGENT</Badge>
    }
    return <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-100">PENDING</Badge>
  }

  const calculateProgress = () => {
    return (completedTasks.length / clinicalTasks.length) * 100
  }

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Status Bar */}
      <div className="bg-amber-50 p-4 border-b border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span className="font-medium text-amber-700">ATTENTION NEEDED</span>
          </div>
          <div className="relative">
            <Bell
              className="h-5 w-5 text-slate-600 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-50">
                <div className="p-3 border-b">
                  <h3 className="font-medium">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-3 border-b hover:bg-slate-50">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Missed 32-week scan</p>
                        <p className="text-xs text-slate-500">This scan is recommended for your condition</p>
                        <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-b hover:bg-slate-50">
                    <div className="flex items-start gap-2">
                      <Pill className="h-4 w-4 text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Iron supplement reminder</p>
                        <p className="text-xs text-slate-500">Time to take your daily supplement</p>
                        <p className="text-xs text-slate-400 mt-1">4 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 hover:bg-slate-50">
                    <div className="flex items-start gap-2">
                      <Activity className="h-4 w-4 text-green-500 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Kick count reminder</p>
                        <p className="text-xs text-slate-500">Track your baby's movements today</p>
                        <p className="text-xs text-slate-400 mt-1">Yesterday</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-2 border-t">
                  <Button variant="ghost" size="sm" className="w-full text-xs">
                    View all notifications
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Patient Info */}
      <div className="p-4 bg-white border-b">
        <h1 className="text-xl font-semibold text-slate-800">Sarah Williams</h1>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">
            32 weeks
          </Badge>
          <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200">
            High-risk pregnancy
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {/* 1. Care Safety Score - First Priority */}
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-slate-800">{t("careScore")}</CardTitle>
              <Info className="h-4 w-4 text-slate-400" />
            </div>
            <CardDescription>{t("careScoreDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{t("currentScore")}</span>
                <span className="text-sm font-medium text-amber-600">72%</span>
              </div>
              <Progress value={72} className="h-2.5" />
              <div className="flex justify-between text-xs text-slate-500">
                <span>{t("needsAttention")}</span>
                <span>{t("optimal")}</span>
              </div>
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-md p-3">
                <div className="flex gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-amber-800">{t("missingCareSteps")}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 2. Critical Safety Alert - Second Priority */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              {t("criticalAlert")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-700 mb-3">{t("placentaAlert")}</p>
            <div className="bg-white rounded-md p-3 border border-amber-200 mb-3">
              <h4 className="text-sm font-medium text-amber-800 mb-1">{t("whyThisMatters")}:</h4>
              <p className="text-xs text-amber-700">{t("placentaMonitoring")}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full bg-blue-600 hover:bg-blue-700">{t("takeAction")}</Button>
            <Button variant="outline" className="w-full border-amber-300 bg-white text-amber-800">
              {t("addToBirthPlan")}
            </Button>
          </CardFooter>
        </Card>

        {/* 3. Clinical Tasks for Current Trimester - Third Priority */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-slate-800">{t("clinicalTasks")}</CardTitle>
              <Badge variant="outline" className="text-blue-600">
                {Math.round(calculateProgress())}% Complete
              </Badge>
            </div>
            <CardDescription>{t("clinicalTasksDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {clinicalTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getTaskIcon(task.id)}
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{task.title}</span>
                      <span className="text-xs text-slate-500">({task.timing})</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Checkbox
                        id={task.id}
                        checked={completedTasks.includes(task.id)}
                        onCheckedChange={() => handleTaskToggle(task.id)}
                      />
                      <label htmlFor={task.id} className="text-xs text-slate-500 cursor-pointer">
                        {t("markAsCompleted")}
                      </label>
                    </div>
                  </div>
                </div>
                {getTaskBadge(task.id, task.importance)}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* 4. Quick Actions - Fourth Priority */}
        <h2 className="text-lg font-semibold text-slate-800 mt-6">{t("quickActions")}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {/* 1. Emotional Wellbeing */}
          <Link
            href="/wellbeing"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-pink-100 rounded-full p-2 mb-2">
              <Heart className="h-5 w-5 text-pink-600" />
            </div>
            <span className="text-sm font-medium">Emotional Wellbeing</span>
          </Link>

          {/* 2. Report Symptom */}
          <Link
            href="/symptom-tracker"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-red-100 rounded-full p-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
            </div>
            <span className="text-sm font-medium">Report Symptom</span>
          </Link>

          {/* 3. Medication Check */}
          <Link
            href="/medication"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-blue-100 rounded-full p-2 mb-2">
              <Pill className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Medication Check</span>
          </Link>

          {/* 4. Kick Counter */}
          <Link
            href="/kick-counter"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-green-100 rounded-full p-2 mb-2">
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium">Kick Counter</span>
          </Link>

          {/* 5. Consent Log */}
          <Link
            href="/consent-log"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-purple-100 rounded-full p-2 mb-2">
              <FileX className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium">Consent Log</span>
          </Link>

          {/* 6. Ally Mode */}
          <Link
            href="/ally-mode"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-green-100 rounded-full p-2 mb-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium">Ally Mode</span>
          </Link>

          {/* 7. Reflection Journal */}
          <Link
            href="/reflection-journal"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-pink-100 rounded-full p-2 mb-2">
              <Book className="h-5 w-5 text-pink-600" />
            </div>
            <span className="text-sm font-medium">Reflection Journal</span>
          </Link>

          {/* 8. Postnatal Dignity & Privacy */}
          <Link
            href="/postnatal-dignity"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-purple-100 rounded-full p-2 mb-2">
              <MessageCircle className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium">Postnatal Dignity</span>
          </Link>

          {/* 9. Aftercare Checklist */}
          <Link
            href="/aftercare-checklist"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-green-100 rounded-full p-2 mb-2">
              <CheckSquare className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium">Aftercare Checklist</span>
          </Link>

          {/* 10. Vitals Tracker */}
          <Link
            href="/vitals-tracker"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-blue-100 rounded-full p-2 mb-2">
              <LineChart className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium">Vitals Tracker</span>
          </Link>

          {/* 11. Advocacy Script */}
          <Link
            href="/advocacy-script"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-amber-100 rounded-full p-2 mb-2">
              <MessageSquare className="h-5 w-5 text-amber-600" />
            </div>
            <span className="text-sm font-medium">Advocacy Script</span>
          </Link>

          {/* 12. Grief & Healing */}
          <Link
            href="/grief-healing"
            className="bg-white rounded-lg border p-3 flex flex-col items-center text-center hover:border-blue-300 hover:shadow-sm transition-all"
          >
            <div className="bg-purple-100 rounded-full p-2 mb-2">
              <Heart className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium">Grief & Healing</span>
          </Link>
        </div>

        {/* Emergency Access */}
        <Card className="bg-red-50 border-red-200 mt-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-red-800">{t("emergencyAccess")}</h3>
                <p className="text-sm text-red-700 mt-1">{t("emergencyDesc")}</p>
              </div>
              <Button className="bg-red-600 hover:bg-red-700" onClick={handleEmergencyHelp}>
                {t("emergencyHelp")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

