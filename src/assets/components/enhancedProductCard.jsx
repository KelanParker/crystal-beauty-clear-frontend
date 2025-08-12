import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';
import { CRYSTAL_BEAUTY_IMAGES, getImageWithFallback, getOptimizedImageUrl, buildSrcSet } from '../../../utils/supabaseStorage';

export default function EnhancedProductCard({ product }) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const formatLKR = (value) => {
        const num = Number(value);
        return isFinite(num) ? `LKR ${num.toFixed(2)}` : `LKR ${value}`;
    };

    // Enhanced image getter with fallbacks
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

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        setIsWishlisted(!isWishlisted);
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        // Add to cart logic here
        console.log('Added to cart:', product);
    };

    return (
        <div className="product-card group">
            {/* Image Container with Overlay Effects */}
            <div className="image-overlay relative overflow-hidden">
                {!imageLoaded && (
                    <div className="skeleton w-full h-64 absolute inset-0 z-10"></div>
                )}
                <img
                    src={getOptimizedImageUrl(getProductImage(), { width: 480, height: 480, quality: 70 })}
                    srcSet={buildSrcSet(getProductImage(), [240, 360, 480, 720, 960], { quality: 60 })}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                    alt={product.name}
                    className={`w-full h-64 object-cover object-top transition-all duration-500 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={() => setImageLoaded(true)}
                    loading="lazy"
                />
                
                {/* Discount Badge */}
                {product.labeledPrice > product.price && (
                    <div className="badge-modern absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500">
                        {Math.round((1 - product.price / product.labeledPrice) * 100)}% OFF
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlistToggle}
                    className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 ${
                        isWishlisted 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                >
                    <FaHeart className={`transition-transform ${isWishlisted ? 'scale-110' : ''}`} />
                </button>

                {/* Hover Actions (no dark overlay) */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-4">
                        <Link
                            to={`/overview/${product.productID || product.id}`}
                            className="btn-glass text-white hover:bg-white hover:text-gray-800 pointer-events-auto"
                        >
                            <FaEye />
                            Quick View
                        </Link>
                        <button
                            onClick={handleAddToCart}
                            className="btn-glass text-white hover:bg-white hover:text-gray-800 pointer-events-auto"
                        >
                            <FaShoppingCart />
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Information */}
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gradient transition-all duration-300">
                    {product.name}
                </h3>
                
                {/* Category */}
                {product.category && (
                    <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                )}
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <FaStar 
                                key={i} 
                                className={`transition-colors duration-200 ${
                                    i < Math.floor(product.rating || 4.5) ? 'text-yellow-400' : 'text-gray-300'
                                }`} 
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                        ({product.reviews || Math.floor(Math.random() * 200) + 50} reviews)
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gradient">
                            {formatLKR(product.price)}
                        </span>
                        {product.labeledPrice && product.labeledPrice > product.price && (
                            <span className="text-sm text-gray-500 line-through">
                                {formatLKR(product.labeledPrice)}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Button */}
                <Link
                    to={`/overview/${product.productID || product.id}`}
                    className="btn-primary w-full text-center group magnetic"
                >
                    <span>View Details</span>
                    <div className="ml-2 transition-transform group-hover:translate-x-1">
                        →
                    </div>
                </Link>
            </div>
        </div>
    );
}
