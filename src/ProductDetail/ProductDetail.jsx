import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../ProductDetail/ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/product/${productId}`);
        setProduct(res.data.data);
        console.log('Product fetched:', res.data);
      } catch (err) {
        console.error('Error fetching product:', err.message);
        setError('Product not found.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleBuyNow = () => {
    if (!product) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ ...product, quantity, total: product.price * quantity });
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  if (loading) {
    return <div className="product-detail-wrapper"><p>Loading product...</p></div>;
  }

  if (error || !product) {
    return (
      <div className="product-detail-wrapper">
        <div className="product-detail-card">
          <h2 className="product-detail-title">Product not found</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-wrapper">
      <div className="product-detail-card">
        <img
          className="product-detail-image"
          src={product.image}
          alt={product.product_name}
        />
        <h2 className="product-detail-title">{product.product_name}</h2>
        <p className="product-detail-description">{product.product_description}</p>
        <p className="product-detail-price">Price: ${parseFloat(product.price).toFixed(2)}</p>

        <div className="quantity-control">
          <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity(q => q + 1)}>+</button>
        </div>

        <p className="total-price">Total: ${(parseFloat(product.price) * quantity).toFixed(2)}</p>

        <button className="product-detail-btn" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductDetail;
