const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    return User.create({
      name: "Demo User", // ✅ Fix here
      email: "demo@example.com",
      password: "demopassword"
    });
  })
  .then(() => {
    console.log("✅ Demo user created");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Error seeding user:", err);
    process.exit(1);
  });
