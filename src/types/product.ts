export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "One Size" | "40mm" | string;

export type ProductVariant = {
  id: string;
  size: ProductSize;
  color: string;
  colorHex: string;
  price: number;
  stock: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand?: string;
  collection?: string;
  tags?: string[];
  description: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  colors: Array<{ name: string; hex: string }>;
  sizes: ProductSize[];
  variants: ProductVariant[];
};

export type CartItem = {
  id: string;
  productId: string;
  productName: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};
