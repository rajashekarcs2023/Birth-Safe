import { Phone, Users, FileCheck, ArrowRight, Shield, AlertTriangle, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function EscalationPathway() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800">Escalation Pathway</CardTitle>
            <CardDescription>If your concerns aren't addressed</CardDescription>
          </div>
          <Badge className="bg-blue-100 text-blue-700">Critical Safety Tool</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-3">
          <div className="flex gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <p className="text-sm text-amber-800">
              If your healthcare provider doesn't address your concerns about the missing 32-week scan, follow these
              steps to escalate.
            </p>
          </div>
        </div>

        <div className="relative pl-6 border-l-2 border-blue-200 pb-6">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="bg-blue-100 p-2 rounded-full">
              <Phone className="h-4 w-4 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Step 1: Contact Supervisor Midwife</p>
              <p className="text-xs text-slate-500">Ask to speak with the supervisor of midwives</p>
              <div className="mt-2 flex gap-2">
                <ArrowRight className="h-4 w-4 text-blue-700" />
                <p className="text-xs">Explain that your 32-week scan was missed despite your high-risk status</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Call
            </Button>
          </div>
        </div>

        <div className="relative pl-6 border-l-2 border-blue-200 pb-6">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
          <div className="flex items-center gap-3 p-3 rounded-md border">
            <div className="bg-slate-100 p-2 rounded-full">
              <Users className="h-4 w-4 text-slate-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Step 2: Patient Advocacy Service</p>
              <p className="text-xs text-slate-500">Independent support for your concerns</p>
              <div className="mt-2 flex gap-2">
                <ArrowRight className="h-4 w-4 text-slate-700" />
                <p className="text-xs">They can help you navigate the system and document your concerns</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Contact
            </Button>
          </div>
        </div>

        <div className="relative pl-6 border-l-2 border-blue-200">
          <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-blue-500"></div>
          <div className="flex items-center gap-3 p-3 rounded-md border">
            <div className="bg-slate-100 p-2 rounded-full">
              <FileCheck className="h-4 w-4 text-slate-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Step 3: Second Medical Opinion</p>
              <p className="text-xs text-slate-500">Request a different provider's assessment</p>
              <div className="mt-2 flex gap-2">
                <ArrowRight className="h-4 w-4 text-slate-700" />
                <p className="text-xs">You have the right to seek another medical opinion about your care</p>
              </div>
            </div>
            <Button size="sm" variant="outline">
              Request
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full gap-2">
          <Shield className="h-4 w-4" />
          Document Your Escalation Steps
        </Button>
        <Button variant="outline" className="w-full gap-2">
          <ExternalLink className="h-4 w-4" />
          Learn About Your Rights
        </Button>
      </CardFooter>
    </Card>
  )
}

