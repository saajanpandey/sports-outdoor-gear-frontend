import React, { useState, useEffect } from 'react';
import '../Products/Product.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);

  const [pendingSearchTerm, setPendingSearchTerm] = useState('');
  const [pendingCategory, setPendingCategory] = useState('All');
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Fetching products and categories from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get('http://localhost:3000/api/product'),
          axios.get('http://localhost:3000/api/category')
        ]);

        setProducts(productRes.data);
        const apiCategories = categoryRes.data.map(cat => cat.name.toLowerCase());
        setCategories(['All', ...apiCategories]);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  const handleFilterClick = () => {
    setLoading(true);
    setTimeout(() => {
      setSearchTerm(pendingSearchTerm);
      setSelectedCategory(pendingCategory);
      setLoading(false);
    }, 300);
  };

  const filteredProducts = products.filter((product) => {
    const name = product.product_name || '';
    const desc = product.product_description || '';
    const categoryName = product.category?.name || '';

    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      desc.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'All' || categoryName.toLowerCase() === selectedCategory.toLowerCase();

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
            <option key={idx} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
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
            <div className="product-card" key={prod._id}>
              <img src={prod.image} alt={prod.product_name} />
              <h4>{prod.product_name}</h4>
              <p>{prod.product_description}</p>
              <p><strong>Price:</strong> ${prod.price}</p>
              <Link to={`/products/${prod._id}`}>
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
