import React from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const { products } = useProducts();

    return (
        <div className="home-page">
            <Hero />
            <section className="featured-section">
                <div className="container">
                    <div className="section-header">
                        <h2>Fresh Arrivals</h2>
                        <p>Hand-picked daily, straight from the farm to your door.</p>
                    </div>
                    <div className="product-grid">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="view-all-container">
                        <Link to="/products" className="btn-secondary flex-center" style={{ display: 'inline-flex', marginTop: '2rem' }}>
                            View All Products <ArrowRight size={18} style={{ marginLeft: '8px' }} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
