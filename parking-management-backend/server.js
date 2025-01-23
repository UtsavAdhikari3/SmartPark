const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

// Import routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const parkingRoutes = require("./routes/parking");
const vehicleRoutes = require("./routes/vehicle"); // Add this line

// Use routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/vehicle", vehicleRoutes); // Add this line

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
