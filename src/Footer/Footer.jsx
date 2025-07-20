import React from 'react'
import '../Footer/Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>Sports Outdoor Gear</h3>
          <p>Your one-stop shop for all adventure and outdoor equipment.</p>
        </div>
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li> <Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact Us</h4>
          <p>Email: info@sportsoutdoorgear.com</p>
          <p>Phone: +1 234 567 8901</p>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/facebook-new.png" alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/instagram-new.png" alt="Instagram" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src="https://img.icons8.com/ios-filled/24/ffffff/twitter.png" alt="Twitter" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Sports Outdoor Gear. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer