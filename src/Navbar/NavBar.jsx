import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear tokens or any stored auth info here
    setIsLoggedIn(false);
    navigate('/login'); // or wherever
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>

      {!isLoggedIn ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      ) : (
        <button onClick={handleLogout} title="Logout" className="user-icon-btn">
          {/* You can use any icon library like FontAwesome or just emoji */}
          👤
        </button>
      )}
    </nav>
  );
}
