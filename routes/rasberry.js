// External Imports
const express = require("express");
const { protect } = require("../middlewares/auth");

// Internal Imports

// Variables
const router = express.Router({
  mergeParams: true,
});

// Routes
router.ws("/connect/:token", (ws, req) =>
  protect(ws, req, () => {
    // If a phone connects give the actual state of the rasberry
    ws.on("/phone", () => {
      return ws.json({ data: ws.rasberry });
    });
  })
);

module.exports = router;
