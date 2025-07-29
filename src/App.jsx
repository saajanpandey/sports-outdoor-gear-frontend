import React, { useState, useEffect } from "react";
import { Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./Home/Home";
import About from "./About/About";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Contact from "./Contact/Contact";
import Products from "./Products/Product";
import AuthForm from "./Auth/AuthForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./ProductDetail/ProductDetail";
import Cart from "./Cart/Cart";
import Checkout from "./Checkout/Checkout";
import Profile from "./Profile/Profile";
import Navbar from "./AdminLayout/components/navbar";
import Sidebar from "./AdminLayout/components/sidebar";

import Dashboard from "./AdminLayout/pages/Dashboard";
import ProductsAdmin from "./AdminLayout/pages/Products"; // Admin-side Products

import { Box } from "@mui/material";
import AddProduct from "./AdminLayout/pages/AddProduct";
import AdminLogin from "./Auth/AdminLogin";
import AddCategory from "./AdminLayout/pages/AddCategory";
import AdminCategories from "./AdminLayout/pages/categories";

function App() {
  const navigate = useNavigate();
  // State for login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // "user" or "admin"
  const [userRefreshToken, setUserRefreshToken] = useState(0);

  const triggerUserRefresh = () => setUserRefreshToken((t) => t + 1);

  // Restore login state from localStorage on component mount
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  // Redirect to appropriate page based on role (if already logged in)
  useEffect(() => {
    if (userRole == "admin" && window.location.pathname === "/admin/login") {
      navigate("/admin/dashboard");
    }
    if (isLoggedIn && window.location.pathname === "/admin/login") {
      // If user is logged in, they should not access the admin login page
      navigate("/home");
    }
    if (!isLoggedIn && window.location.pathname === "/profile") {
      navigate("/auth");
    }
    if (
      (!userRole == "admin" || userRole == null) &&
      window.location.pathname.startsWith("/admin")
    ) {
      navigate("/login/admin");
    }
  }, [isLoggedIn, navigate, userRole]);

  // Persist login state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userRole", userRole);
  }, [isLoggedIn, userRole]);

  // Admin Layout
  const AdminLayout = ({ children }) => (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Box display="flex">
        <Sidebar userRole={userRole} />
        <Box flexGrow={1}>
          <Navbar />
          {children}
        </Box>
      </Box>
    </>
  );

  // const User Layout
  const UserLayout = ({ children }) => (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userRefreshToken={userRefreshToken}
      />
      {children}
      <Footer />
    </div>
  );

  return (
    <>
      {userRole == "admin" ? (
        <AdminLayout>
          <Routes>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductsAdmin />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/addproduct" element={<AddProduct />} />
            <Route path="/admin/addcategory" element={<AddCategory />} />
          </Routes>
        </AdminLayout>
      ) : isLoggedIn ? (
        <>
          {/* Pass login state and setter to Header */}

          <UserLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              {/* Pass setIsLoggedIn to AuthForm */}

              <Route
                path="/profile"
                element={<Profile triggerUserRefresh={triggerUserRefresh} />}
              />
            </Routes>
          </UserLayout>
        </>
      ) : (
        <UserLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Pass setIsLoggedIn to AuthForm */}
            <Route
              path="/auth"
              element={<AuthForm setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route
              path="/login/admin"
              element={<AdminLogin setUserRole={setUserRole} />}
            />
          </Routes>
        </UserLayout>
      )}
    </>
  );
}
export default App;
