import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

import { supabase } from '../supabaseClient';

export const CATEGORIES = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Grains', 'Spices'];

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error('Error fetching products:', error);
                } else {
                    setProducts(data || []);
                }
            } catch (err) {
                console.error('Error in fetchProducts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const updateProduct = async (updatedProduct) => {
        // Optimistic update
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));

        // Supabase update
        await supabase
            .from('products')
            .update(updatedProduct)
            .eq('id', updatedProduct.id);
    };

    const addProduct = async (newProduct) => {
        // Immediately update with a temporary ID so UI feels fast 
        const tempId = Date.now();
        setProducts(prev => [{ ...newProduct, id: tempId }, ...prev]);

        // Supabase insert
        const { data, error } = await supabase
            .from('products')
            .insert([newProduct])
            .select();

        if (data && data.length > 0) {
            // Replace temporary ID with actual DB ID
            setProducts(prev => prev.map(p => p.id === tempId ? data[0] : p));
        } else if (error) {
            console.error('Error adding product:', error);
            // Revert state on error
            setProducts(prev => prev.filter(p => p.id !== tempId));
        }
    };

    const deleteProduct = async (id) => {
        // Optimistic update
        setProducts(prev => prev.filter(p => p.id !== id));

        // Supabase delete
        await supabase
            .from('products')
            .delete()
            .eq('id', id);
    }

    return (
        <ProductContext.Provider value={{ products, setProducts, updateProduct, addProduct, deleteProduct, categories: CATEGORIES, loading }}>
            {children}
        </ProductContext.Provider>
    );
};
