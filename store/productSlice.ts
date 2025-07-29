import { create } from "zustand";
import { Product, mockProducts } from "../data/products";

type CartItem = Product & { quantity: number };

type State = {
  products: Product[];
  searchTerm: string;
  category: string;
  cart: CartItem[];
};

type Actions = {
  setSearchTerm: (term: string) => void;
  setCategory: (category: string) => void;
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  cartTotal: () => number;
};

export const useProductStore = create<State & Actions>((set, get) => ({
  products: mockProducts,
  searchTerm: "",
  category: "",
  cart: [],

  setSearchTerm: (term) => set({ searchTerm: term }),
  setCategory: (category) => set({ category }),
  addToCart: (product) => {
    const cart = get().cart;
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      set({
        cart: cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
    }
  },
  updateQuantity: (id, delta) => {
    const updated = get()
      .cart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
      .filter((item) => item.quantity > 0);
    set({ cart: updated });
  },
  removeFromCart: (id) => {
    set({ cart: get().cart.filter((item) => item.id !== id) });
  },
  cartTotal: () =>
    get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
