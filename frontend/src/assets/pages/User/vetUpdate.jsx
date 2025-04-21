import React, { useState } from "react";
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaLock, FaBriefcaseMedical } from 'react-icons/fa';

const UpdateVetModal = ({ user, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    password: "",
    gender: user.gender || "",
    specialization: user.specialization || "",
    yearsOfExperience: user.yearsOfExperience || 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "yearsOfExperience") {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updateData = { ...formData };
    
    // Remove password if empty
    if (!updateData.password) {
      delete updateData.password;
    }
    
    // Keep role as Veterinarian
    updateData.role = "Veterinarian";
    
    onUpdate(user._id, updateData);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden">
        <div className="flex justify-between items-center bg-indigo-600 text-white px-6 py-3 rounded-t-lg">
          <h3 className="text-lg font-medium">
            Update Profile
          </h3>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <FaTimes className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Field */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Full Name
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FaUser className="text-gray-400" />
    </div>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      pattern="^[A-Za-z\s]+$"
      title="Only letters and spaces are allowed"
      onKeyDown={(e) => {
        const regex = /^[A-Za-z\s]*$/;
        if (!regex.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
          e.preventDefault();
        }
      }}
      required
      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
</div>

            
            {/* Email Field */}
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Email Address
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FaEnvelope className="text-gray-400" />
    </div>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={(e) => {
        const inputValue = e.target.value;
        const validEmail = inputValue.replace(/[^a-zA-Z0-9@.]/g, ""); // allow only letters, numbers, @, .
        setFormData((prev) => ({
          ...prev,
          email: validEmail,
        }));
      }}
      required
      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      placeholder="doctor@example.com"
    />
  </div>
</div>
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Phone Number
  </label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FaPhone className="text-gray-400" />
    </div>
    <input
      type="tel"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      pattern="^[0-9]{10}$"
      title="Please enter a valid 10-digit phone number"
      maxLength={10}
      onKeyDown={(e) => {
        // Allow only number keys, backspace, delete, arrows, tab
        if (
          !/[0-9]/.test(e.key) &&
          !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(e.key)
        ) {
          e.preventDefault();
        }
      }}
      required
      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
    />
  </div>
</div>

            
            {/* Gender Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            {/* Specialization Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Specialization
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBriefcaseMedical className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            {/* Years of Experience Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <input
                type="number"
                name="yearsOfExperience"
                value={formData.yearsOfExperience}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            {/* Password Field */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Leave empty to keep current password"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                For security reasons, please enter a new password or leave blank to keep your current password.
              </p>
            </div>
          </div>
          
          {/* Button Row */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateVetModal;