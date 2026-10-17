export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 animate-pulse">
      {/* Page header skeleton */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="h-3 w-24 rounded bg-[#f0f0f0]" />
          <div className="mt-2 h-8 w-52 rounded-md bg-[#ececec]" />
        </div>
        <div className="flex gap-3">
          <div className="h-9 w-28 rounded-[8px] bg-[#f0f0f0]" />
          <div className="h-9 w-28 rounded-[8px] bg-[#f0f0f0]" />
        </div>
      </div>

      {/* Product grid skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <div className="aspect-[3/4] w-full rounded-[12px] bg-[#f0f0f0]" />
            <div className="h-3 w-3/4 rounded bg-[#f0f0f0]" />
            <div className="h-3 w-1/2 rounded bg-[#ececec]" />
            <div className="h-3 w-1/3 rounded bg-[#f0f0f0]" />
          </div>
        ))}
      </div>
    </div>
  );
}
