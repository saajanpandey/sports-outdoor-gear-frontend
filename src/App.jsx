import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './Home/Home'
import About from './About/About'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Contact from './Contact/Contact'
import Products from './Products/Product'


function App() {

return (
<Router>
<div style={{ minHeight: '100vh', width: '100', display: 'flex', flexDirection: 'column' }}>
<Header/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/products" element={<Products />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<Contact />} />
</Routes>
<Footer/>
</div>
</Router>
)
}

export default App