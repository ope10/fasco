import Link from "next/link";
import { ProductCard } from "@/components/shop/product-card";
import { products } from "@/config/products";

export default function DealsPage() {
  const dealsProducts = products.filter((p) => p.oldPrice);

  return (
    <div className="mx-auto max-w-7xl px-6 py-14 md:px-10">
      <div className="mb-12 text-center space-y-3">
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8a8a8a]">
          Exclusive Offers
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-normal text-[#484848]">
          Deals Of The Month
        </h1>
        <p className="mx-auto max-w-lg text-sm text-[#8a8a8a]">
          Special seasonal discounts and limited-time designer markdowns. Save up to 50% across selected styles.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dealsProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link
          href="/shop"
          className="rounded-[10px] bg-black px-10 py-3.5 text-sm font-medium text-white shadow-md transition hover:bg-neutral-800"
        >
          Explore All Products
        </Link>
      </div>
    </div>
  );
}
