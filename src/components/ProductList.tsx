import { useEffect } from "react";
import ProductCard from "./ProductCard";
import { useProductStore } from "../store/useProductStore";
import { useProductFilter } from "../hooks/useProductFilter";

const ProductList = () => {
  const { products, loadFavoritesFromStorage } = useProductStore();
  const { filteredProducts } = useProductFilter(products);

  useEffect(() => {
    loadFavoritesFromStorage();
  }, [loadFavoritesFromStorage]);

  if (filteredProducts.length === 0) {
    return <p className="text-center text-gray-500 mt-6">No products found.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
