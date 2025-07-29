import { create } from "zustand";
import { mockProducts } from "../data/products";
import type { Product } from "../types/Product";

type CartItem = Product & { quantity: number };

type State = {
  products: Product[];
  cart: CartItem[];
  searchTerm: string;
  category: string;
  minPrice: string;
  maxPrice: string;
  vendor: string;
  favorites: number[];
  showOnlyFavorites: boolean;
};

type Actions = {
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  cartTotal: () => number;
  setSearchTerm: (term: string) => void;
  setCategory: (category: string) => void;
  setMinPrice: (price: string) => void;
  setMaxPrice: (price: string) => void;
  setVendor: (vendor: string) => void;
  toggleFavorite: (id: number) => void;
  toggleShowOnlyFavorites: () => void;
  loadFavoritesFromStorage: () => void;
};

export const useProductStore = create<State & Actions>((set, get) => ({
  products: mockProducts,
  cart: [],
  searchTerm: "",
  category: "",
  minPrice: "",
  maxPrice: "",
  vendor: "",
  favorites: [],
  showOnlyFavorites: false,

  setSearchTerm: (term) => set({ searchTerm: term }),
  setCategory: (category) => set({ category }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setVendor: (vendor) => set({ vendor }),

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
  cartTotal: () => {
    return get().cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  },

  toggleFavorite: (id) => {
    const current = get().favorites;
    const updated = current.includes(id)
      ? current.filter((favId) => favId !== id)
      : [...current, id];
    localStorage.setItem("favorites", JSON.stringify(updated));
    set({ favorites: updated });
  },

  toggleShowOnlyFavorites: () =>
    set((state) => ({ showOnlyFavorites: !state.showOnlyFavorites })),

  loadFavoritesFromStorage: () => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      set({ favorites: JSON.parse(stored) });
    }
  },
}));
