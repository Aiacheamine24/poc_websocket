// External Imports
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// Internal Imports

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to database
const connectDB = require("./config/connectDB");
connectDB();

// Variables
const app = express();
require("express-ws")(app);

const PORT = process.env.PORT || 5000;

// Middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

// Routes
// Auth Routes
const authRoute = require("./routes/auth");
app.use("/api/v1/auth", authRoute);
// Rasberry Routes
const rasberryRoute = require("./routes/rasberry");
app.use("/api/v1/rasberry", rasberryRoute);

// Error Handler
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

// Server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
