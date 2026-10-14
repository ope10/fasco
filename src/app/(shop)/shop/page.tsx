"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/config/products";
import { PeakyBlindersSection } from "@/components/shop/peaky-blinders-section";
import { InstagramSection } from "@/components/shop/instagram-section";
import { NewsletterSection } from "@/components/shop/newsletter-section";

const filterSizes = ["S", "M", "L", "XL"];
const filterColors = [
  { name: "Red", hex: "#ef4444" },
  { name: "Orange", hex: "#f97316" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Green", hex: "#22c55e" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Purple", hex: "#a855f7" },
  { name: "Pink", hex: "#ec4899" },
];
const filterPrices = [
  "$0 - $50",
  "$50 - $100",
  "$100 - $150",
  "$150 - $200",
  "$200 - $250",
];
const filterBrands = ["Minis", "Zara", "Bershka", "Pull&Bear", "Stradivarius"];
const filterCollections = ["All Collections", "Spring 2024", "Summer 2024", "Winter 2024"];
const filterTags = [
  "Fashion",
  "Style",
  "Minimal",
  "Casual",
  "Dress",
  "Summer",
  "Urban",
  "Winter",
];

export default function ShopPage() {
  const [selectedSize, setSelectedSize] = useState<string | null>("M");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 9 products for the 3x3 grid matching Figma Screenshot 3
  const catalogProducts = products.slice(0, 9);

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {/* Page Header matching Figma Screenshot 3 */}
        <div className="text-center py-6">
          <h1 className="font-display text-4xl sm:text-5xl font-normal text-[#222222]">
            Fashion
          </h1>
          <div className="mt-2 text-xs text-[#888888] flex items-center justify-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-black transition">
              Home
            </Link>
            <span>&gt;</span>
            <span className="text-black font-semibold">Fashion</span>
          </div>
        </div>

        {/* 2-Column Layout: Sidebar Filters + 3x3 Products Grid */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10">
          {/* Left Sidebar: Filters */}
          <aside className="space-y-8">
            <h2 className="font-display text-xl font-bold text-[#222222] border-b border-[#f0f0f0] pb-3">
              Filters
            </h2>

            {/* Size Filter */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444] mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-2">
                {filterSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size === selectedSize ? null : size)}
                    className={`h-9 min-w-9 rounded-[6px] border px-3 text-xs font-medium transition ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-[#e0e0e0] bg-white text-[#444444] hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors Filter */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444] mb-3">
                Colors
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {filterColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name === selectedColor ? null : color.name)}
                    className={`h-6 w-6 rounded-full border border-white shadow-sm transition hover:scale-110 ${
                      selectedColor === color.name ? "ring-2 ring-black" : "ring-1 ring-[#e0e0e0]"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Prices Filter */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444] mb-3">
                Prices
              </h3>
              <div className="space-y-2">
                {filterPrices.map((price) => (
                  <button
                    key={price}
                    onClick={() => setSelectedPrice(price === selectedPrice ? null : price)}
                    className={`block w-full text-left text-xs transition ${
                      selectedPrice === price
                        ? "font-bold text-black"
                        : "text-[#777777] hover:text-black"
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands Filter */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444] mb-3">
                Brands
              </h3>
              <div className="space-y-2">
                {filterBrands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2.5 text-xs text-[#666666] cursor-pointer">
                    <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300 text-black focus:ring-black" />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Collections Filter */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444] mb-3">
                Collections
              </h3>
              <div className="space-y-2">
                {filterCollections.map((col) => (
                  <p key={col} className="text-xs text-[#777777] hover:text-black cursor-pointer">
                    {col}
                  </p>
                ))}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444] mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {filterTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#f4f4f4] px-2.5 py-1 text-[11px] text-[#666666] hover:bg-[#e8e8e8] cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Area: 3x3 Products Catalog matching Figma Screenshot 3 */}
          <div>
            <div className="mb-6 flex items-center justify-between text-xs text-[#777777]">
              <span>Showing 9 of 24 Results</span>
              <span className="font-medium text-black">Sort by: Popular</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {catalogProducts.map((product) => (
                <div key={product.id} className="group flex flex-col">
                  {/* Image container */}
                  <Link
                    href={`/products/${product.id}`}
                    className="relative aspect-[3/4.2] w-full overflow-hidden rounded-[8px] bg-[#f5f5f5]"
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </Link>

                  {/* Info */}
                  <div className="mt-3.5 flex flex-col gap-1">
                    <Link
                      href={`/products/${product.id}`}
                      className="font-display text-sm font-semibold text-[#222222] hover:text-[#555555] transition line-clamp-1"
                    >
                      {product.name}
                    </Link>
                    <span className="text-xs text-[#888888]">Al Karam</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-sm font-bold text-[#222222]">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-[10px] font-semibold text-[#e53935]">
                        Almost Sold Out
                      </span>
                    </div>

                    {/* Color swatches */}
                    <div className="mt-2 flex gap-1.5">
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          className="h-3 w-3 rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="mt-12 flex items-center justify-center gap-2">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`h-8 w-8 rounded-full text-xs font-semibold transition ${
                    currentPage === page
                      ? "bg-black text-white"
                      : "border border-[#e0e0e0] bg-white text-[#444444] hover:border-black"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
                className="h-8 rounded-full border border-[#e0e0e0] bg-white px-3 text-xs font-semibold text-[#444444] hover:border-black"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Peaky Blinders Banner matching Figma */}
      <PeakyBlindersSection />

      {/* Follow Us On Instagram */}
      <InstagramSection />

      {/* Subscribe To Our Newsletter */}
      <NewsletterSection />
    </div>
  );
}
