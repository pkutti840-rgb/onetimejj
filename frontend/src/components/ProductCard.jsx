import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, CheckCircle, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [addedTemp, setAddedTemp] = useState(null);
    const { addToCart } = useCart();

    const getFreshnessScore = (id) => {
        const numericId = typeof id === 'string' ? id.charCodeAt(0) : id;
        return 85 + (numericId % 14); 
    };

    const handleAdd = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAddedTemp(product.id);
        setTimeout(() => setAddedTemp(null), 1500);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="product-card glass"
        >
            <div className="product-img-wrapper">
                <img
                    src={product.img}
                    alt={product.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300?text=Product+Image' }}
                />
                {product.offer && <div className="product-offer-badge">{product.offer}</div>}
                <div className="add-to-cart-overlay">
                    <button
                        className={`add-btn ${addedTemp === product.id ? 'added' : ''}`}
                        onClick={handleAdd}
                    >
                        {addedTemp === product.id ? (
                            <><CheckCircle size={20} /> Added</>
                        ) : (
                            <><ShoppingCart size={20} /> Add</>
                        )}
                    </button>
                </div>
            </div>
            <div className="product-info">
                <div className="product-meta-top">
                    <span className="product-category">{product.category}</span>
                    {product.weight && <span className="product-weight">{product.weight}</span>}
                </div>
                <h3>{product.name}</h3>
                <p className="product-desc-sm">{product.description}</p>
                
                {/* Freshness Indicator */}
                <div className="freshness-indicator" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '12px', marginBottom: '8px' }}>
                    <Leaf size={14} color="#10b981" />
                    <div className="freshness-bar-container" style={{ flex: 1, height: '6px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <div 
                            className="freshness-bar-fill" 
                            style={{ 
                                width: `${getFreshnessScore(product.id)}%`, 
                                height: '100%', 
                                background: '#10b981',
                                borderRadius: '4px'
                            }}
                        />
                    </div>
                    <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>
                        {getFreshnessScore(product.id)}% Fresh Output
                    </span>
                </div>

                <div className="product-meta">
                    <span className="price">₹{product.price.toFixed(2)}</span>
                    <span className="rating"><Star size={16} fill="currentColor" /> {product.rating}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
