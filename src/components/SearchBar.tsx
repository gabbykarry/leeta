import { useState } from "react";
import { useProductStore } from "../store/useProductStore";
import { useDebounce } from "../hooks/useDebounce";

const SearchBar = () => {
  const [input, setInput] = useState("");
  const setSearchTerm = useProductStore((s) => s.setSearchTerm);
  useDebounce(input, 500, setSearchTerm);

  return (
    <div className="mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search by product name..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default SearchBar;
