import React from "react";
import { FaBell, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "../../../utils/axios"; // Ensure axios is correctly set up
import { toast } from "react-toastify";

const AdminHeader = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      await axios.get("/users/logout"); // Call logout API
      localStorage.removeItem("user"); // Remove user from localStorage
      localStorage.removeItem("authToken"); // Remove token

      toast.success("Logged out successfully!");
      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error("Logout failed. Try again!");
    }
  };

  return (
    <div className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Left: Admin Title */}
      <h1 className="text-xl font-bold text-gray-700">Admin Dashboard</h1>

      {/* Right: Actions (Notifications, Profile, Logout) */}
      <div className="flex items-center space-x-6">
        

        {/* User Profile */}
        <div className="flex items-center space-x-2">
          <FaUserCircle className="text-gray-600 text-2xl" />
          <span className="text-gray-700 font-medium">Admin</span>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          <FaSignOutAlt className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminHeader;
