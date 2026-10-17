"use client";

import { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { X, Filter, RotateCcw, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { products } from "@/config/products";
import type { Product } from "@/types/product";
import { PeakyBlindersSection } from "@/components/shop/peaky-blinders-section";
import { InstagramSection } from "@/components/shop/instagram-section";
import { NewsletterSection } from "@/components/shop/newsletter-section";

const filterSizes = ["XS", "S", "M", "L", "XL", "One Size"];

const filterColors = [
  { name: "Black", hex: "#111111" },
  { name: "White", hex: "#ffffff" },
  { name: "Blue", hex: "#3b82f6" },
  { name: "Brown", hex: "#8b5a2b" },
  { name: "Green", hex: "#22c55e" },
  { name: "Red", hex: "#ef4444" },
  { name: "Pink", hex: "#ec4899" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Cyan", hex: "#06b6d4" },
  { name: "Purple", hex: "#a855f7" },
  { name: "Orange", hex: "#f97316" },
];

const filterPrices = [
  { label: "$0 - $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $150", min: 100, max: 150 },
  { label: "$150 - $200", min: 150, max: 200 },
  { label: "$200 - $250", min: 200, max: 250 },
];

const filterBrands = ["Al Karam", "Zara", "Bershka", "Minis", "Pull&Bear", "Stradivarius"];
const filterCollections = ["All Collections", "Spring 2024", "Summer 2024", "Winter 2024"];
const filterCategories = ["All Categories", "Women's Fashion", "Men's Fashion", "Women Accessories", "Men Accessories"];

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

const COLOR_FAMILIES: Record<string, string[]> = {
  Black: ["black", "charcoal", "noir", "gunmetal", "dark"],
  White: ["white", "cream", "ivory", "pure white", "oatmeal"],
  Blue: ["blue", "sky blue", "indigo", "navy", "denim", "teal"],
  Brown: ["brown", "tan", "khaki", "beige", "cognac", "espresso", "tortoise", "sand"],
  Green: ["green", "emerald", "olive", "teal", "mint"],
  Red: ["red", "wine", "coral", "blush", "ruby"],
  Pink: ["pink", "blush", "rose"],
  Yellow: ["yellow", "gold"],
  Cyan: ["cyan", "teal", "turquoise", "aqua"],
  Purple: ["purple", "violet", "lavender"],
  Orange: ["orange", "coral", "peach"],
};

const ITEMS_PER_PAGE = 9;

function ShopCatalog() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory || null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("popular");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState<boolean>(false);

  // Check if any filter is active
  const hasActiveFilters = Boolean(
    selectedCategory ||
      selectedSize ||
      selectedColor ||
      selectedPrice ||
      selectedBrands.length > 0 ||
      selectedCollection ||
      selectedTag
  );

  const resetAllFilters = () => {
    setSelectedCategory(null);
    setSelectedSize(null);
    setSelectedColor(null);
    setSelectedPrice(null);
    setSelectedBrands([]);
    setSelectedCollection(null);
    setSelectedTag(null);
    setCurrentPage(1);
  };

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // 1. Category filter
        if (selectedCategory && selectedCategory !== "All Categories") {
          if (product.category.toLowerCase().trim() !== selectedCategory.toLowerCase().trim()) {
            return false;
          }
        }

        // 2. Size filter
        if (selectedSize) {
          const hasInSizes = product.sizes?.some(
            (s) => s.toLowerCase() === selectedSize.toLowerCase()
          );
          const hasInVariants = product.variants?.some(
            (v) => v.size.toLowerCase() === selectedSize.toLowerCase()
          );
          if (!hasInSizes && !hasInVariants) return false;
        }

        // 3. Color filter
        if (selectedColor) {
          const targetKeywords = COLOR_FAMILIES[selectedColor] || [selectedColor.toLowerCase()];
          const hasMatchingColor = product.colors.some((c) => {
            const name = c.name.toLowerCase();
            return targetKeywords.some((keyword) => name.includes(keyword));
          });
          if (!hasMatchingColor) return false;
        }

        // 4. Price filter
        if (selectedPrice) {
          const range = filterPrices.find((p) => p.label === selectedPrice);
          if (range) {
            if (product.price < range.min || product.price > range.max) {
              return false;
            }
          }
        }

        // 5. Brands filter
        if (selectedBrands.length > 0) {
          const productBrand = product.brand || "Al Karam";
          if (!selectedBrands.includes(productBrand)) {
            return false;
          }
        }

        // 6. Collection filter
        if (selectedCollection && selectedCollection !== "All Collections") {
          const productCollection = product.collection || "Spring 2024";
          if (productCollection.toLowerCase() !== selectedCollection.toLowerCase()) {
            return false;
          }
        }

        // 7. Tag filter
        if (selectedTag) {
          const tagLower = selectedTag.toLowerCase();
          const inTags = product.tags?.some((t) => t.toLowerCase() === tagLower);
          const inCategory = product.category.toLowerCase().includes(tagLower);
          const inName = product.name.toLowerCase().includes(tagLower);
          const inDesc = product.description.toLowerCase().includes(tagLower);
          if (!inTags && !inCategory && !inName && !inDesc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return b.id.localeCompare(a.id);
        // Default "popular"
        return (b.reviews || 0) - (a.reviews || 0);
      });
  }, [
    selectedCategory,
    selectedSize,
    selectedColor,
    selectedPrice,
    selectedBrands,
    selectedCollection,
    selectedTag,
    sortBy,
  ]);

  // Pagination calculation
  const totalResults = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {/* Page Header */}
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

        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between border-y border-[#f0f0f0] py-3.5 my-4">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex items-center gap-2 text-xs font-semibold text-[#222222] uppercase tracking-wider"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{mobileFiltersOpen ? "Hide Filters" : "Show Filters"}</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-black"></span>
            )}
          </button>
          <span className="text-xs text-[#777777]">{totalResults} Results</span>
        </div>

        {/* 2-Column Layout: Sidebar Filters + Products Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 items-start">
          {/* Left Sidebar: Filters */}
          <aside className={`space-y-8 ${mobileFiltersOpen ? "block" : "hidden lg:block"}`}>
            <div className="flex items-center justify-between border-b border-[#f0f0f0] pb-3">
              <h2 className="font-display text-xl font-bold text-[#222222]">
                Filters
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-[#e53935] hover:underline flex items-center gap-1 font-medium cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset all
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444] mb-3">
                Category
              </h3>
              <div className="space-y-1.5">
                {filterCategories.map((cat) => {
                  const isAll = cat === "All Categories";
                  const active = isAll
                    ? !selectedCategory || selectedCategory === "All Categories"
                    : selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(isAll ? null : cat);
                        setCurrentPage(1);
                      }}
                      className={`block w-full text-left text-xs py-1 transition cursor-pointer ${
                        active
                          ? "font-bold text-black"
                          : "text-[#777777] hover:text-black"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Size
                </h3>
                {selectedSize && (
                  <button
                    onClick={() => {
                      setSelectedSize(null);
                      setCurrentPage(1);
                    }}
                    className="text-[10px] text-[#888888] hover:text-black"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {filterSizes.map((size) => {
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(active ? null : size);
                        setCurrentPage(1);
                      }}
                      className={`h-9 min-w-9 rounded-[6px] border px-3 text-xs font-medium transition cursor-pointer ${
                        active
                          ? "border-black bg-black text-white shadow-xs"
                          : "border-[#e0e0e0] bg-white text-[#444444] hover:border-black"
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Colors
                </h3>
                {selectedColor && (
                  <button
                    onClick={() => {
                      setSelectedColor(null);
                      setCurrentPage(1);
                    }}
                    className="text-[10px] text-[#888888] hover:text-black"
                  >
                    Clear ({selectedColor})
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {filterColors.map((color) => {
                  const active = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(active ? null : color.name);
                        setCurrentPage(1);
                      }}
                      className={`h-6 w-6 rounded-full border border-white shadow-xs transition hover:scale-110 cursor-pointer ${
                        active ? "ring-2 ring-black scale-110" : "ring-1 ring-[#e0e0e0]"
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                      aria-label={`Filter by color ${color.name}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Prices Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Prices
                </h3>
                {selectedPrice && (
                  <button
                    onClick={() => {
                      setSelectedPrice(null);
                      setCurrentPage(1);
                    }}
                    className="text-[10px] text-[#888888] hover:text-black"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {filterPrices.map((item) => {
                  const active = selectedPrice === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => {
                        setSelectedPrice(active ? null : item.label);
                        setCurrentPage(1);
                      }}
                      className={`block w-full text-left text-xs transition cursor-pointer py-0.5 ${
                        active
                          ? "font-bold text-black"
                          : "text-[#777777] hover:text-black"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Brands Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Brands
                </h3>
                {selectedBrands.length > 0 && (
                  <button
                    onClick={() => {
                      setSelectedBrands([]);
                      setCurrentPage(1);
                    }}
                    className="text-[10px] text-[#888888] hover:text-black"
                  >
                    Clear ({selectedBrands.length})
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {filterBrands.map((brand) => {
                  const checked = selectedBrands.includes(brand);
                  return (
                    <label
                      key={brand}
                      className="flex items-center gap-2.5 text-xs text-[#666666] cursor-pointer hover:text-black transition"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleBrandToggle(brand)}
                        className="h-3.5 w-3.5 rounded border-gray-300 text-black focus:ring-black accent-black cursor-pointer"
                      />
                      <span className={checked ? "font-semibold text-black" : ""}>
                        {brand}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Collections Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Collections
                </h3>
                {selectedCollection && (
                  <button
                    onClick={() => {
                      setSelectedCollection(null);
                      setCurrentPage(1);
                    }}
                    className="text-[10px] text-[#888888] hover:text-black"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="space-y-2">
                {filterCollections.map((col) => {
                  const isAll = col === "All Collections";
                  const active = isAll
                    ? !selectedCollection || selectedCollection === "All Collections"
                    : selectedCollection === col;
                  return (
                    <p
                      key={col}
                      onClick={() => {
                        setSelectedCollection(isAll ? null : col);
                        setCurrentPage(1);
                      }}
                      className={`text-xs transition cursor-pointer py-0.5 ${
                        active
                          ? "font-bold text-black"
                          : "text-[#777777] hover:text-black"
                      }`}
                    >
                      {col}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Tags Filter */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#444444]">
                  Tags
                </h3>
                {selectedTag && (
                  <button
                    onClick={() => {
                      setSelectedTag(null);
                      setCurrentPage(1);
                    }}
                    className="text-[10px] text-[#888888] hover:text-black"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {filterTags.map((tag) => {
                  const active = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      onClick={() => {
                        setSelectedTag(active ? null : tag);
                        setCurrentPage(1);
                      }}
                      className={`rounded-full px-2.5 py-1 text-[11px] transition cursor-pointer ${
                        active
                          ? "bg-black text-white font-medium shadow-2xs"
                          : "bg-[#f4f4f4] text-[#666666] hover:bg-[#e8e8e8]"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Area: Products Catalog */}
          <div>
            {/* Top Bar: Results Count & Active Filter Pills & Sort Select */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-[#f0f0f0] pb-4 text-xs text-[#777777]">
              <div>
                {totalResults === 0 ? (
                  <span>Showing 0 Results</span>
                ) : (
                  <span>
                    Showing {startIndex + 1}–{Math.min(startIndex + ITEMS_PER_PAGE, totalResults)} of {totalResults} Results
                  </span>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-select" className="text-[#888888]">
                  Sort by:
                </label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="rounded-[6px] border border-[#e0e0e0] bg-white px-2.5 py-1 text-xs font-medium text-black focus:border-black focus:outline-none cursor-pointer"
                >
                  <option value="popular">Popular (Most Reviewed)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Active Filters Summary Chips */}
            {hasActiveFilters && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-xs text-[#888888] font-medium mr-1">Active filters:</span>
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f4f4] px-3 py-1 text-xs font-medium text-black">
                    Category: {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="hover:text-red-500 cursor-pointer ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedSize && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f4f4] px-3 py-1 text-xs font-medium text-black">
                    Size: {selectedSize}
                    <button
                      onClick={() => setSelectedSize(null)}
                      className="hover:text-red-500 cursor-pointer ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedColor && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f4f4] px-3 py-1 text-xs font-medium text-black">
                    Color: {selectedColor}
                    <button
                      onClick={() => setSelectedColor(null)}
                      className="hover:text-red-500 cursor-pointer ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedPrice && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f4f4] px-3 py-1 text-xs font-medium text-black">
                    Price: {selectedPrice}
                    <button
                      onClick={() => setSelectedPrice(null)}
                      className="hover:text-red-500 cursor-pointer ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedBrands.map((b) => (
                  <span
                    key={b}
                    className="inline-flex items-center gap-1 rounded-full bg-[#f4f4f4] px-3 py-1 text-xs font-medium text-black"
                  >
                    Brand: {b}
                    <button
                      onClick={() => handleBrandToggle(b)}
                      className="hover:text-red-500 cursor-pointer ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {selectedCollection && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f4f4] px-3 py-1 text-xs font-medium text-black">
                    Collection: {selectedCollection}
                    <button
                      onClick={() => setSelectedCollection(null)}
                      className="hover:text-red-500 cursor-pointer ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                {selectedTag && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#f4f4f4] px-3 py-1 text-xs font-medium text-black">
                    Tag: {selectedTag}
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="hover:text-red-500 cursor-pointer ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-[#e53935] hover:underline font-semibold cursor-pointer ml-1"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Products Grid or Empty State */}
            {totalResults === 0 ? (
              <div className="py-20 text-center border border-dashed border-[#e0e0e0] rounded-[12px] bg-[#fafafa]">
                <div className="mx-auto w-12 h-12 rounded-full bg-[#eaeaea] flex items-center justify-center text-[#777777] mb-3">
                  <Filter className="w-5 h-5" />
                </div>
                <h3 className="font-display text-lg font-semibold text-[#222222] mb-1">
                  No products match your filters
                </h3>
                <p className="text-xs text-[#888888] max-w-sm mx-auto mb-5">
                  Try unchecking some filters or resetting to view our full collection.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="rounded-[8px] bg-black px-6 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-neutral-800 transition cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6">
                {paginatedProducts.map((product) => (
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
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </Link>

                    {/* Info */}
                    <div className="mt-2.5 sm:mt-3.5 flex flex-col gap-0.5 sm:gap-1">
                      <Link
                        href={`/products/${product.id}`}
                        className="font-display text-xs sm:text-sm font-semibold text-[#222222] hover:text-[#555555] transition line-clamp-1"
                      >
                        {product.name}
                      </Link>
                      <span className="text-[11px] sm:text-xs text-[#888888] truncate">
                        {product.brand || "Al Karam"}
                      </span>
                      <div className="flex flex-wrap items-baseline justify-between gap-1 mt-0.5 sm:mt-1">
                        <span className="text-xs sm:text-sm font-bold text-[#222222]">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.oldPrice && product.oldPrice > product.price ? (
                          <span className="text-[10px] font-semibold text-[#e53935]">
                            ${product.oldPrice.toFixed(2)}
                          </span>
                        ) : (
                          <span className="text-[9px] sm:text-[10px] font-semibold text-[#e53935]">
                            Almost Sold Out
                          </span>
                        )}
                      </div>

                      {/* Color swatches */}
                      <div className="mt-1.5 sm:mt-2 flex gap-1 sm:gap-1.5">
                        {product.colors.map((c) => (
                          <span
                            key={c.name}
                            className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full border border-black/10"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`h-8 px-3 rounded-full border text-xs font-semibold transition ${
                    currentPage === 1
                      ? "border-[#f0f0f0] text-[#cccccc] cursor-not-allowed"
                      : "border-[#e0e0e0] bg-white text-[#444444] hover:border-black cursor-pointer"
                  }`}
                >
                  Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-8 w-8 rounded-full text-xs font-semibold transition cursor-pointer ${
                      currentPage === page
                        ? "bg-black text-white"
                        : "border border-[#e0e0e0] bg-white text-[#444444] hover:border-black"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`h-8 px-3 rounded-full border text-xs font-semibold transition ${
                    currentPage === totalPages
                      ? "border-[#f0f0f0] text-[#cccccc] cursor-not-allowed"
                      : "border-[#e0e0e0] bg-white text-[#444444] hover:border-black cursor-pointer"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
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

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center text-xs text-[#888888]">
          Loading shop catalog...
        </div>
      }
    >
      <ShopCatalog />
    </Suspense>
  );
}
