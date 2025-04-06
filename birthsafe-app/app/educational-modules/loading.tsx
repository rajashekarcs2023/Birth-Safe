import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-full max-w-md" />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-2 flex-1" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        <div className="w-full">
          <Skeleton className="h-10 w-full mb-4" />

          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-20 mb-2" />
              <Skeleton className="h-6 w-full max-w-md mb-1" />
              <Skeleton className="h-4 w-full max-w-sm" />
            </CardHeader>

            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-2/3" />
              </div>
            </CardContent>

            <CardFooter>
              <Skeleton className="h-10 w-40" />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

