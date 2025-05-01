import React, { useEffect, useState } from "react";
import axios from "../../../../utils/axios";
import { toast } from "react-toastify";
import {
  FaTrash,
  FaLayerGroup,
  FaTags,
  FaFilter,
  FaTimes,
  FaEllipsisV,
  FaArrowUp,
  FaArrowDown,
  FaBox,
  FaExclamationTriangle,
  FaShapes,
} from "react-icons/fa";
import Modal from "react-modal";

// Set the root element for accessibility (required by react-modal)
Modal.setAppElement("#root");

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [categoryName, setCategoryName] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);
  const [deleteProgress, setDeleteProgress] = useState(0);

  // Fetch categories from backend
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get("/category/getCategories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(res.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch categories",
        {
          icon: "❌",
          className: "bg-red-500 text-white font-medium",
        }
      );
    } finally {
      setLoading(false);
    }
  };

  // Sort categories
  const sortedCategories = [...categories].sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortBy].localeCompare(b[sortBy]);
    } else {
      return b[sortBy].localeCompare(a[sortBy]);
    }
  });

  // Toggle sort order
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  // Filter categories
  const filteredCategories = sortedCategories.filter((category) =>
    category.name.toLowerCase().includes(categoryName.toLowerCase())
  );

  // Open delete confirmation modal
  const openDeleteModal = (slug, name) => {
    setCategoryToDelete({ slug, name });
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCategoryToDelete(null);
    setDeleteProgress(0);
  };

  // Delete category
  const handleDelete = async () => {
    // Animated deletion process
    const animateDelete = () => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setDeleteProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          performDelete();
        }
      }, 50);
    };

    const performDelete = async () => {
      try {
        const token = localStorage.getItem("authToken");

        await axios.delete(`/category/${categoryToDelete.slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success("Category deleted successfully!", {
          icon: "🗑️",
          className: "bg-emerald-500 text-white font-medium",
        });
        fetchCategories(); // Refresh category list
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to delete category",
          {
            icon: "❌",
            className: "bg-red-500 text-white font-medium",
          }
        );
      } finally {
        closeDeleteModal();
      }
    };

    animateDelete();
  };

  return (
    <div className="p-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
      <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/30 p-1 rounded-2xl shadow-xl">
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl overflow-hidden">
          {/* Decorative top bar */}
          <div className="h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

          <div className="p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-md opacity-70 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-4 rounded-full shadow-lg">
                    <FaLayerGroup className="text-white text-2xl" />
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-transparent bg-clip-text">
                    Category Management
                  </h2>
                  <p className="text-sm text-purple-600 mt-1">
                    {filteredCategories.length}{" "}
                    {filteredCategories.length === 1
                      ? "category"
                      : "categories"}{" "}
                    available
                  </p>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => toggleSort("name")}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium bg-white border border-purple-100 hover:bg-purple-50 transition-colors text-purple-700"
                >
                  Sort
                  {sortBy === "name" &&
                    (sortOrder === "asc" ? (
                      <FaArrowUp className="text-purple-500" />
                    ) : (
                      <FaArrowDown className="text-purple-500" />
                    ))}
                </button>
              </div>
            </div>

            {/* Search/Filter Bar */}
            <div className="mb-6 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-xl blur-md opacity-30 group-hover:opacity-40 transition duration-300"></div>
              <div className="relative flex items-center bg-white rounded-xl shadow-md overflow-hidden border border-purple-100 group-hover:border-purple-200 transition duration-300">
                <div className="p-4 text-purple-400 group-hover:text-purple-600 transition duration-300">
                  <FaFilter className="text-lg" />
                </div>
                <input
                  type="text"
                  placeholder="Filter categories..."
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full py-4 px-2 bg-transparent outline-none text-purple-800 placeholder-purple-300 text-lg"
                />
                {categoryName && (
                  <button
                    onClick={() => setCategoryName("")}
                    className="p-4 text-purple-400 hover:text-red-500 transition duration-300"
                  >
                    <FaTimes className="text-lg" />
                  </button>
                )}
              </div>
            </div>

            {/* Categories List */}
            <div className="bg-white rounded-xl shadow-lg border border-purple-100 overflow-hidden">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 border-t-4 border-b-4 border-purple-600 rounded-full animate-spin mb-4"></div>
                  <p className="text-purple-600 font-medium">
                    Loading categories...
                  </p>
                </div>
              ) : filteredCategories.length > 0 ? (
                <ul className="divide-y divide-purple-100">
                  {filteredCategories.map((category) => (
                    <li
                      key={category._id}
                      className={`group relative transition-all duration-300 ${
                        activeCategory === category._id
                          ? "bg-purple-50"
                          : "hover:bg-purple-50/50"
                      }`}
                      onMouseEnter={() => setActiveCategory(category._id)}
                      onMouseLeave={() => setActiveCategory(null)}
                    >
                      {/* Fancy hover effect */}
                      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-purple-500 transform scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></div>

                      <div className="p-4 flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-100 text-purple-600 transition-all duration-300 group-hover:from-indigo-200 group-hover:to-purple-200`}
                          >
                            <FaTags />
                          </div>
                          <div>
                            <h3 className="text-lg font-medium text-purple-800 group-hover:text-purple-900 transition-colors">
                              {category.name}
                            </h3>
                            <p className="text-xs text-purple-500">
                              {category.slug}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button
                            className="group-hover:opacity-100 opacity-0 transform transition-all duration-300 p-2 hover:bg-purple-100 rounded-full text-purple-600"
                            title="Category Options"
                          >
                            <FaEllipsisV />
                          </button>
                          <div className="relative">
                            <button
                              className="relative overflow-hidden group flex items-center gap-2 py-2 px-4 rounded-lg text-white transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-500 hover:shadow-md hover:shadow-red-200"
                              onClick={() =>
                                openDeleteModal(category.slug, category.name)
                              }
                            >
                              <span className="absolute w-0 h-0 rounded-full bg-white opacity-30 transform -translate-x-1/2 -translate-y-1/2 group-active:w-[500%] group-active:h-[500%] transition-all duration-700"></span>
                              <FaTrash className="text-sm" />
                              <span className="font-medium text-sm">
                                Delete
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center text-purple-500 mb-4">
                    {categoryName ? (
                      <FaFilter className="text-3xl" />
                    ) : (
                      <FaShapes className="text-3xl" />
                    )}
                  </div>
                  <h3 className="text-xl font-medium text-purple-700 mb-2">
                    {categoryName
                      ? "No matching categories"
                      : "No categories yet"}
                  </h3>
                  <p className="text-purple-500 max-w-md">
                    {categoryName
                      ? `We couldn't find any categories matching '${categoryName}'`
                      : "Create your first category to organize your products"}
                  </p>
                </div>
              )}
            </div>

            {/* Information box */}
            <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg text-sm text-indigo-700 flex items-start gap-3">
              <div className="text-indigo-500 mt-0.5">
                <FaExclamationTriangle />
              </div>
              <div>
                <p>
                  Categories help organize your products and make them easier to
                  find for your customers. Consider using descriptive names that
                  clearly indicate the type of products in each category.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={closeDeleteModal}
        contentLabel="Delete Category Confirmation"
        className="modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-auto outline-none border-2 border-purple-100"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50"
      >
        {categoryToDelete && (
          <>
            <div className="text-center mb-6">
              <div className="bg-red-100 rounded-full p-4 inline-flex items-center justify-center mx-auto mb-4">
                <FaTrash className="text-2xl text-red-500" />
              </div>
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Delete "{categoryToDelete.name}"?
              </h2>
              <p className="text-gray-600">
                This action cannot be undone. Products in this category may
                become uncategorized.
              </p>
            </div>

            {/* Progress bar for deletion animation */}
            {deleteProgress > 0 && (
              <div className="w-full h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${deleteProgress}%` }}
                ></div>
              </div>
            )}

            <div className="flex justify-center gap-4">
              <button
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300 font-medium disabled:opacity-50"
                onClick={closeDeleteModal}
                disabled={deleteProgress > 0}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg hover:from-red-600 hover:to-pink-600 transition-colors duration-300 font-medium flex items-center gap-2 disabled:opacity-70"
                onClick={handleDelete}
                disabled={deleteProgress > 0}
              >
                {deleteProgress > 0 ? (
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
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash /> Delete
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CategoryList;
