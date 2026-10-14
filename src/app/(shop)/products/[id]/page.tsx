"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Eye,
  Minus,
  Plus,
  Scale,
  HelpCircle,
  Share2,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { products } from "@/config/products";
import { useCartStore } from "@/store/use-cart-store";
import { useAuthStore } from "@/store/use-auth-store";
import { PeakyBlindersSection } from "@/components/shop/peaky-blinders-section";
import { NewsletterSection } from "@/components/shop/newsletter-section";

const alsoLovedDeals = [
  {
    id: "al-1",
    tag: "01 — Spring Sale",
    discount: "30% OFF",
    title: "Off-Shoulder Cocktail Dress",
    image: "/images/figma/deal-1.png",
  },
  {
    id: "al-2",
    tag: "02 — Summer Set",
    discount: "40% OFF",
    title: "Two-Piece Ruffled Blue Set",
    image: "/images/figma/deal-2.png",
  },
  {
    id: "al-3",
    tag: "03 — Urban Denim",
    discount: "25% OFF",
    title: "Retro Denim & Sunglasses",
    image: "/images/figma/deal-3.png",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const product = products.find((item) => item.id === id) || products[0];

  const [selectedImage, setSelectedImage] = useState(product.gallery[0] || product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "M");
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "Blue");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);
  const { isAuthenticated } = useAuthStore();

  // Deals countdown
  const [countdown, setCountdown] = useState({
    days: "02",
    hours: "06",
    minutes: "05",
    seconds: "30",
  });

  useEffect(() => {
    let secs = 2 * 86400 + 6 * 3600 + 5 * 60 + 30;
    const interval = setInterval(() => {
      secs = secs > 0 ? secs - 1 : 0;
      setCountdown({
        days: String(Math.floor(secs / 86400)).padStart(2, "0"),
        hours: String(Math.floor((secs % 86400) / 3600)).padStart(2, "0"),
        minutes: String(Math.floor((secs % 3600) / 60)).padStart(2, "0"),
        seconds: String(secs % 60).padStart(2, "0"),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = () => {
    addItem(
      product,
      {
        color: selectedColor,
        size: selectedSize,
        price: product.price,
      },
      quantity
    );
    // Opens mini cart drawer automatically
    openDrawer();
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      alert("Login To FASCO in order to Proceed to buying products.");
      router.push("/sign-in?redirect=/checkout");
      return;
    }
    addItem(
      product,
      {
        color: selectedColor,
        size: selectedSize,
        price: product.price,
      },
      quantity
    );
    router.push("/checkout");
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
        {/* Main Product Showcase matching Figma Screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
          {/* Images Area: Left Thumbnails + Hero View */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            {/* Vertical thumbnails */}
            <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-visible shrink-0 sm:w-20">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-20 w-20 overflow-hidden rounded-[8px] bg-[#f5f5f5] border transition ${
                    selectedImage === img
                      ? "border-black shadow-sm"
                      : "border-[#e5e5e5] hover:border-[#888888]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image */}
            <div className="relative aspect-[3/4] flex-1 overflow-hidden rounded-[12px] bg-[#f5f5f5] min-h-[460px] sm:min-h-[580px]">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>

          {/* Right Area: Product Details */}
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#888888] font-semibold">
                FASCO
              </span>
              <div className="mt-1 flex items-center justify-between">
                <h1 className="font-display text-3xl sm:text-4xl font-normal text-[#222222]">
                  {product.name}
                </h1>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="p-2 text-[#444444] hover:text-black transition"
                  aria-label="Add to wishlist"
                >
                  <Star
                    size={22}
                    fill={isFavorite ? "#000000" : "none"}
                    stroke="currentColor"
                  />
                </button>
              </div>
            </div>

            {/* Rating Stars & Reviews */}
            <div className="flex items-center gap-2 text-xs text-[#777777]">
              <div className="flex items-center gap-0.5 text-[#FCA120]">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    stroke="currentColor"
                  />
                ))}
              </div>
              <span className="font-medium">({product.reviews || 3})</span>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-3">
              <span className="font-display text-2xl sm:text-3xl font-bold text-[#222222]">
                ${product.price.toFixed(2)}
              </span>
              {product.oldPrice && (
                <span className="text-base text-[#999999] line-through">
                  ${product.oldPrice.toFixed(2)}
                </span>
              )}
              <span className="rounded-[4px] bg-[#ffebee] px-2 py-0.5 text-[11px] font-bold uppercase text-[#d32f2f]">
                SAVE 33%
              </span>
            </div>

            {/* Live Viewers Indicator */}
            <div className="flex items-center gap-2 text-xs text-[#666666]">
              <Eye size={16} />
              <span>24 people are viewing this right now</span>
            </div>

            {/* Sale Countdown Banner in soft red */}
            <div className="flex items-center justify-between rounded-[8px] bg-[#fff1f1] px-4 py-3 text-xs font-semibold text-[#d32f2f] border border-[#ffcdd2]">
              <span>Hurry up! Sale ends in:</span>
              <span className="font-mono text-sm tracking-wider">
                00 : {countdown.hours} : {countdown.minutes} : {countdown.seconds}
              </span>
            </div>

            {/* Stock Progress */}
            <div>
              <div className="text-xs font-medium text-[#444444] mb-1.5">
                Only <strong className="font-bold text-[#d32f2f]">9 item(s)</strong> left in stock!
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#f0f0f0] overflow-hidden">
                <div className="h-full w-24 bg-[#d32f2f] rounded-full" />
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#444444] mb-2.5">
                Size: <span className="font-normal">{selectedSize}</span>
              </div>
              <div className="flex gap-2.5">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`h-9 min-w-9 rounded-[6px] border px-3 text-xs font-bold transition ${
                      selectedSize === sz
                        ? "border-black bg-black text-white"
                        : "border-[#e0e0e0] bg-white text-[#444444] hover:border-black"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#444444] mb-2.5">
                Color: <span className="font-normal">{selectedColor}</span>
              </div>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`h-7 w-7 rounded-full border border-white shadow-sm transition hover:scale-110 ${
                      selectedColor === c.name ? "ring-2 ring-black" : "ring-1 ring-[#e0e0e0]"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart Button */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#444444] block">
                Quantity
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex w-32 items-center justify-between rounded-[8px] border border-[#e0e0e0] bg-[#fafafa] px-3 py-2.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-[#666666] hover:text-black transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm font-bold text-[#222222]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-[#666666] hover:text-black transition"
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 rounded-[8px] border border-black bg-white py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-black transition hover:bg-black hover:text-white active:scale-98"
                >
                  Add to cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 rounded-[8px] bg-black py-3.5 px-6 text-xs font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-neutral-800 active:scale-98"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-6 border-y border-[#f0f0f0] py-4 text-xs font-medium text-[#666666]">
              <button className="flex items-center gap-1.5 hover:text-black transition">
                <Scale size={15} /> Compare
              </button>
              <button className="flex items-center gap-1.5 hover:text-black transition">
                <HelpCircle size={15} /> Ask a question
              </button>
              <button className="flex items-center gap-1.5 hover:text-black transition">
                <Share2 size={15} /> Share
              </button>
            </div>

            {/* Shipping & Delivery Info */}
            <div className="space-y-2 text-xs text-[#666666]">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#222222]" />
                <span>
                  <strong>Estimated Delivery:</strong> 12 - 26 Aug, 2024
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw size={16} className="text-[#222222]" />
                <span>
                  <strong>Free Shipping & Returns:</strong> On all orders over $75
                </span>
              </div>
            </div>

            {/* Safe Checkout Badges */}
            <div className="rounded-[8px] bg-[#fafafa] p-4 text-center border border-[#f0f0f0]">
              <div className="flex items-center justify-center gap-3 text-sm font-semibold text-[#666666]">
                <span className="font-mono font-bold text-blue-700">VISA</span>
                <span className="font-bold text-red-600">Mastercard</span>
                <span className="font-bold text-blue-500">Amex</span>
                <span className="font-bold text-blue-800">PayPal</span>
              </div>
              <p className="mt-2 text-[11px] text-[#888888]">
                Guarantee safe & secure checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Peaky Blinders Banner matching Figma Screenshot 2 */}
      <PeakyBlindersSection />

      {/* "People Also Loved" carousel matching Figma Screenshot 2 */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] items-center gap-12 lg:gap-16">
          {/* Left Column: Heading, CTA, Timer */}
          <div className="space-y-6 max-w-lg">
            <h2 className="font-display text-4xl md:text-[46px] font-normal leading-tight text-[#222222]">
              People Also Loved
            </h2>
            <p className="text-sm leading-relaxed text-[#777777]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis
              ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin.
            </p>

            <div>
              <Link
                href="/shop"
                className="inline-block rounded-[8px] bg-black px-10 py-3.5 text-xs font-semibold uppercase tracking-wider text-white shadow-md transition hover:bg-neutral-800"
              >
                Buy Now
              </Link>
            </div>

            <div className="pt-4 space-y-4">
              <h3 className="text-base font-semibold text-[#222222]">
                Hurry, Before It’s Too Late!
              </h3>

              {/* Countdown Boxes with Shadows */}
              <div className="flex items-center gap-3 sm:gap-4">
                {[
                  { value: countdown.days, label: "Days" },
                  { value: countdown.hours, label: "Hr" },
                  { value: countdown.minutes, label: "Mins" },
                  { value: countdown.seconds, label: "Sec" },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-[8px] border border-[#f0f0f0] bg-white text-xl sm:text-2xl font-bold text-[#222222] shadow-[0_10px_25px_rgba(0,0,0,0.06)]">
                      {item.value}
                    </div>
                    <span className="mt-1.5 block text-xs font-normal text-[#888888]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#444444] transition hover:bg-black hover:text-white"
                  aria-label="Previous"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0e0e0] bg-white text-[#444444] transition hover:bg-black hover:text-white"
                  aria-label="Next"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Carousel of Deal Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {alsoLovedDeals.map((item) => (
              <div
                key={item.id}
                className="relative overflow-hidden rounded-[10px] bg-[#f4f4f4] aspect-[3/4.6] transition-all hover:scale-102 shadow-sm"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-[6px] bg-white/95 p-3 backdrop-blur-sm shadow-md">
                  <span className="text-[10px] font-medium text-[#888888]">{item.tag}</span>
                  <div className="text-sm font-bold text-[#222222]">{item.discount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe To Our Newsletter */}
      <NewsletterSection />
    </div>
  );
}
