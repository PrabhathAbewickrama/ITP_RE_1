import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaBriefcaseMedical, FaCalendarAlt, FaUserMd, FaTrash, FaEdit } from 'react-icons/fa';

import UpdateVetModal from "./vetUpdate";

const VetProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    // Get user from local storage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      
      // Check if user is a veterinarian
      if (userData.role !== "Veterinarian") {
        navigate("/login");
        return;
      }
      
      // Check if we have the correct ID format
      // In your data, the ID is stored as "id" not "_id"
      const userId = userData.id || userData._id;
      
      if (!userId) {
        console.error("User ID not found in stored user data");
        showNotification("User data is incomplete", "error");
        navigate("/login");
        return;
      }
      
      // Fetch full user details from API
      fetchUserDetails(userId);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const fetchUserDetails = async (userId) => {
    try {
      setLoading(true);
      console.log("Fetching user details for ID:", userId); // Debug log
      
      const response = await fetch(`http://localhost:3000/user/profile/${userId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.status}`);
      }
      
      const userData = await response.json();
      console.log("User data received:", userData); // Debug log
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user details:", error);
      // Show error notification
      showNotification("Failed to load profile data: " + error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId, updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/user/update/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      
      const data = await response.json();
      
      // Update local state
      setUser(data.user);
      
      // Update localStorage - make sure to use the same field structure
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const updatedUser = {
        ...storedUser,
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
        // Keep the id field if it exists in stored data
        ...(storedUser.id && { id: storedUser.id })
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      // Close the modal
      setShowUpdateModal(false);
      
      // Show success notification
      showNotification("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      showNotification("Failed to update profile", "error");
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    
    try {
      // Make sure we have the correct ID
      const userId = user.id || user._id;
      if (!userId) {
        throw new Error("User ID not found");
      }
      
      const response = await fetch(`http://localhost:3000/user/delete/${userId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete account");
      }
      
      // Clear user data and redirect to login
      localStorage.removeItem("user");
      showNotification("Account deleted successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
      showNotification("Failed to delete account: " + error.message, "error");
    } finally {
      setConfirmDelete(false);
    }
  };

  const showNotification = (message, type = "success") => {
    const notification = document.createElement("div");
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  

  if (!user) return null;

  // Check if isVerified exists, default to false if not
  const isVerified = user.isVerified || false;
  
  const verificationStatus = isVerified ? (
    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Verified</span>
  ) : (
    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">Pending Verification</span>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      
      <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          {/* Profile header */}
          <div className="px-4 py-5 sm:px-6 bg-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FaUserMd className="h-10 w-10 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold">Dr. {user.name}</h3>
                  <div className="flex items-center mt-1">
                    <span className="bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium mr-2">{user.role}</span>
                    
                  </div>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowUpdateModal(true)}
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className={`inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    confirmDelete ? "bg-red-600 hover:bg-red-700" : "bg-red-500 hover:bg-red-600"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
                >
                  <FaTrash className="mr-2" /> {confirmDelete ? "Confirm Delete" : "Delete Account"}
                </button>
              </div>
            </div>
          </div>
          
          {/* Personal Information */}
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaUser className="mr-2 text-indigo-500" /> Full Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  Dr. {user.name}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaEnvelope className="mr-2 text-indigo-500" /> Email address
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaPhone className="mr-2 text-indigo-500" /> Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.phone || "Not provided"}
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaBriefcaseMedical className="mr-2 text-indigo-500" /> Specialization
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.specialization || "General Practice"}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-2 text-indigo-500" /> Years of Experience
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.yearsOfExperience || 0} years
                </dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user.gender || "Not specified"}
                </dd>
              </div>
             
            </dl>
          </div>
        </div>
      </main>

      {/* Update Modal */}
      {showUpdateModal && (
        <UpdateVetModal 
          user={user}
          onClose={() => setShowUpdateModal(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default VetProfile;