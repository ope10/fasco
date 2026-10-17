import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "denim-jacket",
    slug: "denim-jacket",
    name: "Denim Jacket",
    category: "Women's Fashion",
    brand: "Zara",
    collection: "Spring 2024",
    tags: ["Fashion", "Casual", "Urban"],
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
    brand: "Al Karam",
    collection: "Winter 2024",
    tags: ["Fashion", "Dress", "Style"],
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
  {
    id: "men-1",
    slug: "classic-denim-jacket-men",
    name: "Classic Denim Jacket",
    category: "Men's Fashion",
    description: "Rugged vintage washed denim jacket with metal shank buttons and tailored trucker fit.",
    price: 89.0,
    oldPrice: 120.0,
    rating: 4.9,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Vintage Indigo", hex: "#3b5998" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    sizes: ["S", "M", "L", "XL"],
    variants: [
      { id: "men-1-indigo-m", size: "M", color: "Vintage Indigo", colorHex: "#3b5998", price: 89.0, stock: 8 },
    ],
  },
  {
    id: "men-2",
    slug: "tailored-linen-blazer",
    name: "Tailored Linen Blazer",
    category: "Men's Fashion",
    description: "Unstructured summer blazer woven from breathable Mediterranean linen with notch lapels.",
    price: 129.0,
    oldPrice: 175.0,
    rating: 5.0,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Sand", hex: "#d8c3a5" },
      { name: "Navy", hex: "#001f3f" },
    ],
    sizes: ["M", "L", "XL"],
    variants: [
      { id: "men-2-sand-m", size: "M", color: "Sand", colorHex: "#d8c3a5", price: 129.0, stock: 6 },
    ],
  },
  {
    id: "men-3",
    slug: "minimalist-oxford-shirt",
    name: "Minimalist Oxford Shirt",
    category: "Men's Fashion",
    description: "Clean essential button-down shirt made with premium brushed cotton oxford fabric.",
    price: 65.0,
    oldPrice: 85.0,
    rating: 4.8,
    reviews: 340,
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Sky Blue", hex: "#87ceeb" },
      { name: "Pure White", hex: "#ffffff" },
    ],
    sizes: ["S", "M", "L", "XL"],
    variants: [
      { id: "men-3-blue-l", size: "L", color: "Sky Blue", colorHex: "#87ceeb", price: 65.0, stock: 12 },
    ],
  },
  {
    id: "men-4",
    slug: "relaxed-cotton-chinos",
    name: "Relaxed Cotton Chinos",
    category: "Men's Fashion",
    description: "Everyday straight-leg chinos designed with stretch cotton twill for comfort and ease.",
    price: 75.0,
    oldPrice: 95.0,
    rating: 4.7,
    reviews: 190,
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Khaki", hex: "#c3b091" },
      { name: "Olive", hex: "#556b2f" },
    ],
    sizes: ["30", "32", "34", "36"],
    variants: [
      { id: "men-4-khaki-32", size: "32", color: "Khaki", colorHex: "#c3b091", price: 75.0, stock: 9 },
    ],
  },
  {
    id: "w-acc-1",
    slug: "structured-leather-crossbody",
    name: "Structured Leather Crossbody Bag",
    category: "Women Accessories",
    description: "Sleek architectural handbag with gold turn-lock closure and adjustable shoulder strap.",
    price: 110.0,
    oldPrice: 145.0,
    rating: 5.0,
    reviews: 420,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Cognac Brown", hex: "#9a4f21" },
      { name: "Noir Black", hex: "#111111" },
    ],
    sizes: ["One Size"],
    variants: [
      { id: "w-acc-1-brown", size: "One Size", color: "Cognac Brown", colorHex: "#9a4f21", price: 110.0, stock: 7 },
    ],
  },
  {
    id: "w-acc-2",
    slug: "gold-geometric-hoops",
    name: "18K Gold Geometric Hoops",
    category: "Women Accessories",
    description: "Sculptural hollow tube chunky gold hoops made from recycled 18k gold vermeil.",
    price: 45.0,
    oldPrice: 65.0,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Gold", hex: "#ffd700" },
      { name: "Silver", hex: "#c0c0c0" },
    ],
    sizes: ["One Size"],
    variants: [
      { id: "w-acc-2-gold", size: "One Size", color: "Gold", colorHex: "#ffd700", price: 45.0, stock: 15 },
    ],
  },
  {
    id: "w-acc-3",
    slug: "vintage-tortoise-sunglasses",
    name: "Vintage Tortoise Sunglasses",
    category: "Women Accessories",
    description: "Chic cat-eye sunglasses featuring acetate tortoise frames with 100% UV400 protective lenses.",
    price: 55.0,
    oldPrice: 75.0,
    rating: 4.8,
    reviews: 148,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Tortoise", hex: "#5c3a21" },
      { name: "Gloss Black", hex: "#000000" },
    ],
    sizes: ["One Size"],
    variants: [
      { id: "w-acc-3-tortoise", size: "One Size", color: "Tortoise", colorHex: "#5c3a21", price: 55.0, stock: 10 },
    ],
  },
  {
    id: "m-acc-1",
    slug: "chronograph-minimalist-watch",
    name: "Chronograph Minimalist Watch",
    category: "Men Accessories",
    description: "Sleek matte stainless steel timepiece with sapphire glass and vegetable-tanned leather band.",
    price: 145.0,
    oldPrice: 195.0,
    rating: 5.0,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Silver / Tan", hex: "#d2b48c" },
      { name: "All Black", hex: "#111111" },
    ],
    sizes: ["40mm"],
    variants: [
      { id: "m-acc-1-tan", size: "40mm", color: "Silver / Tan", colorHex: "#d2b48c", price: 145.0, stock: 5 },
    ],
  },
  {
    id: "m-acc-2",
    slug: "full-grain-leather-belt",
    name: "Full-Grain Italian Leather Belt",
    category: "Men Accessories",
    description: "Artisan handcrafted full-grain leather belt finished with brushed antique brass hardware.",
    price: 58.0,
    oldPrice: 78.0,
    rating: 4.8,
    reviews: 165,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Espresso Brown", hex: "#4b3621" },
      { name: "Classic Black", hex: "#000000" },
    ],
    sizes: ["32", "34", "36", "38"],
    variants: [
      { id: "m-acc-2-brown-34", size: "34", color: "Espresso Brown", colorHex: "#4b3621", price: 58.0, stock: 11 },
    ],
  },
  {
    id: "m-acc-3",
    slug: "classic-aviator-sunglasses",
    name: "Classic Aviator Sunglasses",
    category: "Men Accessories",
    description: "Iconic teardrop metal frame sunglasses with gradient polarized UV lenses.",
    price: 68.0,
    oldPrice: 90.0,
    rating: 4.9,
    reviews: 204,
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=900&q=80",
    ],
    colors: [
      { name: "Gold / Green", hex: "#2e8b57" },
      { name: "Gunmetal / Grey", hex: "#4a4a4a" },
    ],
    sizes: ["One Size"],
    variants: [
      { id: "m-acc-3-gold", size: "One Size", color: "Gold / Green", colorHex: "#2e8b57", price: 68.0, stock: 8 },
    ],
  },
];

export const featuredProducts = products.slice(1, 7);
