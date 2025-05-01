import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "../../../utils/axios"; // Adjust path as needed
import { toast } from "react-toastify";

// Cart Item Component
function CartItem({
  _id,
  image,
  title,
  price,
  quantity,
  onUpdateQuantity,
  onRemove,
}) {
  console.log("CartItem Props:", { _id, image, title, price, quantity });
  console.log("Image URL:", image);

  return (
    <motion.div
      className="flex items-center gap-4 bg-gray-800/50 p-4 rounded-xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <img
        src={Array.isArray(image) ? image[0] : image} // Use the first image if it's an array
        alt={title}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-cyan-400 font-bold">LKR {price}</p>
      </div>
      <div className="flex items-center gap-2">
        <motion.button
          className="p-1 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onUpdateQuantity(_id, quantity - 1)}
          disabled={quantity <= 1}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </motion.button>
        <span className="w-8 text-center text-white">{quantity}</span>
        <motion.button
          className="p-1 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onUpdateQuantity(_id, quantity + 1)}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </motion.button>
      </div>
      <motion.button
        className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onRemove(_id)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
}

// Cart Component
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Fetch Cart Items from Backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get("/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems(response.data.items);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update Quantity
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        "/cart",
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems((items) =>
        items.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update quantity");
    }
  };

  // Remove Item from Cart
  const removeItem = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.delete("/cart", {
        headers: { Authorization: `Bearer ${token}` },
        data: { productId },
      });

      toast.success("Product removed from cart!");
      setCartItems((items) =>
        items.filter((item) => item.product._id !== productId)
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to remove product");
    }
  };

  // Calculate Total
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // Handle Proceed to Checkout
  const handleProceedToCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Add items before checking out.");
      return;
    }
    navigate("/checkout"); // Navigate to the Checkout page
  };

  if (loading) {
    return <div className="text-center text-lg text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-8">
          Your Cart
        </h1>

        <div className="space-y-4 mb-8">
          {cartItems.map((item) => (
            <CartItem
              key={item.product._id}
              _id={item.product._id}
              title={item.product.name}
              price={item.product.price}
              quantity={item.quantity}
              image={
                Array.isArray(item.product.image)
                  ? item.product.image[0]
                  : item.product.image
              }
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </div>

        {cartItems.length > 0 ? (
          <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400">Total:</span>
              <span className="text-2xl font-bold text-white">
                LKR {total.toFixed(2)}
              </span>
            </div>
            <motion.button
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleProceedToCheckout} // Trigger navigation
            >
              <span className="relative z-10">Proceed to Checkout</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        ) : (
          <div className="text-center py-12">
            <motion.div
              className="text-gray-400 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Your cart is empty
            </motion.div>
            <motion.button
              className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-2 px-6 rounded-xl font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue Shopping
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
