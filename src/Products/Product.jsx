import React, { useState } from 'react';
import '../Products/Product.css';
import { Link } from 'react-router-dom';

// Static product data
const products = [
  {
    id: 'tent',
    name: 'All-Weather Tent',
    category: 'Camping',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80',
    description: 'Perfect for camping in any season. Durable, lightweight, and easy to set up.'
  },
  {
    id: 'boots',
    name: 'Hiking Boots',
    category: 'Hiking',
    image: 'https://images.pexels.com/photos/167706/pexels-photo-167706.jpeg',
    description: 'Comfortable and waterproof boots for long treks and rough terrain.'
  },
  {
    id: 'bike',
    name: 'Mountain Bike',
    category: 'Cycling',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'High-performance bike for off-road adventures and mountain trails.'
  },
  {
    id: 'rope',
    name: 'Climbing Rope',
    category: 'Climbing',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    description: 'Strong and reliable rope for all your climbing needs.'
  },
  {
    id: 'stove',
    name: 'Camping Stove',
    category: 'Camping',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'Portable stove for easy cooking on your outdoor trips.'
  },
  {
    id: 'helmet',
    name: 'Cycling Helmet',
    category: 'Cycling',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80',
    description: 'Lightweight helmet for safe and comfortable cycling.'
  }
];

const categories = ['All', 'Camping', 'Hiking', 'Cycling', 'Climbing'];


function Products() {
  // temporary input values
  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [pendingCategory, setPendingCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  // actual applied filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleFilterClick = () => {
  setLoading(true);
  setTimeout(() => {
    setSearchTerm(pendingSearchTerm);
    setSelectedCategory(pendingCategory);
    setLoading(false);
  }, 500); // Simulate delay (500ms)
};

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="products-container">
      <h2>Our Products</h2>

      <div className="product-filters">
        <input
          type="text"
          placeholder="Search products..."
          className="product-search"
          value={pendingSearchTerm}
          onChange={(e) => setPendingSearchTerm(e.target.value)}
        />

        <select
          className="product-category"
          value={pendingCategory}
          onChange={(e) => setPendingCategory(e.target.value)}
        >
          {categories.map((cat, idx) => (
            <option key={idx} value={cat}>{cat}</option>
          ))}
        </select>

        <button className="filter-button" onClick={handleFilterClick}>
          Apply Filters
        </button>
      </div>

     <div className="products-grid">
  {loading ? (
    <p className="loading-spinner">Loading products...</p>
  ) : filteredProducts.length > 0 ? (
    filteredProducts.map((prod) => (
      <div className="product-card" key={prod.id}>
        <img src={prod.image} alt={prod.name} />
        <h4>{prod.name}</h4>
        <p>{prod.description}</p>
        <Link to={`/products/${prod.id}`}>
          <button className="product-btn">View Details</button>
        </Link>
      </div>
    ))
  ) : (
    <p className="no-products">No products found.</p>
  )}
</div>

    </div>
  );
}

export default Products;
