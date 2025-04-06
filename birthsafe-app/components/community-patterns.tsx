import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CommunityPatterns() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Community Pattern Recognition</CardTitle>
        <CardDescription>Connect with others and identify common experiences</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Share Your Experience</h3>
            <p className="text-sm text-gray-500">Anonymously share your pregnancy or birth experience</p>
            <Button className="mt-2">Share Experience</Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Explore Patterns</h3>
            <p className="text-sm text-gray-500">View common experiences and patterns in maternal care</p>
            <Button className="mt-2">View Patterns</Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Connect with Advocates</h3>
            <p className="text-sm text-gray-500">Find patient advocates based on shared experiences</p>
            <Button className="mt-2">Find Advocates</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

