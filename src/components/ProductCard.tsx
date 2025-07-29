import { FaHeart, FaRegHeart } from "react-icons/fa";
import type { Product } from "../types/Product";
import { useProductStore } from "../store/useProductStore";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { favorites, toggleFavorite, addToCart } = useProductStore();

  const isFavorite = favorites.includes(product.id);

  return (
    <div className="bg-black rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => toggleFavorite(product.id)}
          className="absolute top-2 right-2 text-xl"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 drop-shadow" />
          ) : (
            <FaRegHeart className="text-white drop-shadow" />
          )}
        </button>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
        <p className="text-sm text-gray-500">Category: {product.category}</p>
        <p className="text-sm text-gray-500">Vendor: {product.vendor}</p>
        <p className="text-base font-bold mt-2">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          className="mt-3 block w-full bg-[#415444] text-white text-sm py-2 px-4 rounded-lg hover:bg-[#354a3b]"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
