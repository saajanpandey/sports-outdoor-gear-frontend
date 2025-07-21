import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home/Home'
import About from './About/About'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Contact from './Contact/Contact'
import Products from './Products/Product'
import AuthForm from './Auth/AuthForm'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  return (
    <Router>
        <ToastContainer position="top-right" autoClose={3000} />
      <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Routes>
          {/* <ToastContainer position="top-right" autoClose={3000} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/auth" element={<AuthForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App