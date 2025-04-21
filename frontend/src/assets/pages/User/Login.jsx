import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock } from 'react-icons/fa';
import Logo from './logo.png'; // Import the logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Show success message with better styling
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg';
        successMessage.textContent = 'Login successful!';
        document.body.appendChild(successMessage);
        setTimeout(() => successMessage.remove(), 3000);

        // Role-based navigation
        switch(data.user.role) {
          case "Admin":
            navigate("/admin-dashboard");
            break;
          case "Pet Owner":
            navigate("/");
            break;
          case "Veterinarian":
            navigate("/veterinarian-dashboard");
            break;
          default:
            alert("Unknown role. Please contact support.");
        }
      } else {
        // Show error message with better styling
        const errorMessage = document.createElement('div');
        errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg';
        errorMessage.textContent = data.message;
        document.body.appendChild(errorMessage);
        setTimeout(() => errorMessage.remove(), 3000);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Error logging in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f5e6d3] via-[#fef6f3] to-[#f5e6d3] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#4099cd]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#b77582]/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Login card */}
      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#4099cd]/10 transform transition-all duration-300 hover:scale-[1.01] relative z-10">
        {/* Logo */}
        {/* <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-23 w-23" />
        </div> */}

        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-[#5e4044] mb-2">Welcome Back</h2>
          <p className="text-[#b77582] text-lg">Sign in to access your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#5e4044] mb-2">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-[#b77582] group-hover:text-[#4099cd] transition-colors duration-300" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd] transition-all duration-300 bg-white hover:bg-[#f5e6d3]/5"
                placeholder="name@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-[#5e4044]">
                Password
              </label>
              <button 
                type="button" 
                className="text-sm text-[#4099cd] hover:text-[#5e4044] font-medium transition-colors duration-300 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-[#b77582] group-hover:text-[#4099cd] transition-colors duration-300" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-[#4099cd]/20 rounded-xl focus:ring-2 focus:ring-[#4099cd]/40 focus:border-[#4099cd] transition-all duration-300 bg-white hover:bg-[#f5e6d3]/5"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="w-full bg-[#4099cd] text-white py-3 rounded-xl font-semibold hover:bg-[#5e4044] focus:outline-none focus:ring-2 focus:ring-[#4099cd]/50 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl"
          >
            Sign in
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-[#4099cd]/10">
          <p className="text-center text-[#b77582]">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#4099cd] hover:text-[#5e4044] font-semibold transition-colors duration-300 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;