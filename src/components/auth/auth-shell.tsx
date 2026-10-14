import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthShellProps {
  /** Which photo to display on the left panel */
  photoSrc: string;
  photoAlt: string;
  children: ReactNode;
}

/**
 * Full-screen auth card layout matching Figma:
 * – Outer page: light gray bg
 * – Card: rounded, border, two-col (photo | form)
 * – Left col: full-bleed fashion photo
 * – Right col: white bg, vertically centered FASCO logo + form
 */
export function AuthShell({ photoSrc, photoAlt, children }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-[960px] overflow-hidden rounded-[12px] border border-[#dddddd] bg-white shadow-[0_2px_24px_rgba(0,0,0,0.07)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_1fr] min-h-[580px]">

          {/* ── LEFT: Fashion photo ── */}
          <div className="relative min-h-[280px] lg:min-h-full overflow-hidden">
            <Image
              src={photoSrc}
              alt={photoAlt}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* ── RIGHT: Form area ── */}
          <div className="flex flex-col justify-between bg-white px-8 py-10 sm:px-12 md:px-14 lg:px-16">
            {/* FASCO logotype */}
            <div>
              <Link
                href="/"
                className="block font-display text-[2.4rem] font-normal leading-none tracking-[-0.04em] text-[#222222] mb-8"
              >
                FASCO
              </Link>

              {/* Form content slot */}
              {children}
            </div>

            {/* Terms at the very bottom */}
            <div className="mt-10 text-right text-[11px] text-[#888888]">
              FASCO Terms &amp; Conditions
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
