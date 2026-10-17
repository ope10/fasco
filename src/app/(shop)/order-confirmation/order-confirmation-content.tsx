"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Mail, ArrowRight, Home } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { useAuthStore } from "@/store/use-auth-store";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const { user } = useAuthStore();
  const clearCart = useCartStore((s) => s.clearCart);
  const cleared = useRef(false);

  // Generate a stable order number from searchParams or random
  const orderNumber =
    searchParams.get("order") ||
    "ORD-" + Math.floor(10000 + Math.random() * 90000);

  useEffect(() => {
    if (!cleared.current) {
      clearCart();
      cleared.current = true;
    }
  }, [clearCart]);

  const steps = [
    { label: "Order Placed", done: true },
    { label: "Processing", done: true },
    { label: "Shipped", done: false },
    { label: "Delivered", done: false },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <div className="mx-auto max-w-2xl px-6 py-16 md:px-10">
        {/* Success icon */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="text-emerald-500" size={44} strokeWidth={1.5} />
          </div>

          <span className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-emerald-600">
            Order Confirmed
          </span>
          <h1 className="mt-2 font-display text-4xl font-normal text-[#222222]">
            Thank You{user ? `, ${user.name.split(" ")[0]}` : ""}!
          </h1>
          <p className="mt-3 max-w-md text-sm text-[#8a8a8a] leading-relaxed">
            Your order has been placed successfully. A confirmation has been
            sent to{" "}
            <strong className="text-[#484848]">
              {user?.email ?? "your email"}
            </strong>
            .
          </p>
        </div>

        {/* Order number card */}
        <div className="mt-10 rounded-[16px] border border-[#eeeeee] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-[#f5f5f5] pb-4">
            <div className="flex items-center gap-3">
              <Package size={20} className="text-[#484848]" />
              <span className="text-sm font-semibold text-[#222222]">
                Order Number
              </span>
            </div>
            <span className="rounded-full bg-[#f5f5f5] px-4 py-1 font-mono text-sm font-bold text-[#222222]">
              {orderNumber}
            </span>
          </div>

          {/* Order tracker */}
          <div className="mt-6">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#8a8a8a]">
              Order Progress
            </p>
            <div className="relative flex items-center justify-between">
              {/* Track line */}
              <div className="absolute left-0 right-0 top-3.5 h-0.5 bg-[#f0f0f0]">
                <div className="h-full w-1/2 bg-emerald-400 transition-all duration-700" />
              </div>

              {steps.map((step, i) => (
                <div
                  key={i}
                  className="relative flex flex-col items-center gap-2 z-10"
                >
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-all ${
                      step.done
                        ? "border-emerald-400 bg-emerald-400 text-white"
                        : "border-[#e0e0e0] bg-white text-[#c0c0c0]"
                    }`}
                  >
                    {step.done ? "✓" : i + 1}
                  </div>
                  <span
                    className={`text-[11px] font-medium ${
                      step.done ? "text-[#222222]" : "text-[#b0b0b0]"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="mt-4 rounded-[16px] border border-[#eeeeee] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3 text-sm font-semibold text-[#222222]">
            <Mail size={16} />
            What happens next?
          </div>
          <ul className="mt-4 space-y-2.5 text-sm text-[#8a8a8a]">
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 text-emerald-500">✓</span>
              You'll receive a confirmation email within a few minutes.
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 text-[#c0c0c0]">○</span>
              Our team will process and pack your order within 1–2 business days.
            </li>
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 text-[#c0c0c0]">○</span>
              You'll get a tracking number once your order ships.
            </li>
          </ul>
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-black py-4 text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800"
          >
            <Home size={16} />
            Back To Home
          </Link>
          <Link
            href="/shop"
            className="flex flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#e0e0e0] bg-white py-4 text-sm font-semibold text-[#484848] transition hover:border-black hover:text-black"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Track order link */}
        <div className="mt-6 text-center">
          <Link
            href="/account"
            className="text-xs font-medium text-[#8a8a8a] underline-offset-2 hover:text-black hover:underline transition"
          >
            View order in My Account →
          </Link>
        </div>
      </div>
    </div>
  );
}
