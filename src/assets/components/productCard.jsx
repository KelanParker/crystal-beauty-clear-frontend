import { Link } from 'react-router-dom';
import { CRYSTAL_BEAUTY_IMAGES, getImageWithFallback } from '../../../utils/supabaseStorage';

export default function ProductCard(props) {
  const product = props.product;

  const formatLKR = (value) => {
    const num = Number(value);
    return isFinite(num) ? `LKR ${num.toFixed(2)}` : `LKR ${value}`;
  };

  // Function to get the first available image - UPDATED TO USE SUPABASE FALLBACKS
  // Placeholder images stored in: supabase/crystal-beauty-images/placeholders/
  const getProductImage = () => {
    // Check imageUrl field first (this is where your images are stored)
    if (product.imageUrl) {
      // If imageUrl is an array, take the first one
      if (Array.isArray(product.imageUrl) && product.imageUrl.length > 0) {
        return getImageWithFallback(product.imageUrl[0], CRYSTAL_BEAUTY_IMAGES.placeholders.product);
      }
      // If imageUrl is a string
      else if (typeof product.imageUrl === 'string') {
        return getImageWithFallback(product.imageUrl, CRYSTAL_BEAUTY_IMAGES.placeholders.product);
      }
    }
    
    // Check if product has images array with multiple images
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      // If images are objects with url property
      if (typeof product.images[0] === 'object' && product.images[0].url) {
        return getImageWithFallback(product.images[0].url, CRYSTAL_BEAUTY_IMAGES.placeholders.product);
      }
      // If images are objects with path property
      else if (typeof product.images[0] === 'object' && product.images[0].path) {
        const imagePath = product.images[0].path;
        const fullPath = imagePath.startsWith('http') 
          ? imagePath 
          : `${import.meta.env.VITE_BACKEND_URL}/uploads/${imagePath.replace(/^\/+/, '')}`;
        return getImageWithFallback(fullPath, CRYSTAL_BEAUTY_IMAGES.placeholders.product);
      }
      // If images are direct string URLs
      else if (typeof product.images[0] === 'string') {
        return getImageWithFallback(product.images[0], CRYSTAL_BEAUTY_IMAGES.placeholders.product);
      }
    }
    
    // Check single image field
    if (product.image) {
      if (typeof product.image === 'object' && product.image.url) {
        return getImageWithFallback(product.image.url, CRYSTAL_BEAUTY_IMAGES.placeholders.product);
      } else if (typeof product.image === 'string') {
        return getImageWithFallback(product.image, CRYSTAL_BEAUTY_IMAGES.placeholders.product);
      }
    }
    
    // Fallback to Supabase placeholder image
    return CRYSTAL_BEAUTY_IMAGES.placeholders.product;
  };

  return (
    <Link to={`/overview/${product.productID}`} className="w-[300px] h-[450px] p-3 shadow-lg rounded-lg bg-white hover:shadow-2xl transition-shadow duration-300">
      <img 
        src={getProductImage()}
        alt={product.name}
        className="w-full h-[260px] object-cover mb-2 rounded-lg"
      />
      <h6 className="text-xs text-gray-500">{product.category}</h6>
      <h6 className="text-xs text-gray-500">{product.productID}</h6>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <div className="mt-2">
        <span className="text-xl font-bold text-pink-600">{formatLKR(product.price)}</span>
        {product.labeledPrice && product.labeledPrice > product.price && (
          <span className="text-gray-400 line-through ml-2">{formatLKR(product.labeledPrice)}</span>
        )}
      </div>
      <button className="w-full bg-pink-500 text-white py-2 px-4 rounded mt-2 hover:bg-pink-600">
        Add to Cart
      </button>
    </Link>
  );
}
