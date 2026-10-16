import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

interface AuthShellProps {
  /** Which photo to display on the left panel */
  photoSrc: string;
  photoAlt: string;
  objectPosition?: string;
  children: ReactNode;
}

/**
 * Auth card layout matching Figma:
 * - Fits within the viewport (no page scroll on desktop)
 * - 50% fashion photo (full bleed, object-cover)
 * - 50% white panel with centered form block
 */
export function AuthShell({ photoSrc, photoAlt, objectPosition = "center 8%", children }: AuthShellProps) {
  return (
    <div className="h-screen max-h-screen w-full bg-[#f8f9fa] flex items-center justify-center p-2 sm:p-4 md:p-5 lg:p-6 overflow-hidden">
      <div className="w-full max-w-[1720px] h-full max-h-[calc(100vh-1rem)] sm:max-h-[calc(100vh-2rem)] lg:max-h-[calc(100vh-3rem)] bg-white rounded-[20px] sm:rounded-[28px] border border-[#e5e7eb] shadow-[0_12px_44px_rgba(0,0,0,0.06)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">

        {/* ── LEFT: Fashion photo (50%) ── */}
        <div className="relative hidden lg:block h-full w-full bg-[#f3f4f6] overflow-hidden">
          <Image
            src={photoSrc}
            alt={photoAlt}
            fill
            priority
            style={{ objectPosition }}
            className="object-cover"
            sizes="50vw"
          />
        </div>

        {/* ── RIGHT: Form area (50%) ── */}
        <div className="flex flex-col justify-between bg-white px-6 py-4 sm:px-10 sm:py-6 md:px-12 lg:px-10 xl:px-16 2xl:px-20 h-full overflow-y-auto lg:overflow-visible">
          {/* Centered inner form container matching button & input width exactly */}
          <div className="w-full max-w-[480px] xl:max-w-[520px] mx-auto flex flex-col justify-center flex-1 my-auto">
            {/* FASCO logotype */}
            <div className="mb-3 sm:mb-4 lg:mb-5">
              <Link
                href="/"
                className="inline-block font-display text-[32px] sm:text-[38px] lg:text-[44px] font-normal leading-none tracking-[-0.03em] text-[#222222] transition-opacity hover:opacity-80"
              >
                FASCO
              </Link>
            </div>

            {/* Form slot */}
            {children}
          </div>

          {/* Terms at the bottom right */}
          <div className="mt-2 sm:mt-3 text-right text-[11px] sm:text-[12px] text-[#888888] tracking-wide">
            FASCO Terms &amp; Conditions
          </div>
        </div>

      </div>
    </div>
  );
}
