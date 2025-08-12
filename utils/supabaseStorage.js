// Supabase Storage utility for Crystal Beauty Clear
// This file handles image uploads and retrieval from Supabase storage

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

// Storage bucket name
const BUCKET_NAME = 'site-images';

/**
 * Upload image to Supabase storage
 * @param {File} file - Image file to upload
 * @param {string} folder - Folder path (e.g., 'hero', 'products', 'team')
 * @param {string} fileName - Custom file name (optional)
 * @returns {Promise<string>} - Public URL of uploaded image
 */
export const uploadImage = async (file, folder = 'general', fileName = null) => {
  try {
    const fileExt = file.name.split('.').pop();
    const finalFileName = fileName || `${Date.now()}-${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${finalFileName}`;

    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file);

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Get image URL from Supabase storage
 * @param {string} path - Path to image in storage
 * @returns {string} - Public URL
 */
export const getImageUrl = (path) => {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);
  
  return data.publicUrl;
};

/**
 * Delete image from Supabase storage
 * @param {string} path - Path to image in storage
 * @returns {Promise<boolean>} - Success status
 */
export const deleteImage = async (path) => {
  try {
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([path]);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error deleting image:', error);
    return false;
  }
};

// Pre-defined image URLs organized by section
// These URLs can be updated once images are uploaded to Supabase storage
export const CRYSTAL_BEAUTY_IMAGES = {
  // HERO SECTION IMAGES (1920x1080px)
  // Used in: mainHomePage.jsx - Hero slider section
  hero: {
    hero1: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=1920&h=1080&fit=crop', // Beautiful woman with glowing skin
    hero2: 'https://images.unsplash.com/photo-1522335953906-4b8de668a4e6?w=1920&h=1080&fit=crop',  // Elegant woman applying skincare
    hero3: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&h=1080&fit=crop',     // Woman in beauty routine
  },

  // FEATURED PRODUCTS (400x400px)
  // Used in: mainHomePage.jsx - Featured products section
  // Used in: productCard.jsx - Product thumbnails
  // Used in: productsPage.jsx - Product listings
  products: {
    moisturizer: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop',    // Luxury moisturizer jar
    serum: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',         // Vitamin C serum bottle
    cleanser: 'https://images.unsplash.com/photo-1556228452-85eb4fddebc0?w=400&h=400&fit=crop',        // Gentle face cleanser
    faceMask: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop',         // Hydrating face mask
    eyeCream: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop',        // Anti-aging eye cream
    toner: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',               // Rose water toner
    sunscreen: 'https://images.unsplash.com/photo-1556228452-85eb4fddebc0?w=400&h=400&fit=crop',           // SPF 50 sunscreen
    faceOil: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400&h=400&fit=crop',          // Nourishing face oil
    lipBalm: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop',             // Organic lip balm
    bodyLotion: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',   // Body moisturizer
  },

  // CATEGORY SECTION (300x300px)
  // Used in: mainHomePage.jsx - Product categories section
  categories: {
    skincare: 'https://images.unsplash.com/photo-1556228452-85eb4fddebc0?w=300&h=300&fit=crop',     // Skincare routine illustration
    makeup: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?w=300&h=300&fit=crop',   // Makeup collection illustration
    haircare: 'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=300&h=300&fit=crop',   // Hair care products illustration
    bodycare: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop', // Body care essentials illustration
  },

  // TEAM PHOTOS (300x300px)
  // Used in: aboutPage.jsx - Team member profiles
  team: {
    ceo: 'https://images.unsplash.com/photo-1494790108755-2616b612b94c?w=300&h=300&fit=crop',                    // CEO - Sarah Johnson
    marketing: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',   // Marketing Director - Emily Chen
    research: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',     // Head of R&D - Dr. Maya Patel
    sales: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',            // Sales Manager - Lisa Wong
  },

  // COMPANY VALUES ICONS (100x100px)
  // Used in: aboutPage.jsx - Company values section
  values: {
    quality: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=100&h=100&fit=crop',          // Quality guarantee icon
    innovation: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop',     // Innovation research icon
    sustainability: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=100&h=100&fit=crop',   // Sustainability leaf icon
    customer: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=100&h=100&fit=crop',       // Customer care heart icon
  },

  // OFFICE/STORE IMAGES (600x400px)
  // Used in: contactPage.jsx - Office and store photos
  office: {
    reception: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop', // Modern salon reception
    display: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',        // Product display showcase
    consultation: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop',    // Consultation room
  },

  // E-COMMERCE ICONS (64x64px)
  // Used in: header.jsx, footer.jsx, checkout.jsx
  ecommerce: {
    cart: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=64&h=64&fit=crop',                 // Shopping cart icon
    user: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop',                  // User account icon
    search: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=64&h=64&fit=crop',            // Search icon
    visa: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=64&h=64&fit=crop',                  // Visa payment icon
    mastercard: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=64&h=64&fit=crop',           // Mastercard payment icon
    paypal: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=64&h=64&fit=crop',            // PayPal payment icon
  },

  // TESTIMONIAL CUSTOMER PHOTOS (150x150px)
  // Used in: mainHomePage.jsx - Customer testimonials section
  testimonials: {
    customer1: 'https://images.unsplash.com/photo-1494790108755-2616b612b94c?w=150&h=150&fit=crop',     // Anna - satisfied customer
    customer2: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',    // Priya - loyal customer
    customer3: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop', // Michelle - repeat customer
    customer4: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop',    // Sarah - beauty enthusiast
  },

  // BACKGROUND IMAGES (1920x1080px)
  // Used in: Various pages for background textures
  backgrounds: {
    marble: 'https://images.unsplash.com/photo-1615800001234-83a5a59b7fc4?w=1920&h=1080&fit=crop',       // White marble texture
    softPink: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&h=1080&fit=crop',       // Soft pink gradient
    floral: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop',      // Subtle floral pattern
  },

  // LOGO AND BRANDING (Various sizes)
  // Used in: header.jsx, footer.jsx, and throughout the site
  branding: {
    logo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=80&fit=crop',       // Main logo
    logoWhite: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=80&fit=crop', // White version
    favicon: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=32&h=32&fit=crop',       // Favicon
  },

  // PLACEHOLDER IMAGES
  // Used as fallbacks when images fail to load
  placeholders: {
    product: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',       // Product placeholder
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b94c?w=150&h=150&fit=crop',         // Avatar placeholder
    general: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop',         // General placeholder
  }
};

/**
 * Get image with fallback
 * @param {string} imageUrl - Primary image URL
 * @param {string} fallbackUrl - Fallback image URL
 * @returns {string} - Image URL with fallback
 */
export const getImageWithFallback = (imageUrl, fallbackUrl = CRYSTAL_BEAUTY_IMAGES.placeholders.general) => {
  return imageUrl || fallbackUrl;
};

/**
 * Upload multiple images to specific folder
 * @param {FileList} files - Files to upload
 * @param {string} folder - Target folder
 * @returns {Promise<string[]>} - Array of uploaded image URLs
 */
export const uploadMultipleImages = async (files, folder) => {
  const uploadPromises = Array.from(files).map(file => uploadImage(file, folder));
  return Promise.all(uploadPromises);
};

export default {
  uploadImage,
  getImageUrl,
  deleteImage,
  uploadMultipleImages,
  getImageWithFallback,
  CRYSTAL_BEAUTY_IMAGES
};

// ---------------- Image Optimization Helpers ----------------
const isSupabaseUrl = (url) => typeof url === 'string' && url.includes('.supabase.co') && url.includes('/object/public/');
const isUnsplashUrl = (url) => typeof url === 'string' && url.includes('images.unsplash.com');

/**
 * Build an optimized image URL using provider params when possible.
 * - Supabase: appends width/height/quality params (if supported by storage transform)
 * - Unsplash: appends w/h/fit/crop and q params
 */
export const getOptimizedImageUrl = (url, { width, height, quality = 70, fit = 'cover' } = {}) => {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (isUnsplashUrl(url)) {
      if (width) u.searchParams.set('w', String(width));
      if (height) u.searchParams.set('h', String(height));
      u.searchParams.set('fit', 'crop');
      u.searchParams.set('crop', 'center');
      u.searchParams.set('q', String(quality));
      return u.toString();
    }
    if (isSupabaseUrl(url)) {
      if (width) u.searchParams.set('width', String(width));
      if (height) u.searchParams.set('height', String(height));
      u.searchParams.set('quality', String(quality));
      u.searchParams.set('resize', fit);
      return u.toString();
    }
    return url;
  } catch {
    return url;
  }
};

/** Build a srcset string for the given widths */
export const buildSrcSet = (url, widths = [], { quality = 70 } = {}) => {
  if (!url || !Array.isArray(widths) || widths.length === 0) return undefined;
  const set = widths
    .sort((a,b) => a-b)
    .map(w => `${getOptimizedImageUrl(url, { width: w, quality })} ${w}w`)
    .join(', ');
  return set;
};

export { isSupabaseUrl, isUnsplashUrl };
