import { AlertTriangle, Users, Info, ArrowRight, FileText, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function PatternAnalysis() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800">Pattern Analysis</CardTitle>
            <CardDescription>Systemic issues identified from anonymized data</CardDescription>
          </div>
          <Badge className="bg-amber-100 text-amber-700">New Pattern</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-3">
          <div className="flex gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-amber-800 font-medium">Missed 32-week scans</p>
              <p className="text-xs text-amber-700 mt-1">
                15 patients with high-risk pregnancies reported missing recommended 32-week ultrasound scans at Oxford
                University Hospitals.
              </p>
            </div>
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

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Potential Causes</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Scheduling system error for high-risk patients</p>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Staff shortage in ultrasound department</p>
            </div>
            <div className="flex items-start gap-2">
              <ArrowRight className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Protocol change not aligned with guidelines</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Facility Comparison</h3>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm">Oxford University Hospital</span>
              <span className="text-sm text-slate-500">68%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "68%" }}></div>
            </div>
            <p className="text-xs text-slate-500 mt-1">Guideline compliance for high-risk pregnancies</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Actions Taken</p>
              <p className="text-xs text-blue-700 mt-1">
                This pattern has been reported to the Patient Safety Team at Oxford University Hospitals and the Care
                Quality Commission.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full gap-2">
          <Users className="h-4 w-4" />
          Connect with Similar Experiences
        </Button>
        <Button variant="outline" className="w-full gap-2">
          <FileText className="h-4 w-4" />
          Report Your Experience
        </Button>
        <Button variant="outline" className="w-full gap-2">
          <ExternalLink className="h-4 w-4" />
          View Full Analysis
        </Button>
      </CardFooter>
    </Card>
  )
}

