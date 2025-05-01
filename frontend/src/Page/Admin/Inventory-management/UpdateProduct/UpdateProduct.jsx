import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import { useParams, Navigate } from "react-router-dom"; // For accessing URL params
import UploadWidget from "./UploadWidget";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import ReactQuill styles

const UpdateProduct = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removedImages, setRemovedImages] = useState([]); // Keep track of removed images

  // Dropdown Data
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  // Fetch product details, categories, and brands on mount
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);

        // Combine existing image URLs (strings) with new images (none yet)
        // We'll store them all in `files`
        const existingImages = response.data.image || [];
        setFiles(existingImages);

        setLoading(false);

        // Fetch categories
        const catRes = await axios.get("/category/getCategories");
        setCategories(catRes.data);

        // Fetch brands
        const brandRes = await axios.get("/brand/getBrands");
        setBrands(brandRes.data);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 404) {
          return <Navigate to="/home" />;
        }
        console.error("Failed to fetch data:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // This function will now be called when an existing image is removed
  const handleRemoveImage = (imageUrl) => {
    // Add the URL of the removed image to the removedImages array
    setRemovedImages((prevRemovedImages) => [...prevRemovedImages, imageUrl]);
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!product.name || !product.price || !product.quantity) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();

      // Append product fields to FormData
      Object.keys(product).forEach((key) => {
        if (key !== "image" && key !== "description")
          formData.append(key, product[key]);
      });

      // Append existing or new images
      files.forEach((file) => {
        if (file instanceof File) {
          formData.append("image", file); // Append new file
        }
      });

      // Always append removedImages, even if it's empty
      formData.append("removedImages", JSON.stringify(removedImages || []));

      // Append the description (can be rich text)
      formData.append("description", product.description);

      const token = localStorage.getItem("authToken");
      await axios.patch(`/products/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8 mt-8">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6">
        Update Product
      </h2>

      {/* Image Upload */}
      <UploadWidget
        files={files}
        setFiles={setFiles}
        onRemoveImage={handleRemoveImage} // Pass the callback here
      />

      <form onSubmit={handleSave} className="space-y-6">
        {/* Product Name and SKU */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">SKU</label>
            <input
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2"
            />
          </div>
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Brand Dropdown */}
          <div>
            <label className="block text-gray-700 font-medium">Brand</label>
            <select
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2"
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand.name}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Color and Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">Color</label>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2"
            />
          </div>
        </div>

        {/* Regular Price and Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">
              Regular Price
            </label>
            <input
              type="number"
              name="regularPrice"
              value={product.regularPrice}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2"
            />
          </div>
        </div>

        {/* Description with Sectioning */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <ReactQuill
            value={product.description}
            onChange={(value) => setProduct({ ...product, description: value })}
            theme="snow"
            className="bg-white border border-gray-300 rounded-md p-6 mt-2 shadow-md h-96"
            modules={UpdateProduct.modules}
            formats={UpdateProduct.formats}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

// Adding toolbar options for ReactQuill (for description sectioning)
UpdateProduct.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

UpdateProduct.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "list",
  "bullet",
  "indent",
  "blockquote",
  "code-block",
  "color",
  "background",
  "link",
  "image",
  "video",
];

export default UpdateProduct;
