"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, ShoppingBag, UserRound, Star, Menu, X, ChevronDown } from "lucide-react";
import { shopNavItems, pagesDropdown } from "@/config/navigation";
import { useCartStore } from "@/store/use-cart-store";
import { useAuthStore } from "@/store/use-auth-store";
import { PagesDropdown } from "./pages-dropdown";

export function ShopNavbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const itemCount = useCartStore((state) => state.itemCount());
  const openDrawer = useCartStore((state) => state.openDrawer);
  const { isAuthenticated, logout, user } = useAuthStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="border-b border-[#f0f0f0] bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:py-5 md:px-10">
        {/* Brand Logo */}
        <Link href="/" className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#222222] transition hover:opacity-85">
          FASCO
        </Link>

        {/* Desktop Navigation (lg+) */}
        <nav className="hidden items-center gap-7 xl:gap-8 text-sm text-[#484848] lg:flex">
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

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 text-[#222222]">
          <Link
            href="/shop"
            className="p-2 text-[#484848] hover:text-black transition"
            aria-label="Search Catalog"
            title="Search products"
          >
            <Search size={19} />
          </Link>

          {mounted && isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/account"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#333333] bg-[#f5f5f5] px-2.5 py-1 rounded-full hover:bg-[#eaeaea] transition"
              >
                <UserRound size={13} />
                <span className="max-w-[100px] truncate">{user?.name}</span>
              </Link>
              <button
                onClick={logout}
                className="text-xs text-[#888888] hover:text-black transition cursor-pointer"
                title="Sign out"
              >
                Exit
              </button>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="p-2 text-[#484848] hover:text-black transition hidden sm:inline-flex"
              aria-label="Sign In"
              title="Sign In"
            >
              <UserRound size={19} />
            </Link>
          )}

          <Link
            href="/account#wishlist"
            className="p-2 text-[#484848] hover:text-black transition hidden sm:inline-flex"
            aria-label="Wishlist"
            title="Wishlist"
          >
            <Star size={19} />
          </Link>

          {/* Mini Cart trigger */}
          <button
            onClick={openDrawer}
            className="relative p-2 text-[#222222] hover:text-black transition cursor-pointer"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {mounted && itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d32f2f] px-1 text-[10px] font-bold text-white shadow-sm">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile & Tablet Menu Toggle (< lg) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#222222] hover:text-black transition cursor-pointer rounded-md lg:hidden focus:outline-none"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Drawer (< lg) */}
      {mobileMenuOpen && (
        <div className="border-t border-[#f0f0f0] bg-white px-6 py-6 lg:hidden shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-3 text-base text-[#484848]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 font-medium transition hover:text-black border-b border-[#f9f9f9]"
            >
              Home
            </Link>
            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 font-medium transition hover:text-black border-b border-[#f9f9f9]"
            >
              Shop
            </Link>
            <Link
              href="/deals"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 font-medium transition hover:text-black border-b border-[#f9f9f9]"
            >
              Deals
            </Link>
            <Link
              href="/new-arrivals"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 font-medium transition hover:text-black border-b border-[#f9f9f9]"
            >
              New Arrivals
            </Link>
            <Link
              href="/packages"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 font-medium transition hover:text-black border-b border-[#f9f9f9]"
            >
              Packages
            </Link>

            {/* Collapsible Pages list */}
            <div className="border-b border-[#f9f9f9] py-1.5">
              <button
                onClick={() => setPagesOpen(!pagesOpen)}
                className="flex w-full items-center justify-between font-medium text-[#484848] hover:text-black cursor-pointer"
              >
                <span>Pages</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${pagesOpen ? "rotate-180" : ""}`}
                />
              </button>
              {pagesOpen && (
                <div className="mt-2 ml-3 flex flex-col gap-2 border-l-2 border-[#eaeaea] pl-3 pt-1 text-sm text-[#666666]">
                  {pagesDropdown.map((page) => (
                    <Link
                      key={page.label}
                      href={page.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-1 hover:text-black transition"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Section in Mobile Drawer */}
            <div className="pt-3 border-t border-[#f0f0f0]">
              {mounted && isAuthenticated ? (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 text-sm font-semibold text-[#222222] bg-[#f8f8f8] px-3 rounded-lg"
                  >
                    <span className="flex items-center gap-2">
                      <UserRound size={15} />
                      {user?.name}
                    </span>
                    <span className="text-xs text-[#888888]">Account</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-xs text-red-600 font-semibold text-left py-1 cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                  <Link
                    href="/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center rounded-[8px] border border-black py-2.5 text-xs font-semibold uppercase tracking-wider text-black hover:bg-black hover:text-white transition"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 text-center rounded-[8px] bg-black py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-neutral-800 transition"
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
