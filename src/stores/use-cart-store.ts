import { create } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  image: string;
  quantity: number;
  fit?: string;
  gsm?: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (newItem) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.size === newItem.size &&
          item.color === newItem.color
      );

      if (existingIndex > -1) {
        const updated = [...state.items];
        updated[existingIndex].quantity += newItem.quantity;
        return { items: updated, isOpen: true };
      }

      return { items: [...state.items, newItem], isOpen: true };
    });
  },
  removeItem: (id, size, color) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item.id === id && item.size === size && item.color === color)
      ),
    }));
  },
  updateQuantity: (id, size, color, quantity) => {
    set((state) => ({
      items: state.items
        .map((item) => {
          if (item.id === id && item.size === size && item.color === color) {
            return { ...item, quantity: Math.max(1, quantity) };
          }
          return item;
        }),
    }));
  },
  clearCart: () => set({ items: [] }),
  totalPrice: () => {
    return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
  totalCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
