import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Plus, Trash2, Save, X, Package, Truck, ChevronRight } from 'lucide-react';
import { useProducts, CATEGORIES } from '../context/ProductContext';
import { useDeliveries } from '../context/DeliveryContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { products, updateProduct, deleteProduct, addProduct } = useProducts();
    const [editingId, setEditingId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const [isAdding, setIsAdding] = useState(false);
    const [activeTab, setActiveTab] = useState('products');

    const { deliveries, updateDeliveryStatus } = useDeliveries();

    // Check admin authorization
    React.useEffect(() => {
        if (!user || user.email !== 'pkutti840@gmail.com') {
            navigate('/');
        }
    }, [user, navigate]);

    if (!user || user.email !== 'pkutti840@gmail.com') {
        return null; // Don't render anything while redirecting
    }


    // Exclude 'All' from categories dropdown
    const editableCategories = CATEGORIES.filter(c => c !== 'All');

    const handleEditClick = (product) => {
        setEditingId(product.id);
        setEditFormData(product);
        setIsAdding(false);
    };

    const handleAddClick = () => {
        setIsAdding(true);
        setEditingId(null);
        setEditFormData({
            name: '',
            category: 'Vegetables',
            price: '',
            weight: '',
            offer: '',
            description: '',
            rating: 5.0,
            img: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400&h=300'
        });
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: name === 'price' || name === 'rating' ? Number(value) : value
        });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditFormData({ ...editFormData, img: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (isAdding) {
            addProduct(editFormData);
            setIsAdding(false);
        } else {
            updateProduct(editFormData);
            setEditingId(null);
        }
    };

    const handleCancel = () => {
        setEditingId(null);
        setIsAdding(false);
    };

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-header">
                    <h2>Admin Dashboard</h2>
                    <div className="admin-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            <Package size={18} /> Products
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'deliveries' ? 'active' : ''}`}
                            onClick={() => setActiveTab('deliveries')}
                        >
                            <Truck size={18} /> Deliveries
                        </button>
                    </div>
                    {activeTab === 'products' && (
                        <button className="btn-primary" onClick={handleAddClick}>
                            <Plus size={18} style={{ marginRight: '8px' }} /> Add New Product
                        </button>
                    )}
                </div>

                {activeTab === 'products' ? (
                    <>
                        {(editingId || isAdding) && (
                            <motion.div
                                className="admin-edit-form glass"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h3>{isAdding ? 'Add New Product' : 'Edit Product'}</h3>
                                <form onSubmit={handleSave}>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required type="text" name="name" value={editFormData.name || ''} onChange={handleFormChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select name="category" value={editFormData.category || ''} onChange={handleFormChange}>
                                                {editableCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Price (₹)</label>
                                            <input required type="number" step="0.01" name="price" value={editFormData.price || ''} onChange={handleFormChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Weight (e.g. 1 kg, 500g)</label>
                                            <input required type="text" name="weight" value={editFormData.weight || ''} onChange={handleFormChange} />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Offer Label (e.g. 10% OFF)</label>
                                            <input type="text" name="offer" value={editFormData.offer || ''} onChange={handleFormChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Product Image</label>
                                            <input type="file" accept="image/*" onChange={handleImageUpload} />
                                            {editFormData.img && (
                                                <div style={{ marginTop: '10px' }}>
                                                    <img src={editFormData.img} alt="Preview" style={{ height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
                                                    <p style={{ fontSize: '0.8rem', color: '#a0aec0', marginTop: '4px' }}>Image loaded</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea required name="description" value={editFormData.description || ''} onChange={handleFormChange}></textarea>
                                    </div>

                                    <div className="form-actions">
                                        <button type="button" className="btn-secondary" onClick={handleCancel}>Cancel</button>
                                        <button type="submit" className="btn-primary">
                                            <Save size={18} style={{ marginRight: '8px' }} /> Save
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        <div className="admin-product-list">
                            {products.map(product => (
                                <div key={product.id} className="admin-product-card glass">
                                    <img
                                        src={product.img}
                                        alt={product.name}
                                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x300?text=Product+Image' }}
                                    />
                                    <div className="admin-card-info">
                                        <h4>{product.name}</h4>
                                        <p>₹{product.price} • {product.weight}</p>
                                        <span className="admin-cat-badge">{product.category}</span>
                                    </div>
                                    <div className="admin-card-actions">
                                        <button className="edit-icon-btn" onClick={() => handleEditClick(product)}>
                                            <Edit2 size={20} />
                                        </button>
                                        <button className="delete-icon-btn" onClick={() => deleteProduct(product.id)}>
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="delivery-management">
                        <div className="delivery-grid">
                            {deliveries.length === 0 ? (
                                <p>No deliveries found.</p>
                            ) : (
                                deliveries.map(delivery => (
                                    <div key={delivery.id} className="delivery-card glass">
                                        <div className="delivery-status-indicator">
                                            <span className={`status-dot ${delivery.status.toLowerCase()}`}></span>
                                            {delivery.status}
                                        </div>
                                        <div className="delivery-info">
                                            <h4>Order #{delivery.id}</h4>
                                            <p className="customer-email">{delivery.customer}</p>
                                            <p className="order-items">{delivery.items}</p>
                                            <p className="order-total">Total: ₹{delivery.total}</p>
                                            <p className="order-date">{delivery.date}</p>
                                        </div>
                                        <div className="delivery-actions">
                                            <select
                                                value={delivery.status}
                                                onChange={(e) => updateDeliveryStatus(delivery.id, e.target.value)}
                                                className="status-select"
                                            >
                                                <option value="Pending">Pending</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                                <option value="Cancelled">Cancelled</option>
                                            </select>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
