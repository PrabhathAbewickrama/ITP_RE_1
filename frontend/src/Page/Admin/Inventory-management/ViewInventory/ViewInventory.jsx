import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const mockInventoryData = {
  stats: {
    totalItems: 2547,
    lowStock: 43,
    outOfStock: 12,
    recentlyAdded: 156,
  },
  categories: [
    { name: "Electronics", value: 850 },
    { name: "Clothing", value: 621 },
    { name: "Home & Garden", value: 432 },
    { name: "Sports", value: 378 },
    { name: "Books", value: 266 },
  ],
  salesTrend: [
    { month: "Jan", sales: 4000, inventory: 2400 },
    { month: "Feb", sales: 3000, inventory: 2210 },
    { month: "Mar", sales: 2000, inventory: 2290 },
    { month: "Apr", sales: 2780, inventory: 2000 },
    { month: "May", sales: 1890, inventory: 2181 },
    { month: "Jun", sales: 2390, inventory: 2500 },
  ],
  topProducts: [
    { name: "Wireless Headphones", stock: 145, sales: 89 },
    { name: "Smart Watch", stock: 82, sales: 68 },
    { name: "Laptop Stand", stock: 116, sales: 45 },
    { name: "USB-C Hub", stock: 94, sales: 42 },
    { name: "Keyboard", stock: 78, sales: 38 },
  ],
};

const COLORS = ["#3B82F6", "#10B981", "#6366F1", "#F59E0B", "#EC4899"];

function StatCard({ title, value, trend, icon: Icon }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-xl bg-blue-50">
          <Icon className="w-6 h-6 text-blue-600" />
        </div>
        {trend && (
          <span
            className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
              trend > 0
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {trend > 0 ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mt-1">
        {value.toLocaleString()}
      </p>
    </motion.div>
  );
}

function ViewInventory() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Inventory Overview
          </h1>
          <p className="mt-2 text-gray-600">
            Track and manage your inventory metrics
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Items"
            value={mockInventoryData.stats.totalItems}
            trend={12}
            icon={(props) => (
              <svg
                {...props}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            )}
          />
          <StatCard
            title="Low Stock Items"
            value={mockInventoryData.stats.lowStock}
            trend={-8}
            icon={(props) => (
              <svg
                {...props}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            )}
          />
          <StatCard
            title="Out of Stock"
            value={mockInventoryData.stats.outOfStock}
            trend={5}
            icon={(props) => (
              <svg
                {...props}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          />
          <StatCard
            title="Recently Added"
            value={mockInventoryData.stats.recentlyAdded}
            trend={15}
            icon={(props) => (
              <svg
                {...props}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            )}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Sales vs Inventory Trend */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Sales vs Inventory Trend
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockInventoryData.salesTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stackId="1"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.2}
                  />
                  <Area
                    type="monotone"
                    dataKey="inventory"
                    stackId="2"
                    stroke="#10B981"
                    fill="#10B981"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Category Distribution
            </h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockInventoryData.categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {mockInventoryData.categories.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Top Products Table */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Top Products
            </h2>
            <p className="text-gray-500 mt-1">
              Products with highest stock and sales
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Product Name
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Stock Level
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Sales
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockInventoryData.topProducts.map((product, index) => (
                  <motion.tr
                    key={product.name}
                    className="border-b border-gray-100 hover:bg-gray-50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {product.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-gray-900">{product.stock}</span>
                        <div className="ml-4 w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500"
                            style={{ width: `${(product.stock / 150) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-gray-900">{product.sales}</span>
                        <div className="ml-4 w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${(product.sales / 100) * 100}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {product.stock > 100 ? (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          In Stock
                        </span>
                      ) : product.stock > 50 ? (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                          Medium
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                          Low Stock
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ViewInventory;
