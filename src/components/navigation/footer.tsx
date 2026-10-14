import Link from "next/link";
import { footerColumns } from "@/config/navigation";

export function Footer() {
  return (
    <footer className="border-t border-[#f0f0f0] bg-white text-[#484848]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-12 md:flex-row md:px-10">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-display text-3xl font-bold tracking-tight text-[#484848]"
        >
          FASCO
        </Link>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#484848] md:gap-8">
          <Link href="/" className="hover:text-black transition">Support Center</Link>
          <Link href="/" className="hover:text-black transition">Invoicing</Link>
          <Link href="/" className="hover:text-black transition">Contract</Link>
          <Link href="/" className="hover:text-black transition">Careers</Link>
          <Link href="/" className="hover:text-black transition">Blog</Link>
          <Link href="/" className="hover:text-black transition">FAQ,s</Link>
        </nav>
      </div>

      <div className="border-t border-[#f2f2f2]">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-6 text-xs text-[#8a8a8a] md:px-10">
          <p>Copyright © 2026 FASCO. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
