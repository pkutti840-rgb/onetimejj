import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Clock, ShieldCheck, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDeliveries } from '../context/DeliveryContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();
    const { deliveries, loading } = useDeliveries();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/auth');
        }
    }, [user, navigate]);

    if (!user) return null;

    // Filter deliveries for the logged-in user
    const userDeliveries = deliveries.filter(d => d.customer === user.email);
    const isAdmin = user.email === 'pkutti840@gmail.com';

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-header text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="profile-avatar-wrapper"
                    >
                        <div className="profile-avatar glass">
                            <User size={48} className="text-primary" />
                        </div>
                        {isAdmin && (
                            <div className="admin-badge" title="Administrator">
                                <ShieldCheck size={20} />
                            </div>
                        )}
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        My Profile
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="profile-email flex-center"
                    >
                        <Mail size={16} /> {user.email}
                    </motion.p>
                </div>

                <div className="profile-content">
                    <motion.div
                        className="profile-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="section-header">
                            <Package className="text-primary" />
                            <h2>My Orders</h2>
                        </div>

                        {loading ? (
                            <div className="loading-state">Loading your orders...</div>
                        ) : userDeliveries.length === 0 ? (
                            <div className="empty-state glass">
                                <Package size={48} className="text-muted mb-3" />
                                <h3>No orders yet</h3>
                                <p>Looks like you haven't placed any orders with us yet.</p>
                                <button className="btn-primary mt-4" onClick={() => navigate('/products')}>
                                    Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="orders-grid">
                                {userDeliveries.map(order => (
                                    <div key={order.id} className="order-card glass">
                                        <div className="order-header">
                                            <div>
                                                <span className="order-id">Order #{order.id}</span>
                                                <span className="order-date">
                                                    <Clock size={14} className="inline-icon" />
                                                    {order.date || new Date().toISOString().split('T')[0]}
                                                </span>
                                            </div>
                                            <span className={`status-badge ${order.status.toLowerCase()}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="order-body">
                                            <div className="order-items-list">
                                                <h4>Items</h4>
                                                <p>{order.items}</p>
                                            </div>
                                            <div className="order-total">
                                                <h4>Total</h4>
                                                <p className="price">₹{order.total.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
