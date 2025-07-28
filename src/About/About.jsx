import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h2>About Us</h2>
        <p>Explore. Adventure. Repeat.</p>
      </div>

      <div className="about-content">
        <p>
          <strong>Sports Outdoor Gear</strong> is your trusted companion for all things adventure. Whether you're heading into the mountains, planning a weekend camping trip, or cycling through nature trails, we've got you covered.
        </p>
        <p>
          Our mission is to empower outdoor enthusiasts with reliable, high-quality gear — so you can explore the wild safely, confidently, and in comfort.
        </p>
        <p>
          We offer premium equipment for <span>camping</span>, <span>hiking</span>, <span>cycling</span>, and much more. Our passionate team of outdoor lovers is here to help you choose the right gear, every time.
        </p>
      </div>
    </div>
  );
}

export default About;
