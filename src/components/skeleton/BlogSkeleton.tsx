import { Skeleton } from '@/components/ui/skeleton';

export default function BlogSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-3 border-b border-neutral-100 pb-6 dark:border-neutral-900">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-8 w-3/4" />
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:items-start md:gap-8 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
        <Skeleton className="min-h-40 w-full rounded-md" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-20 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
