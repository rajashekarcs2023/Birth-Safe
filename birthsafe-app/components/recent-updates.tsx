import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentUpdates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Updates</CardTitle>
        <CardDescription>Your latest pregnancy milestones and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                <span className="text-sm font-medium">28w</span>
              </div>
              <div className="h-full w-px bg-border"></div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Completed 28-week check-up</p>
              <p className="text-sm text-muted-foreground">
                All measurements within normal range. Blood pressure: 116/75.
              </p>
              <p className="text-xs text-muted-foreground">2 days ago</p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                <span className="text-sm font-medium">27w</span>
              </div>
              <div className="h-full w-px bg-border"></div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Glucose test results received</p>
              <p className="text-sm text-muted-foreground">
                Glucose tolerance test results normal. No signs of gestational diabetes.
              </p>
              <p className="text-xs text-muted-foreground">5 days ago</p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                <span className="text-sm font-medium">27w</span>
              </div>
              <div className="h-full w-px bg-border"></div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Completed birthing class</p>
              <p className="text-sm text-muted-foreground">
                Attended session on breathing techniques and pain management during labor.
              </p>
              <p className="text-xs text-muted-foreground">1 week ago</p>
            </div>
          </div>
          <div className="flex">
            <div className="mr-4 flex flex-col items-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary">
                <span className="text-sm font-medium">26w</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Updated birth plan</p>
              <p className="text-sm text-muted-foreground">
                Added preferences for labor environment and pain management options.
              </p>
              <p className="text-xs text-muted-foreground">2 weeks ago</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

