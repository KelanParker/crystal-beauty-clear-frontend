# Product Import Guide

This project now includes an interactive script to help you import real product data from the `public/CBCProducts.zip` archive, upload product images to Supabase Storage, and create product entries in your backend (MongoDB) via the existing `/api/products` endpoint.

## Prerequisites

1. Backend running and accessible at `VITE_BACKEND_URL`.
2. Admin JWT token (place it in `.env.local` as `API_TOKEN=` or have it ready to paste).
3. Supabase Storage bucket `site-images` already created (public) in your Supabase project.
4. Environment variables set (in `.env.local` or user environment):

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_BACKEND_URL=...
API_TOKEN=...   # optional; otherwise prompted
```

## Running the Import

```powershell
npm install
npm run import:products
```

The script will:

- Extract `public/CBCProducts.zip` into a temp folder.
- Discover nested category zip files (each category = one archive).
- For each image inside a category, prompt you for product fields (defaults suggested).
- Upload each image to `site-images/products/<category>/...` in Supabase.
- POST the assembled product payload to the backend.

## Field Logic

- productID: Defaults to `CATEGORY-N` (uppercase) unless you override.
- name: Derived from filename (minus numbers / separators) – you can edit.
- altNames: Defaults to `<category>, <derived name>`; add more comma‑separated if useful.
- price / labeledPrice: Random realistic defaults; you can specify exact numbers.
- stock: Default 50.
- description: Auto template referencing category + name; editable inline.

## Skipping / Errors

If an image upload fails you can choose to skip or abort. If product creation fails you can continue with next or stop.

## After Import

- Products with their image URLs (public) will appear in your admin products listing.
- You can edit any product details through the UI afterward.

## Cleanup

Temporary extracted files live in `./tmp/product-import` and are deleted each run (fresh extraction).

## Troubleshooting

- 401 Unauthorized: Ensure the token is valid and has permissions.
- Missing Supabase credentials: Confirm env vars loaded (restart shell if needed).
- Bucket not found: Create `site-images` bucket in Supabase, make it public.
- Duplicate uploads: Each upload name is timestamped + random suffix to avoid collisions.

## Future Enhancements (Optional)

- Batch mode (no prompts) with a YAML/CSV mapping file.
- Support multiple images per product (currently one per image file = one product).
- Automatic category normalization mapping.

---

Happy importing!
