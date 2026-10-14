require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Classic White Sneakers",
    description: "Comfortable everyday sneakers for casual wear.",
    price: 2499,
    category: "Footwear",
    stock: 25,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Premium Black T-Shirt",
    description: "Soft cotton t-shirt with a clean minimal design.",
    price: 899,
    category: "Clothing",
    stock: 40,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Classic Wrist Watch",
    description: "Minimal wrist watch for everyday use.",
    price: 1999,
    category: "Accessories",
    stock: 15,
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Travel Backpack",
    description: "Practical backpack for college, work and travel.",
    price: 1599,
    category: "Bags",
    stock: 20,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80"
  }
];

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("Sample products inserted");
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
