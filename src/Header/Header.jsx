import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Header/Header.css';

function Header({ isLoggedIn, setIsLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/auth'); 
  };

  return (
    <header className="main-header">
      <div className="header-left">
        <h1>Sports Outdoor Gear</h1>
      </div>

      <nav className={`header-center ${menuOpen ? 'open' : ''}`}>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/auth">Login</Link>
            {/* <a href=".#register">Register</a> */}
          </>
        ) : (
          <>
            <Link to="/profile" className="profile-link">Profile</Link>
            <button
              onClick={handleLogout}
              title="Logout"
              className="profile-button"
              style={{
                
                background: 'none',
                border: '1px solid #ccc',
                padding: '6px 12px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
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
