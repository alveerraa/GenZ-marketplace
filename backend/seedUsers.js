const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User.js");

dotenv.config();
connectDB();

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const demoUser = new User({
      name: "Demo User",
      email: "demo@example.com",
      password: "demo123", // plain text or hashed depending on your model
    });

    const createdUser = await demoUser.save();
    console.log("✅ Demo user created:", createdUser);
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding user:", error);
    process.exit(1);
  }
};

seedUsers();
