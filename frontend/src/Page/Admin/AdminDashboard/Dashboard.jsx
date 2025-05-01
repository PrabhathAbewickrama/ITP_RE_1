import React from "react";
import {
  FaUsers,
  FaCog,
  FaHourglass,
  FaExclamationTriangle,
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            Welcome to Your Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Business Management System / Dashboard
          </p>
        </div>
        <div className="flex space-x-6">
          <button className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition duration-200">
            Import
          </button>
          <button className="px-5 py-3 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transform hover:scale-105 transition duration-200">
            Filter
          </button>
          <button className="px-5 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition duration-200">
            Download
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg flex flex-col items-center">
          <FaUsers size={50} />
          <h2 className="text-xl font-semibold mt-4">TOTAL CLIENTS</h2>
          <p className="text-4xl font-bold">1200</p>
          <p className="text-sm opacity-80">Total number of clients</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 text-white p-6 rounded-xl shadow-lg flex flex-col items-center">
          <FaCog size={50} />
          <h2 className="text-xl font-semibold mt-4">ACTIVE SERVICES</h2>
          <p className="text-4xl font-bold">200</p>
          <p className="text-sm opacity-80">Services currently in use</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-700 text-white p-6 rounded-xl shadow-lg flex flex-col items-center">
          <FaHourglass size={50} />
          <h2 className="text-xl font-semibold mt-4">PENDING RENEWALS</h2>
          <p className="text-4xl font-bold">50</p>
          <p className="text-sm opacity-80">
            Services nearing renewal deadline
          </p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-700 text-white p-6 rounded-xl shadow-lg flex flex-col items-center">
          <FaExclamationTriangle size={50} />
          <h2 className="text-xl font-semibold mt-4">COMPLIANCE ALERT</h2>
          <p className="text-4xl font-bold">5</p>
          <p className="text-sm opacity-80">
            Compliance issues needing attention
          </p>
        </div>
      </div>

      {/* Activity Log and Target Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Activity Log */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            RECENT ACTIVITY LOG
          </h2>
          <table className="w-full text-left text-sm text-gray-700">
            <thead>
              <tr>
                <th className="border-b p-3">ACTION</th>
                <th className="border-b p-3">CLIENT</th>
                <th className="border-b p-3">SERVICE</th>
                <th className="border-b p-3">DATE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-3">Added New Client</td>
                <td className="p-3">John Doe Enterprises</td>
                <td className="p-3">Visa Services</td>
                <td className="p-3">2024-12-01 10:30 AM</td>
              </tr>
              <tr>
                <td className="p-3">Compliance Alert</td>
                <td className="p-3">ABC Corp</td>
                <td className="p-3">Tax Filing</td>
                <td className="p-3">2024-12-02 9:00 AM</td>
              </tr>
              <tr>
                <td className="p-3">Renewed Service</td>
                <td className="p-3">XYZ Holdings</td>
                <td className="p-3">Business Licensing</td>
                <td className="p-3">2024-12-01 11:45 AM</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Monthly Target */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            MONTHLY TARGET
          </h2>
          <div className="w-32 h-32 rounded-full bg-gray-200 flex justify-center items-center">
            <p className="text-4xl font-bold">31.1%</p>
          </div>
          <p className="mt-4 text-sm text-gray-600">Pending vs Done</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
