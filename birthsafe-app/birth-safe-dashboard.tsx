import { Bell, Calendar, CheckCircle, Clock, FileText, Home, Info, User, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function BirthSafeDashboard() {
  return (
    <div className="flex flex-col h-screen bg-slate-50">
      {/* Status Bar */}
      <div className="bg-amber-50 p-4 border-b border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span className="font-medium text-amber-700">ATTENTION NEEDED</span>
          </div>
          <Bell className="h-5 w-5 text-slate-600" />
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
        {/* Risk Monitoring Status */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-800">Risk Monitoring Status</CardTitle>
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

        {/* Safety Alerts */}
        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-800 flex items-center gap-2">
              <Info className="h-5 w-5" />
              Your Safety Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-700">
              Based on your placenta position, clinical guidelines recommend an additional ultrasound scan at 32 weeks.
              This scan appears to be missing from your care plan.
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">Discuss with your provider</Button>
          </CardFooter>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <Tabs defaultValue="dashboard" className="w-full border-t bg-white">
        <TabsList className="w-full h-16 bg-white">
          <TabsTrigger
            value="dashboard"
            className="flex-1 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700"
          >
            <div className="flex flex-col items-center gap-1">
              <Home className="h-5 w-5" />
              <span className="text-xs">Dashboard</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex-1">
            <div className="flex flex-col items-center gap-1">
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Timeline</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex-1">
            <div className="flex flex-col items-center gap-1">
              <FileText className="h-5 w-5" />
              <span className="text-xs">Journal</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex-1">
            <div className="flex flex-col items-center gap-1">
              <Info className="h-5 w-5" />
              <span className="text-xs">Resources</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex-1">
            <div className="flex flex-col items-center gap-1">
              <User className="h-5 w-5" />
              <span className="text-xs">Profile</span>
            </div>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

