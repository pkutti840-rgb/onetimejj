import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            <div className="container">
                <motion.div
                    className="contact-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Get in <span>Touch</span></h1>
                    <p>We'd love to hear from you. Drop us a message or visit our fresh produce market.</p>
                </motion.div>

                <div className="contact-content">
                    <motion.div
                        className="contact-info glass"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h3>Contact Information</h3>
                        <p className="info-desc">Our team is ready to assist you with any questions regarding our fresh products or your recent orders.</p>

                        <div className="info-items">
                            <div className="info-item">
                                <div className="icon-circle"><MapPin size={24} /></div>
                                <div>
                                    <h4>Location</h4>
                                    <p>No 2 Big Street, Uthoor Village<br />Thiruvannamalai District, Chennai</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="icon-circle"><Phone size={24} /></div>
                                <div>
                                    <h4>Phone</h4>
                                    <p>8838507928</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="icon-circle"><Mail size={24} /></div>
                                <div>
                                    <h4>Email</h4>
                                    <p>pkutti840@gmail.com</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <div className="icon-circle"><Clock size={24} /></div>
                                <div>
                                    <h4>Store Hours</h4>
                                    <p>Mon - Sat: 8:00 AM - 8:00 PM<br />Sun: 9:00 AM - 6:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        className="contact-form glass"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <h3>Send a Message</h3>

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" placeholder="John Doe" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder="john@example.com" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" placeholder="How can we help?" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea id="message" rows="5" placeholder="Your message here..."></textarea>
                        </div>

                        <button type="submit" className="btn-primary flex-center submit-btn">
                            Send Message <Send size={18} style={{ marginLeft: '8px' }} />
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
