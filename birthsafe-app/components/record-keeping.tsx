import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function RecordKeeping() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Record Keeping</CardTitle>
        <CardDescription>Manage your pregnancy records</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Medical History</h3>
            <p className="text-sm text-gray-500">View and update your medical history</p>
            <Button className="mt-2">View History</Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Test Results</h3>
            <p className="text-sm text-gray-500">Access your latest test results</p>
            <Button className="mt-2">View Results</Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Appointment Notes</h3>
            <p className="text-sm text-gray-500">Review notes from your doctor visits</p>
            <Button className="mt-2">View Notes</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

