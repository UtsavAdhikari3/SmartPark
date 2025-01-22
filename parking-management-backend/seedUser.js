const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const existingUser = await User.findOne({ username: "user" });
    if (existingUser) {
      console.log("user user already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("user123", 10);
    const user = new User({
      username: "user",
      licensePlate: "k3rala",
      password: hashedPassword,
    });

    await user.save();
    console.log("user user created successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding user user:", err);
    process.exit(1);
  }
};

seedUser();
