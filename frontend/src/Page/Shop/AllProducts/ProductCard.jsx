import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../../utils/axios"; // Adjust path to your Axios instance
import { toast } from "react-toastify";
import Rating from "./Rating"; // Adjust path to your Rating component
import jwtDecode from "jwt-decode"; // Ensure jwt-decode is installed: npm install jwt-decode

function ProductCard({
  _id,
  title,
  price,
  description,
  images = [],
  isOnSale,
  category,
  stockStatus = "In Stock",
}) {
  // State variables
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [averageRating, setAverageRating] = useState(0); // Average rating from all users
  const [reviewCount, setReviewCount] = useState(0); // Total number of reviews
  const [userRating, setUserRating] = useState(0); // Current user's rating
  const [hasRated, setHasRated] = useState(false); // Whether the current user has rated

  // Fetch user ID from JWT token
  const token = localStorage.getItem("authToken");
  let currentUserId = null;
  if (token) {
    try {
      const decoded = jwtDecode(token);
      currentUserId = decoded.userId; // Adjust 'userId' to match your token's structure (e.g., 'id', '_id')
    } catch (error) {
      console.error("Error decoding token:", error);
      toast.error("Authentication error. Please log in again.");
    }
  }

  // Fetch product details and ratings on mount or when _id changes
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/products/${_id}`);
        const product = response.data;
        const ratings = product.ratings || [];

        // Calculate average rating and review count
        const reviewCount = ratings.length;
        const totalStars = ratings.reduce((sum, r) => sum + r.star, 0);
        const averageRating = reviewCount > 0 ? totalStars / reviewCount : 0;

        setAverageRating(averageRating);
        setReviewCount(reviewCount);

        // Check if the current user has rated the product
        if (currentUserId) {
          const userRatingEntry = ratings.find(
            (r) => r.userID.toString() === currentUserId
          );
          if (userRatingEntry) {
            setUserRating(userRatingEntry.star);
            setHasRated(true);
          } else {
            setUserRating(0);
            setHasRated(false);
          }
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProductDetails();
  }, [_id, currentUserId]);

  // Handle rating submission
  const handleRate = async (value) => {
    try {
      if (!token) {
        toast.error("Please log in to rate this product.");
        return;
      }
      await axios.patch(
        `/products/review/${_id}`,
        { star: value, review: "Rated via quick rating" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Rating submitted successfully!");

      // Refresh product details after rating
      const response = await axios.get(`/products/${_id}`);
      const ratings = response.data.ratings || [];
      const reviewCount = ratings.length;
      const totalStars = ratings.reduce((sum, r) => sum + r.star, 0);
      const averageRating = reviewCount > 0 ? totalStars / reviewCount : 0;

      setAverageRating(averageRating);
      setReviewCount(reviewCount);

      const userRatingEntry = ratings.find(
        (r) => r.userID.toString() === currentUserId
      );
      if (userRatingEntry) {
        setUserRating(userRatingEntry.star);
        setHasRated(true);
      }
    } catch (error) {
      console.error("Rating submission error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to submit rating");
    }
  };

  // Image navigation for quick view
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Handle adding to cart
  const handleAddToCart = async () => {
    try {
      if (!token) {
        toast.error("Please log in to add products to the cart.");
        return;
      }
      await axios.post(
        "/cart",
        { productId: _id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`${title} added to cart!`);
    } catch (error) {
      console.error("Add to cart error:", error.response?.data);
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <>
      {/* Product Card */}
      <motion.div
        className="relative max-w-sm rounded-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="bg-gray-900/90 backdrop-blur-xl m-[1px] rounded-2xl overflow-hidden">
          {/* Badges */}
          {category && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute top-4 left-4 z-10 px-3 py-1 bg-gray-800/90 text-cyan-400 text-xs font-medium rounded-full border border-cyan-500/30"
            >
              {category}
            </motion.div>
          )}
          {isOnSale && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="absolute top-4 right-4 z-10 px-3 py-1 bg-rose-500 text-white text-xs font-bold rounded-full"
            >
              SALE
            </motion.div>
          )}

          {/* Image Section */}
          <div className="relative overflow-hidden group h-64">
            <motion.img
              className="w-full h-full object-cover"
              src={images[0] || "placeholder.jpg"}
              alt={title}
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"
              animate={{ opacity: isHovered ? 0.8 : 0.6 }}
            />
            <AnimatePresence>
              {isHovered && (
                <motion.button
                  onClick={() => setIsQuickViewOpen(true)}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="px-6 py-2.5 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/30 font-medium"
                    initial={{ scale: 0.8, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Quick View
                  </motion.span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Product Details */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <motion.h2 className="text-xl font-bold text-white">
                {title}
              </motion.h2>
              <motion.div className="text-right">
                <motion.span className="text-2xl font-bold text-white">
                  LKR {price}
                </motion.span>
                {isOnSale && (
                  <motion.span className="block text-sm text-gray-400 line-through">
                    LKR {(price * 1.2).toFixed(2)}
                  </motion.span>
                )}
              </motion.div>
            </div>

            {/* Average Rating */}
            <div className="flex items-center gap-2 mb-4">
              {/* <Rating
                initialRating={averageRating}
                size="small"
                readonly={true}
                showStats={false}
              /> */}
              <span className="text-yellow-400 font-bold">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-gray-400">({reviewCount} reviews)</span>
            </div>

            {/* User's Rating or Rating Input */}
            {hasRated ? (
              <div className="mb-4">
                <p className="text-white">Your rating: {userRating} stars</p>
              </div>
            ) : (
              <motion.div className="mb-4">
                <Rating
                  initialRating={0}
                  onRate={handleRate}
                  size="medium"
                  readonly={false}
                  showStats={false}
                />
              </motion.div>
            )}

            <motion.p
              className="text-gray-400 text-sm mb-6 line-clamp-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            <motion.div className="flex items-center mb-6">
              <motion.span
                className={`w-2 h-2 rounded-full mr-2 ${
                  stockStatus === "In Stock" ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <motion.span className="text-sm text-gray-400">
                {stockStatus}
              </motion.span>
            </motion.div>

            <div className="flex gap-3">
              <motion.button
                className="flex-1 bg-cyan-600 text-white py-3 px-4 rounded-xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
              >
                Add to Cart
              </motion.button>
              <motion.button
                className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-xl font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.location.href = '/checkout'}
              >
                Buy Now
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {isQuickViewOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={(e) =>
              e.target === e.currentTarget && setIsQuickViewOpen(false)
            }
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-gray-900/95 rounded-2xl overflow-hidden border border-gray-800"
            >
              <motion.button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 text-gray-400 hover:text-white"
                onClick={() => setIsQuickViewOpen(false)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
                {/* Image Section */}
                <div className="flex flex-col gap-4">
                  <div className="relative rounded-xl overflow-hidden bg-gray-800/50 h-[400px]">
                    {images.length > 0 && (
                      <>
                        <motion.img
                          key={currentImageIndex}
                          src={images[currentImageIndex]}
                          alt={title}
                          className="w-full h-full object-cover"
                          initial={{ scale: 1.2, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.4 }}
                        />
                        {images.length > 1 && (
                          <>
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                prevImage();
                              }}
                              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white text-xl"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              ‹
                            </motion.button>
                            <motion.button
                              onClick={(e) => {
                                e.stopPropagation();
                                nextImage();
                              }}
                              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white text-xl"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              ›
                            </motion.button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((img, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                            index === currentImageIndex
                              ? "ring-2 ring-cyan-500"
                              : "ring-1 ring-gray-700"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <img
                            src={img}
                            alt={`${title} - Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="flex flex-col h-full">
                  <div className="flex-1">
                    <motion.div className="flex items-center gap-2 mb-4">
                      {category && (
                        <motion.span className="px-3 py-1 bg-gray-800 text-cyan-400 text-sm rounded-full">
                          {category}
                        </motion.span>
                      )}
                      {isOnSale && (
                        <motion.span className="px-3 py-1 bg-rose-500 text-white text-sm rounded-full">
                          Sale
                        </motion.span>
                      )}
                    </motion.div>
                    <motion.h2 className="text-3xl font-bold mb-2 text-white">
                      {title}
                    </motion.h2>
                    <motion.div className="flex items-baseline gap-4 mb-6">
                      <span className="text-3xl font-bold text-cyan-400">
                        LKR {price}
                      </span>
                      {isOnSale && (
                        <span className="text-xl text-gray-500 line-through">
                          LKR {(price * 1.2).toFixed(2)}
                        </span>
                      )}
                    </motion.div>
                    <motion.div
                      className="prose prose-invert max-w-none mb-6 text-gray-300"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                    {averageRating > 0 && (
                      <motion.div className="flex items-center gap-4 mb-6">
                        <Rating
                          initialRating={averageRating}
                          size="small"
                          readonly={true}
                          showStats={false}
                        />
                        <span className="text-gray-400">
                          {averageRating.toFixed(1)} ({reviewCount} reviews)
                        </span>
                      </motion.div>
                    )}
                    <motion.div className="flex items-center gap-2 mb-8">
                      <motion.span
                        className={`w-2 h-2 rounded-full ${
                          stockStatus === "In Stock"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span className="text-gray-400">{stockStatus}</span>
                    </motion.div>
                  </div>
                  <motion.div className="flex gap-4">
                    <motion.button
                      className="flex-1 bg-cyan-600 text-white py-3 px-4 rounded-xl font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-xl font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Buy Now
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ProductCard;
