// backend/seed.js

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const demoUserId = "68792d90730ea81744f4be25"; // this is the demo user _id from the DB

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");

    // Clear existing products (optional)
    await Product.deleteMany();

    // Dummy aesthetic product data
    const demoProducts = [
      {
        title: "Vintage Aesthetic Hoodie",
        description: "Soft oversized hoodie with brown tone.",
        price: 1299,
        size: "L",
        imageUrl: "/uploads/sample1.jpg",
        userId: demoUserId,
      },
      {
        title: "Y2K Sunglasses",
        description: "Retro-inspired sunglasses for the perfect summer look.",
        price: 799,
        size: "Free",
        imageUrl: "/uploads/sample2.jpg",
        userId: demoUserId,
      },
      {
        title: "Grunge Oversized Tee",
        description: "Black and white graphic tee in cotton.",
        price: 999,
        size: "M",
        imageUrl: "/uploads/sample3.jpg",
        userId: demoUserId,
      },
      {
        title: "Boho Crochet Top",
        description: "Handmade crochet top for festival vibes.",
        price: 1199,
        size: "S",
        imageUrl: "/uploads/sample4.jpg",
        userId: demoUserId,
      },
      {
        title: "Pastel Bucket Hat",
        description: "Soft cotton fur bucket hat.",
        price: 499,
        size: "Free",
        imageUrl: "/uploads/sample5.jpg",
        userId: demoUserId,
      },
      {
        title: "Aesthetic Laptop Stickers",
        description: "Set of 20 waterproof aesthetic-themed stickers.",
        price: 199,
        size: "Pack",
        imageUrl: "/uploads/sample6.jpg",
        userId: demoUserId,
      },
      {
        title: "Oversized Denim Jacket",
        description: "Washed blue oversized denim with grunge patches.",
        price: 1499,
        size: "XL",
        imageUrl: "/uploads/sample7.jpg",
        userId: demoUserId,
      },
      {
        title: "Minimalist Tote Bag",
        description: "Cotton tote with bow print.",
        price: 299,
        size: "Free",
        imageUrl: "/uploads/sample8.jpg",
        userId: demoUserId,
      },
      {
        title: "Galaxy Pendant Necklace",
        description: "Mystic glass pendant with chain for e-girl look.",
        price: 349,
        size: "Free",
        imageUrl: "/uploads/sample9.jpg",
        userId: demoUserId,
      },
      {
        title: "Satin Midi Skirt",
        description: "Glossy satin skirt with a soft flow.",
        price: 1199,
        size: "M",
        imageUrl: "/uploads/sample10.jpg",
        userId: demoUserId,
      },
      {
        title: "Aesthetic Wall Collage Kit",
        description: "6-piece poster collage for your room.",
        price: 399,
        size: "Set",
        imageUrl: "/uploads/sample11.jpg",
        userId: demoUserId,
      },
      {
        title: "Rainbow LED Room Lights",
        description: "Color-changing LED strip lights for your room aesthetic.",
        price: 599,
        size: "Free",
        imageUrl: "/uploads/sample12.jpg",
        userId: demoUserId,
      },
    ];

    await Product.insertMany(demoProducts);
    console.log("✅ Products seeded successfully");
    process.exit();
  })
  .catch((err) => {
    console.error("❌ Error seeding products:", err);
    process.exit(1);
  });
