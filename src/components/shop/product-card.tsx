import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block overflow-hidden rounded-[12px] bg-white p-3 sm:p-4 transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.07)] border border-[#f0f0f0]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[8px] bg-[#f5f5f5]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="mt-3.5 space-y-1">
        {/* Title and Rating stars */}
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-[15px] font-semibold text-[#222222] transition group-hover:text-black line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center gap-0.5 text-[#FCA120] shrink-0">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} fill="currentColor" stroke="none" />
            ))}
          </div>
        </div>

        {/* Brand */}
        <p className="text-xs text-[#888888] font-normal">Al Karam</p>

        {/* Customer reviews */}
        <p className="text-[11px] text-[#888888]">
          ({(product.reviews || 240) > 100 ? `${((product.reviews || 240) / 100).toFixed(1)}k` : product.reviews}) Customer Reviews
        </p>

        {/* Price and Stock status */}
        <div className="flex items-center justify-between pt-2">
          <span className="font-display text-base font-bold text-[#222222]">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[11px] font-medium text-[#e53935]">
            almost Sold Out
          </span>
        </div>
      </div>
    </Link>
  );
}
