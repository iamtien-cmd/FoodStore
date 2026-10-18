const express = require("express");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/customer", protect, authorize("customer"), (req, res) => {
  res.json({
    message: "Customer access granted",
    user: req.user,
  });
});

router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.json({
    message: "Admin access granted",
    user: req.user,
  });
});

router.get("/shipper", protect, authorize("shipper"), (req, res) => {
  res.json({
    message: "Shipper access granted",
    user: req.user,
  });
});

module.exports = router;