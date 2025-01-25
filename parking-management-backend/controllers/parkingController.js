const ParkingSlot = require("../models/ParkingSlot");
const { recognizePlate } = require("../utils/plateRecognizer");

// Helper function to convert UTC time to Nepal Time (UTC +5:45)
const convertToNepalTime = (date) => {
  const options = {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return new Date(date).toLocaleString("en-US", options);
};

// Helper function to allocate a parking slot
const allocateSlot = async () => {
  const totalFloors = 2; // Number of floors
  const slotsPerFloor = 16; // Number of slots per floor

  // Fetch all occupied slots
  const occupiedSlots = await ParkingSlot.find({ isOccupied: true });
  const availableSlots = await ParkingSlot.find({ isOccupied: false });
  const usedSlots = occupiedSlots.map((slot) => slot.slotNumber);
  const freeSlots = availableSlots.map((slot) => slot.slotNumber);

  console.log("Occupied Slots:", usedSlots); // Debug log for occupied slots
  console.log("Free Slots:", freeSlots); // Debug log for Free slots

  // Find the first available slot
  for (let floor = 1; floor <= totalFloors; floor++) {
    for (let slot = 1; slot <= slotsPerFloor; slot++) {
      const slotNumber = `${floor}-${slot}`;
      if (!usedSlots.includes(slotNumber)) {
        console.log("Allocated Slot:", slotNumber); // Debug log
        return slotNumber; // Return the first available slot
      }
    }
  }

  // If no slot is available, throw an error
  throw new Error("No available parking slots");
};

// Log vehicle entry
exports.logEntry = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const imagePath = req.file.path; // Path to the uploaded file
    const plateData = await recognizePlate(imagePath); // Recognize license plate

    if (!plateData) {
      return res
        .status(400)
        .json({ message: "No license plate detected in the image" });
    }

    const { plate: licensePlate, confidence } = plateData;
    const entryTime = new Date();
    const slotNumber = await allocateSlot(); // Allocate a parking slot

    console.log("Saving to database:", { licensePlate, slotNumber, entryTime }); // Debug log

    const newEntry = new ParkingSlot({
      licensePlate,
      entryTime,
      slotNumber,
      isOccupied: true,
    });

    const savedEntry = await newEntry.save(); // Save to database
    console.log("Saved Entry:", savedEntry); // Debug log

    res.json({
      message: "Vehicle entry logged successfully",
      licensePlate,
      confidence,
      entryTime: entryTime.toISOString(),
      slotNumber,
    });
  } catch (err) {
    console.error("Error logging vehicle entry:", err.message);
    res
      .status(500)
      .json({ message: "Error processing entry", error: err.message });
  }
};

// Log vehicle exit
exports.logExit = async (req, res) => {
  try {
    // Ensure an image file is uploaded
    if (!req.file) {
      console.log("No file uploaded for exit process"); // Debugging log
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const imagePath = req.file.path; // Path to the uploaded image file
    console.log("Processing exit for file:", imagePath); // Debugging log

    // Recognize the license plate
    const plateData = await recognizePlate(imagePath);
    if (!plateData) {
      console.log("No license plate detected"); // Debugging log
      return res
        .status(400)
        .json({ message: "No license plate detected in the image" });
    }

    const { plate: licensePlate } = plateData;
    console.log("License plate detected for exit:", licensePlate); // Debugging log

    // Find the vehicle in the parking log
    const parkingSlot = await ParkingSlot.findOne({
      licensePlate,
      isOccupied: true,
    });
    if (!parkingSlot) {
      console.log("Vehicle not found in parking log"); // Debugging log
      return res
        .status(404)
        .json({ message: "Vehicle not found in parking log" });
    }

    console.log("Parking Slot Found:", parkingSlot); // Debugging log

    // Calculate fee
    const exitTime = new Date();
    const duration = (exitTime - parkingSlot.entryTime) / (1000 * 60 * 60); // Duration in hours
    const fee = Math.ceil(duration) * 20; // Fee: 20 currency units per hour

    // Delete the vehicle from the log
    await ParkingSlot.deleteOne({ _id: parkingSlot._id });
    console.log("Vehicle successfully removed from parking log"); // Debugging log

    res.json({
      message: "Vehicle exit logged successfully",
      licensePlate,
      exitTime: exitTime.toISOString(),
      fee: `${fee} NPR`,
    });
  } catch (err) {
    console.error("Error logging vehicle exit:", err.message); // Debugging log
    res
      .status(500)
      .json({ message: "Error processing exit", error: err.message });
  }
};

// Fetch parking logs
exports.getParkingLogs = async (req, res) => {
  try {
    const logs = await ParkingSlot.find();

    const formattedLogs = logs.map((log) => ({
      licensePlate: log.licensePlate,
      entryTime: convertToNepalTime(log.entryTime),
      slotNumber: log.slotNumber || "-",
      exitTime: log.exitTime ? convertToNepalTime(log.exitTime) : "In Parking",
      fee: log.fee ? `${log.fee} NPR` : "-",
    }));

    res.json(formattedLogs);
  } catch (err) {
    console.error("Error fetching parking logs:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching logs", error: err.message });
  }
};

// Search vehicle by license plate
exports.searchVehicle = async (req, res) => {
  try {
    const { licensePlate } = req.query; // Get the license plate from query parameters

    if (!licensePlate) {
      return res.status(400).json({ message: "License plate is required" });
    }

    // Search for the vehicle in the parking log
    const parkingSlot = await ParkingSlot.findOne({ licensePlate });

    if (!parkingSlot) {
      return res
        .status(404)
        .json({ message: "Vehicle not found in parking log" });
    }

    res.json({
      licensePlate: parkingSlot.licensePlate,
      entryTime: convertToNepalTime(parkingSlot.entryTime),
      exitTime: parkingSlot.exitTime
        ? convertToNepalTime(parkingSlot.exitTime)
        : "In Parking",
      slotNumber: parkingSlot.slotNumber,
      fee: parkingSlot.fee ? `${parkingSlot.fee} NPR` : "-",
    });
  } catch (err) {
    console.error("Error searching vehicle:", err.message);
    res
      .status(500)
      .json({ message: "Error processing search", error: err.message });
  }
};
