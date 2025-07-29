export type Product = {
  id: number;
  name: string;
  category: string;
  image: string;
  price: number;
  color: string;
};

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Smiths Chips",
    category: "Chips",
    image: require("../assets/images/chips-yellow.png"),
    price: 49.99,
    color: "#FFE8AE",
  },
  {
    id: 2,
    name: "Coconut Chips",
    category: "Chips",
    image: require("../assets/images/chips-green.png"),
    price: 79.99,
    color: "#EAFCD7",
  },
  {
    id: 3,
    name: "Unreal Muffins",
    category: "Chocolates",
    image: require("../assets/images/choco-lemon.png"),
    price: 29.99,
    color: "#F5FFB1",
  },
  {
    id: 4,
    name: "Dark Russet",
    category: "Chips",
    image: require("../assets/images/chips-dark.png"),
    price: 9.99,
    color: "#F2E1D5",
  },
  {
    id: 5,
    name: "Good Source",
    category: "Chocolates",
    image: require("../assets/images/choco-pink.png"),
    price: 199.99,
    color: "#FFEBED",
  },
  {
    id: 6,
    name: "Perfect Snacks",
    category: "Chips",
    image: require("../assets/images/choco-purple.png"),
    price: 3.5,
    color: "#ECE1FF",
  },
];
