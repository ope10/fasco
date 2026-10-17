"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { products } from "@/config/products";

const categories = [
  "All",
  "Women's Fashion",
  "Men's Fashion",
  "Women Accessories",
  "Men Accessories",
  "Discount Deals",
];

export default function NewArrivalsPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = products.filter((p) => {
    if (activeTab === "All") return true;
    if (activeTab === "Discount Deals") {
      return Boolean(p.oldPrice && p.oldPrice > p.price);
    }
    return p.category.toLowerCase().trim() === activeTab.toLowerCase().trim();
  });

  const getCount = (cat: string) => {
    if (cat === "All") return products.length;
    if (cat === "Discount Deals") {
      return products.filter((p) => Boolean(p.oldPrice && p.oldPrice > p.price)).length;
    }
    return products.filter((p) => p.category.toLowerCase().trim() === cat.toLowerCase().trim()).length;
  };

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
            const count = getCount(cat);
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`rounded-[10px] px-5 py-2.5 text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  active
                    ? "bg-black text-white shadow-md scale-102"
                    : "bg-[#f5f5f5] text-[#8a8a8a] hover:bg-[#eaeaea] hover:text-[#484848]"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold ${
                    active ? "bg-white/20 text-white" : "bg-black/5 text-[#8a8a8a]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center">
          <div className="mx-auto w-14 h-14 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#8a8a8a] mb-4">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-display text-xl text-[#222222] font-medium mb-1">
            No products found in {activeTab}
          </h3>
          <p className="text-sm text-[#8a8a8a] max-w-md mx-auto mb-6">
            We are restocking new items regularly. Please check our full catalog or other categories.
          </p>
          <button
            onClick={() => setActiveTab("All")}
            className="rounded-[10px] bg-black px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:bg-neutral-800 transition cursor-pointer"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
