import CartSidebar from "./components/CartSidebar";
import FavoritesToggle from "./components/FavoritesToggle";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";

function App() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <div className="w-full px-6 lg:px-12 xl:px-20 py-8 max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-left">Product Listing</h1>
          <FavoritesToggle />
          <SearchBar />
          <Filters />
          <ProductList />
        </div>
      </div>
      <CartSidebar />
    </div>
  );
}

export default App;
