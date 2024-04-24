// External Imports
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const ZoneSchema = require("./Zone");

// Rasberry Schema
const RasberrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"],
    },
    description: {
      type: String,
      maxlength: [500, "Description can not be more than 500 characters"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 6,
      select: false,
    },
    zones: [ZoneSchema],
  },
  {
    timestamps: true,
  }
);

RasberrySchema.pre("save", async function (next) {
  // Hash the password
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

RasberrySchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

RasberrySchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Rasberry Model
module.exports = mongoose.model("Rasberry", RasberrySchema);
