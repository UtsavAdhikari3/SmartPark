// console.log("Occupied Slots:", usedSlot); // user can see the occupied slots

// Find the first available slot
// user can see the history of their vehicles, when they entered and exited, the fee they payed

const ParkingSlot = require("../models/ParkingSlot");
const Vehicle = require("../models/Vehicle");

exports.getAvailableSlots = async (req, res) => {
  try {
    const totalFloors = 2;
    const slotsPerFloor = 16;
    const occupiedSlots = await ParkingSlot.find({ isOccupied: true });
    const occupiedSlotNumbers = occupiedSlots.map((slot) => slot.slotNumber);

    // Create array of all possible slots with their status
    let allSlots = [];
    for (let floor = 1; floor <= totalFloors; floor++) {
      for (let slot = 1; slot <= slotsPerFloor; slot++) {
        const slotNumber = `${floor}-${slot}`;
        allSlots.push({
          number: `Floor: ${floor}- Slot: ${slot}`,
          status: occupiedSlotNumbers.includes(slotNumber)
            ? "occupied"
            : "available",
        });
      }
    }

    res.json(allSlots);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parking slots" });
  }
};

exports.getVehicleInfo = async (req, res) => {
  try {
    const { licensePlate } = req.query;

    if (!licensePlate) {
      return res.status(400).json({ message: "License plate is required" });
    }

    const logs = await ParkingSlot.find();
    const foundVehicle = logs.find((log) => log.licensePlate === licensePlate);
    // const formattedLogs = logs.map((log) => ({
    //   licensePlate: log.licensePlate,
    //   entryTime: log.entryTime,
    //   slotNumber: log.slotNumber || "-",

    //   fee: log.fee ? `${log.fee} NPR` : "-",
    // }));

    res.json(foundVehicle);
  } catch (err) {
    console.error("Error fetching parking logs:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching logs", error: err.message });
  }
  // try {
  //   const { licensePlate } = req.query;

  //   if (!licensePlate) {
  //     return res.status(400).json({ message: "License plate is required" });
  //   }

  //   const vehicle = await Vehicle.findOne({ licensePlate })
  //     .sort({ entryTime: -1 })
  //     .limit(1);

  //   if (!vehicle) {
  //     return res.status(404).json({ message: "No vehicle information found" });
  //   }

  //   // Calculate duration
  //   const duration = vehicle.exitTime
  //     ? new Date(vehicle.exitTime) - new Date(vehicle.entryTime)
  //     : new Date() - new Date(vehicle.entryTime);

  //   res.json({
  //     licensePlate: vehicle.licensePlate,
  //     entryTime: vehicle.entryTime,
  //     exitTime: vehicle.exitTime,
  //     duration: Math.round(duration / (1000 * 60)) + " minutes",
  //     status: vehicle.exitTime ? "Completed" : "Parked",
  //     slotNumber: vehicle.slotNumber,
  //     fee: vehicle.fee,
  //   });
  // } catch (error) {
  //   res.status(500).json({ message: "Error fetching vehicle information" });
  // }
};
