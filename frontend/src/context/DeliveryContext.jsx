import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const DeliveryContext = createContext();

export const useDeliveries = () => useContext(DeliveryContext);

export const DeliveryProvider = ({ children }) => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial deliveries (Mock data for display if table doesn't exist yet)
    const initialMockDeliveries = [
        { id: 1, customer: 'pkutt@example.com', items: '2x Organic Bananas, 1x Fresh Spinach', total: 320, status: 'Pending', date: '2026-02-27' },
        { id: 2, customer: 'user2@example.com', items: '1x Milk, 3x Carrots', total: 450, status: 'Shipped', date: '2026-02-26' },
        { id: 3, customer: 'pkutt@example.com', items: '1x Apples', total: 120, status: 'Delivered', date: '2026-02-25' }
    ];

    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const { data, error } = await supabase
                    .from('deliveries')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.log('Using mock deliveries (Table might not exist yet)');
                    setDeliveries(initialMockDeliveries);
                } else {
                    setDeliveries(data);
                }
            } catch (err) {
                setDeliveries(initialMockDeliveries);
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, []);

    const updateDeliveryStatus = async (id, newStatus) => {
        setDeliveries(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));

        // Potential Supabase update
        await supabase
            .from('deliveries')
            .update({ status: newStatus })
            .eq('id', id);
    };

    return (
        <DeliveryContext.Provider value={{ deliveries, updateDeliveryStatus, loading }}>
            {children}
        </DeliveryContext.Provider>
    );
};
