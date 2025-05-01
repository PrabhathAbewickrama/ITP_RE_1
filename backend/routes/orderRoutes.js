const express = require("express");
const { protect, adminOnly } = require("../middlewares/authMiddleware");
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// User routes (authenticated users only)
router.post("/", protect, createOrder); // Create a new order
router.get("/", protect, getMyOrders); // Get the authenticated user's orders

// Admin routes (authenticated admins or inventory managers only)
router.get("/all", protect, adminOnly, getAllOrders); // Get all orders
router.patch("/status", protect, adminOnly, updateOrderStatus); // Update order status

module.exports = router;
