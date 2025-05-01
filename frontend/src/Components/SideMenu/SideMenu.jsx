import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaSyncAlt,
  FaFileAlt,
  FaChartBar,
  FaShieldAlt,
  FaBox,
  FaTag,
  FaClipboardList,
  FaPlusCircle,
  FaBoxOpen,
} from "react-icons/fa";
import {
  MdSchedule,
  MdMenu,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

function SideMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(false); // Toggle Inventory Submenu
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleInventory = () => setInventoryOpen(!inventoryOpen); // Toggle Inventory Submenu

  return (
    <div
      className={`h-full ${
        isOpen ? "w-64" : "w-20"
      } bg-[#053B50] text-white p-6 font-sans transition-all duration-300`}
    >
      {/* Hamburger Menu Icon */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl cursor-pointer" onClick={toggleMenu}>
          <MdMenu />
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {[
          {
            icon: <FaTachometerAlt />,
            label: "Dashboard",
            path: "/admin/dashboard",
          },
          {
            icon: <FaUsers />,
            label: "User Management",
            path: "/admin/user-management",
          },
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="flex items-center space-x-4 cursor-pointer hover:bg-[#025D74] p-3 rounded-lg transition duration-300 ease-in-out"
          >
            <div className="text-xl">{item.icon}</div>
            {isOpen && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </div>
        ))}

        {/* Inventory Management with Sub-menu */}
        <div>
          <div
            className="flex items-center space-x-4 cursor-pointer hover:bg-[#025D74] p-3 rounded-lg transition duration-300 ease-in-out"
            onClick={toggleInventory}
          >
            <div className="text-xl">
              <FaCog />
            </div>
            {isOpen && (
              <span className="text-sm font-medium">Inventory Management</span>
            )}
            {isOpen && (
              <div className="ml-auto">
                {inventoryOpen ? (
                  <MdKeyboardArrowUp />
                ) : (
                  <MdKeyboardArrowDown />
                )}
              </div>
            )}
          </div>

          {/* When I open the submenu of the SideMenu, the component underneath is not visible. Items */}
          {inventoryOpen && (
            <div className="ml-6 space-y-2 overflow-y-auto max-h-60">
              <div
                onClick={() => navigate("/admin/inventory-management")}
                className="flex items-center space-x-4 cursor-pointer hover:bg-[#025D74] p-2 rounded-lg transition duration-300 ease-in-out"
              >
                <FaBox className="text-xl" />
                <span className="text-sm font-medium">View Inventory</span>
              </div>
              <div
                onClick={() => navigate("/admin/create-category")}
                className="flex items-center space-x-4 cursor-pointer hover:bg-[#025D74] p-2 rounded-lg transition duration-300 ease-in-out"
              >
                <FaTag className="text-xl" />
                <span className="text-sm font-medium">Create Category</span>
              </div>
              <div
                onClick={() => navigate("/admin/view-categorys")}
                className="flex items-center space-x-4 cursor-pointer hover:bg-[#025D74] p-2 rounded-lg transition duration-300 ease-in-out"
              >
                <FaClipboardList className="text-xl" />
                <span className="text-sm font-medium">Category List</span>
              </div>
              <div
                onClick={() => navigate("/admin/create-brand")}
                className="flex items-center space-x-4 cursor-pointer hover:bg-[#025D74] p-2 rounded-lg transition duration-300 ease-in-out"
              >
                <FaPlusCircle className="text-xl" />
                <span className="text-sm font-medium">Create Brand</span>
              </div>
              <div
                onClick={() => navigate("/admin/view-brands")}
                className="flex items-center space-x-4 cursor-pointer hover:bg-[#025D74] p-2 rounded-lg transition duration-300 ease-in-out"
              >
                <FaBoxOpen className="text-xl" />
                <span className="text-sm font-medium">Brand List</span>
              </div>
              <div
                onClick={() => navigate("/admin/create-product")}
                className="flex items-center space-x-4 cursor-pointer hover:bg-[#025D74] p-2 rounded-lg transition duration-300 ease-in-out"
              >
                <FaPlusCircle className="text-xl" />
                <span className="text-sm font-medium">Create Product</span>
              </div>
              <div
                onClick={() => navigate("/admin/view-products")}
                className="flex items-center space-x-4 cursor-pointer hover:bg-[#025D74] p-2 rounded-lg transition duration-300 ease-in-out"
              >
                <FaBox className="text-xl" />
                <span className="text-sm font-medium">View Products</span>
              </div>
            </div>
          )}
        </div>

        {/* Other Menu Items */}
        {[
          {
            icon: <FaSyncAlt />,
            label: "Order Management",
            path: "/admin/order-management",
          },
          {
            icon: <FaFileAlt />,
            label: "Document Management",
            path: "/admin/document-management",
          },
          {
            icon: <FaChartBar />,
            label: "Analytics & Reporting",
            path: "/admin/analytics-reporting",
          },
          {
            icon: <FaShieldAlt />,
            label: "Security & Privacy",
            path: "/admin/security-privacy",
          },
          {
            icon: <MdSchedule />,
            label: "Schedule List",
            path: "/admin/schedule-list",
          },
        ].map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            className="flex items-center space-x-4 cursor-pointer hover:bg-[#025D74] p-3 rounded-lg transition duration-300 ease-in-out"
          >
            <div className="text-xl">{item.icon}</div>
            {isOpen && (
              <span className="text-sm font-medium">{item.label}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SideMenu;
