"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const subtotal = useCartStore((state) => state.subtotal());

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
      <div className="mb-10 border-b border-[#f0f0f0] pb-6">
        <span className="text-xs uppercase tracking-[0.25em] text-[#8a8a8a] font-semibold">
          Cart
        </span>
        <h1 className="mt-2 font-display text-4xl font-normal text-[#484848]">
          Your Shopping Bag
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-[10px] border border-[#f0f0f0] bg-white p-12 text-center text-[#8a8a8a]">
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
                className="flex flex-col gap-5 rounded-[10px] border border-[#f0f0f0] bg-white p-5 md:flex-row md:items-center"
              >
                <div
                  className="h-28 w-full rounded-[8px] bg-[#f2f2f2] md:w-28 shrink-0"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-base font-semibold text-[#484848]">{item.productName}</h2>
                      <p className="mt-1 text-xs text-[#8a8a8a]">
                        {item.color} • Size {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#8a8a8a] hover:text-[#FF4B4B] transition p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-[6px] border border-[#e8e8e8] bg-white p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded p-1 hover:bg-[#f0f0f0] text-[#484848]"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="min-w-6 text-center text-xs font-semibold text-[#484848]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded p-1 hover:bg-[#f0f0f0] text-[#484848]"
                        aria-label="Increase quantity"
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                    <div className="text-base font-bold text-[#484848]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="h-fit rounded-[10px] border border-[#f0f0f0] bg-[#fafafa] p-6 space-y-5">
          <h2 className="text-xl font-bold text-[#484848]">Order Summary</h2>
          <div className="space-y-3.5 text-sm text-[#7a7a7a]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-[#484848]">${subtotal.toFixed(2)}</span>
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
            className="block w-full rounded-[10px] bg-black py-4 text-center text-sm font-semibold text-white shadow-md transition hover:bg-neutral-800"
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
