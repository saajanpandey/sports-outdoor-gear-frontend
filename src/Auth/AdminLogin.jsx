import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin({ setUserRole }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Please enter email and password!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/admin/login",
        {
          email,
          password,
        }
      );

      const user = response.data;

      // Check if the user is an admin (assuming role is a string or number, like "admin" or 1)
      if (user.role === "admin" || user.role === 1) {
        setUserRole("admin");
        localStorage.setItem("userRole", "admin");
        navigate("/admin/dashboard"); // redirect to admin dashboard
        toast.success("Admin login successful!", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Access denied. Invalid credentials.");
      }

      console.log("Login response:", response.data);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Login failed. Invalid credentials.");
    }
  };

  return (
    <div className="split-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="split-image">
        <img
          src="https://images.pexels.com/photos/33176662/pexels-photo-33176662.png"
          alt="Admin illustration"
        />
      </div>
      <div className="split-form">
        <div className="admin-form">
          <h2>Admin Sign In</h2>
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            required
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            value={formData.password}
          />
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
