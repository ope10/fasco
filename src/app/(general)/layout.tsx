import type { ReactNode } from "react";

import { Footer } from "@/components/navigation/footer";
import { GeneralNavbar } from "@/components/navigation/general-navbar";

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8f3ee] text-[#1d1d1d]">
      <GeneralNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
