"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.subtotal());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14 md:px-10 min-h-[50vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ececec] border-t-black" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 md:py-14 md:px-10">
      {/* Page Header */}
      <div className="mb-8 md:mb-10 border-b border-[#f0f0f0] pb-5 md:pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8a8a8a] font-semibold">
          Cart
        </span>
        <h1 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-normal text-[#484848]">
          Your Shopping Bag
        </h1>
      </div>

      {/* Main Grid: stacks on mobile, side-by-side from md+ */}
      <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-[1fr_340px] lg:grid-cols-[1.4fr_0.6fr]">
        {/* Cart Items */}
        <div className="space-y-3 sm:space-y-4 min-w-0">
          {items.length === 0 ? (
            <div className="rounded-[10px] border border-[#f0f0f0] bg-white p-10 sm:p-12 text-center text-[#8a8a8a]">
              <p className="text-base mb-4">Your bag is currently empty.</p>
              <Link
                href="/shop"
                className="inline-block rounded-[10px] bg-black px-8 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Shop New Arrivals
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex flex-row items-center gap-3 sm:gap-5 rounded-[12px] border border-[#f0f0f0] bg-white p-3 sm:p-5"
              >
                {/* Product Image */}
                <div
                  className="h-20 w-16 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-[8px] bg-[#f2f2f2] shrink-0"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  {/* Name + Remove */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-sm sm:text-base font-semibold text-[#484848] leading-snug line-clamp-2">
                        {item.productName}
                      </h2>
                      <p className="mt-0.5 text-xs text-[#8a8a8a]">
                        {item.color} · Size {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#8a8a8a] hover:text-[#FF4B4B] transition p-1 cursor-pointer shrink-0 mt-0.5"
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {/* Quantity + Price */}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-1 sm:gap-2 rounded-[6px] border border-[#e8e8e8] bg-white px-1 py-0.5">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="rounded p-1 hover:bg-[#f0f0f0] text-[#484848] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="min-w-[1.25rem] text-center text-xs font-semibold text-[#484848]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="rounded p-1 hover:bg-[#f0f0f0] text-[#484848] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#484848] shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary Sidebar */}
        <aside className="md:sticky md:top-6 h-fit rounded-[10px] border border-[#f0f0f0] bg-[#fafafa] p-5 sm:p-6 space-y-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#484848]">
            Order Summary
          </h2>
          <div className="space-y-3 text-sm text-[#7a7a7a]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[#484848]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="text-[#2e7d32] font-medium">Free</span>
            </div>
            <div className="flex justify-between border-t border-[#e8e8e8] pt-4 text-base font-bold text-[#484848]">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="block w-full rounded-[10px] bg-black py-3.5 sm:py-4 text-center text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800"
          >
            Proceed To Checkout
          </Link>
          <Link
            href="/shop"
            className="block text-center text-xs font-medium text-[#8a8a8a] hover:text-black transition"
          >
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
