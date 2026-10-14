import Link from "next/link";

import { pagesDropdown } from "@/config/navigation";

export function PagesDropdown() {
  return (
    <div className="group relative">
      <button className="inline-flex items-center gap-2 text-sm text-[#3a3430] transition-colors hover:text-[#b66a42]">
        Pages
        <span className="text-xs">▾</span>
      </button>

      <div className="invisible absolute left-0 top-full z-20 mt-3 min-w-44 rounded-2xl border border-[#f0e7df] bg-white p-2 opacity-0 shadow-[0_18px_45px_rgba(20,17,17,0.1)] transition-all duration-200 group-hover:visible group-hover:opacity-100">
        {pagesDropdown.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-3 py-2 text-sm text-[#3d3531] hover:bg-[#f7f0ea] hover:text-[#b66a42]"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
