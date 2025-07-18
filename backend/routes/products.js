// backend/routes/products.js

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../middleware/upload");

// Create product with image upload
router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, price, size, userId } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  if (!title || !price || !userId || !imageUrl) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const newProduct = new Product({
      title,
      description,
      price,
      size,
      imageUrl,
      userId,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Product upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

module.exports = router;
