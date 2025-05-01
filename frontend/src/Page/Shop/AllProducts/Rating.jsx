import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function Rating({
  initialRating = 0,
  onRate,
  size = "medium",
  readonly = false,
  showStats = false,
}) {
  const [rating, setRating] = useState(initialRating);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  const starSizes = {
    small: "w-4 h-4",
    medium: "w-6 h-6",
    large: "w-8 h-8",
  };

  const containerSizes = {
    small: "gap-1",
    medium: "gap-2",
    large: "gap-3",
  };

  const handleClick = (value) => {
    if (readonly) return;
    setRating(value);
    setHasRated(true);
    if (onRate) onRate(value); // Call the passed onRate function
  };

  const getStarColor = (index) => {
    if (hoveredRating > 0) {
      return index < hoveredRating ? "#FCD34D" : "#E5E7EB";
    }
    return index < rating ? "#FCD34D" : "#E5E7EB";
  };

  const getRatingText = () => {
    if (rating === 0) return "Rate this product";
    const texts = ["Poor", "Fair", "Good", "Very Good", "Excellent"];
    return texts[rating - 1];
  };

  const stats = {
    5: 78,
    4: 45,
    3: 23,
    2: 8,
    1: 4,
  };

  const totalRatings = Object.values(stats).reduce((a, b) => a + b, 0);

  return (
    <div className="flex flex-col items-center">
      <div className={`flex items-center ${containerSizes[size]} mb-2`}>
        {[1, 2, 3, 4, 5].map((index) => (
          <motion.button
            key={index}
            className={`focus:outline-none ${
              readonly ? "cursor-default" : "cursor-pointer"
            }`}
            whileHover={readonly ? {} : { scale: 1.1 }}
            whileTap={readonly ? {} : { scale: 0.9 }}
            onHoverStart={() => !readonly && setHoveredRating(index)}
            onHoverEnd={() => !readonly && setHoveredRating(0)}
            onClick={() => handleClick(index)}
          >
            <svg
              className={`${starSizes[size]} transition-colors duration-200`}
              fill={getStarColor(index - 1)}
              stroke={getStarColor(index - 1)}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={hoveredRating || rating}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-sm text-gray-600 min-h-[20px]"
        >
          {getRatingText()}
        </motion.div>
      </AnimatePresence>

      {showStats && (
        <div className="mt-4 w-full max-w-xs">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-2 mb-1">
              <span className="text-sm text-gray-600 w-6">{stars}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-yellow-400"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stats[stars] / totalRatings) * 100}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              <span className="text-sm text-gray-600 w-10">{stats[stars]}</span>
            </div>
          ))}
          <div className="text-sm text-gray-500 text-center mt-2">
            Based on {totalRatings} ratings
          </div>
        </div>
      )}

      {hasRated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-4 text-green-600 flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Thank you for your rating!</span>
        </motion.div>
      )}
    </div>
  );
}

export default Rating;
