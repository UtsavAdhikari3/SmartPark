const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
  },
  entryTime: {
    type: Date,
    default: Date.now,
  },
  exitTime: {
    type: Date,
  },
  slotNumber: {
    type: String,
    required: true,
  },
  fee: {
    type: Number,
  },
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
