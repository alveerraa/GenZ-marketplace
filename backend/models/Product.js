// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  size: String,
  imageUrl: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Product", ProductSchema);
