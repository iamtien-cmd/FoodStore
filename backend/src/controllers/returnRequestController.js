
const ReturnRequest = require("../models/ReturnRequest");
const Order = require("../models/Order");

// Customer gửi yêu cầu trả hàng
const createReturnRequest = async (req, res) => {
  try {
    const { order, reason } = req.body;

    if (!order || !reason || !reason.trim()) {
      return res.status(400).json({
        message: "Order and reason are required",
      });
    }

    const deliveredOrder = await Order.findOne({
      _id: order,
      customer: req.user.id,
      status: "delivered",
    });

    if (!deliveredOrder) {
      return res.status(404).json({
        message: "Delivered order not found",
      });
    }

    // Không cho tạo yêu cầu mới nếu đã có yêu cầu pending/approved
    const existingRequest = await ReturnRequest.findOne({
      order,
      customer: req.user.id,
      status: { $in: ["pending", "approved"] },
    });

    if (existingRequest) {
      return res.status(409).json({
        message: "A return request already exists for this order",
      });
    }

    const returnRequest = await ReturnRequest.create({
      order,
      customer: req.user.id,
      reason: reason.trim(),
    });

    return res.status(201).json({
      message: "Return request created successfully",
      returnRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create return request",
      error: error.message,
    });
  }
};

// Customer xem yêu cầu trả hàng của mình
const getMyReturnRequests = async (req, res) => {
  try {
    const requests = await ReturnRequest.find({
      customer: req.user.id,
    })
      .populate("order")
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get return requests",
      error: error.message,
    });
  }
};

// Admin xem tất cả yêu cầu trả hàng
const getAllReturnRequests = async (req, res) => {
  try {
    const requests = await ReturnRequest.find()
      .populate("customer", "name email")
      .populate("order")
      .sort({ createdAt: -1 });

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to get return requests",
      error: error.message,
    });
  }
};

// Admin duyệt hoặc từ chối yêu cầu
const updateReturnRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be approved or rejected",
      });
    }

    const request = await ReturnRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({
        message: "Return request not found",
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Only pending requests can be updated",
      });
    }

    request.status = status;
    await request.save();

    return res.status(200).json({
      message: `Return request ${status} successfully`,
      returnRequest: request,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update return request",
      error: error.message,
    });
  }
};

module.exports = {
  createReturnRequest,
  getMyReturnRequests,
  getAllReturnRequests,
  updateReturnRequestStatus,
};