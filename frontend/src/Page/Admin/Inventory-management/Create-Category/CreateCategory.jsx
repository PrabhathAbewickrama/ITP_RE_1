import React, { useState, useEffect } from "react";
import axios from "../../../../utils/axios";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaLayerGroup,
  FaCheck,
  FaSave,
  FaLightbulb,
  FaMagic,
  FaTags,
} from "react-icons/fa";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // For animated placeholder text
  const placeholders = [
    "Fashion & Apparel",
    "Electronics & Gadgets",
    "Home & Garden",
    "Beauty & Personal Care",
    "Sports & Outdoors",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotate placeholders
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
    setCharCount(value.length);
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.warning("Please enter a category name", {
        icon: "⚠️",
        className: "bg-amber-500 text-white font-medium",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        "/category/createCategory",
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category created successfully!", {
        icon: <FaCheck />,
        className: "bg-emerald-500 text-white font-medium",
      });

      // Show success state
      setIsSuccess(true);

      // Animation before clearing
      setTimeout(() => {
        setName("");
        setCharCount(0);
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create category",
        {
          icon: "❌",
          className: "bg-red-500 text-white font-medium",
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Glass morphism container */}
      <div className="max-w-3xl mx-auto backdrop-blur-sm bg-white/30 p-1 rounded-2xl shadow-xl">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

          <div className="p-8">
            {/* Animated header */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-md opacity-70 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 rounded-full shadow-lg">
                    <FaLayerGroup className="text-white text-2xl" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-transparent bg-clip-text">
                    Create Category
                  </h2>
                  <p className="text-sm text-purple-600 mt-1">
                    Add a new category to your product catalog
                  </p>
                </div>
              </div>

              {/* Floating decorative elements */}
              <div className="relative">
                <div className="absolute top-0 right-0 -translate-y-6 translate-x-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/20 blur-xl"></div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Form column */}
              <div className="md:col-span-3">
                <div
                  className={`relative transition-all duration-500 ${
                    isSuccess ? "scale-105" : ""
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-xl blur-md opacity-30 transition-opacity duration-300 ${
                      isFocused ? "opacity-60" : ""
                    } ${isSuccess ? "opacity-80" : ""}`}
                  ></div>

                  {/* Confetti for success state */}
                  {isSuccess && (
                    <div className="absolute inset-0 overflow-hidden">
                      {[...Array(20)].map((_, i) => (
                        <div
                          key={i}
                          className={`absolute w-2 h-2 rounded-full bg-${
                            ["pink", "purple", "indigo", "blue"][i % 4]
                          }-${400 + (i % 3) * 100} animate-confetti`}
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.1}s`,
                            animationDuration: `${1 + Math.random() * 2}s`,
                          }}
                        ></div>
                      ))}
                    </div>
                  )}

                  <div
                    className={`relative bg-white backdrop-blur-sm rounded-xl shadow-lg p-8 transition-all duration-500 ${
                      isSuccess ? "shadow-green-200/50" : ""
                    }`}
                  >
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="flex justify-between items-center">
                          <span className="text-sm font-medium bg-gradient-to-r from-indigo-700 to-purple-700 text-transparent bg-clip-text flex items-center">
                            <FaTags className="mr-2 text-purple-500" />
                            Category Name
                          </span>
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded-full transition-colors duration-300 ${
                              charCount === 0
                                ? "bg-gray-100 text-gray-400"
                                : "bg-purple-100 text-purple-600"
                            }`}
                          >
                            {charCount > 0
                              ? `${charCount} characters`
                              : "Required"}
                          </span>
                        </label>

                        <div
                          className={`relative transition-all duration-300 ${
                            isFocused ? "scale-105" : ""
                          }`}
                        >
                          <input
                            type="text"
                            value={name}
                            onChange={handleChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder={placeholders[placeholderIndex]}
                            required
                            className={`w-full p-4 pr-12 bg-gray-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-800 placeholder-purple-300/80 transition-all duration-300 ${
                              isSuccess
                                ? "border-green-300 bg-green-50/50 ring-2 ring-green-300"
                                : "border-purple-100 hover:border-purple-200"
                            }`}
                            disabled={isSubmitting || isSuccess}
                          />

                          <div
                            className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                              isSuccess ? "text-green-500" : "text-purple-400"
                            }`}
                          >
                            {isSuccess ? (
                              <FaCheck className="animate-bounce" />
                            ) : (
                              <FaLayerGroup />
                            )}
                          </div>

                          {/* Animated underline effect */}
                          <div
                            className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-in-out ${
                              isFocused ? "w-full" : "w-0"
                            }`}
                          ></div>
                        </div>

                        <p className="text-xs text-purple-600 mt-2 ml-1 flex items-center">
                          <FaMagic className="mr-1 text-purple-400" />
                          Create a unique category to organize your products
                          effectively
                        </p>
                      </div>

                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting || isSuccess}
                          className={`w-full relative overflow-hidden group flex items-center justify-center gap-2 py-4 px-6 rounded-lg font-medium text-white transition-all duration-500 ${
                            isSuccess
                              ? "bg-gradient-to-r from-emerald-500 to-green-500 scale-105"
                              : isSubmitting
                              ? "bg-purple-400 cursor-not-allowed"
                              : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5 active:translate-y-0"
                          }`}
                        >
                          {/* Animated background effect */}
                          <span className="absolute left-0 w-full bg-gradient-to-r from-pink-500 to-purple-500 h-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>

                          {/* Button ripple effect */}
                          <span className="absolute w-0 h-0 rounded-full bg-white opacity-30 transform -translate-x-1/2 -translate-y-1/2 group-active:w-[500%] group-active:h-[500%] transition-all duration-700"></span>

                          <span className="relative flex items-center justify-center gap-2">
                            {isSuccess ? (
                              <>
                                <FaCheck className="animate-pulse" />
                                Category Created!
                              </>
                            ) : isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Creating...
                              </>
                            ) : (
                              <>
                                <FaSave />
                                Create Category
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {/* Tips column */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100 shadow-sm relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full bg-purple-100 opacity-60"></div>
                  <div className="absolute -bottom-8 -left-8 w-16 h-16 rounded-full bg-pink-100 opacity-60"></div>

                  <div className="relative">
                    <h3 className="text-lg font-medium text-purple-800 mb-3 flex items-center gap-2">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <FaLightbulb className="text-purple-600" />
                      </div>
                      Best Practices
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Use clear, descriptive names that customers can easily understand",
                        "Avoid duplicate categories that could confuse inventory management",
                        "Establish a consistent naming convention for all categories",
                      ].map((tip, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 group"
                        >
                          <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs transform transition-all duration-300 group-hover:scale-110">
                            {index + 1}
                          </div>
                          <span className="text-sm text-purple-700 group-hover:text-purple-900 transition-colors duration-300">
                            {tip}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Quick stats */}
                <div className="bg-white p-6 rounded-xl border border-purple-100 shadow-sm">
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                    Recent Categories
                  </h3>
                  <div className="space-y-3">
                    {["Clothing", "Electronics", "Home Decor"].map(
                      (cat, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full bg-${
                                ["indigo", "purple", "pink"][index]
                              }-500`}
                            ></span>
                            <span className="text-purple-800">{cat}</span>
                          </span>
                          <span className="text-xs text-gray-400">
                            2 min ago
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for confetti animation */}
      <style jsx>{`
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
          100% {
            transform: translateY(50px) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-confetti {
          animation: confetti 1s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CreateCategory;
