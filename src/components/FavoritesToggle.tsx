import { useProductStore } from "../store/useProductStore";

const FavoritesToggle = () => {
  const { showOnlyFavorites, toggleShowOnlyFavorites } = useProductStore();

  return (
    <button
      onClick={toggleShowOnlyFavorites}
      className="mb-4 px-4 py-2 bg-red-500 text-white rounded"
    >
      {showOnlyFavorites ? "Show All Products" : "Show Only Favorites"}
    </button>
  );
};

export default FavoritesToggle;
