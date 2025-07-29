import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Header/Header.css";

function Header({ isLoggedIn, setIsLoggedIn, userRefreshToken }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
    navigate("/auth");
  };

  useEffect(() => {
    const storedData = localStorage.getItem("user_data");

    if (storedData) {
      setResponseData(JSON.parse(storedData));
    }
  }, [userRefreshToken, isLoggedIn]);

  return (
    <header className="main-header">
      <div className="header-left">
        <h1>Sports Outdoor Gear</h1>
      </div>

      <nav className={`header-center ${menuOpen ? "open" : ""}`}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/auth">Get Started</Link>
            {/* <a href=".#register">Register</a> */}
          </>
        ) : (
          <>
            <Link to="/profile" className="profile-link">
              {responseData?.first_name + " " + responseData?.last_name}
            </Link>

            <button
              onClick={handleLogout}
              className="profile-button"
              title="Logout"
            >
              Logout
            </button>
          </>
        )}
      </nav>

      <div className="header-right">
        <button
          className="toggle-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
