import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Checkout/Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [totalItems, setTotalItems] = useState(0);

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('lastOrder')) || [];
    if (savedCart.length === 0) {
      navigate('/');
    } else {
      setCart(savedCart);
      setTotalItems(savedCart.length);
    }
  }, [navigate]);

  const generateOrderId = () => 'OD' + Math.floor(100000 + Math.random() * 900000);

  const estimateDelivery = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toDateString();
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Simple validation (you can expand this)
    if (!cardNumber || !cardName || !expiry || !cvv) {
      alert('Please fill all card details.');
      return;
    }

    setOrderId(generateOrderId());
    setDeliveryDate(estimateDelivery());
    setOrderPlaced(true);

    // Clear last order to avoid repeat submission
    localStorage.removeItem('lastOrder');
  };

  return (
    <div className="checkout-container">
      {!orderPlaced ? (
        <>
          <h2>Enter Card Details</h2>
          <form className="card-form" onSubmit={handlePlaceOrder}>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="form-group">
              <label>Name on Card</label>
              <input
                type="text"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Expiry</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <button type="submit" className="place-order-btn">Place Order</button>
          </form>
        </>
      ) : (
        <>
          <h2>Thank You for Your Purchase!</h2>
          <p>Your order has been successfully placed.</p>

          <div className="order-meta">
            <p><strong>Order ID:</strong> {orderId}</p>
            <p><strong>Estimated Delivery:</strong> {deliveryDate}</p>
            <p><strong>Total Price:</strong> ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}</p>

          </div>

          <div className="checkout-summary">
            <h3>Order Summary:</h3>
            {cart.map((item, index) => (
              <div key={index} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-actions">
            <Link to="/products">
              <button className="shop-more-btn">Shop More</button>
            </Link>
            <Link to="/">
              <button className="home-btn">Back to Home</button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
