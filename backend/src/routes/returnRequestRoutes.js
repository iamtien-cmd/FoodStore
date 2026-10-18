
const express = require("express");
const router = express.Router();

const {
  createReturnRequest,
  getMyReturnRequests,
  getAllReturnRequests,
  updateReturnRequestStatus,
} = require("../controllers/returnRequestController");

const authMiddleware = require("../middleware/authMiddleware");
const  authorize  = require("../middleware/roleMiddleware");

router.use(authMiddleware);

router.post("/", authorize("customer"), createReturnRequest);
router.get("/my", authorize("customer"), getMyReturnRequests);
router.get("/", authorize("admin"), getAllReturnRequests);
router.patch(
  "/:id/status",
  authorize("admin"),
  updateReturnRequestStatus
);

module.exports = router;