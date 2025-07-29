import type { Product } from "../types/Product";
import Hoodie from "../assets/images/hoodie.jpg";
import Jean from "../assets/images/jean.jpg";
import Mouse from "../assets/images/mouse.jpg";
import Mug from "../assets/images/cup.jpg";
import Watch from "../assets/images/watch.jpg";
import Note from "../assets/images/note.jpg";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Red Hoodie",
    category: "Clothing",
    imageUrl: Hoodie,
    price: 49.99,
    vendor: "Trendy Wear",
  },
  {
    id: 2,
    name: "Blue Jeans",
    category: "Clothing",
    imageUrl: Jean,
    price: 79.99,
    vendor: "Fashion Hub",
  },
  {
    id: 3,
    name: "Wireless Mouse",
    category: "Electronics",
    imageUrl: Mouse,
    price: 29.99,
    vendor: "Techie",
  },
  {
    id: 4,
    name: "Coffee Mug",
    category: "Home",
    imageUrl: Mug,
    price: 9.99,
    vendor: "Kitchen Pro",
  },
  {
    id: 5,
    name: "Smartwatch",
    category: "Electronics",
    imageUrl: Watch,
    price: 199.99,
    vendor: "Techie",
  },
  {
    id: 6,
    name: "Notebook",
    category: "Stationery",
    imageUrl: Note,
    price: 3.5,
    vendor: "Paper Goods",
  },
];
