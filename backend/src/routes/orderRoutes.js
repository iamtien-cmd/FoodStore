const express = require("express");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getPendingOrders,
  getMyDeliveries,
  acceptOrder,
  deliverOrder,
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

// Customer
router.post(
  "/",
  protect,
  authorize("customer"),
  createOrder
);

router.get(
  "/my",
  protect,
  authorize("customer"),
  getMyOrders
);

// Admin
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllOrders
);
// shipper
router.get(
  "/pending",
  protect,
  authorize("shipper"),
  getPendingOrders
);
router.get(
  "/my-deliveries",
  protect,
  authorize("shipper"),
  getMyDeliveries
);
router.patch(
  "/:id/accept",
  protect,
  authorize("shipper"),
  acceptOrder,
  
);
router.patch(
  "/:id/deliver",
  protect,
  authorize("shipper"),
  deliverOrder
);
module.exports = router;