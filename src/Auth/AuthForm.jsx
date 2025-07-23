import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AuthForm.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function AuthForm({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    role: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { first_name, last_name, address, phone, email, password, role } = formData;

    if (!email || !password || !first_name || !last_name || !address || !phone || !role) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/user/", {
        first_name,
        last_name,
        address,
        phone,
        email,
        password,
        role: parseInt(role) || 0 // assuming role is a number like 0 for user
      });

      alert("Registration successful!");
      console.log("User registered:", response.data);
      setIsLogin(true); // Switch to login
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
      alert("Signup failed. Check console for details.");
    }
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
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/home'); 
      setTimeout(() => {
        toast.success("Login successful!", { position: "top-right", autoClose: 3000 });
      }, 100); 

      console.log("User logged in:", response.data);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Login failed. Please check your credentials.");
    }
  };



  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
  <button className={isLogin ? 'active login-active' : ""} onClick={() => setIsLogin(true)}>Login</button>
  <button className={!isLogin ? 'active signup-active' : ""} onClick={() => setIsLogin(false)}>Signup</button>
</div>

        {isLogin ? (
          <div className="form">
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} value={formData.email} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
            {/* <a href="#">Forgot Password?</a> */}
            <button onClick={handleLogin}>Login</button>
            {/* <p>Not a member? <a href="#" onClick={() => setIsLogin(false)}>SignUp Now</a></p> */}
          </div>
        ) : (
          <div className="form">
            <input type="text" name="first_name" placeholder="First Name" required onChange={handleChange} />
            <input type="text" name="last_name" placeholder="Last Name" required onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <input type="text" name="role" placeholder="Role (e.g., 0 for user)" required onChange={handleChange} />
            <button onClick={handleSignup}>SignUp</button>
          </div>
        )}
      </div>
    </div>
  );
}
