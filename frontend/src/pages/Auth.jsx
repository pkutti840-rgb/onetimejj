import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect to where the user came from, or home
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await signIn(email, password);
                if (error) throw error;
            } else {
                const { error } = await signUp(email, password);
                if (error) throw error;
                alert('Check your email for the confirmation link!');
            }
            if (isLogin) navigate(from, { replace: true });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="container">
                <motion.div
                    className="auth-card glass"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <h1>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                    <p className="subtitle">{isLogin ? 'Log in to continue shopping' : 'Join FreshCart today'}</p>

                    {error && <div className="error-msg">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="form-group">
                                <label><User size={18} /> Name</label>
                                <input type="text" placeholder="Your Name" required />
                            </div>
                        )}
                        <div className="form-group">
                            <label><Mail size={18} /> Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label><Lock size={18} /> Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button className="btn-primary auth-submit" disabled={loading}>
                            {loading ? 'Processing...' : (isLogin ? 'Log In' : 'Sign Up')}
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="auth-footer">
                        {isLogin ? (
                            <p>Don't have an account? <button onClick={() => setIsLogin(false)}>Sign Up</button></p>
                        ) : (
                            <p>Already have an account? <button onClick={() => setIsLogin(true)}>Log In</button></p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Auth;
