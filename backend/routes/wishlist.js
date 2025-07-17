// routes/wishlist.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");

// ➕ Add to wishlist
router.post("/", auth, async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findById(req.userId);
    if (!user.wishlist.includes(productId)) {
      user.wishlist.push(productId);
      await user.save();
    }
    res.json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
});

// ❌ Remove from wishlist
router.delete("/:productId", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== req.params.productId
    );
    await user.save();
    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
});

// 🔁 Get wishlist
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("wishlist");
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
});

module.exports = router;
