import { Lock, Shield, CheckCircle, Download, Share2, FileText, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function VerificationRecord() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800">Verified Record</CardTitle>
            <CardDescription>Tamper-proof documentation</CardDescription>
          </div>
          <Badge className="bg-green-100 text-green-700 flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Verified
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-3">
          <div className="flex gap-2">
            <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-green-800 font-medium">Verification Status: Authentic</p>
              <p className="text-xs text-green-700 mt-1">
                This record has been cryptographically verified and cannot be altered
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-xs text-slate-500">Record Type</p>
          <p className="text-sm font-medium">Missed Care: 32-week Ultrasound Scan</p>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-xs text-slate-500">Description</p>
          <p className="text-sm">
            Despite my high-risk pregnancy status due to placenta position, the recommended 32-week ultrasound scan was
            not scheduled. When I inquired about this with my midwife on April 2, 2025, I was told it was "not
            necessary" despite NICE guidelines recommending this scan.
          </p>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-xs text-slate-500">Timestamp</p>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            <p className="text-sm">April 2, 2025 at 14:32:17 GMT</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-1">
          <p className="text-xs text-slate-500">Verification Hash</p>
          <div className="bg-slate-100 p-2 rounded-md">
            <p className="text-xs font-mono break-all">
              e7d81c22a6f55b3e2d5d7a7a3c7a3b5e7d81c22a6f55b3e2d5d7a7a3c7a3b5
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <div className="flex gap-2">
            <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">Legal Status</p>
              <p className="text-xs text-blue-700 mt-1">
                This verified record can be used as evidence of your care interactions and cannot be altered by any
                party.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button variant="outline" className="flex-1 gap-2">
          <FileText className="h-4 w-4" />
          Print Record
        </Button>
        <Button variant="outline" className="flex-1 gap-2">
          <Download className="h-4 w-4" />
          Download
        </Button>
        <Button className="flex-1 gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

