import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../../utils/axios"; // Adjust path to your axios instance
import { toast } from "react-toastify"; // Ensure react-toastify is installed

function OrderItem({ order }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Order #{order.id}
            </h3>
            <p className="text-gray-400 text-sm">{order.date}</p>
          </div>
          <div className="text-right">
            <div className="text-cyan-400 font-bold">
              LKR {order.total.toFixed(2)}
            </div>
            <span
              className={`text-sm px-2 py-1 rounded-full ${
                order.status === "delivered"
                  ? "bg-green-500/20 text-green-400"
                  : order.status === "processing"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-purple-500/20 text-purple-400"
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 space-y-3"
            >
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
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
                    <h4 className="text-white font-medium">
                      {item.product.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      LKR {item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-cyan-400 font-bold">
                      LKR {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>LKR {order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping:</span>
                  <span>LKR {order.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white font-bold mt-2">
                  <span>Total:</span>
                  <span>LKR {order.total.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          toast.error("Please log in to view your orders");
          setLoading(false);
          return;
        }

        const response = await axios.get("/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const mappedOrders = response.data.map((order) => ({
          id: order._id,
          date: new Date(order.createdAt).toLocaleDateString(),
          status: order.status.toLowerCase(),
          items: order.items.map((item) => ({
            product: {
              name: item.product.name,
              image: item.product.image,
            },
            price: Number(item.price), // Ensure price is a number
            quantity: Number(item.quantity), // Ensure quantity is a number
          })),
          subtotal: order.items.reduce(
            (sum, item) => sum + Number(item.price) * Number(item.quantity),
            0
          ),
          shipping: Number(order.shipping) || 9.99, // Ensure shipping is a number with default
          total: Number(order.totalPrice), // Ensure total is a number
        }));

        setOrders(mappedOrders);
      } catch (error) {
        console.error("Error fetching orders: ", error);
        toast.error(error.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-8">
          My Orders
        </h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <motion.div
              className="text-gray-400 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              You haven't placed any orders yet
            </motion.div>
            <motion.button
              className="bg-gradient-to-r from-cyan-600 to-purple-600 text-white py-2 px-6 rounded-xl font-medium shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Start Shopping</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
