import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Header/Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

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
        <Link to="/auth">Login</Link>
        <a href="#register">Register</a>

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
  )
}

export default Header