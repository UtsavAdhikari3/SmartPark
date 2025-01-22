const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  licensePlate: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, sparse: true },
});

//Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Avoid redefining the model if it already exists
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
