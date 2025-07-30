import React , { useEffect, useState } from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import '../Home/Home.css'
import { Link } from 'react-router-dom';



function Home() {
    const [categories, setCategories] = useState([]);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    
useEffect(() => {
    fetch('http://localhost:3000/api/category')
      .then((res) => res.json())
      .then((data) => {
        const categoryList = Array.isArray(data) ? data : data.data;
        if (Array.isArray(categoryList)) {
          setCategories(categoryList);
        } else {
          console.error('Unexpected data format from API:', data);
          setCategories([]); 
        }
      })
      .catch((err) => {
        console.error('Error fetching categories:', err);
        setCategories([]); 
      });
  }, []);

  if (!Array.isArray(categories)) {
    return <p>Loading...</p>;
  }


   // Fetch products and filter featured ones
  useEffect(() => {
    fetch('http://localhost:3000/api/product')
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data) ? data : data.data;
        const featured = productList.filter((product) => product.is_featured === 1);
        setFeaturedProducts(featured);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setFeaturedProducts([]);
      });
  }, []);

  return (
    <>
    
      <div className="home-container">
        <section className="home-hero">
          <h2>Welcome to Sports Outdoor Gear!</h2>
          <p>Find the best equipment for your next adventure.</p>
          <a href="#shop" className="shop-btn">Shop Now</a>
        </section>

        <section className="features">
          <h2>Why Choose Us?</h2>
          <div className="features-list">
            <div className="feature-card">
              <img src="https://img.icons8.com/ios-filled/100/000000/tent.png" alt="Wide Selection" />
              <h3>Wide Selection</h3>
              <p>Find gear for hiking, camping, cycling, and more.</p>
            </div>
            <div className="feature-card">
              <img src="https://img.icons8.com/ios-filled/100/000000/discount--v1.png" alt="Best Prices" />
              <h3>Best Prices</h3>
              <p>Competitive prices and regular discounts.</p>
            </div>
            <div className="feature-card">
              <img src="https://img.icons8.com/ios-filled/100/000000/delivery.png" alt="Fast Delivery" />
              <h3>Fast Delivery</h3>
              <p>Get your gear delivered quickly and safely.</p>
            </div>
          </div>
        </section>


 <section className="categories" id="shop">
  <h2>Shop by Category</h2>
  <div className="category-list">
    {categories.length > 0 ? (
      categories.map((cat) => (
        <div className="category-card" key={cat._id}>
          <img src={`http://localhost:3000${cat.image}`} alt={cat.name} />
          <h4>{cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}</h4>
        </div>
      ))
    ) : (
      <p>No categories found.</p>
    )}
  </div>
</section>

 <section className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-list">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div className="product-card" key={product._id}>
                  <img src={product.image} alt={product.product_name} />
                  <h4>{product.product_name}</h4>
                  <p>{product.product_description}</p>
                  <p><strong>Price:</strong> ${parseFloat(product.price).toFixed(2)}</p>
                <Link to={`/products/${product._id}`}>
                  <button className="product-btn">View Details</button>
                </Link>
                </div>
              ))
            ) : (
              <p>No featured products available.</p>
            )}
          </div>
        </section>

<section className="customer-reviews">
          <h2>What Our Customers Say</h2>
          <div className="review-list">
            <div className="review-card">
              <p>"Great selection and fast delivery! My camping trip was a success thanks to your gear."</p>
              <span>- Priya S.</span>
            </div>
            <div className="review-card">
              <p>"The hiking boots are super comfortable and durable. Highly recommend!"</p>
              <span>- Alex M.</span>
            </div>
            <div className="review-card">
              <p>"Customer service was very helpful and the prices are unbeatable."</p>
              <span>- Jordan K.</span>
            </div>
          </div>
        </section>

      </div>
      
    </>
 )
}

export default Home