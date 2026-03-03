import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Cart from './components/Cart';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import Auth from './pages/Auth';
import { DeliveryProvider } from './context/DeliveryContext';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <DeliveryProvider>
              <div className="app">
                <Navbar />
                <Cart />
                <main>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/auth" element={<Auth />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </DeliveryProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
