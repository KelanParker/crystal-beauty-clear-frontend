// Root Supabase storage + image optimization utilities
// Mirrors functionality in CBC-frontend version so shared components can import consistently.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta?.env?.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta?.env?.VITE_SUPABASE_ANON_KEY || '';
export const supabase = (supabaseUrl && supabaseKey) ? createClient(supabaseUrl, supabaseKey) : null;

const BUCKET_NAME = 'site-images';

export const uploadImage = async (file, folder = 'general', fileName = null) => {
	if (!supabase) throw new Error('Supabase client not initialized');
	const fileExt = file.name.split('.').pop();
	const finalFileName = fileName || `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
	const filePath = `${folder}/${finalFileName}`;
	const { error } = await supabase.storage.from(BUCKET_NAME).upload(filePath, file);
	if (error) throw error;
	const { data: publicUrlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
	return publicUrlData.publicUrl;
};

export const getImageUrl = (path) => {
	if (!supabase) return path;
	const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
	return data.publicUrl;
};

export const deleteImage = async (path) => {
	if (!supabase) return false;
	const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);
	if (error) throw error;
	return true;
};

export const CRYSTAL_BEAUTY_IMAGES = {
	placeholders: {
		product: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop',
		avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b94c?w=150&h=150&fit=crop',
		general: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=300&fit=crop'
	}
};

export const getImageWithFallback = (imageUrl, fallbackUrl = CRYSTAL_BEAUTY_IMAGES.placeholders.general) => imageUrl || fallbackUrl;

export const uploadMultipleImages = async (files, folder) => Promise.all(Array.from(files).map(f => uploadImage(f, folder)));

// Optimization helpers
export const isSupabaseUrl = (url) => typeof url === 'string' && url.includes('.supabase.co') && url.includes('/object/public/');
export const isUnsplashUrl = (url) => typeof url === 'string' && url.includes('images.unsplash.com');

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

export const buildSrcSet = (url, widths = [], { quality = 70 } = {}) => {
	if (!url || !Array.isArray(widths) || widths.length === 0) return undefined;
	return widths.sort((a,b)=>a-b).map(w => `${getOptimizedImageUrl(url, { width: w, quality })} ${w}w`).join(', ');
};

export default {
	uploadImage,
	getImageUrl,
	deleteImage,
	uploadMultipleImages,
	getImageWithFallback,
	CRYSTAL_BEAUTY_IMAGES,
	getOptimizedImageUrl,
	buildSrcSet,
	isSupabaseUrl,
	isUnsplashUrl
};
