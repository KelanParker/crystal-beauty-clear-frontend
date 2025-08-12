#!/usr/bin/env node
/**
 * Root-Level Interactive Product Import Script (duplicate of CBC-frontend version)
 * Extracts nested zips from public/CBCProducts.zip and uploads products.
 */
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import AdmZip from 'adm-zip';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load env from .env (root) and .env.local if present
const rootEnvLocal = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(rootEnvLocal)) dotenv.config({ path: rootEnvLocal });
const rootEnv = path.resolve(process.cwd(), '.env');
if (fs.existsSync(rootEnv)) dotenv.config({ path: rootEnv });

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const MASTER_ZIP = path.join(PUBLIC_DIR, 'CBCProducts.zip');
const TEMP_DIR = path.join(ROOT, 'tmp', 'product-import');

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const backendUrl = process.env.VITE_BACKEND_URL || 'http://localhost:5000';
const bucket = 'site-images';

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY');
  process.exit(1);
}
if (!backendUrl) {
  console.error('Missing backend URL env VITE_BACKEND_URL');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function ensureDir(dir) { fs.mkdirSync(dir, { recursive: true }); }
function cleanTemp() { if (fs.existsSync(TEMP_DIR)) fs.rmSync(TEMP_DIR, { recursive: true, force: true }); ensureDir(TEMP_DIR); }
async function extractMasterZip() { if (!fs.existsSync(MASTER_ZIP)) throw new Error('Master zip not found: ' + MASTER_ZIP); const zip = new AdmZip(MASTER_ZIP); zip.extractAllTo(TEMP_DIR, true); }
function listCategoryZips() { return fs.readdirSync(TEMP_DIR).filter(f=>f.toLowerCase().endsWith('.zip')).map(f=>path.join(TEMP_DIR,f)); }
function extractCategoryZip(zipPath) { const dest = zipPath.replace(/\.zip$/i,''); ensureDir(dest); const zip = new AdmZip(zipPath); zip.extractAllTo(dest,true); return dest; }
function deriveNameFromFile(file) { return path.basename(file).replace(/[-_]+/g,' ').replace(/\.[^.]+$/,'').replace(/\s+\d+$/,'').replace(/\b(img|image|photo)\b/ig,'').replace(/\s+/g,' ').trim().replace(/\b\w/g,c=>c.toUpperCase()); }
function randomPrice(base=15,varr=20){ const p=base+Math.random()*varr; return Math.round(p*100)/100; }
async function uploadImage(filePath, category){ const buf=fs.readFileSync(filePath); const fileName=path.basename(filePath); const storagePath=`products/${category}/${Date.now()}-${Math.random().toString(36).slice(2)}-${fileName}`; const {error} = await supabase.storage.from(bucket).upload(storagePath, buf, { contentType:'image/'+(fileName.split('.').pop()||'jpeg'), upsert:false}); if(error) throw error; const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath); return data.publicUrl; }
async function createProduct(product, token){ const url=`${backendUrl}/api/products`; const res = await axios.post(url, product, { headers:{ Authorization:`Bearer ${token}` }}); return res.data; }
function ask(q, rl){ return new Promise(r=> rl.question(q, a=> r(a))); }

async function main(){
  console.log('=== Root Product Import ===');
  cleanTemp();
  console.log('Extracting CBCProducts master zip...');
  await extractMasterZip();
  const zips = listCategoryZips();
  if(!zips.length){ console.log('No nested category zips found inside master zip.'); return; }
  console.log('Found', zips.length, 'category archives');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  let token = process.env.API_TOKEN;
  if(!token) token = await ask('Admin JWT token: ', rl);
  if(!token){ console.error('No token provided. Abort.'); rl.close(); return; }

  for(const catZip of zips){
    const baseName = path.basename(catZip, '.zip');
    console.log(`\n-- Category ${baseName} --`);
    const catDir = extractCategoryZip(catZip);
    const images = fs.readdirSync(catDir).filter(f=>/\.(png|jpe?g|webp|gif)$/i.test(f)).map(f=>path.join(catDir,f));
    if(!images.length){ console.log('No images, skip'); continue; }
    let index=1;
    for(const img of images){
      const defaultName = deriveNameFromFile(img);
      const name = await ask(`Name [${defaultName}]: `, rl) || defaultName;
      const productID = await ask(`Product ID [${baseName.toUpperCase()}-${index}]: `, rl) || `${baseName.toUpperCase()}-${index}`;
      const altDefault = `${baseName}`.replace(/[-_]/g,' ');
      const altInput = await ask(`Alt names (comma) [${altDefault}]: `, rl) || altDefault;
      const altNames = Array.from(new Set(altInput.split(',').map(s=>s.trim()).filter(Boolean)));
      const priceStr = await ask('Price [auto]: ', rl);
      const labeledPriceStr = await ask('Labeled Price [auto]: ', rl);
      const price = priceStr? parseFloat(priceStr): randomPrice(18,22);
      const labeledPrice = labeledPriceStr? parseFloat(labeledPriceStr): Math.max(price + randomPrice(5,10), price+1);
      const stockStr = await ask('Stock [50]: ', rl) || '50';
      const stock = parseInt(stockStr,10)||50;
      const descDefault = `Premium ${defaultName} from our ${baseName} collection.`;
      const description = await ask('Description [auto]: ', rl) || descDefault;
      process.stdout.write(' Uploading image...');
      let imageUrl;
      try { imageUrl = await uploadImage(img, baseName); console.log(' done'); }
      catch(e){ console.error('\n Upload failed:', e.message); const skip = await ask('Skip? (y/N): ', rl); if(/^y/i.test(skip)) { index++; continue; } else return; }
      const product = { productID, name, altNames, category: altDefault.replace(/\b\w/g,c=>c.toUpperCase()), brand:'Crystal Beauty Clear', price, labeledPrice, quantity:stock, stock, isAvailable: stock>0, rating:4.5, description, imageUrl:[imageUrl] };
      process.stdout.write(' Creating product...');
      try { await createProduct(product, token); console.log(' created'); }
      catch(e){ console.error('\n Create failed:', e.response?.data || e.message); const cont = await ask('Continue next? (Y/n): ', rl); if(/^n/i.test(cont)){ rl.close(); return; } }
      index++;
    }
  }
  console.log('\nAll done.');
}

main().catch(e=>{ console.error('Fatal:', e); process.exit(1); });
