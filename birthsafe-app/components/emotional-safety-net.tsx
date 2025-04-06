import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EmotionalSafetyNet() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emotional Safety Net</CardTitle>
        <CardDescription>Support for your emotional well-being throughout your journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Mental Health Check-in</h3>
            <p className="text-sm text-gray-500">Regular assessment of your emotional well-being</p>
            <Button className="mt-2">Start Check-in</Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Trauma Support Resources</h3>
            <p className="text-sm text-gray-500">Access specialized resources for birth trauma and loss</p>
            <Button className="mt-2">View Resources</Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Peer Support Network</h3>
            <p className="text-sm text-gray-500">Connect with others who share similar experiences</p>
            <Button className="mt-2">Join Network</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

