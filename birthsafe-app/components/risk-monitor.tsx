import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function RiskMonitor() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Monitor & Guidelines Checker</CardTitle>
        <CardDescription>Track your personalized risk profile and ensure care meets guidelines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Attention Required</AlertTitle>
            <AlertDescription>
              Your latest blood pressure reading is slightly elevated. Please review the recommendations below.
            </AlertDescription>
          </Alert>
          <div>
            <h3 className="text-lg font-medium">Current Risk Factors</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Slightly elevated blood pressure</li>
              <li>Family history of gestational diabetes</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Recommended Monitoring</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Daily blood pressure checks</li>
              <li>Weekly blood glucose monitoring</li>
              <li>Bi-weekly fetal movement count</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium">Guidelines Compliance</h3>
            <p className="text-sm text-gray-500 mt-1">Check if your care meets recommended guidelines</p>
            <Button className="mt-2">Review Guidelines</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

