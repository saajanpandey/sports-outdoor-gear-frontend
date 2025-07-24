import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Cart/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  const handleDelete = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const handleCheckout = () => {
 const currentCart = [...cartItems];
  localStorage.setItem('lastOrder', JSON.stringify(currentCart)); 
  localStorage.removeItem('cart'); 
  setCartItems([]); 
  navigate('/checkout'); 
};

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products">Shop Now</Link></p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item, idx) => (
              <div className="cart-item" key={idx}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
                <button onClick={() => handleDelete(idx)}>Delete</button>
              </div>
            ))}
          </div>
          <div className="cart-actions">
            <Link to="/products">
              <button className="shop-more-btn">Shop More</button>
            </Link>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
