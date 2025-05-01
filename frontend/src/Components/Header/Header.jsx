import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
  const navigate = useNavigate();
  // You can manage cart items count through your state management solution
  const [cartItemsCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("authToken");

  return (
    <header className="bg-white shadow-lg p-6 flex justify-between items-center sticky top-0 z-50">
      {/* Logo Section */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Logo" className="max-h-20 object-contain" />
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-8">
        <Link
          to="/"
          className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out font-medium"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out font-medium"
        >
          About
        </Link>
        <Link
          to="/all-products"
          className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out font-medium"
        >
          Shop
        </Link>
      </nav>

      {/* Register, Login, Profile Icon, Cart, Orders and Logout */}
      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/register">
              <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out font-medium">
                Register
              </button>
            </Link>
            <Link to="/login">
              <button className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out font-medium">
                Login
              </button>
            </Link>
          </>
        ) : (
          <>
            {/* Cart Icon with Counter */}
            <Link to="/cart">
              <div className="border-2 border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer relative">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-gray-600"
                />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </div>
            </Link>

            {/* My Orders */}
            <Link to="/orders">
              <div className="border-2 border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer">
                <FontAwesomeIcon
                  icon={faClipboardList}
                  className="text-gray-600"
                />
              </div>
            </Link>

            {/* Profile Icon */}
            <Link to="/profile">
              <div className="border-2 border-gray-300 rounded-full p-2 hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer">
                <FontAwesomeIcon icon={faUser} className="text-gray-600" />
              </div>
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-transparent border-2 border-red-600 text-red-600 px-6 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out font-medium"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
