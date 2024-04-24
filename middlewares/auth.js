// External Imports
const jwt = require("jsonwebtoken");
// Internal Imports
const asyncHandler = require("./asyncHandler");
const ErrorResponse = require("../class/errorResponse");
const Rasberry = require("../Models/Rasberry");

// Protect routes
exports.protect = asyncHandler(async (ws, req, next) => {
  const token = req.params.token;
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const rasberry = await Rasberry.findById(decoded.id);
    if (!rasberry) {
      return next(new ErrorResponse("No Rasberry found with this id", 404));
    }
    ws.rasberry = rasberry;
    next();
  } catch (error) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
