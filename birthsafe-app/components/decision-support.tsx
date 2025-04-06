import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function DecisionSupport() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Decision Support</CardTitle>
        <CardDescription>Get help with important decisions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium">Birth Plan Options</h3>
            <p className="text-sm text-gray-500">Explore your choices for labor and delivery</p>
            <Button className="mt-2">View Options</Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Pain Management</h3>
            <p className="text-sm text-gray-500">Learn about pain relief methods during labor</p>
            <Button className="mt-2">Explore Methods</Button>
          </div>
          <div>
            <h3 className="text-lg font-medium">Feeding Choices</h3>
            <p className="text-sm text-gray-500">Compare breastfeeding and formula feeding</p>
            <Button className="mt-2">Compare Options</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

