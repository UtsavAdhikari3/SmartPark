const mongoose = require('mongoose');

const ParkingSlotSchema = new mongoose.Schema({
  licensePlate: { type: String, required: true },
  entryTime: { type: Date, required: true },
  exitTime: { type: Date },
  slotNumber: { type: String, required: true }, // Add slotNumber field
  isOccupied: { type: Boolean, default: true },
  fee: { type: Number },
});

module.exports = mongoose.models.ParkingSlot || mongoose.model('ParkingSlot', ParkingSlotSchema);
