export function ListingDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-video w-full bg-gray-200 dark:bg-gray-800" />
      <div className="mx-auto max-w-2xl space-y-4 p-4">
        <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-6 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-2">
          <div className="h-6 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-20 w-full rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
