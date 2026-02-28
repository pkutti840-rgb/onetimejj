import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

const INITIAL_MOCK_PRODUCTS = [
    { id: 1, name: 'Organic Bananas', category: 'Fruits', price: 120, rating: 4.8, img: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=400&h=300', weight: '1 kg', offer: '10% OFF', description: 'Fresh, export quality organic bananas.' },
    { id: 2, name: 'Fresh Spinach (Palak)', category: 'Vegetables', price: 40, rating: 4.5, img: 'https://images.unsplash.com/photo-1576045057995-568f588f8d9b?auto=format&fit=crop&q=80&w=400&h=300', weight: '250 g', offer: '', description: 'Farm-fresh leafy spinach.' },
    { id: 3, name: 'Aashirvaad Atta', category: 'Grains', price: 210, rating: 4.9, img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400&h=300', weight: '5 kg', offer: '5% OFF', description: 'Premium quality whole wheat atta.' },
    { id: 4, name: 'Premium Toor Dal', category: 'Grains', price: 160, rating: 4.7, img: 'https://images.unsplash.com/photo-1585255474618-b2ce105dbe6b?auto=format&fit=crop&q=80&w=400&h=300', weight: '1 kg', offer: '', description: 'Unpolished rich protein Toor Dal.' },
    { id: 5, name: 'Garam Masala', category: 'Spices', price: 80, rating: 4.6, img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400&h=300', weight: '100 g', offer: '20% OFF', description: 'Authentic aromatic Indian spice blend.' },
    { id: 6, name: 'Amul Butter', category: 'Dairy', price: 55, rating: 4.8, img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=400&h=300', weight: '100 g', offer: '', description: 'Pasteurised pure milk butter.' },
    { id: 7, name: 'Basmati Rice', category: 'Grains', price: 350, rating: 4.8, img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400&h=300', weight: '5 kg', offer: '15% OFF', description: 'Long grain aromatic Basmati Rice.' },
    { id: 8, name: 'Fresh Tomatoes', category: 'Vegetables', price: 30, rating: 4.4, img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400&h=300', weight: '1 kg', offer: '', description: 'Red juicy local tomatoes.' },
];

export const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Grains', 'Spices'];

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(INITIAL_MOCK_PRODUCTS);

    // Load from local storage to persist admin edits
    useEffect(() => {
        const saved = localStorage.getItem('freshcart_products');
        if (saved) {
            try {
                setProducts(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse products');
            }
        }
    }, []);

    const updateProduct = (updatedProduct) => {
        setProducts(prev => {
            const newProducts = prev.map(p => p.id === updatedProduct.id ? updatedProduct : p);
            localStorage.setItem('freshcart_products', JSON.stringify(newProducts));
            return newProducts;
        });
    };

    const addProduct = (newProduct) => {
        setProducts(prev => {
            const newProducts = [...prev, { ...newProduct, id: Date.now() }];
            localStorage.setItem('freshcart_products', JSON.stringify(newProducts));
            return newProducts;
        });
    };

    const deleteProduct = (id) => {
        setProducts(prev => {
            const newProducts = prev.filter(p => p.id !== id);
            localStorage.setItem('freshcart_products', JSON.stringify(newProducts));
            return newProducts;
        });
    }

    return (
        <ProductContext.Provider value={{ products, setProducts, updateProduct, addProduct, deleteProduct, categories: CATEGORIES }}>
            {children}
        </ProductContext.Provider>
    );
};
