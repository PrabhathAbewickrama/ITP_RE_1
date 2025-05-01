import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../../utils/axios"; // Adjust path as needed
import { toast } from "react-toastify";
import Congratulations from "../../../Components/Congratulations/Congratulations";

// **CheckoutStep Component**
function CheckoutStep({ title, isActive, isCompleted, children }) {
  return (
    <div
      className={`bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm ${
        !isActive && "opacity-75"
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isCompleted
              ? "bg-green-500"
              : isActive
              ? "bg-cyan-500"
              : "bg-gray-600"
          }`}
        >
          {isCompleted ? (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <span className="text-white font-medium">{title[0]}</span>
          )}
        </div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
      </div>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

// **Input Component**
function Input({ label, type = "text", name, value, onChange, placeholder }) {
  return (
    <div className="mb-4">
      <label className="block text-gray-300 text-sm font-medium mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500"
        required
      />
    </div>
  );
}

// **Checkout Component**
function Checkout() {
  const [step, setStep] = useState(1);
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // **Fetch cart items from backend**
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Please log in to view your cart");
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
    fetchCart();
  }, []);

  // **Calculate totals**
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = 9.99; // Hardcoded for simplicity
  const total = subtotal + shipping;

  // **Handle input changes**
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // **Handle form submission**
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Please log in to place an order");
          return;
        }

        const response = await axios.post(
          "/orders",
          {
            shipping: {
              fullName: formData.fullName,
              email: formData.email,
              address: formData.address,
              city: formData.city,
              zipCode: formData.zipCode,
            },
            payment: {
              cardNumber: formData.cardNumber,
              expiryDate: formData.expiryDate,
              // CVV is not sent to the backend for security
            },
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        toast.success("Order placed successfully!");
        setOrderId(response.data.order._id); // Store order ID from backend
        setIsOrderComplete(true); // Trigger Congratulations component
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error(error.response?.data?.message || "Failed to place order");
      }
    }
  };

  // **Navigation handlers**
  const handleContinueShopping = () => {
    window.location.href = "/";
  };

  const handleViewOrder = () => {
    window.location.href = "/orders";
  };

  // **Render Congratulations component if order is complete**
  if (isOrderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
        <div className="max-w-4xl mx-auto">
          <Congratulations
            orderId={orderId}
            total={total}
            onContinueShopping={handleContinueShopping}
            onViewOrder={handleViewOrder}
          />
        </div>
      </div>
    );
  }

  // **Render loading state**
  if (loading) {
    return <div className="text-center text-lg text-white">Loading...</div>;
  }

  // **Main checkout UI**
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Step */}
            <CheckoutStep
              title="Shipping"
              isActive={step === 1}
              isCompleted={step > 1}
            >
              <form onSubmit={handleSubmit}>
                <Input
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                />
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                />
                <Input
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                  />
                  <Input
                    label="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="10001"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Continue to Payment</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </CheckoutStep>

            {/* Payment Step */}
            <CheckoutStep
              title="Payment"
              isActive={step === 2}
              isCompleted={step > 2}
            >
              <form onSubmit={handleSubmit}>
                <Input
                  label="Card Number"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Expiry Date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                  />
                  <Input
                    label="CVV"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Review Order</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </CheckoutStep>

            {/* Review Step */}
            <CheckoutStep
              title="Review"
              isActive={step === 3}
              isCompleted={step > 3}
            >
              <div className="space-y-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">
                    Shipping Address
                  </h3>
                  <p className="text-gray-300">
                    {formData.fullName}
                    <br />
                    {formData.address}
                    <br />
                    {formData.city}, {formData.zipCode}
                  </p>
                </div>
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">
                    Payment Method
                  </h3>
                  <p className="text-gray-300">
                    Card ending in {formData.cardNumber.slice(-4)}
                  </p>
                </div>
                <motion.button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-medium shadow-lg shadow-green-500/20 hover:shadow-green-500/30 relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Place Order</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </CheckoutStep>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h2 className="text-xl font-semibold text-white mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product._id} className="flex gap-4">
                    <img
                      src={
                        Array.isArray(item.product.image)
                          ? item.product.image[0]
                          : item.product.image
                      }
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">
                        {item.product.name}
                      </h3>
                      <p className="text-gray-400">Qty: {item.quantity}</p>
                      <p className="text-cyan-400 font-bold">
                        LKR {(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>LKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping:</span>
                  <span>LKR {shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold mt-2">
                  <span>Total:</span>
                  <span>LKR {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
