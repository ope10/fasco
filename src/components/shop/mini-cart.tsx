"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { useAuthStore } from "@/store/use-auth-store";

export function MiniCart() {
  const router = useRouter();
  const {
    items,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem,
    wrapProduct,
    setWrapProduct,
    subtotal,
  } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const totalAmount = subtotal();
  const freeShippingThreshold = 150;
  const amountNeeded = Math.max(0, freeShippingThreshold - totalAmount);
  const progressPercent = Math.min(100, Math.round((totalAmount / freeShippingThreshold) * 100));

  // Lock background scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  const handleCheckout = () => {
    closeDrawer();
    if (!isAuthenticated) {
      alert("Login To FASCO in order to Proceed to buying products.");
      router.push("/sign-in?redirect=/checkout");
      return;
    }
    router.push("/checkout");
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div
        onClick={closeDrawer}
        className="fixed inset-0 bg-black/45 backdrop-blur-[2px] transition-opacity"
      />

      {/* Slide-over Drawer matching Figma Screenshot 4 */}
      <aside className="relative z-10 flex h-full w-full max-w-[420px] sm:max-w-[460px] flex-col bg-white shadow-2xl transition-transform">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#f0f0f0] px-6 py-5">
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#222222]">
            Shopping Cart
          </h2>
          <button
            onClick={closeDrawer}
            className="rounded-full p-2 text-[#666666] transition hover:bg-[#f5f5f5] hover:text-black"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress bar */}
        <div className="border-b border-[#f2f2f2] bg-[#fbfbfb] px-6 py-3.5">
          <p className="text-xs font-medium text-[#444444]">
            {amountNeeded > 0 ? (
              <>
                Buy <strong className="font-bold text-black">${amountNeeded.toFixed(2)}</strong> More And Get <strong className="font-bold text-black">Free Shipping</strong>
              </>
            ) : (
              <span className="font-bold text-[#2e7d32]">Congratulations! You unlocked Free Shipping!</span>
            )}
          </p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#e8e8e8]">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#f2f2f2]">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <p className="text-sm text-[#777777]">Your cart is currently empty.</p>
              <Link
                href="/shop"
                onClick={closeDrawer}
                className="mt-4 rounded-[8px] bg-black px-6 py-2.5 text-xs font-semibold text-white"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                {/* Thumbnail image */}
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-[8px] bg-[#f5f5f5]">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold text-[#222222] line-clamp-1">
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-[#999999] hover:text-[#d32f2f] transition"
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="mt-0.5 text-xs text-[#777777]">
                      Color : {item.color}
                    </p>
                    <p className="mt-1 text-sm font-bold text-[#222222]">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="mt-3 flex w-fit items-center rounded-[6px] bg-[#f4f4f4] px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 text-[#666666] hover:text-black transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-[#222222]">
                      {String(item.quantity).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 text-[#666666] hover:text-black transition"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {items.length > 0 && (
          <div className="border-t border-[#f0f0f0] bg-white px-6 py-5 space-y-4">
            {/* Gift wrap checkbox */}
            <label className="flex items-center gap-3 text-xs text-[#555555] cursor-pointer">
              <input
                type="checkbox"
                checked={wrapProduct}
                onChange={(e) => setWrapProduct(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
              />
              <span>
                For <strong className="font-semibold text-black">$10.00</strong> Please Wrap The Product
              </span>
            </label>

            <div className="border-t border-[#f2f2f2] pt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#444444]">Subtotal</span>
              <span className="font-display text-lg font-bold text-[#111111]">
                ${totalAmount.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full rounded-[8px] bg-black py-3.5 text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-neutral-800 active:scale-98"
            >
              Checkout
            </button>

            <div className="text-center">
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="text-xs font-semibold text-[#444444] underline hover:text-black transition"
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
