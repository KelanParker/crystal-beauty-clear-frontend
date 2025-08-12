#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const backendUrl = process.env.VITE_BACKEND_URL || 'http://localhost:5000';
const bucket = 'site-images';
const token = process.env.API_TOKEN;

if (!supabaseUrl || !supabaseKey || !backendUrl || !token) {
  console.error('Missing required env vars. Check .env.local for VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_BACKEND_URL, API_TOKEN');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function deriveCategory(filePath) {
  const parts = filePath.split(path.sep);
  const idx = parts.findIndex(p => p === 'CBCProducts_extracted');
  return idx !== -1 ? parts[idx + 1] : 'Unknown';
}

function deriveName(filePath, index) {
  const category = deriveCategory(filePath);
  return category.replace(/\b\w/g, c => c.toUpperCase()) + ' ' + (index + 1);
}

function deriveAltNames(category) {
  return category.split(/\s|,|_/).filter(Boolean).join(', ');
}

function randomPrice(min = 1200, max = 3500) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
}

function randomDescription(category) {
  return `Premium ${category} product for your daily beauty routine. Dermatologist recommended.`;
}

async function uploadImageToSupabase(filePath, category) {
  const fileBuf = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const storagePath = `products/${category}/${Date.now()}-${Math.random().toString(36).slice(2)}-${fileName}`;
  const { error } = await supabase.storage.from(bucket).upload(storagePath, fileBuf, {
    contentType: 'image/' + (fileName.split('.').pop() || 'jpeg'),
    upsert: false
  });
  if (error) throw error;
  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function createProduct(product) {
  const url = `${backendUrl}/api/products`;
  const res = await axios.post(url, product, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
}

async function main() {
  const imageListPath = path.join(process.cwd(), 'image_list.txt');
  if (!fs.existsSync(imageListPath)) {
    console.error('image_list.txt not found. Run the image listing step first.');
    process.exit(1);
  }
  const lines = fs.readFileSync(imageListPath, 'utf-8').split(/\r?\n/).filter(Boolean);
  const grouped = {};
  lines.forEach(line => {
    const category = deriveCategory(line);
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(line);
  });
  let count = 0;
  for (const [category, files] of Object.entries(grouped)) {
    for (let i = 0; i < files.length; i++) {
      const filePath = files[i];
      const name = deriveName(filePath, i);
      const altNames = deriveAltNames(category);
      const price = randomPrice();
      const labeledPrice = price + randomPrice(200, 800);
      const stock = Math.floor(Math.random() * 40) + 10;
      const description = randomDescription(category);
      let imageUrl;
      try {
        process.stdout.write(`Uploading image: ${filePath} ... `);
        imageUrl = await uploadImageToSupabase(filePath, category);
        console.log('done');
      } catch (e) {
        console.error('FAILED:', e.message);
        continue;
      }
      const product = {
        productID: `${category.replace(/\s/g, '').toUpperCase()}-${i + 1}`,
        name,
        altNames: altNames.split(',').map(s => s.trim()),
        category: category.replace(/\b\w/g, c => c.toUpperCase()),
        brand: 'Crystal Beauty Clear',
        price,
        labeledPrice,
        quantity: stock,
        stock,
        isAvailable: stock > 0,
        rating: 4.5,
        description,
        imageUrl: [imageUrl]
      };
      try {
        process.stdout.write('Creating product... ');
        await createProduct(product);
        console.log('created');
        count++;
      } catch (e) {
        console.error('FAILED:', e.response?.data || e.message);
      }
    }
  }
  console.log(`\nImported ${count} products.`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
