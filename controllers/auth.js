// @DESC   Register a new RasberryPI
// @ROUTE  POST /api/v1/auth/register

const Rasberry = require("../Models/Rasberry");
const ErrorResponse = require("../class/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");

// @ACCESS Public
exports.register = asyncHandler(async (req, res, next) => {
  if (!req.body.name || !req.body.password)
    return next(new ErrorResponse("Please provide a name and password", 400));

  const rasberry = await Rasberry.create(req.body);

  returnToken(res, rasberry, 201);
});

// @DESC   Login to RasberryPI
// @ROUTE  POST /api/v1/auth/login
// @ACCESS Public
exports.login = asyncHandler(async (req, res, next) => {
  if (!req.body.name || !req.body.password)
    return next(new ErrorResponse("Please provide a name and password", 400));
  const rasberry = await Rasberry.findOne({ name: req.body.name }).select(
    "+password"
  );
  if (!rasberry) return next(new ErrorResponse("Invalid credentials", 401));
  const isMatch = await rasberry.matchPassword(req.body.password);
  if (!isMatch) return next(new ErrorResponse("Invalid credentials", 401));
  returnToken(res, rasberry, 200);
});

const returnToken = (res, rasberry, statusCode) => {
  const token = rasberry.getSignedJwtToken();
  res.status(200).json({
    success: true,
    data: rasberry,
    token,
  });
};
