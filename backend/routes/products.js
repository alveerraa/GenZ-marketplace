// backend/routes/products.js
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

// 🔁 Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// 🔁 Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch {
    res.status(500).json({ message: "Invalid product ID" });
  }
});

// 🔁 Get products by user ID
router.get("/user/:userId", async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.userId });
    res.json(products);
  } catch {
    res.status(500).json({ message: "Error fetching user products" });
  }
});

// ➕ Upload new product (✅ Protected route)
router.post("/", auth, async (req, res) => {
  const { title, description, price, size, imageUrl } = req.body;
  const userId = req.userId;

  if (!title || !price || !imageUrl || !userId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const product = await Product.create({
      title,
      description,
      price,
      size,
      imageUrl,
      userId,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error uploading product" });
  }
});

module.exports = router;
