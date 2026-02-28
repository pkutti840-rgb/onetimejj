import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Cart.css';


const Cart = () => {
    const { isCartOpen, toggleCart, cartItems, addToCart, updateQuantity, removeFromCart, cartTotal } = useCart();
    const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleCheckout = async () => {
        if (!user) {
            toggleCart();
            navigate('/auth', { state: { from: window.location } });
            return;
        }
        setIsCheckoutLoading(true);
        try {
            // 1. Save order to Supabase Deliveries Table first
            const orderItemsString = cartItems.map(item => `${item.quantity}x ${item.name}`).join(', ');
            const { error: dbError } = await supabase.from('deliveries').insert([{
                customer: user.email,
                items: orderItemsString,
                total: cartTotal,
                status: 'Pending'
            }]);

            if (dbError) {
                console.error("Failed to save order to database:", dbError);
                alert("Could not process order in database. Please try again.");
                setIsCheckoutLoading(false);
                return;
            }

            // 2. Proceed to Stripe Checkout
            const stripeSecretKey = import.meta.env.VITE_STRIPE_SECRET_KEY;

            if (!stripeSecretKey) {
                console.error("Stripe secret key missing from environment variables.");
                alert("Payment configuration is missing.");
                setIsCheckoutLoading(false);
                return;
            }

            const params = new URLSearchParams();
            params.append('success_url', window.location.origin + '/?success=true');
            params.append('cancel_url', window.location.origin + '/?canceled=true');
            params.append('mode', 'payment');

            cartItems.forEach((item, index) => {
                params.append(`line_items[${index}][price_data][currency]`, 'inr');
                params.append(`line_items[${index}][price_data][product_data][name]`, item.name);
                params.append(`line_items[${index}][price_data][unit_amount]`, Math.round(item.price * 100).toString());
                params.append(`line_items[${index}][quantity]`, item.quantity.toString());
                // Only send image URL if it's an absolute URL
                if (item.img && item.img.startsWith('http')) {
                    params.append(`line_items[${index}][price_data][product_data][images][0]`, item.img);
                }
            });

            const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${stripeSecretKey}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params.toString()
            });

            const session = await response.json();

            if (session.url) {
                window.location.href = session.url;
            } else {
                console.error("Stripe error:", session);
                alert("Failed to create checkout session. Please try again.");
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert("An error occurred during checkout.");
        } finally {
            setIsCheckoutLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        className="cart-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                    />
                    <motion.div
                        className="cart-drawer glass"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="cart-header">
                            <h2><ShoppingBag size={24} className="inline-icon" /> Your Cart</h2>
                            <button className="close-btn" onClick={toggleCart}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className="cart-items">
                            {cartItems.length === 0 ? (
                                <div className="empty-cart">
                                    <ShoppingBag size={48} />
                                    <p>Your cart is empty.</p>
                                    <button className="btn-secondary" onClick={toggleCart}>Start Shopping</button>
                                </div>
                            ) : (
                                <AnimatePresence>
                                    {cartItems.map(item => (
                                        <motion.div
                                            key={item.id}
                                            className="cart-item"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0, margin: 0 }}
                                        >
                                            <img
                                                src={item.img}
                                                alt={item.name}
                                                className="cart-item-img"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300?text=Product+Image' }}
                                            />
                                            <div className="cart-item-details">
                                                <h4>{item.name}</h4>
                                                <span className="cart-item-price">₹{item.price.toFixed(2)}</span>
                                                <div className="qty-controls">
                                                    <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14} /></button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14} /></button>
                                                </div>
                                            </div>
                                            <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                                                <Trash2 size={18} />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal.toFixed(2)}</span>
                                </div>
                                <button
                                    className="btn-primary checkout-btn"
                                    onClick={handleCheckout}
                                    disabled={isCheckoutLoading}
                                >
                                    {isCheckoutLoading ? 'Processing...' : (user ? 'Proceed to Checkout' : 'Login to Checkout')}
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
