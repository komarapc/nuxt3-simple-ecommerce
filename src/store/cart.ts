import type { CartProps } from "@/src/interface/products";
import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [] as CartProps[],
  }),
  actions: {
    addItem(item: CartProps) {
      this.items.push(item);
    },
    removeItem(id: string) {
      this.items = this.items.filter((item) => item.id !== id);
    },
    clearCart() {
      this.items = [];
    },
    changeQuantity(id: string, quantity: number) {
      const item = this.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    countSubtotalCart() {
      if (this.items.length === 0) return 0;
      return this.items.reduce(
        (acc, item) =>
          acc + Number(item.product?.price || 0) * Number(item.quantity || 0),
        0
      );
    },
  },
});
