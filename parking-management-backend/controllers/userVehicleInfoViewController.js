// console.log("Occupied Slots:", usedSlot); // user can see the occupied slots

// Find the first available slot
// user can see the history of their vehicles, when they entered and exited, the fee they payed

const ParkingSlot = require("../models/ParkingSlot");
const Vehicle = require("../models/Vehicle");

exports.getAvailableSlots = async (req, res) => {
  try {
    const slots = await ParkingSlot.find();
    res.json(slots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parking slots" });
  }
};

exports.getVehicleInfo = async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({ userId: req.user.id })
      .sort({ entryTime: -1 })
      .limit(1);

    if (!vehicle) {
      return res.status(404).json({ message: "No vehicle information found" });
    }

    // Calculate duration
    const duration = vehicle.exitTime
      ? new Date(vehicle.exitTime) - new Date(vehicle.entryTime)
      : new Date() - new Date(vehicle.entryTime);

    res.json({
      licensePlate: vehicle.licensePlate,
      entryTime: vehicle.entryTime,
      duration: Math.round(duration / (1000 * 60)) + " minutes",
      status: vehicle.exitTime ? "Completed" : "Parked",
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching vehicle information" });
  }
};
