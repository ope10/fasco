import Link from "next/link";
import { ProductCard } from "@/components/shop/product-card";
import { products } from "@/config/products";

export default function PackagesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
      <div className="mb-10 text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a8a8a]">
          Curated Bundles
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-normal text-[#484848]">
          FASCO Packages
        </h1>
        <p className="mx-auto max-w-lg text-sm text-[#8a8a8a]">
          Exclusive wardrobe bundle packages and matching sets designed for effortless styling.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
