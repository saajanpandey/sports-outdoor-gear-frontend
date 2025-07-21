import React from 'react'
import './Product.css'

const products = [
  {
    name: 'All-Weather Tent',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    description: 'Perfect for camping in any season. Durable, lightweight, and easy to set up.'
  },
  {
    name: 'Hiking Boots',
    image: 'https://images.pexels.com/photos/167706/pexels-photo-167706.jpeg',
    description: 'Comfortable and waterproof boots for long treks and rough terrain.'
  },
  {
    name: 'Mountain Bike',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'High-performance bike for off-road adventures and mountain trails.'
  },
  {
    name: 'Climbing Rope',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    description: 'Strong and reliable rope for all your climbing needs.'
  },
  {
    name: 'Camping Stove',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'Portable stove for easy cooking on your outdoor trips.'
  },
  {
    name: 'Cycling Helmet',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
    description: 'Lightweight helmet for safe and comfortable cycling.'
  }
]

function Products() {
  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map((prod, idx) => (
          <div className="product-card" key={idx}>
            <img src={prod.image} alt={prod.name} />
            <h4>{prod.name}</h4>
            <p>{prod.description}</p>
            <button className="product-btn">View Details</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Products