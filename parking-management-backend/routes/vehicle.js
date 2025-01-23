const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userVehicleInfoViewController = require("../controllers/userVehicleInfoViewController");

// Get vehicle information
router.get("/info", userVehicleInfoViewController.getVehicleInfo);

module.exports = router;
