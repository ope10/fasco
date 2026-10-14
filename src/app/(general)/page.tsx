"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { PeakyBlindersSection } from "@/components/shop/peaky-blinders-section";
import { InstagramSection } from "@/components/shop/instagram-section";
import { TestimonialsSection } from "@/components/shop/testimonials-section";
import { NewsletterSection } from "@/components/shop/newsletter-section";
import { products } from "@/config/products";

// Deals items for the carousel from local Figma assets
const dealsItems = [
  {
    id: "deal-1",
    tag: "01 — Spring Sale",
    discount: "30% OFF",
    title: "Off-Shoulder Cocktail Dress",
    image: "/images/figma/deal-1.png",
  },
  {
    id: "deal-2",
    tag: "02 — Summer Set",
    discount: "40% OFF",
    title: "Two-Piece Ruffled Blue Set",
    image: "/images/figma/deal-2.png",
  },
  {
    id: "deal-3",
    tag: "03 — Urban Denim",
    discount: "25% OFF",
    title: "Retro Denim & Sunglasses",
    image: "/images/figma/deal-3.png",
  },
];

// Categories for New Arrivals filter
const arrivalCategories = [
  "Men's Fashion",
  "Women's Fashion",
  "Women Accessories",
  "Men Accessories",
  "Discount Deals",
];

export default function HomePage() {
  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: "02",
    hours: "06",
    minutes: "05",
    seconds: "30",
  });

  // Category filter state
  const [activeCategory, setActiveCategory] = useState("Women's Fashion");

  // Deals carousel state
  const [dealIndex, setDealIndex] = useState(0);

  // Countdown timer effect
  useEffect(() => {
    let totalSeconds = 2 * 86400 + 6 * 3600 + 5 * 60 + 30;
    const interval = setInterval(() => {
      totalSeconds = totalSeconds > 0 ? totalSeconds - 1 : 0;
      const d = Math.floor(totalSeconds / 86400);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filtered products for New Arrivals (takes the 6 products matching Figma)
  const newArrivals = products.filter((p) => p.id !== "denim-jacket").slice(0, 6);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION - Iconic 3-Column / 5-Frame Layout */}
      <section className="mx-auto max-w-7xl px-6 pt-4 pb-12 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr_1fr] items-stretch gap-5 lg:gap-7">
          {/* Left Column: Model Seated on Wooden Box */}
          <div className="relative aspect-[3/4.2] md:aspect-auto md:h-full min-h-[460px] lg:min-h-[560px] overflow-hidden rounded-[10px] bg-[#eaeaea] flex items-end justify-center">
            <Image
              src="/images/figma/hero-left.png"
              alt="Male model sitting"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 hover:scale-102"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>

          {/* Center Column: Top Banner + SALE Text + Bottom Banner */}
          <div className="flex flex-col justify-between gap-4 lg:gap-5 min-h-[460px] lg:min-h-[560px]">
            {/* Top Banner: Women Models */}
            <div className="relative h-[120px] lg:h-[140px] w-full overflow-hidden rounded-[10px] bg-[#eaeaea]">
              <Image
                src="/images/figma/hero-center-top.png"
                alt="Women fashion models"
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>

            {/* Center Content: ULTIMATE SALE */}
            <div className="py-2 text-center flex flex-col items-center justify-center my-auto">
              <h1 className="font-sans font-bold tracking-tight text-[44px] md:text-[52px] lg:text-[62px] leading-[1.05] text-[#484848]">
                ULTIMATE
              </h1>
              <div className="font-sans font-black tracking-wider text-[58px] md:text-[70px] lg:text-[84px] leading-[1.0] text-stroke">
                SALE
              </div>
              <p className="mt-2.5 text-[11px] md:text-xs font-semibold tracking-[0.25em] text-[#484848] uppercase">
                NEW COLLECTION
              </p>
              <div className="mt-4">
                <Link
                  href="/shop"
                  className="inline-block rounded-[10px] bg-black px-9 py-3 text-xs md:text-sm font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-neutral-800"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>

            {/* Bottom Banner: Girls on Coral */}
            <div className="relative h-[120px] lg:h-[140px] w-full overflow-hidden rounded-[10px] bg-[#f8b4a6]">
              <Image
                src="/images/figma/hero-center-bottom.png"
                alt="Fashion editorial models"
                fill
                priority
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>

          {/* Right Column: Model Seated on Stool in Orange Turtleneck */}
          <div className="relative aspect-[3/4.2] md:aspect-auto md:h-full min-h-[460px] lg:min-h-[560px] overflow-hidden rounded-[10px] bg-[#eaeaea] flex items-end justify-center">
            <Image
              src="/images/figma/hero-right.png"
              alt="Male model on stool in turtleneck"
              fill
              priority
              className="object-cover object-center transition-transform duration-700 hover:scale-102"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
          </div>
        </div>
      </section>

      {/* 2. LUXURY BRAND LOGO ROW */}
      <section className="border-y border-[#f0f0f0] bg-white py-9 md:py-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6 md:px-12">
          <span className="font-sans text-xl md:text-2xl font-black tracking-[0.22em] text-[#222222]">
            CHANEL
          </span>
          <span className="font-serif text-lg md:text-xl font-bold tracking-[0.18em] text-[#222222]">
            LOUIS VUITTON
          </span>
          <span className="font-serif text-xl md:text-2xl font-black tracking-[0.2em] text-[#222222]">
            PRADA
          </span>
          <span className="font-sans text-lg md:text-xl font-light tracking-[0.16em] text-[#222222]">
            Calvin Klein
          </span>
          <span className="font-mono text-xl md:text-2xl font-black tracking-[0.25em] text-[#222222]">
            DENIM
          </span>
        </div>
      </section>

      {/* 3. DEALS OF THE MONTH SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] items-center gap-12 lg:gap-16">
          {/* Left Column: Heading, CTA, Timer */}
          <div className="space-y-6 max-w-lg">
            <h2 className="font-display text-4xl md:text-[46px] font-normal leading-tight text-[#484848]">
              Deals Of The Month
            </h2>
            <p className="text-sm md:text-[15px] leading-relaxed text-[#8a8a8a]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
              ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin.
            </p>

            <div>
              <Link
                href="/deals"
                className="inline-block rounded-[10px] bg-black px-10 py-3.5 text-sm font-medium text-white shadow-md transition hover:bg-neutral-800"
              >
                Buy Now
              </Link>
            </div>

            <div className="pt-4 space-y-4">
              <h3 className="text-base font-semibold text-[#484848]">
                Hurry, Before It’s Too Late!
              </h3>

              {/* Countdown Boxes with Shadows */}
              <div className="flex items-center gap-3 sm:gap-4">
                {[
                  { value: timeLeft.days, label: "Days" },
                  { value: timeLeft.hours, label: "Hr" },
                  { value: timeLeft.minutes, label: "Mins" },
                  { value: timeLeft.seconds, label: "Sec" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-[8px] border border-[#f0f0f0] bg-white text-xl sm:text-2xl font-bold text-[#484848] shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
                      {item.value}
                    </div>
                    <span className="mt-1.5 block text-xs font-normal text-[#8a8a8a]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setDealIndex((prev) => (prev > 0 ? prev - 1 : dealsItems.length - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e8e8] bg-white text-[#484848] transition hover:bg-black hover:text-white"
                  aria-label="Previous deal"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setDealIndex((prev) => (prev < dealsItems.length - 1 ? prev + 1 : 0))}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e8e8] bg-white text-[#484848] transition hover:bg-black hover:text-white"
                  aria-label="Next deal"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Carousel of Deal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {dealsItems.map((item, index) => (
              <div
                key={item.id}
                className={`relative overflow-hidden rounded-[10px] bg-[#f4f4f4] aspect-[3/4.6] transition-all duration-300 ${
                  dealIndex === index ? "ring-2 ring-black shadow-lg" : "opacity-90 hover:opacity-100"
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                {/* Floating Discount Tag */}
                <div className="absolute bottom-4 left-4 right-4 rounded-[6px] bg-white/95 p-3 backdrop-blur-sm shadow-md">
                  <span className="text-[10px] font-medium text-[#8a8a8a]">{item.tag}</span>
                  <div className="text-sm font-bold text-[#484848]">{item.discount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEW ARRIVALS SECTION */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="text-center space-y-3 mb-10">
          <h2 className="font-display text-4xl md:text-[46px] font-normal text-[#484848]">
            New Arrivals
          </h2>
          <p className="mx-auto max-w-xl text-sm md:text-[15px] leading-relaxed text-[#8a8a8a]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
            ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-6">
            {arrivalCategories.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-[10px] px-5 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                    active
                      ? "bg-black text-white shadow-sm"
                      : "bg-[#f5f5f5] text-[#8a8a8a] hover:bg-[#eaeaea] hover:text-[#484848]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Cards Grid: 6 products matching Figma Screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/shop"
            className="rounded-[10px] bg-black px-12 py-3.5 text-sm font-medium text-white shadow-md transition hover:bg-neutral-800"
          >
            View More
          </Link>
        </div>
      </section>

      {/* 5. PEAKY BLINDERS SECTION (Figma design with image.svg & 4 features underneath) */}
      <PeakyBlindersSection />

      {/* 6. FOLLOW US ON INSTAGRAM (Alternating tall/short arrangement matching Figma) */}
      <InstagramSection />

      {/* 7. THIS IS WHAT OUR CUSTOMERS SAY (Active elevated card + peeking side cards) */}
      <TestimonialsSection />

      {/* 8. SUBSCRIBE TO OUR NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
}
