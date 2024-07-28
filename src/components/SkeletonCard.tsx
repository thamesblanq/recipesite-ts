import { Skeleton } from "@/components/ui/skeleton"

const SkeletonCard = () => {
  return (
    <div className="flex flex-row space-y-3">
      <Skeleton className="h-[50%] w-[50%] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-full w-full" />
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}

export default SkeletonCard