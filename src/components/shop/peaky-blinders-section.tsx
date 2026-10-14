"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Award, ShieldCheck, Truck, Headphones } from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { useCartStore } from "@/store/use-cart-store";

export function PeakyBlindersSection() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const addItem = useCartStore((state) => state.addItem);

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      alert("Login To FASCO in order to Proceed to buying products.");
      router.push("/sign-in?redirect=/checkout");
      return;
    }

    // Add Peaky Blinders signature item to cart and proceed to checkout
    addItem(
      {
        id: "peaky-blinders-special",
        slug: "peaky-blinders-collection",
        name: "Peaky Blinders Suit & Cap",
        category: "Women Collection",
        description: "Peaky Blinders bespoke tailored suit with accessories.",
        price: 100.0,
        rating: 5.0,
        reviews: 88,
        image: "/images/figma/image.svg",
        gallery: ["/images/figma/image.svg"],
        colors: [{ name: "Charcoal", hex: "#333333" }],
        sizes: ["M"],
        variants: [],
      },
      { color: "Charcoal", size: "M", price: 100.0 },
      1
    );
    router.push("/checkout");
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 md:px-10">
      {/* Peaky Blinders Banner Card matching Figma */}
      <div className="relative overflow-hidden rounded-[16px] bg-[#dadbdc] shadow-sm grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] items-stretch">
        {/* Left Side: SVG illustration with model and callouts */}
        <div className="relative bg-[#f8f8f8] flex items-center justify-center p-2 lg:p-0 overflow-hidden">
          {/* Note: image.svg includes the angled cut on its right edge */}
          <div className="relative w-full aspect-[1055/570] flex items-center justify-center">
            <img
              src="/images/figma/image.svg"
              alt="Peaky Blinders Collection"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col justify-center px-8 py-10 lg:px-14 lg:py-12 bg-[#dadbdc]">
          <span className="text-xs uppercase tracking-[0.2em] text-[#666666] font-medium">
            Women Collection
          </span>
          <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-[44px] font-normal leading-[1.15] text-[#222222]">
            Peaky Blinders
          </h2>

          <div className="mt-5">
            <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-[#333333]">
              DESCRIPTION
            </span>
            <p className="mt-2 text-xs sm:text-[13px] leading-relaxed text-[#555555] max-w-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque
              duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices
              sollicitudin. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Scelerisque duis.
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <span className="text-xs font-medium text-[#444444]">Size</span>
            <span className="flex h-6 min-w-6 items-center justify-center rounded bg-black px-2 text-[11px] font-bold text-white shadow-sm">
              M
            </span>
          </div>

          <div className="mt-5">
            <span className="font-display text-2xl sm:text-3xl font-bold text-[#111111]">
              $100.00
            </span>
          </div>

          <div className="mt-6">
            <button
              onClick={handleBuyNow}
              className="inline-block rounded-[8px] bg-black px-10 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-neutral-800 active:scale-95"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* 4-Feature Icons Row directly underneath the Peaky Blinders banner */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 border-y border-[#eeeeee] py-10">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8f8f8] text-[#222222]">
            <Award size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#222222]">High Quality</h4>
            <p className="text-xs text-[#777777]">crafted from top materials</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8f8f8] text-[#222222]">
            <ShieldCheck size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#222222]">Warrany Protection</h4>
            <p className="text-xs text-[#777777]">Over 2 years</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8f8f8] text-[#222222]">
            <Truck size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#222222]">Free Shipping</h4>
            <p className="text-xs text-[#777777]">Order over 150 $</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f8f8f8] text-[#222222]">
            <Headphones size={24} strokeWidth={1.5} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#222222]">24 / 7 Support</h4>
            <p className="text-xs text-[#777777]">Dedicated support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
