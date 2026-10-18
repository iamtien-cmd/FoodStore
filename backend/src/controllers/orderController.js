const Order = require("../models/Order");
const Product = require("../models/Product");

// POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "Order must contain at least one product",
      });
    }

    if (!deliveryAddress) {
      return res.status(400).json({
        message: "Delivery address is required",
      });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.product}`,
        });
      }

      if (!product.isActive) {
        return res.status(400).json({
          message: `${product.name} is not available`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Not enough stock for ${product.name}`,
        });
      }

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
      });

      totalAmount += product.price * item.quantity;
    }

    const order = await Order.create({
      customer: req.user.id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
    });

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/orders/my
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      customer: req.user.id,
    })
      .populate("items.product", "name price image")
      .populate("shipper", "name phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email phone")
      .populate("items.product", "name price image")
      .populate("shipper", "name phone")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getPendingOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      status: "pending",
      shipper: null,
    })
      .populate("customer", "name phone address")
      .populate("items.product", "name price image")
      .sort({ createdAt: 1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET /api/orders/my-deliveries - Shipper's assigned orders
const getMyDeliveries = async (req, res) => {
  try {
    const orders = await Order.find({
      shipper: req.user.id,
    })
      .populate("customer", "name phone address")
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const acceptOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (order.status !== "pending") {
      return res.status(400).json({
        message: "Order is not available for pickup",
      });
    }

    if (order.shipper) {
      return res.status(400).json({
        message: "Order has already been assigned",
      });
    }

    order.shipper = req.user.id;
    order.status = "shipping";

    await order.save();

    res.json({
      message: "Order accepted successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deliverOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // Chỉ shipper đang phụ trách đơn mới được giao
    if (!order.shipper || order.shipper.toString() !== req.user.id) {
      return res.status(403).json({
        message: "You are not assigned to this order",
      });
    }

    if (order.status !== "shipping") {
      return res.status(400).json({
        message: "Order is not being shipped",
      });
    }

    order.status = "delivered";

    await order.save();

    res.json({
      message: "Order delivered successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  getPendingOrders,
  getMyDeliveries,
  acceptOrder,
  deliverOrder,
};