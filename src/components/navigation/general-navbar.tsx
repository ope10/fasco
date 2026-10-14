"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag, User } from "lucide-react";
import { generalNavItems } from "@/config/navigation";
import { useCartStore } from "@/store/use-cart-store";
import { useAuthStore } from "@/store/use-auth-store";

export function GeneralNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.itemCount());
  const openDrawer = useCartStore((state) => state.openDrawer);
  const { isAuthenticated, user, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md transition-all border-b border-[#f5f5f5]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-display text-3xl md:text-[34px] font-bold tracking-tight text-[#222222] transition hover:opacity-80"
        >
          FASCO
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden items-center gap-8 lg:gap-10 text-[15px] text-[#484848] md:flex">
          {generalNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-normal transition-colors hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Mini Cart Trigger */}
          <button
            onClick={openDrawer}
            className="relative p-2 text-[#222222] hover:text-black transition"
            aria-label="View Cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d32f2f] px-1 text-[10px] font-bold text-white shadow-sm">
                {itemCount}
              </span>
            )}
          </button>

          {/* Auth State */}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#333333] bg-[#f5f5f5] px-3 py-1.5 rounded-full">
                <User size={13} />
                {user?.name || "Account"}
              </span>
              <button
                onClick={logout}
                className="text-xs text-[#888888] hover:text-black transition font-medium"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-[#484848] hover:text-black transition px-2"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="rounded-[8px] bg-black px-7 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition hover:bg-neutral-800"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Trigger & Cart */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={openDrawer}
            className="relative p-2 text-[#222222]"
            aria-label="View Cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d32f2f] px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#222222]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-[#f0f0f0] bg-white px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-4 text-base text-[#484848]">
            {generalNavItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 hover:text-black"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-[#f0f0f0]">
              {isAuthenticated ? (
                <div className="flex items-center justify-between py-2">
                  <span className="text-sm font-semibold">{user?.name}</span>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-red-600 font-semibold"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center rounded-[8px] border border-black py-2.5 text-xs font-semibold uppercase"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center rounded-[8px] bg-black py-2.5 text-xs font-semibold uppercase text-white"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
