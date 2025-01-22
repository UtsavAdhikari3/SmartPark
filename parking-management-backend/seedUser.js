const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const seedUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingUser = await User.findOne({ username: "subash" });
    if (existingUser) {
      console.log("user already exists");
      process.exit(0);
    }

    const plainPassword = "subash123";

    const user = new User({
      username: "subash",
      licensePlate: "k3rala",
      password: plainPassword,
      email: "subash@example.com",
    });

    await user.save();
    console.log("User created successfully with password:", plainPassword);
    process.exit(0);
  } catch (err) {
    console.error("Error seeding user user:", err);
    process.exit(1);
  }
};

seedUser();
