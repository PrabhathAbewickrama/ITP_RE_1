const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// Get user's cart
const getCart = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );
  res.status(200).json(cart);
});

// Add item to cart
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  // Check if the product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  // Check if the requested quantity exceeds available stock
  if (quantity > product.quantity) {
    res.status(400);
    throw new Error(`Only ${product.quantity} units available in stock`);
  }

  // Find the user's cart
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  // Check if the product is already in the cart
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    // Update quantity if product already exists in the cart
    const newQuantity = cart.items[itemIndex].quantity + quantity;

    if (newQuantity > product.quantity) {
      res.status(400);
      throw new Error(`Cannot add more than ${product.quantity} units in cart`);
    }

    cart.items[itemIndex].quantity = newQuantity;
  } else {
    // Add new product to cart
    cart.items.push({ product: productId, quantity });
  }

  // Recalculate total price
  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + item.quantity * product.price;
  }, 0);

  await cart.save();
  res.status(200).json(cart);
});

// Remove item from cart
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  // Filter out the item to be removed
  cart.items = cart.items.filter(
    (item) => item.product._id.toString() !== productId
  );

  // Calculate new total price safely
  cart.totalPrice =
    cart.items.length > 0
      ? cart.items.reduce(
          (acc, item) => acc + item.quantity * item.product.price,
          0
        )
      : 0; // If cart is empty, set totalPrice to 0

  // If cart is empty after removal, delete it
  if (cart.items.length === 0) {
    await Cart.findOneAndDelete({ user: req.user._id });
    return res.status(200).json({ message: "Cart is now empty" });
  }

  await cart.save();
  res.status(200).json(cart);
});


// Clear cart
const clearCart = asyncHandler(async (req, res) => {
  await Cart.findOneAndDelete({ user: req.user._id });
  res.status(200).json({ message: "Cart cleared" });
});

// Update item quantity in cart
const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (quantity > product.quantity) {
    res.status(400);
    throw new Error(`Only ${product.quantity} units available in stock`);
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity = quantity;
  } else {
    res.status(404);
    throw new Error("Item not found in cart");
  }

  // Update total price
  cart.totalPrice = cart.items.reduce((total, item) => {
    return total + item.quantity * product.price;
  }, 0);

  await cart.save();
  res.status(200).json(cart);
});



const updateQuantity = async (productId, newQuantity) => {
  if (newQuantity < 1) return;

  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.patch(
      "/api/cart", // Make sure your frontend API matches backend
      { productId, quantity: newQuantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setCartItems(response.data.items); // Update state with new cart data
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update quantity");
  }
};


module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
  updateCartItem,
  updateQuantity,
};
