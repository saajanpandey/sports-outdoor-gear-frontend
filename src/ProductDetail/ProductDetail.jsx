import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../ProductDetail/ProductDetail.css';

const products = [
  {
    id: 'tent',
    name: 'All-Weather Tent',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    description: 'Perfect for camping in any season. Durable, lightweight, and easy to set up.'
  },
  {
    id: 'boots',
    name: 'Hiking Boots',
    image: 'https://images.pexels.com/photos/167706/pexels-photo-167706.jpeg',
    description: 'Comfortable and waterproof boots for long treks and rough terrain.'
  },
  {
    id: 'bike',
    name: 'Mountain Bike',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'High-performance bike for off-road adventures and mountain trails.'
  },
  {
    id: 'rope',
    name: 'Climbing Rope',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    description: 'Strong and reliable rope for all your climbing needs.'
  },
  {
    id: 'stove',
    name: 'Camping Stove',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'Portable stove for easy cooking on your outdoor trips.'
  },
  {
    id: 'helmet',
    name: 'Cycling Helmet',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
    description: 'Lightweight helmet for safe and comfortable cycling.'
  }
];

function ProductDetail() {
  const { productId } = useParams();
  const product = products.find(p => p.id === productId);
  const navigate = useNavigate();


 const handleBuyNow = () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    navigate('/cart');
  };

  if (!product) {
    return (
      <div className="product-detail-wrapper">
        <div className="product-detail-card">
          <h2 className="product-detail-title">Product not found</h2>
          <p>We couldn't find a product with the ID: {productId}</p>
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
          alt={product.name}
        />
        <h2 className="product-detail-title">{product.name}</h2>
        <p className="product-detail-description">{product.description}</p>
        <button className="product-detail-btn" onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
}

export default ProductDetail;
