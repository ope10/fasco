import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "denim-jacket",
    slug: "denim-jacket",
    name: "Denim Jacket",
    category: "Women's Fashion",
    description:
      "A classic oversized denim jacket cut from washed heavy cotton twill. Detailed with branded hardware, double buttoned chest pockets, and a dropped shoulder silhouette.",
    price: 39.0,
    oldPrice: 59.0,
    rating: 4.0,
    reviews: 3,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Blue", hex: "#8da4c4" },
      { name: "Black", hex: "#222222" },
      { name: "Pink", hex: "#f3b9c7" },
    ],
    sizes: ["M", "L", "XL", "XXL"],
    variants: [
      { id: "denim-jacket-blue-m", size: "M", color: "Blue", colorHex: "#8da4c4", price: 39.0, stock: 9 },
      { id: "denim-jacket-black-m", size: "M", color: "Black", colorHex: "#222222", price: 39.0, stock: 5 },
      { id: "denim-jacket-pink-m", size: "M", color: "Pink", colorHex: "#f3b9c7", price: 39.0, stock: 4 },
    ],
  },
  {
    id: "prod-1",
    slug: "shiny-dress",
    name: "Shiny Dress",
    category: "Women's Fashion",
    description:
      "A stunning evening cocktail dress with delicate shimmer detailing and tailored silhouette.",
    price: 95.5,
    oldPrice: 135.0,
    rating: 5.0,
    reviews: 412,
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Black", hex: "#111111" },
      { name: "Emerald", hex: "#1b4d3e" },
      { name: "Gold", hex: "#d4af37" },
    ],
    sizes: ["XS", "S", "M", "L"],
    variants: [
      { id: "prod-1-black-s", size: "S", color: "Black", colorHex: "#111111", price: 95.5, stock: 5 },
      { id: "prod-1-black-m", size: "M", color: "Black", colorHex: "#111111", price: 95.5, stock: 8 },
    ],
  },
  {
    id: "prod-2",
    slug: "long-dress",
    name: "Long Dress",
    category: "Women's Fashion",
    description:
      "Elegantly draped column evening dress with delicate halter neck and open back silhouette.",
    price: 95.5,
    oldPrice: 140.0,
    rating: 5.0,
    reviews: 320,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Beige", hex: "#e0d5c1" },
      { name: "Gray", hex: "#888888" },
      { name: "Charcoal", hex: "#333333" },
    ],
    sizes: ["S", "M", "L", "XL"],
    variants: [
      { id: "prod-2-beige-m", size: "M", color: "Beige", colorHex: "#e0d5c1", price: 95.5, stock: 7 },
    ],
  },
  {
    id: "prod-3",
    slug: "full-sweater",
    name: "Full Sweater",
    category: "Women's Fashion",
    description:
      "Chic textured knit sweater featuring ribbed hem and relaxed bohemian mock neck.",
    price: 95.5,
    oldPrice: 120.0,
    rating: 5.0,
    reviews: 290,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Oatmeal", hex: "#d8c4b6" },
      { name: "White", hex: "#ffffff" },
      { name: "Blush", hex: "#ffb6c1" },
    ],
    sizes: ["XS", "S", "M", "L"],
    variants: [
      { id: "prod-3-oatmeal-s", size: "S", color: "Oatmeal", colorHex: "#d8c4b6", price: 95.5, stock: 9 },
    ],
  },
  {
    id: "prod-4",
    slug: "white-dress",
    name: "White Dress",
    category: "Women's Fashion",
    description:
      "Minimalist monochrome silhouette with structured lines and breathable cotton blend.",
    price: 95.5,
    oldPrice: 130.0,
    rating: 5.0,
    reviews: 185,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Cream", hex: "#fdfbf7" },
    ],
    sizes: ["S", "M", "L"],
    variants: [
      { id: "prod-4-white-m", size: "M", color: "White", colorHex: "#ffffff", price: 95.5, stock: 4 },
    ],
  },
  {
    id: "prod-5",
    slug: "colorful-dress",
    name: "Colorful Dress",
    category: "Women's Fashion",
    description:
      "Vibrant high-contrast patterned festival dress with short sleeves and flattering waistline.",
    price: 95.5,
    oldPrice: 125.0,
    rating: 5.0,
    reviews: 310,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Teal", hex: "#008080" },
      { name: "Coral", hex: "#ff7f50" },
    ],
    sizes: ["S", "M", "L", "XL"],
    variants: [
      { id: "prod-5-teal-m", size: "M", color: "Teal", colorHex: "#008080", price: 95.5, stock: 12 },
    ],
  },
  {
    id: "prod-6",
    slug: "white-shirt",
    name: "White Shirt",
    category: "Women's Fashion",
    description:
      "Crisp tailored poplin button-down shirt designed with clean French placket.",
    price: 95.5,
    oldPrice: 110.0,
    rating: 5.0,
    reviews: 265,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Light Blue", hex: "#add8e6" },
    ],
    sizes: ["M", "L", "XL"],
    variants: [
      { id: "prod-6-white-m", size: "M", color: "White", colorHex: "#ffffff", price: 95.5, stock: 6 },
    ],
  },
  {
    id: "prod-7",
    slug: "mini-dress-ruffled",
    name: "Mini Dress With Ruffled Straps",
    category: "Women's Fashion",
    description:
      "Delicate ruffled party mini dress with sweetheart neckline and ruffled shoulder accents.",
    price: 100.0,
    oldPrice: 150.0,
    rating: 5.0,
    reviews: 198,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Red", hex: "#e53935" },
      { name: "Black", hex: "#0a0a0a" },
    ],
    sizes: ["S", "M", "L"],
    variants: [
      { id: "prod-7-red", size: "M", color: "Red", colorHex: "#e53935", price: 100.0, stock: 8 },
    ],
  },
  {
    id: "prod-8",
    slug: "classic-red-fedora-dress",
    name: "Velvet Cocktail Dress",
    category: "Women's Fashion",
    description:
      "Fitted black velvet cocktail dress paired with red wool wide-brim fedora hat.",
    price: 89.0,
    oldPrice: 120.0,
    rating: 4.8,
    reviews: 142,
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Wine", hex: "#722f37" },
    ],
    sizes: ["S", "M", "L"],
    variants: [
      { id: "prod-8-black", size: "S", color: "Black", colorHex: "#000000", price: 89.0, stock: 11 },
    ],
  },
  {
    id: "prod-9",
    slug: "choker-knit-top",
    name: "Laminated Knit Sweater",
    category: "Women's Fashion",
    description:
      "Contemporary mockneck top featuring metallic finish and silver choker necklace accent.",
    price: 68.0,
    oldPrice: 95.0,
    rating: 4.7,
    reviews: 118,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Charcoal", hex: "#333333" },
      { name: "Silver", hex: "#cccccc" },
    ],
    sizes: ["XS", "S", "M"],
    variants: [
      { id: "prod-9-charcoal", size: "M", color: "Charcoal", colorHex: "#333333", price: 68.0, stock: 5 },
    ],
  },
];

export const featuredProducts = products.slice(1, 7);
