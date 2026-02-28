import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Truck, Smile } from 'lucide-react';
import './About.css';

const About = () => {
    return (
        <div className="about-page">
            <div className="about-hero">
                <div className="container">
                    <motion.div
                        className="about-hero-content"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1>Our <span>Story</span></h1>
                        <p>From local farms directly to your table, we are redefining modern grocery shopping with quality, convenience, and care.</p>
                    </motion.div>
                </div>
                <div className="about-hero-bg">
                    <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600&h=600" alt="Fresh Produce Backsplash" />
                    <div className="overlay-gradient"></div>
                </div>
            </div>

            <section className="vision-section container">
                <div className="vision-grid">
                    <motion.div
                        className="vision-text"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Freshness You Can <span>Trust</span></h2>
                        <p>Founded in 2026, FreshCart started with a simple belief: everyone deserves access to healthy, fresh, and high-quality food without the hassle of crowded supermarkets.</p>
                        <p>We partner directly with local farmers and artisans to ensure that what lands in your cart is ethically sourced, organic where possible, and absolutely delicious.</p>
                    </motion.div>
                    <motion.div
                        className="vision-image-grid"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <img src="https://images.unsplash.com/photo-1506484381205-f7945653044d?auto=format&fit=crop&q=80&w=400&h=300" alt="Farming" className="v-img-1" />
                        <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&q=80&w=400&h=300" alt="Cooking" className="v-img-2" />
                    </motion.div>
                </div>
            </section>

            <section className="features-section">
                <div className="container">
                    <div className="features-header text-center">
                        <h2>Why Choose <span>Us?</span></h2>
                    </div>

                    <div className="features-grid">
                        <motion.div
                            className="feature-card glass"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="feature-icon"><Leaf size={32} /></div>
                            <h3>100% Organic</h3>
                            <p>We prioritize organic products that are free from harmful pesticides and chemicals.</p>
                        </motion.div>

                        <motion.div
                            className="feature-card glass"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.1 }}
                        >
                            <div className="feature-icon"><Award size={32} /></div>
                            <h3>Premium Quality</h3>
                            <p>Every item is hand-picked by our quality experts before it goes into your bag.</p>
                        </motion.div>

                        <motion.div
                            className="feature-card glass"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <div className="feature-icon"><Truck size={32} /></div>
                            <h3>Fast Delivery</h3>
                            <p>Same-day delivery guarantees that your food arrives right when you need it.</p>
                        </motion.div>

                        <motion.div
                            className="feature-card glass"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                        >
                            <div className="feature-icon"><Smile size={32} /></div>
                            <h3>Happy Customers</h3>
                            <p>Our dedicated support team is available 24/7 to ensure your satisfaction.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
