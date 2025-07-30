import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Cart.css';

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
 const grandTotal = cartItems.reduce((acc, item) => acc + parseFloat(item.total || 0), 0);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.
          <Link to="/products">
            <button className="shop-more-btn">Shop More</button>
          </Link>
        </p>
      ) : (
        <>
          <div className="cart-items-wrapper">
            <div className="cart-items">
              {cartItems.map((item, idx) => (
                <div className="cart-item" key={idx}>
                  <img src={item.image} alt={item.name} />
                  <div className="item-details">
                    <h4>{item.name || item.product_name}</h4>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Price:</strong> ${parseFloat(item.price).toFixed(2)}</p>
                    <p><strong>Total:</strong> ${parseFloat(item.total).toFixed(2)}</p>
                  </div>
                  <button onClick={() => handleDelete(idx)} className="delete-btn">Delete</button>
                </div>
              ))}
            </div>
          </div>
          <div className="grand-total">
         <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
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
