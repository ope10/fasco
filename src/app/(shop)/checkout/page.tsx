"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, CreditCard, AlertCircle } from "lucide-react";
import { useCartStore } from "@/store/use-cart-store";
import { useAuthStore } from "@/store/use-auth-store";
import { NewsletterSection } from "@/components/shop/newsletter-section";

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const { items, subtotal } = useCartStore();
  const { isAuthenticated, user } = useAuthStore();

  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  useEffect(() => {
    setMounted(true);
    if (user) {
      if (user.email) setEmail(user.email);
      if (user.name) {
        setFirstName(user.name.split(" ")[0] || "");
        setLastName(user.name.split(" ")[1] || "");
      }
    }
  }, [user]);

  const rawSubtotal = subtotal() > 0 ? subtotal() : 100.0;
  const shippingCost = 0.0; // Free shipping
  const discountAmount = discountApplied ? 15.0 : 0.0;
  const totalCost = Math.max(0, rawSubtotal + shippingCost - discountAmount);

  if (!mounted) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 min-h-[60vh] flex items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#ececec] border-t-black" />
      </div>
    );
  }

  // Default display items if cart is empty for testing
  const checkoutItems =
    items.length > 0
      ? items
      : [
          {
            id: "mini-dress-ruffled-red",
            productId: "prod-7",
            productName: "Mini Dress With Ruffled Straps",
            color: "Red",
            size: "M",
            price: 100.0,
            quantity: 1,
            image:
              "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
          },
        ];

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      router.push("/sign-in?redirect=/checkout&notice=login-required");
      return;
    }

    const orderNumber = "ORD-" + Math.floor(10000 + Math.random() * 90000);
    router.push(`/order-confirmation?order=${orderNumber}`);
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        {/* Main Title matching Figma Screenshot 5 */}
        <div className="text-center pb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-normal text-[#222222]">
            FASCO Demo Checkout
          </h1>
        </div>

        {/* Notice if not logged in */}
        {!isAuthenticated && (
          <div className="mb-8 flex items-center justify-between rounded-[10px] bg-amber-50 p-4 border border-amber-200">
            <div className="flex items-center gap-3">
              <AlertCircle className="text-amber-600 shrink-0" size={20} />
              <span className="text-xs sm:text-sm font-semibold text-amber-900">
                Without login the user can not buy. Login To FASCO in order to Proceed to buying products.
              </span>
            </div>
            <Link
              href="/sign-in?redirect=/checkout"
              className="rounded-[6px] bg-black px-4 py-2 text-xs font-semibold text-white shrink-0 hover:bg-neutral-800 transition"
            >
              Sign In
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-start">
            {/* Left Column: Form Fields matching Figma Screenshot 5 */}
            <form onSubmit={handlePayNow} className="space-y-10">
              {/* 1. Contact Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-2xl font-normal text-[#222222]">
                    Contact
                  </h2>
                  <div className="text-xs text-[#666666]">
                    Have an account?{" "}
                    <Link
                      href="/sign-in?redirect=/checkout"
                      className="font-medium text-[#222222] underline hover:text-black"
                    >
                      Create Account
                    </Link>
                  </div>
                </div>

                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-xs sm:text-sm text-[#222222] outline-none transition focus:border-black placeholder:text-[#999999]"
                  />
                </div>
              </div>

              {/* 2. Delivery Section */}
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-[#222222]">
                  Delivery
                </h2>

                <div className="space-y-3">
                  <div>
                    <select
                      className="w-full rounded-[6px] border border-[#d8d8d8] bg-white px-4 py-3 text-xs sm:text-sm text-[#444444] outline-none transition focus:border-black"
                    >
                      <option value="US">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="CA">Canada</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="First Name"
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-xs sm:text-sm text-[#222222] outline-none transition focus:border-black placeholder:text-[#999999]"
                    />
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Last Name"
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-xs sm:text-sm text-[#222222] outline-none transition focus:border-black placeholder:text-[#999999]"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Address"
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-xs sm:text-sm text-[#222222] outline-none transition focus:border-black placeholder:text-[#999999]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-xs sm:text-sm text-[#222222] outline-none transition focus:border-black placeholder:text-[#999999]"
                    />
                    <input
                      type="text"
                      required
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Postal Code"
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-xs sm:text-sm text-[#222222] outline-none transition focus:border-black placeholder:text-[#999999]"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 text-xs text-[#555555] cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span>Save This Info For Future</span>
                  </label>
                </div>
              </div>

              {/* 3. Payment Section */}
              <div className="space-y-4">
                <h2 className="font-display text-2xl font-normal text-[#222222]">
                  Payment
                </h2>

                <div className="rounded-[6px] border border-[#d8d8d8] bg-white p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3 text-xs font-semibold text-[#222222]">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} />
                      <span>Credit Card</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-red-600 text-[11px]">Mastercard</span>
                      <span className="font-bold text-blue-700 text-[11px]">VISA</span>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 pr-10 text-xs sm:text-sm text-[#222222] outline-none transition focus:border-black placeholder:text-[#999999]"
                    />
                    <Lock
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={expDate}
                      onChange={(e) => setExpDate(e.target.value)}
                      placeholder="MM / YY"
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-xs sm:text-sm text-[#222222] outline-none transition focus:border-black placeholder:text-[#999999]"
                    />
                    <input
                      type="text"
                      required
                      value={securityCode}
                      onChange={(e) => setSecurityCode(e.target.value)}
                      placeholder="CVC / CVV"
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-xs sm:text-sm text-[#222222] outline-none transition focus:border-black placeholder:text-[#999999]"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Card Holder Name"
                      className="w-full rounded-[6px] border border-[#d8d8d8] px-4 py-3 text-xs sm:text-sm text-[#222222] outline-none transition focus:border-black placeholder:text-[#999999]"
                    />
                  </div>

                  <label className="flex items-center gap-2.5 text-xs text-[#555555] cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span>Save This Info For Future</span>
                  </label>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                type="submit"
                className="w-full rounded-[8px] bg-black py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-neutral-800 active:scale-98"
              >
                Pay Now
              </button>

              <div className="text-center pt-2">
                <p className="text-[11px] text-[#888888]">
                  Copyright © 2026 FASCO. All Rights Reserved.
                </p>
              </div>
            </form>

            {/* Right Column: Order Summary & Cart Products Window matching Figma Screenshot 5 */}
            <aside className="rounded-[14px] bg-[#f9f9f9] border border-[#eeeeee] p-7 sm:p-9 space-y-6">
              {/* Product items in cart */}
              <div className="space-y-4">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    {/* Thumbnail with red quantity badge */}
                    <div className="relative h-18 w-16 shrink-0 overflow-hidden rounded-[8px] bg-white border border-[#e5e5e5]">
                      <Image
                        src={item.image}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                      <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#d32f2f] text-[10px] font-bold text-white shadow-sm">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-[#222222]">
                        {item.productName}
                      </h4>
                      <p className="text-xs text-[#777777]">{item.color}</p>
                    </div>

                    <div className="text-xs sm:text-sm font-bold text-[#222222]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code Input */}
              <div className="flex gap-2 border-y border-[#e8e8e8] py-5">
                <input
                  type="text"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Discount code"
                  className="flex-1 rounded-[6px] border border-[#d8d8d8] bg-white px-4 py-2.5 text-xs text-[#222222] outline-none focus:border-black placeholder:text-[#999999]"
                />
                <button
                  type="button"
                  onClick={handleApplyDiscount}
                  className="rounded-[6px] bg-black px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-neutral-800"
                >
                  Apply
                </button>
              </div>

              {/* Cost Totals matching Figma Screenshot 5 */}
              <div className="space-y-3 text-xs sm:text-sm text-[#666666]">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#222222]">${rawSubtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-emerald-600">Free</span>
                </div>

                {discountApplied && (
                  <div className="flex items-center justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t border-[#e8e8e8] pt-4 flex items-center justify-between text-base font-bold text-[#222222]">
                  <span>Total</span>
                  <span>${totalCost.toFixed(2)}</span>
                </div>
              </div>
            </aside>
          </div>
      </div>

      {/* Subscribe To Our Newsletter */}
      <NewsletterSection />
    </div>
  );
}
