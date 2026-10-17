import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-[10px] sm:rounded-[12px] bg-white p-2.5 sm:p-4 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.07)] border border-[#f0f0f0]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[6px] sm:rounded-[8px] bg-[#f5f5f5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-2.5 sm:mt-3.5 space-y-0.5 sm:space-y-1">
        {/* Title and Rating stars */}
        <div className="flex items-center justify-between gap-1 sm:gap-2">
          <h3 className="font-display text-[13px] sm:text-[15px] font-semibold text-[#222222] transition group-hover:text-black line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-0.5 text-[#FCA120] shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} fill="currentColor" stroke="none" />
            ))}
          </div>
        </div>

        {/* Brand */}
        <p className="text-[11px] sm:text-xs text-[#888888] font-normal truncate">
          {product.brand || "Al Karam"}
        </p>

        {/* Customer reviews */}
        <p className="text-[10px] sm:text-[11px] text-[#888888] truncate">
          ({(product.reviews || 240) > 100 ? `${((product.reviews || 240) / 100).toFixed(1)}k` : product.reviews}) Reviews
        </p>

        {/* Price and Stock status */}
        <div className="flex flex-wrap items-baseline justify-between gap-1 pt-1 sm:pt-2">
          <span className="font-display text-sm sm:text-base font-bold text-[#222222]">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[10px] sm:text-[11px] font-medium text-[#e53935]">
            almost Sold Out
          </span>
        </div>
      </div>
    </Link>
  );
}
