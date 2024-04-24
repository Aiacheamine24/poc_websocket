// External Dependencies
const mongoose = require("mongoose");

const ZoneSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "Please add a Zone number"],
  },
  status: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    maxlength: [500, "Description can not be more than 500 characters"],
  },
});

module.exports = ZoneSchema;
