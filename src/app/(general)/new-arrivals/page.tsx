"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/shop/product-card";
import { products } from "@/config/products";

const categories = [
  "All",
  "Women's Fashion",
  "Men's Fashion",
  "Women Accessories",
  "Men Accessories",
];

export default function NewArrivalsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = products.filter(
    (p) => activeTab === "All" || p.category === activeTab
  );

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
      <div className="mb-10 text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a8a8a]">
          Fresh Drops
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-normal text-[#484848]">
          New Arrivals
        </h1>
        <p className="mx-auto max-w-lg text-sm text-[#8a8a8a]">
          Explore the newest curated releases from FASCO. Refined cuts, premium materials, and modern editorial styling.
        </p>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-6">
          {categories.map((cat) => {
            const active = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
