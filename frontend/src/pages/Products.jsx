import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import './Products.css';

const Products = () => {
    const { products, categories } = useProducts();
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredProducts = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="products-page">
            <div className="container">
                <motion.div
                    className="products-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Fresh Market</h1>
                    <p>Discover our wide variety of farm-fresh products.</p>
                </motion.div>

                <motion.div
                    className="category-filters"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`filter - btn ${activeCategory === cat ? 'active' : ''} `}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                <motion.div layout className="products-grid">
                    <AnimatePresence>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default Products;
