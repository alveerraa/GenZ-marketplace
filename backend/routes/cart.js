// routes/cart.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

// ➕ Add to cart
router.post("/", auth, async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      await user.save();
    }
    res.json({ message: "Added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to cart" });
  }
});

// ❌ Remove from cart
router.delete("/:productId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = user.cart.filter(
      (id) => id.toString() !== req.params.productId
    );
    await user.save();
    res.json({ message: "Removed from cart" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from cart" });
  }
});

// 🔁 Get cart
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("cart");
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

module.exports = router;
