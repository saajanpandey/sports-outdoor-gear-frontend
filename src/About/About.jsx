import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      {/* 1. Company Overview */}
      <h2>About Us</h2>
      <p>
        Founded in 2023, Sports Outdoor Gear is dedicated to providing high-quality and reliable equipment for outdoor enthusiasts.
        Whether you’re an avid hiker, a weekend camper, or a competitive athlete, we have the gear to help you conquer your adventure.
      </p>

      {/* 2. Mission Statement */}
      <h3>Our Mission</h3>
      <p>
        Our mission is to empower adventurers by offering durable, innovative, and eco-friendly sports and outdoor products that enhance every journey.
        We are committed to quality, sustainability, and customer satisfaction in everything we do.
      </p>

      {/* 3. What Makes Us Different */}
      <h3>What Makes Us Different</h3>
      <ul>
        <li>Products rigorously tested for durability and performance.</li>
        <li>A wide selection of trusted brands and exclusive gear.</li>
        <li>Passionate experts who love the outdoors as much as you do.</li>
        <li>Customer service that goes the extra mile.</li>
        <li>Eco-conscious sourcing and materials to protect our planet.</li>
      </ul>

      {/* 4. Meet the Team */}
      <h3>Meet the Team</h3>
      <p>
        Our founders are lifelong outdoor enthusiasts who turned their passion into a business.
        With years of experience hiking, biking, and camping, they understand the importance of reliable gear.
      </p>

      {/* 5. Customer Commitment */}
      <h3>Customer Commitment</h3>
      <p>
        We prioritize your satisfaction with hassle-free warranties, flexible return policies, and friendly support.
        Your adventure is our priority.
      </p>

      {/* 6. Community Engagement */}
      <h3>Community Engagement</h3>
      <p>
        We proudly partner with local outdoor clubs, environmental charities, and events.
        Giving back and protecting nature are at the heart of our business.
      </p>

      {/* 7. Join Us */}
      <h3>Join Our Adventure</h3>
      <p>
        Explore our wide range of outdoor gear and connect with us on social media.
        Sign up for our newsletter to get the latest updates, tips, and exclusive offers.
      </p>
    </div>
  );
}

export default About;
