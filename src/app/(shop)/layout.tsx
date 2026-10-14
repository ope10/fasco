import type { ReactNode } from "react";

import { Footer } from "@/components/navigation/footer";
import { ShopNavbar } from "@/components/navigation/shop-navbar";

export default function ShopLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f8f3ee] text-[#1d1d1d]">
      <ShopNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
