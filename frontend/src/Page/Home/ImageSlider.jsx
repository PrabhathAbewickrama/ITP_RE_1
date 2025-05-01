import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory

const images = [
  {
    src: "https://images.pexels.com/photos/406014/pexels-photo-406014.jpeg", // Replace with your image paths
    alt: "Image 1",
  },
  {
    src: "https://images.pexels.com/photos/1904105/pexels-photo-1904105.jpeg", // Replace with your image paths
    alt: "Image 2",
  },
  {
    src: "https://images.pexels.com/photos/1633522/pexels-photo-1633522.jpeg", // Replace with your image paths
    alt: "Image 3",
  },
  {
    src: "https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg", // Replace with your image paths
    alt: "Image 3",
  },
  {
    src: "https://images.pexels.com/photos/1870301/pexels-photo-1870301.jpeg", // Replace with your image paths
    alt: "Image 3",
  },
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // useNavigate hook

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Changes every 3 seconds

    // Redirect to home after the slider changes automatically a few times
    // setTimeout(() => {
    //   navigate("/"); // Change '/home' to the route for your homepage
    // }, 15000); // Redirect after 15 seconds

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="relative w-full h-full">
      <img
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default ImageSlider;
