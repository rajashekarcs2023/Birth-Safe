import { Heart, MessageSquare, FileText, Info, Users, Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function TraumaSupport() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-slate-800 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Birth Trauma Support
            </CardTitle>
            <CardDescription>Resources for difficult experiences</CardDescription>
          </div>
          <Badge variant="outline" className="text-slate-500">
            Confidential
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
          <div className="flex gap-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800 font-medium">What is birth trauma?</p>
              <p className="text-xs text-blue-700 mt-1">
                Birth trauma can include feeling unsafe, unheard, or experiencing a loss of control during pregnancy or
                birth. Your feelings are valid and support is available.
              </p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-700">You may be experiencing birth trauma if you have:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li className="text-sm text-slate-700">Anxiety or fear about your safety</li>
          <li className="text-sm text-slate-700">Difficulty trusting your healthcare providers</li>
          <li className="text-sm text-slate-700">Flashbacks or intrusive thoughts</li>
          <li className="text-sm text-slate-700">Feeling a loss of control over your care</li>
        </ul>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Available Support</h3>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border">
            <div className="bg-blue-100 p-2 rounded-full">
              <MessageSquare className="h-4 w-4 text-blue-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Perinatal Mental Health Specialist</p>
              <p className="text-xs text-slate-500">Virtual appointments available</p>
            </div>
            <Button size="sm">Book</Button>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border">
            <div className="bg-purple-100 p-2 rounded-full">
              <Users className="h-4 w-4 text-purple-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Birth Trauma Support Group</p>
              <p className="text-xs text-slate-500">Online meetings weekly</p>
            </div>
            <Button size="sm">Join</Button>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border">
            <div className="bg-green-100 p-2 rounded-full">
              <Calendar className="h-4 w-4 text-green-700" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Birth Reflections Service</p>
              <p className="text-xs text-slate-500">Process your experiences with a specialist</p>
            </div>
            <Button size="sm">Schedule</Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button className="w-full gap-2">
          <FileText className="h-4 w-4" />
          Take Trauma Screening
        </Button>
        <Button variant="outline" className="w-full gap-2">
          <ExternalLink className="h-4 w-4" />
          Learn More About Birth Trauma
        </Button>
      </CardFooter>
    </Card>
  )
}

