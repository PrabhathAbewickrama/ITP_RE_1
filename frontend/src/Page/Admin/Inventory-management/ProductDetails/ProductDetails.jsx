import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import { useParams, Navigate } from "react-router-dom"; // For accessing URL params
import ReactQuill from "react-quill"; // Import ReactQuill for the description
import "react-quill/dist/quill.snow.css"; // Import ReactQuill styles
import Slider from "react-slick"; // Import Slick Carousel for images
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetails = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 404) {
          // If product not found, redirect to home or show an error message
          return <Navigate to="/home" />;
        }
        console.error("Failed to fetch product details", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true, // Add fade effect between images
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8 mt-8">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6">
        {product.name}
      </h2>

      {/* Displaying Product Images in a carousel */}
      {product.image && product.image.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Images</h3>
          <div className="w-full">
            <Slider {...settings}>
              {product.image.map((image, index) => (
                <div key={index}>
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-full h-80 object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {/* Displaying Product Details */}
      <form className="space-y-6">
        {/* Name & SKU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">
              Product Name
            </label>
            <input
              type="text"
              value={product.name}
              readOnly
              className="border-gray-300 border rounded-md w-full p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">SKU</label>
            <input
              type="text"
              value={product.sku}
              readOnly
              className="border-gray-300 border rounded-md w-full p-3 mt-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <input
              type="text"
              value={product.category}
              readOnly
              className="border-gray-300 border rounded-md w-full p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Brand</label>
            <input
              type="text"
              value={product.brand}
              readOnly
              className="border-gray-300 border rounded-md w-full p-3 mt-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Color & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">Color</label>
            <input
              type="text"
              value={product.color}
              readOnly
              className="border-gray-300 border rounded-md w-full p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              value={product.price}
              readOnly
              className="border-gray-300 border rounded-md w-full p-3 mt-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Regular Price & Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">
              Regular Price
            </label>
            <input
              type="number"
              value={product.regularPrice}
              readOnly
              className="border-gray-300 border rounded-md w-full p-3 mt-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              value={product.quantity}
              readOnly
              className="border-gray-300 border rounded-md w-full p-3 mt-2 bg-gray-100"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <ReactQuill
            value={product.description}
            readOnly
            theme="snow"
            className="bg-gray-100 border border-gray-300 rounded-md p-6 mt-2 shadow-md h-96"
          />
        </div>
      </form>
    </div>
  );
};

export default ProductDetails;
