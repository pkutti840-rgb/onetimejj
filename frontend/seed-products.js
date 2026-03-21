import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mhmusnhafudsoaajdnna.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1obXVzbmhhZnVkc29hYWpkbm5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIyMDQzMDUsImV4cCI6MjA4Nzc4MDMwNX0.MLxrpR-8tqZN_-igHeGQaZFD5J4pZlTmShf2gkxCSjE';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const SEED_PRODUCTS = [
    // Fruits
    { name: 'Organic Bananas', category: 'Fruits', price: 120, rating: 4.8, weight: '1 kg', offer: '10% OFF', description: 'Fresh, export quality organic bananas.', img: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Washington Apples', category: 'Fruits', price: 250, rating: 4.6, weight: '1 kg', offer: '15% OFF', description: 'Crisp and sweet Washington apples.', img: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6faa6?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Fresh Strawberries', category: 'Fruits', price: 180, rating: 4.9, weight: '250 g', offer: '', description: 'Sweet and juicy fresh strawberries.', img: 'https://images.unsplash.com/photo-1518635017498-87f514b751ba?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Nagpur Oranges', category: 'Fruits', price: 140, rating: 4.5, weight: '1 kg', offer: '5% OFF', description: 'Tangy and citrusy fresh oranges.', img: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Alphonso Mangoes', category: 'Fruits', price: 600, rating: 5.0, weight: '1 dozen', offer: '', description: 'Premium seasonal Alphonso mangoes.', img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=400&h=300' },

    // Vegetables
    { name: 'Fresh Spinach (Palak)', category: 'Vegetables', price: 40, rating: 4.5, weight: '250 g', offer: '', description: 'Farm-fresh leafy spinach.', img: 'https://images.unsplash.com/photo-1576045057995-568f588f8d9b?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Fresh Tomatoes', category: 'Vegetables', price: 30, rating: 4.4, weight: '1 kg', offer: '', description: 'Red juicy local tomatoes.', img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Organic Potatoes', category: 'Vegetables', price: 45, rating: 4.3, weight: '1 kg', offer: '', description: 'Locally grown organic potatoes.', img: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Fresh Carrots', category: 'Vegetables', price: 60, rating: 4.6, weight: '500 g', offer: '5% OFF', description: 'Crunchy farm fresh carrots.', img: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Broccoli', category: 'Vegetables', price: 120, rating: 4.8, weight: '1 pc', offer: '10% OFF', description: 'Healthy and premium broccoli heads.', img: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=400&h=300' },

    // Dairy
    { name: 'Amul Butter', category: 'Dairy', price: 55, rating: 4.8, weight: '100 g', offer: '', description: 'Pasteurised pure milk butter.', img: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Fresh Cow Milk', category: 'Dairy', price: 65, rating: 4.7, weight: '1 L', offer: '', description: 'Fresh, full-cream cow milk.', img: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Malai Paneer', category: 'Dairy', price: 90, rating: 4.9, weight: '200 g', offer: '', description: 'Soft and fresh malai paneer.', img: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Cheddar Cheese Block', category: 'Dairy', price: 140, rating: 4.6, weight: '200 g', offer: '10% OFF', description: 'Rich aged cheddar cheese.', img: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Probiotic Curd', category: 'Dairy', price: 40, rating: 4.5, weight: '400 g', offer: '', description: 'Thick probiotic yogurt/curd.', img: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400&h=300' },

    // Grains
    { name: 'Aashirvaad Atta', category: 'Grains', price: 210, rating: 4.9, weight: '5 kg', offer: '5% OFF', description: 'Premium quality whole wheat atta.', img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Premium Toor Dal', category: 'Grains', price: 160, rating: 4.7, weight: '1 kg', offer: '', description: 'Unpolished rich protein Toor Dal.', img: 'https://images.unsplash.com/photo-1585255474618-b2ce105dbe6b?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Basmati Rice', category: 'Grains', price: 350, rating: 4.8, weight: '5 kg', offer: '15% OFF', description: 'Long grain aromatic Basmati Rice.', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Quinoa Seeds', category: 'Grains', price: 280, rating: 4.6, weight: '500 g', offer: '10% OFF', description: 'High protein healthy white quinoa.', img: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Moong Dal', category: 'Grains', price: 140, rating: 4.7, weight: '1 kg', offer: '', description: 'Unpolished split yellow moong dal.', img: 'https://images.unsplash.com/photo-1585255474618-b2ce105dbe6b?auto=format&fit=crop&q=80&w=400&h=300' },

    // Spices
    { name: 'Garam Masala', category: 'Spices', price: 80, rating: 4.6, weight: '100 g', offer: '20% OFF', description: 'Authentic aromatic Indian spice blend.', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Turmeric Powder (Haldi)', category: 'Spices', price: 40, rating: 4.8, weight: '200 g', offer: '', description: 'Pure organic turmeric powder.', img: 'https://images.unsplash.com/photo-1615486171448-4fbaf08be0bc?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Red Chilli Powder', category: 'Spices', price: 65, rating: 4.7, weight: '200 g', offer: '5% OFF', description: 'Spicy ground red chilli powder.', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Black Pepper Corns', category: 'Spices', price: 150, rating: 4.9, weight: '100 g', offer: '', description: 'Premium unground black pepper.', img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=400&h=300' },
    { name: 'Cumin Seeds (Jeera)', category: 'Spices', price: 90, rating: 4.6, weight: '100 g', offer: '', description: 'Aromatic whole cumin seeds.', img: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400&h=300' }
];

async function seed() {
    console.log(`Seeding ${SEED_PRODUCTS.length} products to Supabase...`);
    const { data, error } = await supabase.from('products').insert(SEED_PRODUCTS);
    
    if (error) {
        console.error("Error inserting data:", error);
    } else {
        console.log("Seeding complete!");
    }
}

seed();
