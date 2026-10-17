import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      {/* Decorative number */}
      <div className="relative select-none">
        <span
          className="text-[180px] sm:text-[240px] font-black leading-none text-[#f0f0f0]"
          aria-hidden="true"
        >
          404
        </span>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#222222]">
            Page Not Found
          </p>
        </div>
      </div>

      {/* Brand */}
      <Link
        href="/"
        className="mt-2 font-display text-4xl font-bold tracking-tight text-[#222222] hover:opacity-75 transition"
      >
        FASCO
      </Link>

      {/* Message */}
      <p className="mt-6 max-w-md text-sm text-[#8a8a8a] leading-relaxed">
        Oops — the page you&apos;re looking for doesn&apos;t exist or has been
        moved. Let&apos;s get you back on track.
      </p>

      {/* Actions */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
        <Link
          href="/"
          className="rounded-[10px] bg-black px-10 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800"
        >
          Back To Home
        </Link>
        <Link
          href="/shop"
          className="rounded-[10px] border border-[#e0e0e0] bg-white px-10 py-3.5 text-sm font-semibold text-[#484848] transition hover:border-black hover:text-black"
        >
          Browse Shop
        </Link>
      </div>

      {/* Quick links */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#8a8a8a]">
        <Link href="/new-arrivals" className="hover:text-black transition">New Arrivals</Link>
        <Link href="/deals" className="hover:text-black transition">Deals</Link>
        <Link href="/packages" className="hover:text-black transition">Packages</Link>
        <Link href="/cart" className="hover:text-black transition">Cart</Link>
      </div>
    </div>
  );
}
