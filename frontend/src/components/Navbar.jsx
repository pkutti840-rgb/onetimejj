import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { cartCount, toggleCart } = useCart();
    const { user, signOut } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'glass scrolled' : ''}`}>
            <div className="container nav-content">
                <Link to="/" className="brand">
                    <span className="brand-icon">🥑</span>
                    <h2>Fresh<span>Cart</span></h2>
                </Link>

                <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                    <Link to="/products" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Products</Link>
                    <Link to="/about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
                    <Link to="/contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                    {user && user.email === 'pkutti840@gmail.com' && (
                        <Link to="/admin" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Admin</Link>
                    )}
                </div>

                <div className="nav-actions">
                    <button className="icon-btn" aria-label="Search">
                        <Search size={22} />
                    </button>
                    <button className="icon-btn cart-btn" aria-label="Cart" onClick={toggleCart}>
                        <ShoppingCart size={22} />
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>

                    {user ? (
                        <div className="user-menu">
                            <button className="icon-btn" title="Logout" onClick={signOut}>
                                <LogOut size={22} />
                            </button>
                            <span className="user-email-hide-mobile">{user.email.split('@')[0]}</span>
                        </div>
                    ) : (
                        <Link to="/auth" className="btn-primary login-btn">Login</Link>
                    )}

                    <button
                        className="icon-btn mobile-menu-btn"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
