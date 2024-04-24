// Error Handler Middleware
const errorHandler = (error, req, res, next) => {
  console.log("Error Handler Middleware");
  // if The Error is not a known error
  console.log(error.name);
  console.log(error.stack);
  console.log(error);

  // Response to Client
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Server Error",
  });
};
// Export Module
module.exports = errorHandler;

// // if canNotRead Token error
// if (error.name === "TypeError") {
//   return res.status(401).json({
//     success: false,
//     message: `Not authorized to access this route`,
//   });
// }
// // if CastError error
// if (error.name === "CastError") {
//   return res.status(400).json({
//     success: false,
//     message: `Resource not found with id of ${error.value}`,
//   });
// }
// // if JsonWebTokenError error
// if (error.name === "JsonWebTokenError") {
//   return res.status(400).json({
//     success: false,
//     message: `Not authorized to access this route`,
//   });
// }
// // if MongoServerError error
// if (error.name === "MongoServerError") {
//   return MongoServerErrorFunc(error, res);
// }
// // if ValidationError error
// if (error.name === "ValidationError") {
//   return res.status(400).json({
//     success: false,
//     message: error.message,
//   });
// }
// // if Error Not Authorized
// if (error.name === "Error") {
//   return res.status(401).json({
//     success: false,
//     message: error.message,
//   });
// }

// // MongoServerErrorFunc
// const MongoServerErrorFunc = (error, res) => {
//   //   if is duplicate key error
//   if (error.code === 11000) {
//     // get the field name
//     const field = Object.keys(error.keyValue)[0];
//     // get the value of the field
//     const value = error.keyValue[field];
//     // send response
//     res.status(400).json({
//       success: false,
//       message: `Duplicate field value: ${value}, please use another ${field}`,
//     });
//   }
// };
