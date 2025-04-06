import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="mb-8 text-center">
        <Skeleton className="h-10 w-[400px] mx-auto mb-4" />
        <Skeleton className="h-4 w-[600px] mx-auto" />
        <Skeleton className="h-4 w-[500px] mx-auto mt-2" />
      </div>

      <Skeleton className="h-12 w-full mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} className="h-[180px] w-full" />
          ))}
      </div>
    </div>
  )
}

