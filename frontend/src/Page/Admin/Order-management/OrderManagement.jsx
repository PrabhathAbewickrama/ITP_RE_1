import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import axios from "../../../utils/axios"; // Adjust the path as per your project structure

// StatusBadge component
function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "processing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default: // Includes "Shipped"
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
}

// OrderDetailsModal component
function OrderDetailsModal({ order, onClose, onUpdateStatus }) {
  const [newStatus, setNewStatus] = useState(order.status);

  const handleStatusUpdate = async () => {
    try {
      await onUpdateStatus(order.id, newStatus);
      toast.success("Order status updated successfully!");
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Order Details
              </h2>
              <p className="text-gray-600">Order ID: {order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Customer Information
                </h3>
                <p className="text-gray-600">Name: {order.customerName}</p>
                <p className="text-gray-600">Email: {order.email}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Shipping Address
                </h3>
                <p className="text-gray-600">{order.shippingAddress}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Order Status
                </h3>
                <div className="flex items-center gap-4">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="bg-white text-gray-900 rounded-lg px-4 py-2 w-full border border-gray-200"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                  <button
                    onClick={handleStatusUpdate}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Items
                </h3>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <img
                        src={
                          Array.isArray(item.image)
                            ? item.image[0] // Select the first image if it's an array
                            : item.image
                        }
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-lg" // Adjust the size and styling
                      />
                      <div className="flex-1">
                        <h4 className="text-gray-900">{item.title}</h4>
                        <p className="text-gray-600">
                          LKR {item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      <p className="text-blue-600 font-bold">
                        LKR {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span>LKR {order.subtotal?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping:</span>
                    <span>LKR {order.shipping?.toFixed(2) || "0.00"}</span>
                  </div>
                  <div className="border-t border-gray-200 my-2"></div>
                  <div className="flex justify-between text-gray-900 font-bold">
                    <span>Total:</span>
                    <span>LKR {order.total?.toFixed(2) || "0.00"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


// Main OrderManagement component
function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from the backend API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("/orders/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Map backend data to the expected frontend structure with fallbacks
        const mappedOrders = response.data.orders.map((order) => ({
          id: order._id || "N/A",
          customerName: order.user?.name || "Unknown",
          email: order.user?.email || "N/A",
          date: order.createdAt || new Date(),
          status: order.status || "Processing",
          subtotal: order.totalPrice || 0,
          shipping: 9.99, // Hardcoded shipping cost (adjust if provided by backend)
          total: (order.totalPrice || 0) + 9.99,
          items: order.items.map((item) => ({
            title: item.product?.name || "Unknown Product",
            price: item.price || 0,
            quantity: item.quantity || 0,
            image: item.product?.image || "/default-image.png",
          })),
          shippingAddress: order.shipping
            ? `${order.shipping.address || ""}, ${order.shipping.city || ""}, ${
                order.shipping.zipCode || ""
              }`
            : "N/A",
        }));

        setOrders(mappedOrders);
        setLoading(false);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message || "Failed to fetch orders";
        setError(errorMessage);
        toast.error(errorMessage);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search term and status
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Handle status update with backend API call
  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.patch(
        "/orders/status",
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
      setSelectedOrder((prev) =>
        prev ? { ...prev, status: newStatus } : null
      );
    } catch (err) {
      throw err; // Let the caller handle the error
    }
  };

  // Render loading or error states
  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Order Management</h1>
          <div className="flex gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white text-gray-900 px-4 py-2 rounded-xl w-64 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg
                className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white text-gray-900 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-left p-4 text-gray-600">Order ID</th>
                <th className="text-left p-4 text-gray-600">Customer</th>
                <th className="text-left p-4 text-gray-600">Date</th>
                <th className="text-left p-4 text-gray-600">Status</th>
                <th className="text-left p-4 text-gray-600">Total</th>
                <th className="text-right p-4 text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-4 text-gray-900">{order.id}</td>
                  <td className="p-4">
                    <div className="text-gray-900">{order.customerName}</div>
                    <div className="text-gray-600 text-sm">{order.email}</div>
                  </td>
                  <td className="p-4 text-gray-600">
                    {format(new Date(order.date), "MMM d, yyyy h:mm a")}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="p-4 text-blue-600 font-bold">
                    LKR {order.total.toFixed(2)}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100"
                    >
                      View Details
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default OrderManagement;
