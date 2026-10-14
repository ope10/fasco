import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { CartItem, Product, ProductVariant } from "@/types/product";

type CartState = {
  items: CartItem[];
  isDrawerOpen: boolean;
  wrapProduct: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
  setWrapProduct: (wrap: boolean) => void;
  addItem: (
    product: Product,
    variant: Pick<ProductVariant, "color" | "size" | "price">,
    quantity?: number,
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: () => number;
  subtotal: () => number;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [
        // Seed default item matching Figma screens if empty initially
        {
          id: "denim-jacket-Red-M",
          productId: "denim-jacket",
          productName: "Denim Jacket",
          color: "Red",
          size: "M",
          price: 14.80,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
        },
      ],
      isDrawerOpen: false,
      wrapProduct: false,
      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
      setWrapProduct: (wrap) => set({ wrapProduct: wrap }),
      addItem: (product, variant, quantity = 1) => {
        const id = `${product.id}-${variant.color}-${variant.size}`;
        const existing = get().items.find((item) => item.id === id);

        set({
          isDrawerOpen: true,
          items: existing
            ? get().items.map((item) =>
                item.id === id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              )
            : [
                ...get().items,
                {
                  id,
                  productId: product.id,
                  productName: product.name,
                  color: variant.color,
                  size: variant.size,
                  price: variant.price,
                  quantity,
                  image: product.image,
                },
              ],
        });
      },
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item,
            )
            .filter((item) => item.quantity > 0),
        }));
      },
      clearCart: () => set({ items: [] }),
      itemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () => {
        const base = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        return get().wrapProduct ? base + 10 : base;
      },
    }),
    { name: "fasco-cart" },
  ),
);
