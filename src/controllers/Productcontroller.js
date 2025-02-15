import { Product } from "../models/Product.js";

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add New Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, category, stock, image } = req.body;
    const newProduct = new Product({ name, price, category, stock, image });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
