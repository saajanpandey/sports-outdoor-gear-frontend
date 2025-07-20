import React, { useState } from 'react'
import '../Header/Header.css'

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="main-header">
      <div className="header-left">
        <h1>Sports Outdoor Gear</h1>
      </div>
      <nav className={`header-center ${menuOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="#shop">Shop</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#login">Login</a>
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