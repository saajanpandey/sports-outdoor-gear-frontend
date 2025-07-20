import React from 'react'
import './Contact.css'

function Contact() {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>
        Have questions or need help? Reach out to us!
      </p>
      <form className="contact-form">
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows={5} required />
        <button type="submit">
          Send Message
        </button>
      </form>
      <div className="contact-info">
        <p><strong>Email:</strong> info@sportsoutdoorgear.com</p>
        <p><strong>Phone:</strong> +1 234 567 8901</p>
        <p><strong>Address:</strong> 123 Adventure Lane, Toronto, ON</p>
      </div>
    </div>
  )
}

export default Contact