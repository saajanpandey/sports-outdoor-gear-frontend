import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AuthForm.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AdminLogin({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const response = await axios.post("http://localhost:3000/api/user/login", {
        email,
        password,
      });

      const user = response.data?.user || response.data;

      // Check if the user is an admin (assuming role is a string or number, like "admin" or 1)
      if (user.role === "admin" || user.role === 1) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userRole', user.role);
        navigate('/admin/dashboard'); // redirect to admin dashboard
        toast.success("Admin login successful!", { position: "top-right", autoClose: 3000 });
      } else {
        toast.error("Access denied. Admins only.");
      }

      console.log("Login response:", response.data);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Login failed. Invalid credentials.");
    }
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="form-container">
        <h2>Admin Sign In</h2>
        <div className="form">
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
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}
