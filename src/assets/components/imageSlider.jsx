import { useState } from "react";
import { getOptimizedImageUrl, buildSrcSet } from '../../../utils/supabaseStorage';

export function ImageSlider(props) {
  // Normalize images to an array
  const images = Array.isArray(props.images) ? props.images : [];
  const [activeImage, setActiveImage] = useState(images.length > 0 ? images[0] : null);

  if (images.length === 0) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-gray-500">No images available</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-start">
      {/* Main image */}
      <div
        className="w-[70%] aspect-square overflow-hidden relative rounded-xs leading-[0]"
        style={{ clipPath: 'inset(0 0 2% 0)' }}
      >
        <img
          src={getOptimizedImageUrl(activeImage, { width: 800, height: 800, quality: 75 })}
          srcSet={buildSrcSet(activeImage, [320, 480, 640, 800, 960], { quality: 65 })}
          sizes="(max-width: 768px) 90vw, 50vw"
          alt="Product"
          className="w-full h-full object-cover select-none"
          draggable={false}
          style={{
            transform: 'translateY(-2%) scale(1.08)',
            transformOrigin: 'top center',
            objectPosition: 'center 8%'
          }}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center";
          }}
        />
      </div>

      {/* Thumbnails below the main image */}
      {images.length > 1 && (
        <div className="w-[70%] mt-4 flex justify-center items-center gap-2 flex-wrap">
          {images.map((image, index) => (
            <img
              key={index}
              src={getOptimizedImageUrl(image, { width: 128, height: 128, quality: 60 })}
              srcSet={buildSrcSet(image, [64, 96, 128, 160], { quality: 55 })}
              sizes="64px"
              alt={`Thumbnail ${index + 1}`}
              className={`w-16 h-16 object-cover rounded-xs border-2 shadow-sm cursor-pointer ${
                activeImage === image ? "border-gray-400" : "border-transparent"
              }`}
              onClick={() => setActiveImage(image)}
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=64&h=64&fit=crop&crop=center";
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}