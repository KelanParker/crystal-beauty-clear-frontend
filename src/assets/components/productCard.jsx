import { Link } from 'react-router-dom';
import { CRYSTAL_BEAUTY_IMAGES, getOptimizedImageUrl, buildSrcSet } from '../../../utils/supabaseStorage';

export default function ProductCard(props) {
  const product = props.product;

  // Function to get the first available image
  const getProductImage = () => {
    // Check imageUrl field first (this is where your images are stored)
    if (product.imageUrl) {
      // If imageUrl is an array, take the first one
      if (Array.isArray(product.imageUrl) && product.imageUrl.length > 0) {
        return product.imageUrl[0];
      }
      // If imageUrl is a string
      else if (typeof product.imageUrl === 'string') {
        return product.imageUrl;
      }
    }
    
    // Check if product has images array with multiple images
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      // If images are objects with url property
      if (typeof product.images[0] === 'object' && product.images[0].url) {
        return product.images[0].url;
      }
      // If images are objects with path property
      else if (typeof product.images[0] === 'object' && product.images[0].path) {
        const imagePath = product.images[0].path;
        return imagePath.startsWith('http') 
          ? imagePath 
          : `${import.meta.env.VITE_BACKEND_URL}/uploads/${imagePath.replace(/^\/+/, '')}`;
      }
      // If images are direct string URLs
      else if (typeof product.images[0] === 'string') {
        return product.images[0];
      }
    }
    
    // Check single image field
    if (product.image) {
      if (typeof product.image === 'object' && product.image.url) {
        return product.image.url;
      } else if (typeof product.image === 'string') {
        return product.image;
      }
    }
    
    // Fallback to a default image
    return 'https://via.placeholder.com/300x200?text=No+Image';
  };

  return (
    <Link to={`/overview/${product.productID}`} className="w-[300px] h-[450px] p-3 shadow-lg rounded-lg bg-white hover:shadow-2xl transition-shadow duration-300">
      {/* Image wrapper to clip bottom overlays and maintain consistent crop */}
      <div className="w-full h-[260px] overflow-hidden rounded-lg">
        <img 
          src={getOptimizedImageUrl(getProductImage(), { width: 480, height: 260, quality: 70 })}
          srcSet={buildSrcSet(getProductImage(), [240, 360, 480, 720], { quality: 60 })}
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 300px"
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
      </div>
      <h6 className="text-xs text-gray-500">{product.category}</h6>
      <h6 className="text-xs text-gray-500">{product.productID}</h6>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <div className="mt-2">
        <span className="text-xl font-bold text-pink-600">${product.price}</span>
        {product.labeledPrice && product.labeledPrice > product.price && (
          <span className="text-gray-400 line-through ml-2">${product.labeledPrice}</span>
        )}
      </div>
      <button className="w-full bg-pink-500 text-white py-2 px-4 rounded mt-2 hover:bg-pink-600">
        Add to Cart
      </button>
    </Link>
  );
}
