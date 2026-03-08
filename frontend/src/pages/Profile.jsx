import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Clock, ShieldCheck, Mail, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useDeliveries } from '../context/DeliveryContext';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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

    const downloadOrderReceipt = (order) => {
        const doc = new jsPDF();
        
        // Header
        doc.setFontSize(22);
        doc.setTextColor(16, 185, 129); // Primary green
        doc.text("FRESH PICK MARKET", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text("Order Receipt", 105, 28, { align: "center" });

        // Meta Data
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Order ID: #${order.id}`, 14, 45);
        doc.text(`Date: ${order.date || new Date().toISOString().split('T')[0]}`, 14, 52);
        doc.text(`Customer: ${order.customer}`, 14, 59);
        doc.text(`Status: ${order.status}`, 14, 66);

        // Parse Items (format: "2x Apple @ ₹50.00, 1x Banana")
        const tableColumn = ["Item Name", "Quantity", "Price Each", "Subtotal"];
        const tableRows = [];
        
        const itemsList = order.items.split(', ');
        itemsList.forEach(itemStr => {
            // Check if the new price format exists: "2x Apple @ ₹50.00"
            if (itemStr.includes('@ ₹')) {
                const [qtyAndName, priceStr] = itemStr.split(' @ ₹');
                const qtyMatch = qtyAndName.match(/^(\d+)x\s+(.+)$/);
                
                if (qtyMatch) {
                    const qty = parseInt(qtyMatch[1]);
                    const name = qtyMatch[2];
                    const price = parseFloat(priceStr);
                    const subtotal = qty * price;
                    
                    tableRows.push([
                        name,
                        qty.toString(),
                        `Rs. ${price.toFixed(2)}`,
                        `Rs. ${subtotal.toFixed(2)}`
                    ]);
                } else {
                    tableRows.push([itemStr, "-", "-", "-"]);
                }
            } else {
                // Fallback for old orders ("2x Apple")
                tableRows.push([itemStr, "-", "-", "-"]);
            }
        });

        // Generate Table
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 75,
            theme: 'grid',
            headStyles: { fillColor: [16, 185, 129] }
        });

        // Totals
        const finalY = doc.lastAutoTable.finalY || 75;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Total Paid: Rs. ${order.total.toFixed(2)}`, 14, finalY + 15);

        // Thank you note
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Thank you for your order! View your profile for updates.", 105, finalY + 30, { align: "center" });

        // Download
        try {
            doc.save(`freshpick_receipt_order_${order.id}.pdf`);
        } catch (error) {
            console.error("Failed to download PDF:", error);
            alert("Sorry, we couldn't download the PDF at this time.");
        }
    };

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
                                            <div className="order-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '16px' }}>
                                                <div className="order-total">
                                                    <h4>Total</h4>
                                                    <p className="price">₹{order.total.toFixed(2)}</p>
                                                </div>
                                                <button 
                                                    className="btn-secondary flex-center" 
                                                    style={{ padding: '8px 16px', fontSize: '14px' }}
                                                    onClick={() => downloadOrderReceipt(order)}
                                                >
                                                    <Download size={16} style={{ marginRight: '6px' }} />
                                                    Download Receipt
                                                </button>
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
