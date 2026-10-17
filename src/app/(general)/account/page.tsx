"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  LogOut,
  ChevronRight,
  Package,
  Settings,
} from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { useCartStore } from "@/store/use-cart-store";

const MOCK_ORDERS = [
  {
    id: "ORD-29481",
    date: "Oct 10, 2026",
    status: "Delivered",
    total: 184.0,
    items: 3,
  },
  {
    id: "ORD-28374",
    date: "Sep 22, 2026",
    status: "Shipped",
    total: 99.5,
    items: 1,
  },
  {
    id: "ORD-27190",
    date: "Sep 1, 2026",
    status: "Delivered",
    total: 254.0,
    items: 4,
  },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Shipped: "bg-blue-50 text-blue-700",
  Processing: "bg-amber-50 text-amber-700",
  Cancelled: "bg-red-50 text-red-600",
};

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();
  const itemCount = useCartStore((s) => s.itemCount());

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/sign-in?redirect=/account");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ececec] border-t-black" />
      </div>
    );
  }

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        {/* Page header */}
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a8a8a]">
            My Account
          </span>
          <h1 className="mt-1.5 font-display text-4xl font-normal text-[#222222]">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          {/* ── Sidebar ── */}
          <aside className="space-y-4">
            {/* Avatar card */}
            <div className="rounded-[16px] border border-[#eeeeee] bg-white p-6 text-center shadow-sm">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-black text-xl font-bold text-white">
                {initials}
              </div>
              <p className="mt-3 text-base font-semibold text-[#222222]">
                {user.name}
              </p>
              <p className="mt-0.5 text-xs text-[#8a8a8a]">{user.email}</p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active Member
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[12px] border border-[#eeeeee] bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-[#222222]">
                  {MOCK_ORDERS.length}
                </p>
                <p className="mt-0.5 text-[11px] text-[#8a8a8a]">Orders</p>
              </div>
              <div className="rounded-[12px] border border-[#eeeeee] bg-white p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-[#222222]">{itemCount}</p>
                <p className="mt-0.5 text-[11px] text-[#8a8a8a]">In Cart</p>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="overflow-hidden rounded-[16px] border border-[#eeeeee] bg-white shadow-sm">
              {[
                { icon: ShoppingBag, label: "My Orders", href: "#orders" },
                { icon: Heart, label: "Wishlist", href: "#wishlist" },
                { icon: MapPin, label: "Addresses", href: "#addresses" },
                { icon: Settings, label: "Settings", href: "#settings" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center justify-between border-b border-[#f5f5f5] px-5 py-3.5 text-sm text-[#484848] transition last:border-0 hover:bg-[#fafafa] hover:text-black"
                >
                  <span className="flex items-center gap-3">
                    <Icon size={16} />
                    {label}
                  </span>
                  <ChevronRight size={14} className="text-[#c0c0c0]" />
                </a>
              ))}

              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-between px-5 py-3.5 text-sm text-red-500 transition hover:bg-red-50"
              >
                <span className="flex items-center gap-3">
                  <LogOut size={16} />
                  Sign Out
                </span>
                <ChevronRight size={14} className="text-red-300" />
              </button>
            </nav>
          </aside>

          {/* ── Main content ── */}
          <main className="space-y-8">
            {/* Recent orders */}
            <section
              id="orders"
              className="rounded-[16px] border border-[#eeeeee] bg-white p-6 shadow-sm"
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="flex items-center gap-2.5 text-lg font-bold text-[#222222]">
                  <Package size={18} />
                  Recent Orders
                </h2>
                <Link
                  href="/shop"
                  className="text-xs font-semibold text-[#8a8a8a] transition hover:text-black"
                >
                  Shop More →
                </Link>
              </div>

              <div className="space-y-3">
                {MOCK_ORDERS.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-col gap-3 rounded-[10px] border border-[#f0f0f0] bg-[#fafafa] p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-bold text-[#222222]">
                        {order.id}
                      </p>
                      <p className="mt-0.5 text-xs text-[#8a8a8a]">
                        {order.date} · {order.items}{" "}
                        {order.items === 1 ? "item" : "items"}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${STATUS_COLORS[order.status]}`}
                      >
                        {order.status}
                      </span>
                      <span className="text-sm font-bold text-[#222222]">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Wishlist placeholder */}
            <section
              id="wishlist"
              className="rounded-[16px] border border-[#eeeeee] bg-white p-6 shadow-sm"
            >
              <h2 className="mb-5 flex items-center gap-2.5 text-lg font-bold text-[#222222]">
                <Heart size={18} />
                Wishlist
              </h2>
              <div className="flex flex-col items-center justify-center rounded-[10px] border border-dashed border-[#e0e0e0] bg-[#fafafa] py-12 text-center">
                <Heart size={32} className="text-[#d8d8d8]" />
                <p className="mt-3 text-sm font-medium text-[#8a8a8a]">
                  Your wishlist is empty
                </p>
                <Link
                  href="/shop"
                  className="mt-4 rounded-[8px] bg-black px-6 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800"
                >
                  Discover Products
                </Link>
              </div>
            </section>

            {/* Addresses placeholder */}
            <section
              id="addresses"
              className="rounded-[16px] border border-[#eeeeee] bg-white p-6 shadow-sm"
            >
              <h2 className="mb-5 flex items-center gap-2.5 text-lg font-bold text-[#222222]">
                <MapPin size={18} />
                Saved Addresses
              </h2>
              <div className="flex flex-col items-center justify-center rounded-[10px] border border-dashed border-[#e0e0e0] bg-[#fafafa] py-10 text-center">
                <MapPin size={32} className="text-[#d8d8d8]" />
                <p className="mt-3 text-sm font-medium text-[#8a8a8a]">
                  No saved addresses yet
                </p>
                <p className="mt-1 text-xs text-[#b0b0b0]">
                  Addresses you use at checkout will appear here
                </p>
              </div>
            </section>

            {/* Settings */}
            <section
              id="settings"
              className="rounded-[16px] border border-[#eeeeee] bg-white p-6 shadow-sm"
            >
              <h2 className="mb-5 flex items-center gap-2.5 text-lg font-bold text-[#222222]">
                <Settings size={18} />
                Account Settings
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#555555]">
                      Full Name
                    </label>
                    <input
                      defaultValue={user.name}
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-sm text-[#222222] outline-none transition focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-[#555555]">
                      Email Address
                    </label>
                    <input
                      defaultValue={user.email}
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-sm text-[#222222] outline-none transition focus:border-black"
                    />
                  </div>
                </div>
                <button className="rounded-[8px] bg-black px-8 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800">
                  Save Changes
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
