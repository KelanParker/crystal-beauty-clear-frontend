// Test Supabase connection
import { supabase } from './utils/supabaseStorage.js';

console.log('Testing Supabase connection...');
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY);
console.log('Supabase client:', supabase);

// Test basic connectivity
async function testConnection() {
    try {
        const { data, error } = await supabase.storage.listBuckets();
        if (error) {
            console.error('Supabase connection error:', error);
        } else {
            console.log('Supabase connected successfully. Buckets:', data);
        }
    } catch (err) {
        console.error('Connection test failed:', err);
    }
}

testConnection();
