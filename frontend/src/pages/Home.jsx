import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Home.css';

const Home = () => {
    const { products } = useProducts();
    const { cartItems, clearCart, cartTotal } = useCart();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('success') === 'true') {
            setPaymentSuccess(true);
            
            // Only generate receipt if there are items in the cart (so it doesn't run twice in StrictMode)
            if (cartItems && cartItems.length > 0) {
                // Pass items directly so we capture state BEFORE clearing
                generateReceipt([...cartItems], cartTotal);
                clearCart();
            }

            // Remove success from URL
            navigate(location.pathname, { replace: true });
            
            // Hide success message after 5 seconds
            setTimeout(() => setPaymentSuccess(false), 5000);
        }
    }, [location]);

    const generateReceipt = (itemsToReceipt, totalToReceipt) => {
        const doc = new jsPDF();
        const date = new Date().toLocaleString();

        // Header
        doc.setFontSize(22);
        doc.setTextColor(16, 185, 129); // Primary green
        doc.text("FRESH PICK MARKET", 105, 20, { align: "center" });

        doc.setFontSize(12);
        doc.setTextColor(100, 100, 100);
        doc.text("Payment Receipt", 105, 28, { align: "center" });

        // Meta Data
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Date: ${date}`, 14, 45);

        // Table Data
        const tableColumn = ["Item Name", "Quantity", "Price", "Subtotal"];
        const tableRows = [];

        itemsToReceipt.forEach(item => {
            const itemData = [
                item.name,
                item.quantity.toString(),
                `Rs. ${item.price.toFixed(2)}`,
                `Rs. ${(item.price * item.quantity).toFixed(2)}`
            ];
            tableRows.push(itemData);
        });

        // Generate Table
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 55,
            theme: 'grid',
            headStyles: { fillColor: [16, 185, 129] }
        });

        // Totals
        const finalY = doc.lastAutoTable.finalY || 55;
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text(`Total Paid: Rs. ${totalToReceipt.toFixed(2)}`, 14, finalY + 15);

        // Thank you note
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Thank you for choosing Fresh Pick Market! Enjoy your fresh produce.", 105, finalY + 30, { align: "center" });

        // Force browser download
        try {
            doc.save(`freshpick_receipt_${Date.now()}.pdf`);
        } catch (error) {
            console.error("Failed to generate PDF receipt:", error);
            alert("Payment was successful, but we couldn't download your PDF receipt.");
        }
    };

    return (
        <div className="home-page">
            <AnimatePresence>
                {paymentSuccess && (
                    <motion.div 
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="payment-success-toast"
                        style={{
                            position: 'fixed',
                            top: '80px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#10b981',
                            color: 'white',
                            padding: '16px 24px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            zIndex: 1000,
                            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.3)'
                        }}
                    >
                        <CheckCircle size={24} />
                        <div>
                            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Payment Successful!</h4>
                            <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Your receipt is downloading.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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
