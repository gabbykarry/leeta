import { useProductStore } from "../store/useProductStore";

const Filters = () => {
  const {
    category,
    minPrice,
    maxPrice,
    vendor,
    setCategory,
    setMinPrice,
    setMaxPrice,
    setVendor,
  } = useProductStore();

  return (
    <div className="grid md:grid-cols-4 gap-4 mb-6">
      <input
        type="text"
        placeholder="Filter by Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Vendor name"
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
        className="p-2 border rounded"
      />
    </div>
  );
};

export default Filters;
