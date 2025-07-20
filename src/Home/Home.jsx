import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import '../Home/Home.css'

function Home() {
  return (
    <>
      <Header />
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
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Camping" />
              <h4>Camping</h4>
            </div>
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="Hiking" />
              <h4>Hiking</h4>
            </div>
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80" alt="Cycling" />
              <h4>Cycling</h4>
            </div>
            <div className="category-card">
              <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" alt="Climbing" />
              <h4>Climbing</h4>
            </div>
          </div>
        </section>


<section className="featured-products">
          <h2>Featured Products</h2>
          <div className="product-list">
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=400&q=80" alt="Tent" />
              <h4>All-Weather Tent</h4>
              <p>Perfect for camping in any season. Durable, lightweight, and easy to set up.</p>
              <button className="product-btn">View Details</button>
            </div>
            <div className="product-card">
              <img src="https://images.pexels.com/photos/167706/pexels-photo-167706.jpeg" alt="Hiking Boots" />
              <h4>Hiking Boots</h4>
              <p>Comfortable and waterproof boots for long treks and rough terrain.</p>
              <button className="product-btn">View Details</button>
            </div>
            <div className="product-card">
              <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Mountain Bike" />
              <h4>Mountain Bike</h4>
              <p>High-performance bike for off-road adventures and mountain trails.</p>
              <button className="product-btn">View Details</button>
            </div>
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
      <Footer />
    </>
 )
}

export default Home