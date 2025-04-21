import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaUserTag } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "Pet Owner",
  });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Show success message with better styling
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
        successMessage.textContent = 'Registration successful!';
        document.body.appendChild(successMessage);
        setTimeout(() => successMessage.remove(), 3000);
        
        navigate("/login");
      } else {
        // Show error message with better styling
        const errorMessage = document.createElement('div');
        errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
        errorMessage.textContent = data.message || "Unknown error occurred";
        document.body.appendChild(errorMessage);
        setTimeout(() => errorMessage.remove(), 3000);
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("Error registering. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "phone") {
      // Allow only numbers and restrict length to 10 digits
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
      if (numericValue.length <= 10) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5e6d3] via-[#fef6f3] to-[#f5e6d3] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4099cd]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#b77582]/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Register card */}
      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#4099cd]/10 transform transition-all duration-300 hover:scale-[1.01] relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#5e4044] mb-2">Create Account</h2>
          <p className="text-[#b77582] text-lg">Join us today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Input */}
<div className="relative group">
  <label className="block text-sm font-semibold text-[#5e4044] mb-2">Full Name</label>
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <FaUser className="h-5 w-5 text-[#b77582] group-hover:text-[#4099cd] transition-colors duration-300" />
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
        if (!regex.test(e.key) && e.key !== 'Backspace') {
          e.preventDefault();
        }
      }}
      className="w-full pl-10 pr-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd] transition-all duration-300 bg-white hover:bg-[#f5e6d3]/5"
      required
    />
  </div>
</div>


          {/* Email Input */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-[#5e4044] mb-2">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-[#b77582] group-hover:text-[#4099cd] transition-colors duration-300" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd] transition-all duration-300 bg-white hover:bg-[#f5e6d3]/5"
                
                required
              />
            </div>
          </div>

          {/* Phone Input */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-[#5e4044] mb-2">Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="h-5 w-5 text-[#b77582] group-hover:text-[#4099cd] transition-colors duration-300" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd] transition-all duration-300 bg-white hover:bg-[#f5e6d3]/5"
                
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-[#5e4044] mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-[#b77582] group-hover:text-[#4099cd] transition-colors duration-300" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd] transition-all duration-300 bg-white hover:bg-[#f5e6d3]/5"
                
                required
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="relative group">
            <label className="block text-sm font-semibold text-[#5e4044] mb-2">Select Role</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUserTag className="h-5 w-5 text-[#b77582] group-hover:text-[#4099cd] transition-colors duration-300" />
              </div>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd] transition-all duration-300 bg-white hover:bg-[#f5e6d3]/5 appearance-none cursor-pointer"
              >
                <option value="Pet Owner">Pet Owner</option>
                {/* <option value="Veterinarian">Veterinarian</option> */}
                {/* <option value="Admin">Admin</option> */}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#4099cd] text-white py-3 rounded-xl font-semibold hover:bg-[#5e4044] focus:outline-none focus:ring-2 focus:ring-[#4099cd]/50 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl mt-6"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[#4099cd]/10">
          <p className="text-center text-[#b77582]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#4099cd] hover:text-[#5e4044] font-semibold transition-colors duration-300 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;