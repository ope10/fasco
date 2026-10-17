export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 md:px-10 animate-pulse">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
        {/* Image skeleton */}
        <div className="aspect-[4/5] w-full rounded-[16px] bg-[#f0f0f0]" />

        {/* Details skeleton */}
        <div className="flex flex-col gap-5 py-4">
          <div className="h-3 w-24 rounded bg-[#f0f0f0]" />
          <div className="h-8 w-3/4 rounded-md bg-[#ececec]" />
          <div className="h-6 w-1/4 rounded bg-[#f0f0f0]" />
          <div className="mt-2 space-y-2">
            <div className="h-3 w-full rounded bg-[#f0f0f0]" />
            <div className="h-3 w-5/6 rounded bg-[#f0f0f0]" />
            <div className="h-3 w-4/6 rounded bg-[#f0f0f0]" />
          </div>
          {/* Color swatches */}
          <div className="flex gap-2 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-8 rounded-full bg-[#e8e8e8]" />
            ))}
          </div>
          {/* Sizes */}
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-9 w-12 rounded-[6px] bg-[#f0f0f0]" />
            ))}
          </div>
          {/* Button */}
          <div className="mt-4 h-12 w-full rounded-[10px] bg-[#ececec]" />
        </div>
      </div>
    </div>
  );
}
