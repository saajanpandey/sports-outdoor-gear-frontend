import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Auth/AuthForm.css';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';



export default function AuthForm({ setIsLoggedIn }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const { first_name, last_name, address, phone, email, password } = formData;

    if (!email || !password || !first_name || !last_name || !address || !phone) {
     setErrorMessage("Please fill in all fields!");
      return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
      setErrorMessage(
        "Password must be at least 6 characters long and contain letters and numbers."
      );
      return;
    }

    // Phone validation: digits only, 10-15 digits
    const phonePattern = /^\d{10,15}$/;
    if (!phonePattern.test(phone.trim())) {
      setErrorMessage(
        "Please enter a valid phone number (10-15 digits, numbers only)."
      );
      return;
    }

    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:3000/api/user/", {
        first_name,
        last_name,
        address,
        phone,
        email,
        password,
        role: 0
      });

      // alert("Registration successful!");
      console.log("User registered:", response.data);
      setIsLogin(true); // Switch to login
      setTimeout(() => {
        toast.success("Signup successful!", { position: "top-right", autoClose: 3000 });
      }, 100);
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(`Signup failed. ${error.response?.data?.message}`);
    }
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    if (!email || !password) {
      toast.error("Please enter email and password!");
      return;
    }
    try {
      const emailTrimmed = email.trim().toLowerCase();
      const response = await axios.post("http://localhost:3000/api/user/login", { email: emailTrimmed, password, });
      const userData = response.data; // or response.data.user if wrapped
      
      // OLD
      localStorage.setItem('userId', userData._id);
      
      localStorage.setItem('user_data',JSON.stringify(userData));

      // TRY THIS BASED ON ACTUAL RESPONSE
      localStorage.setItem('userId', userData._id || userData._id);
      localStorage.setItem('isLoggedIn', 'true');
      setIsLoggedIn(true);
      navigate('/home');
      setTimeout(() => { toast.success("Login successful!", { position: "top-right", autoClose: 3000 }); }, 100);
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
            <div className="password-input-wrapper">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* <input type="password" name="password" placeholder="Password" required onChange={handleChange} value={formData.password} /> */}
            {/* <a href="#">Forgot Password?</a> */}
            <button onClick={handleLogin}>Login</button>
            {/* <p>Not a member? <a href="#" onClick={() => setIsLogin(false)}>SignUp Now</a></p> */}
          </div>
        ) : (
          <>
          {errorMessage && (
              <div className="error-message" style={{ color: 'red', marginBottom: '8px' }}>
                {errorMessage}
              </div>
            )}
          <div className="form">
            <input type="text" name="first_name" placeholder="First Name" required onChange={handleChange} />
            <input type="text" name="last_name" placeholder="Last Name" required onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" required onChange={handleChange} />
            <input type="tel" name="phone" placeholder="Phone" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <div className="password-input-wrapper">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required onChange={handleChange} value={formData.password} />
              <span className="toggle-password" onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer' }}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button onClick={handleSignup}>SignUp</button>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
