const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
  updateQuantity,
} = require("../controllers/cartController");

const router = express.Router();

router.get("/", protect, getCart);
router.post("/", protect, addToCart);
router.delete("/", protect, removeFromCart);
router.delete("/clear", protect, clearCart);
router.patch("/", protect, updateCartItem);
router.patch("/", protect, updateQuantity);

module.exports = router;
