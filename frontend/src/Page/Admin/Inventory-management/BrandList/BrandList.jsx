import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import { toast } from "react-toastify";
import { FaTrash, FaSearch, FaTimes, FaBoxOpen, FaTag } from "react-icons/fa";
import Modal from "react-modal";

// Set the root element for accessibility (required by react-modal)
Modal.setAppElement("#root");

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [brandToDelete, setBrandToDelete] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch brands from backend
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get("/brand/getBrands", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBrands(res.data);
      setFilteredBrands(res.data); // Initially set filteredBrands to all brands
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load brands", {
        icon: "❌",
        className: "bg-red-500 text-white font-medium",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (!query) {
      setFilteredBrands(brands); // Reset list when input is empty
    } else {
      const filtered = brands.filter((brand) =>
        brand.name.toLowerCase().includes(query)
      );
      setFilteredBrands(filtered);
    }
  };

  // Clear search input
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredBrands(brands);
  };

  // Open delete confirmation modal
  const openDeleteModal = (slug) => {
    setBrandToDelete(slug);
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setBrandToDelete(null);
  };

  // Delete brand
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("authToken");

      await axios.delete(`/brand/${brandToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Brand deleted successfully!", {
        icon: "🗑️",
        className: "bg-emerald-500 text-white font-medium",
      });
      fetchBrands(); // Refresh brand list
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete brand", {
        icon: "❌",
        className: "bg-red-500 text-white font-medium",
      });
    } finally {
      closeDeleteModal();
    }
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 shadow-xl rounded-xl min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 rounded-lg shadow-lg">
              <FaBoxOpen className="text-white text-xl" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-transparent bg-clip-text">
              Brand Management
            </h2>
          </div>

          <div className="text-sm text-purple-600 font-medium">
            {filteredBrands.length}{" "}
            {filteredBrands.length === 1 ? "brand" : "brands"} found
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
          <div className="relative flex items-center bg-white rounded-xl shadow-md overflow-hidden border border-purple-100 group-hover:border-purple-200 transition duration-300">
            <div className="p-4 text-purple-400 group-hover:text-purple-600 transition duration-300">
              <FaSearch className="text-lg" />
            </div>
            <input
              type="text"
              placeholder="Search brands by name..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full py-4 px-2 bg-transparent outline-none text-purple-800 placeholder-purple-300 text-lg"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="p-4 text-purple-400 hover:text-red-500 transition duration-300"
              >
                <FaTimes className="text-lg" />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl shadow-lg border border-purple-100 bg-white backdrop-blur-sm bg-opacity-80 transform transition duration-300 hover:shadow-xl">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                    Brand Name
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                    Category
                  </th>
                  <th className="py-4 px-6 text-center text-sm font-semibold uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100">
                {filteredBrands.length > 0 ? (
                  filteredBrands.map((brand, index) => (
                    <tr
                      key={brand._id}
                      className={`hover:bg-purple-50 transition-colors duration-200 ${
                        index % 2 === 0 ? "bg-white" : "bg-indigo-50/30"
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-purple-600">
                            <FaTag />
                          </div>
                          <div className="ml-4">
                            <div className="text-base font-medium text-indigo-800">
                              {brand.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-full bg-purple-100 text-purple-800">
                          {brand.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          className="group relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-medium text-indigo-600 rounded-lg shadow-md bg-white border border-red-100 hover:border-red-200 hover:bg-red-50 transition-all duration-300 ease-out"
                          onClick={() => openDeleteModal(brand.slug)}
                        >
                          <span className="absolute inset-0 w-0 bg-gradient-to-br from-red-500 to-pink-500 transition-all duration-300 ease-out group-hover:w-full"></span>
                          <span className="relative flex items-center gap-2 text-sm font-medium text-red-500 transition-colors duration-300 ease-in-out group-hover:text-white">
                            <FaTrash />
                            Delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center justify-center text-purple-400">
                        <FaBoxOpen className="text-5xl mb-3 opacity-50" />
                        <p className="text-xl font-medium">No brands found</p>
                        {searchQuery && (
                          <p className="text-sm mt-2">
                            Try adjusting your search query
                          </p>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Delete Brand Confirmation"
          className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-auto outline-none border-2 border-purple-100"
          overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50"
        >
          <div className="text-center mb-6">
            <div className="bg-red-100 rounded-full p-4 inline-flex items-center justify-center mx-auto mb-4">
              <FaTrash className="text-2xl text-red-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              Confirm Deletion
            </h2>
            <p className="text-gray-600">
              Are you sure you want to delete this brand? This action cannot be
              undone.
            </p>
          </div>
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
            <button
              className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-colors duration-300 font-medium flex items-center gap-2"
              onClick={handleDelete}
            >
              <FaTrash /> Delete
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default BrandList;
