import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Home/Home';
import About from './About/About';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Contact from './Contact/Contact';
import ProductsClient from './Products/Product'; // Client-side Products

import Navbar from './AdminLayout/components/navbar';
import Sidebar from './AdminLayout/components/sidebar';

import Dashboard from './AdminLayout/pages/Dashboard';
import Catagories from './AdminLayout/pages/catagories';
import ProductsAdmin from './AdminLayout/pages/Products'; // Admin-side Products

import { Box } from '@mui/material';
import AddProduct from './AdminLayout/pages/AddProduct';

// Layout for Admin Pages
const AdminLayout = ({ children }) => (
  <Box display="flex">
    <Sidebar />
    <Box flexGrow={1}>
      <Navbar />
      {children}
    </Box>
  </Box>
);

// Layout for Client Pages
const ClientLayout = ({ children }) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

// Route Manager
const AppRoutes = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return isAdmin ? (
    <AdminLayout>
      <Routes>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductsAdmin />} />
        <Route path="/admin/Catagories" element={<Catagories />} />
        <Route path="/admin/AddProduct" element={<AddProduct />} />
        {/* Redirect from "/" to "/admin" by default */}
        <Route path="/" element={<Navigate to="/admin" />} />
      </Routes>
    </AdminLayout>
  ) : (
    <ClientLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsClient />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </ClientLayout>
  );
};

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', width: '100%' }}>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
