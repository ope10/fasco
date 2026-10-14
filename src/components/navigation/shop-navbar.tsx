"use client";

import Link from "next/link";
import { Search, ShoppingBag, UserRound, Star } from "lucide-react";
import { shopNavItems } from "@/config/navigation";
import { useCartStore } from "@/store/use-cart-store";
import { useAuthStore } from "@/store/use-auth-store";
import { PagesDropdown } from "./pages-dropdown";

export function ShopNavbar() {
  const itemCount = useCartStore((state) => state.itemCount());
  const openDrawer = useCartStore((state) => state.openDrawer);
  const { isAuthenticated, logout, user } = useAuthStore();

  return (
    <header className="border-b border-[#f0f0f0] bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="font-display text-3xl font-bold tracking-tight text-[#222222]">
          FASCO
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[#484848] md:flex">
          {shopNavItems.map((item) => {
            if (item.label === "Pages") {
              return <PagesDropdown key={item.label} />;
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className="transition-colors hover:text-black font-normal"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 text-[#222222]">
          <button
            className="p-2 text-[#484848] hover:text-black transition"
            aria-label="Search"
          >
            <Search size={18} />
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs font-semibold text-[#333333] bg-[#f5f5f5] px-2.5 py-1 rounded-full">
                <UserRound size={13} />
                {user?.name}
              </span>
              <button
                onClick={logout}
                className="text-xs text-[#888888] hover:text-black transition"
                title="Sign out"
              >
                Exit
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="p-2 text-[#484848] hover:text-black transition"
              aria-label="Sign In"
              title="Sign In"
            >
              <UserRound size={18} />
            </Link>
          )}

          <button
            className="p-2 text-[#484848] hover:text-black transition"
            aria-label="Wishlist"
          >
            <Star size={18} />
          </button>

          {/* Mini Cart trigger */}
          <button
            onClick={openDrawer}
            className="relative p-2 text-[#222222] hover:text-black transition"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d32f2f] px-1 text-[10px] font-bold text-white shadow-sm">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
