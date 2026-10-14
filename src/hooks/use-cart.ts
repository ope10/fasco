import { useCartStore } from "@/store/use-cart-store";

export function useCart() {
  const items = useCartStore((state) => state.items);
  const itemCount = useCartStore((state) => state.itemCount());
  const subtotal = useCartStore((state) => state.subtotal());

  return {
    items,
    itemCount,
    subtotal,
  };
}
