export function ListingCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="aspect-square w-full animate-pulse bg-gray-200 dark:bg-gray-800" />
      <div className="flex flex-1 flex-col p-3">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 h-6 w-1/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mt-2 flex gap-1">
          <div className="h-5 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="mt-2 h-9 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}
