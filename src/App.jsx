import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import About from './About/About';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Contact from './Contact/Contact';
import Products from './Products/Product';
import AuthForm from './Auth/AuthForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from './ProductDetail/ProductDetail';
import Cart from './Cart/Cart';
import Checkout from './Checkout/Checkout';




function App() {
  // State for login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Restore login state from localStorage on component mount
  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    if (storedLogin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Persist login state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <div
        style={{
          minHeight: '100vh', width: '100', display: 'flex', flexDirection: 'column'
        }}
      >
        {/* Pass login state and setter to Header */}
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

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
          <Route path="/auth" element={<AuthForm setIsLoggedIn={setIsLoggedIn} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
