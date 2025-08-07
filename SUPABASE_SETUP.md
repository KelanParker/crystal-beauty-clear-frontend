# Crystal Beauty Clear - Supabase Setup Instructions

## 1. Install Supabase Dependencies

Run this command in your project root:

```bash
npm install @supabase/supabase-js
```

## 2. Create Supabase Project

1. Go to https://supabase.com
2. Create a new project
3. Note down your project URL and anon key

## 3. Environment Setup

Create a `.env` file in your project root with:

```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
VITE_BACKEND_URL=http://localhost:3001
```

## 4. Create Storage Bucket

In your Supabase dashboard:

1. Go to Storage
2. Create a new bucket named: `crystal-beauty-images`
3. Make it public
4. Create the following folders in the bucket:
   - hero/
   - products/
   - categories/
   - team/
   - values/
   - office/
   - ecommerce/
   - testimonials/
   - backgrounds/
   - branding/
   - placeholders/

## 5. Upload Images Using the Manager

1. Add the ImageUploadManager to your admin routes
2. Use it to upload images to appropriate folders
3. Copy the generated URLs
4. Update the CRYSTAL_BEAUTY_IMAGES object in utils/supabaseStorage.js

## 6. Recommended Images to Upload

### Hero Section (1920x1080px)
- Beautiful woman with glowing skin
- Elegant woman applying skincare
- Woman in beauty routine

### Featured Products (400x400px)
- Moisturizer cream jar
- Vitamin C serum bottle
- Gentle face cleanser
- Hydrating face mask
- Anti-aging eye cream
- Rose water toner
- SPF 50 sunscreen
- Nourishing face oil

### Categories (300x300px)
- Skincare routine illustration
- Makeup collection illustration
- Hair care products illustration
- Body care essentials illustration

### Team Photos (300x300px)
- CEO professional headshot
- Marketing Director photo
- Head of R&D photo
- Sales Manager photo

### Company Values Icons (100x100px)
- Quality guarantee icon
- Innovation research icon
- Sustainability leaf icon
- Customer care heart icon

### Office/Store (600x400px)
- Modern beauty salon reception
- Product display showcase
- Consultation room setup

### E-commerce Icons (64x64px)
- Visa payment icon
- Mastercard payment icon
- PayPal payment icon
- Shopping cart icon
- User account icon
- Search icon

### Testimonials (150x150px)
- Happy customer photos (4-5 diverse portraits)

### Backgrounds (1920x1080px)
- White marble texture
- Soft pink gradient
- Subtle floral pattern

### Branding
- Crystal Beauty Clear logo (PNG with transparency)
- White version of logo
- Favicon (32x32px)

### Placeholders
- Product placeholder image
- Avatar placeholder image
- General placeholder image

## 7. Image Sources

Use these free resources:
- Unsplash.com (for hero and lifestyle images)
- Pexels.com (for product and store photos)
- Icons8.com (for icons and illustrations)
- Freepik.com (for vector illustrations)

## 8. Security Considerations

- Enable Row Level Security (RLS) on your storage bucket
- Set proper access policies
- Consider image optimization before upload
- Use appropriate file naming conventions

## 9. Integration Complete ✅

After following these steps, your Crystal Beauty Clear website will use:
- Professional images stored in Supabase
- Automatic fallbacks for failed image loads
- Consistent branding across all pages
- Fast loading with CDN delivery
