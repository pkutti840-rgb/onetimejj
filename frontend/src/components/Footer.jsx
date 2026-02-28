import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Mail, MapPin, Phone } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-area">
            <div className="container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <Link to="/" className="brand">
                            <span className="brand-icon">🥑</span>
                            <h2>Fresh<span>Cart</span></h2>
                        </Link>
                        <p className="brand-desc">
                            Your one-stop destination for fresh, organic, and hand-picked groceries delivered right to your doorstep.
                        </p>
                        <div className="social-links">
                            <a href="#" aria-label="Instagram"><Instagram size={20} /></a>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="Facebook"><Facebook size={20} /></a>
                        </div>
                    </div>

                    <div className="footer-links-group">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/products">Shop</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links-group">
                        <h3>Categories</h3>
                        <ul>
                            <li><Link to="/products">Fresh Fruits</Link></li>
                            <li><Link to="/products">Organic Vegetables</Link></li>
                            <li><Link to="/products">Dairy & Eggs</Link></li>
                            <li><Link to="/products">Bakery</Link></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact Us</h3>
                        <ul>
                            <li><MapPin size={18} /> No 2 Big Street, Uthoor Village, Thiruvannamalai District, Chennai</li>
                            <li><Phone size={18} /> 8838507928</li>
                            <li><Mail size={18} /> pkutti840@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} FreshCart. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
