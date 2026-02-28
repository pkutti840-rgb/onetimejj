import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [addedTemp, setAddedTemp] = useState(null);
    const { addToCart } = useCart();

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
                <div className="product-meta">
                    <span className="price">₹{product.price.toFixed(2)}</span>
                    <span className="rating"><Star size={16} fill="currentColor" /> {product.rating}</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
