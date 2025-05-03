import React, { useState, useEffect } from "react";
import axios from "../../../../utils/axios";
import { toast } from "react-toastify";
import UploadWidget from "./UploadWidget";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    category: "",
    brand: "",
    color: "",
    quantity: "",
    price: "",
    regularPrice: "",
    description: "",
  });

  const [files, setFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category/getCategories");
      setCategories(res.data);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get("/brand/getBrands");
      setBrands(res.data);
    } catch (error) {
      toast.error("Failed to fetch brands");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const saveProduct = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.sku ||
      !product.category ||
      !product.brand ||
      !product.price ||
      !product.description
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(product).forEach((key) => formData.append(key, product[key]));

      if (files.length > 0) {
        files.forEach((file) => {
          formData.append("image", file);
        });
      } else {
        toast.error("Please upload at least one image");
        return;
      }

      const token = localStorage.getItem("authToken");
      await axios.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product created successfully");
      setProduct({
        name: "",
        sku: "",
        category: "",
        brand: "",
        color: "",
        quantity: "",
        price: "",
        regularPrice: "",
        description: "",
      });
      setFiles([]);
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Product creation error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-lg p-8 mt-8">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6">
        Create a New Product
      </h2>

      {/* Image Upload */}
      <UploadWidget files={files} setFiles={setFiles} />

      <form onSubmit={saveProduct} className="space-y-6">
        {/* Name & SKU */}
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
              className="border-gray-300 border rounded-md w-full p-3 mt-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            />
            {!/^[A-Za-z\s]+$/.test(product.name) && product.name && (
              <p className="text-red-500 text-sm mt-1">
                Product Name should contain only letters and spaces.
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">SKU</label>
            <input
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            />
          </div>
        </div>

        {/* Category & Brand */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Brand</label>
            <select
              name="brand"
              value={product.brand}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
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

        {/* Color & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium">Color</label>
            <input
              type="text"
              name="color"
              value={product.color}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            />
            {!/^[A-Za-z\s]+$/.test(product.color) && product.color && (
              <p className="text-red-500 text-sm mt-1">
                Color should contain only letters and spaces.
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            />
            {(!/^\d+(\.\d+)?$/.test(product.price) || product.price <= 0) &&
              product.price && (
                <p className="text-red-500 text-sm mt-1">
                  Price should be a positive number.
                </p>
              )}
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
              name="regularPrice"
              value={product.regularPrice}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            />
            {(!/^\d+(\.\d+)?$/.test(product.regularPrice) ||
              product.regularPrice <= 0) &&
              product.regularPrice && (
                <p className="text-red-500 text-sm mt-1">
                  Regular Price should be a positive number.
                </p>
              )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleInputChange}
              className="border-gray-300 border rounded-md w-full p-3 mt-2 focus:ring-blue-500 focus:border-blue-500 shadow-md"
            />
            {(!/^\d+$/.test(product.quantity) || product.quantity <= 0) &&
              product.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  Quantity should be a positive integer greater than 0.
                </p>
              )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <ReactQuill
            theme="snow"
            value={product.description}
            onChange={(value) => setProduct({ ...product, description: value })}
            modules={CreateProduct.modules}
            formats={CreateProduct.formats}
            className="bg-white border border-gray-300 rounded-md p-6 mt-2 shadow-md h-96"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

// ✅ Add more toolbar options for ReactQuill
CreateProduct.modules = {
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

CreateProduct.formats = [
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

export default CreateProduct;
