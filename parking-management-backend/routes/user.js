const express = require("express");
const { login } = require("../controllers/userController");

const router = express.Router();

// userlogin
router.post("/login", login);

module.exports = router;
