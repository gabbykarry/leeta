import { useMemo } from "react";
import { useProductStore } from "../store/useProductStore";
import type { Product } from "../types/Product";

export const useProductFilter = (products: Product[]) => {
  const {
    category,
    minPrice,
    maxPrice,
    vendor,
    searchTerm,
    favorites,
    showOnlyFavorites,
  } = useProductStore();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category
        ? product.category.toLowerCase().includes(category.toLowerCase())
        : true;

      const matchesVendor = vendor
        ? product.vendor.toLowerCase().includes(vendor.toLowerCase())
        : true;

      const matchesMinPrice = minPrice
        ? product.price >= Number(minPrice)
        : true;
      const matchesMaxPrice = maxPrice
        ? product.price <= Number(maxPrice)
        : true;

      const matchesSearch = searchTerm
        ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const isFavorite = !showOnlyFavorites || favorites.includes(product.id);

      return (
        matchesCategory &&
        matchesVendor &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesSearch &&
        isFavorite
      );
    });
  }, [
    products,
    category,
    minPrice,
    maxPrice,
    vendor,
    searchTerm,
    favorites,
    showOnlyFavorites,
  ]);

  return {
    filteredProducts,
  };
};
