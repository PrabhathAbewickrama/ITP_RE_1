import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios"; // Adjust the path if needed
import ProductCard from "./ProductCard"; // Make sure the path is correct

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Example: GET /products -> returns an array of products
        const response = await axios.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center text-lg">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-4xl font-semibold text-gray-800 mb-6">
        All Products
      </h2>

      {/* Render products as a grid of ProductCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            _id={product._id} // Ensure it's correctly passed
            title={product.name}
            price={product.price}
            description={product.description} // Passing the description from the backend
            images={product.image}
            rating={product.rating}
            reviewCount={product.reviewCount}
            isOnSale={product.isOnSale}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
