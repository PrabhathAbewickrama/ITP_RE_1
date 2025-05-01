import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SideMenu from "./Components/SideMenu/SideMenu";
import Home from "./Page/Home/Home";
import About from "./Page/About/About";
import Contact from "./Page/Contact/Contact";
import Services from "./Page/Services/Services";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ImageSlider from "./Page/Home/ImageSlider";
import Register from "./Page/Auth/Register/Register";
import Login from "./Page/Auth/Login/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Page/Admin/AdminDashboard/Dashboard";
import AdminHeader from "./Page/Admin/AdminHeader/AdminHeader";
import CreateCategory from "./Page/Admin/Inventory-management/Create-Category/CreateCategory";
import CategoryList from "./Page/Admin/Inventory-management/CategoryList/CategoryList";
import CreateBrand from "./Page/Admin/Inventory-management/Create-Brand/CreateBrand";
import BrandList from "./Page/Admin/Inventory-management/BrandList/BrandList";
import CreateProduct from "./Page/Admin/Inventory-management/Create-Product/CreateProduct";
import ProductList from "./Page/Admin/Inventory-management/ProductList/ProductList";
import ProductDetails from "./Page/Admin/Inventory-management/ProductDetails/ProductDetails";
import UpdateProduct from "./Page/Admin/Inventory-management/UpdateProduct/UpdateProduct";
import AllProducts from "./Page/Shop/AllProducts/AllProducts";
import Orders from "./Page/Shop/Orders/Orders";
import Cart from "./Page/Shop/Cart/Cart";
import Checkout from "./Page/Shop/Checkout/Checkout";
import OrderManagement from "./Page/Admin/Order-management/OrderManagement";
import UserManagement from "./Page/Admin/UserManagement/UserManagement";
import ViewInventory from "./Page/Admin/Inventory-management/ViewInventory/ViewInventory";


function App() {
  // Retrieve role from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || ""; // If no user, default to an empty string

  return (
    <Router>
      <ToastContainer /> {/* Toast Notifications */}
      <Routes>
        {/* General User Routes */}
        <Route
          path="/*"
          element={
            <div className="flex flex-col h-screen">
              <Header />
              <div className="flex flex-1">
                <div className="flex-1 p-8 overflow-y-auto">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    {/* <Route path="/" element={<ImageSlider />} /> */}
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/all-products" element={<AllProducts />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />

                    <Route path="/orders" element={<Orders />} />
                  </Routes>
                </div>
              </div>
              <Footer />
            </div>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/*"
          element={
            <div className="flex h-screen">
              <SideMenu />
              <div className="flex flex-col flex-1">
                <AdminHeader />
                <div className="p-8 overflow-y-auto flex-1">
                  <Routes>
                    <Route
                      path="dashboard"
                      element={
                        role === "admin" ? (
                          <Dashboard />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    {/* <Route
                      path="inventory-management"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <CreateCategory />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    /> */}
                    <Route
                      path="create-category"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <CreateCategory />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    <Route
                      path="view-categorys"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <CategoryList />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    <Route
                      path="create-brand"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <CreateBrand />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    <Route
                      path="view-brands"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <BrandList />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    <Route
                      path="create-product"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <CreateProduct />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    <Route
                      path="view-products"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <ProductList />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    <Route
                      path="products/:id"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <ProductDetails />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    <Route
                      path="updateproducts/:id"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <UpdateProduct />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    <Route
                      path="order-management"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <OrderManagement />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    <Route
                      path="user-management"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <UserManagement />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                    <Route
                      path="inventory-management"
                      element={
                        role === "admin" || role === "inventory_manager" ? (
                          <ViewInventory />
                        ) : (
                          <Navigate to="/home" />
                        )
                      }
                    />
                  </Routes>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
