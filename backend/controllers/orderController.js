const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel"); // Import the Product model
const mongoose = require("mongoose");

// Create a new order
const createOrder = asyncHandler(async (req, res) => {
  const { shipping, payment } = req.body;
  const userId = req.user._id; // Assumes user is added to req by an auth middleware

  // Fetch the user's cart
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  // Calculate total price
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  // Map cart items to order items
  const orderItems = cart.items.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  // Create the order
  const order = new Order({
    user: userId,
    shipping,
    payment: {
      cardNumberLast4: payment.cardNumber.slice(-4), // Store only last 4 digits
      expiryDate: payment.expiryDate,
    },
    items: orderItems,
    totalPrice,
  });

  // Save the order to the database
  await order.save();

  // Reduce the quantity of the products in the inventory
  for (const item of cart.items) {
    const product = await Product.findById(item.product._id);

    // Ensure that the product exists and update its quantity
    if (product) {
      product.quantity -= item.quantity; // Reduce the quantity of the product
      if (product.quantity < 0) {
        product.quantity = 0; // Prevent quantity from going negative
      }
      await product.save(); // Save the updated product
    }
  }

  // Clear the cart after placing the order
  await Cart.findOneAndDelete({ user: userId });

  res.status(201).json({
    success: true,
    order,
  });
});


// Get user's orders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 }) // Sort by creation date, newest first
    .populate("items.product", "name image"); // Populate product name and image

  res.status(200).json(orders);
});

// Get all orders (admin only)
const getAllOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 10 } = req.query;

  const query = {};
  if (status) {
    query.status = status;
  }

  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit))
    .populate("user", "name email")
    .populate("items.product", "name image");

  const total = await Order.countDocuments(query);

  res.status(200).json({
    orders,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
  });
});

// Update order status (admin only)
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  const order = await Order.findById(orderId);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = status;
  await order.save();

  res.status(200).json({ success: true, order });
});

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };
