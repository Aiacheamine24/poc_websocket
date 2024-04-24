// External Imports
const express = require("express");

// Internal Imports
const { register, login } = require("../controllers/auth");

// Variables
const router = express.Router();

// Routes
router.route("/register").post(register); // Create a new Rasberry
router.route("/login").post(login); // Connect to Rasberry via name or id

// Export
module.exports = router;
