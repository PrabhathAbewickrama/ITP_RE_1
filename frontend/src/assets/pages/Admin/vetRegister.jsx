import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaBriefcaseMedical } from 'react-icons/fa';

const VeterinarianRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    gender: "Male",
    specialization: "",
    yearsOfExperience: 0
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // For numeric fields, ensure they're handled as numbers
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:3000/user/register-vet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          role: "Veterinarian" // Ensure role is set to Veterinarian
        }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showNotification("Veterinarian registered successfully!");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          gender: "Male",
          specialization: "",
          yearsOfExperience: 0
        });
      } else {
        showNotification(data.message || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Error registering veterinarian:", error);
      showNotification("Error registering veterinarian", "error");
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="bg-indigo-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">Register New Veterinarian</h2>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      onChange={(e) => {
        const inputValue = e.target.value;
        const validValue = inputValue.replace(/[^a-zA-Z.\s]/g, "");
        setFormData((prev) => ({
          ...prev,
          name: validValue,
        }));
      }}
      required
      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      placeholder=""
    />
  </div>
</div>

              
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
        const validEmail = inputValue.replace(/[^a-zA-Z0-9@.]/g, ""); // Keep only letters, numbers, @, .
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
      onChange={(e) => {
        const inputValue = e.target.value;
        const digitsOnly = inputValue.replace(/\D/g, ""); // Remove non-digits
        if (digitsOnly.length <= 10) {
          setFormData((prev) => ({
            ...prev,
            phone: digitsOnly,
          }));
        }
      }}
      required
      className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      placeholder="0771234567"
    />
  </div>
</div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
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
                    required
                    minLength="6"
                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Minimum 6 characters"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
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
                    placeholder="Cardiology, Surgery, etc."
                  />
                </div>
              </div>
              
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
            </div>
            
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => navigate("/adminDashboard")}
                className="px-6 py-2 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isLoading ? "Registering..." : "Register Veterinarian"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VeterinarianRegistration;