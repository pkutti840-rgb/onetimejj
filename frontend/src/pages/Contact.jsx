import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;
        if (!accessKey) {
            setStatus('error');
            setErrorMessage('Web3Forms Access Key is missing in .env');
            setTimeout(() => setStatus('idle'), 5000);
            return;
        }

        setStatus('submitting');
        
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('access_key', accessKey);
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('subject', formData.subject);
            formDataToSend.append('message', formData.message);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formDataToSend
            });

            const data = await response.json();

            if (data.success) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setStatus('error');
                setErrorMessage(data.message || 'Something went wrong. Please try again.');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Network error. Please try again later.');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

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
                        onSubmit={handleSubmit}
                    >
                        <h3>Send a Message</h3>

                        {status === 'success' && (
                            <div className="form-message success" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <CheckCircle size={20} />
                                <span>Message sent successfully! We'll get back to you soon.</span>
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="form-message error" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <AlertCircle size={20} />
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input 
                                type="text" 
                                id="name" 
                                placeholder="John Doe" 
                                value={formData.name} 
                                onChange={handleChange} 
                                required 
                                disabled={status === 'submitting'}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                placeholder="john@example.com" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                disabled={status === 'submitting'}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input 
                                type="text" 
                                id="subject" 
                                placeholder="How can we help?" 
                                value={formData.subject} 
                                onChange={handleChange} 
                                required 
                                disabled={status === 'submitting'}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea 
                                id="message" 
                                rows="5" 
                                placeholder="Your message here..." 
                                value={formData.message} 
                                onChange={handleChange} 
                                required 
                                disabled={status === 'submitting'}
                            ></textarea>
                        </div>

                        <button 
                            type="submit" 
                            className="btn-primary flex-center submit-btn"
                            disabled={status === 'submitting'}
                        >
                            {status === 'submitting' ? 'Sending...' : (
                                <>Send Message <Send size={18} style={{ marginLeft: '8px' }} /></>
                            )}
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
