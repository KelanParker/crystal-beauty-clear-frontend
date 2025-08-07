import { useState } from "react";

export function ImageSlider(props){
    const images = props.images;
    const [activeImage, setActiveImage] = useState(images && images.length > 0 ? images[0] : null);
    console.log("ImageSlider received images:", images);

    if (!images || images.length === 0) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <div className="text-gray-500">No images available</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[70%] aspect-square overflow-hidden relative rounded-xs">
                {/* Main image display */}
                <img 
                    src={activeImage} 
                    alt="Product" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        console.log("Image failed to load:", e.target.src);
                        e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center';
                    }}
                />
                
                {/* Thumbnail strip at bottom */}
                {images.length > 1 && (
                    <div className="w-full h-[100px] backdrop-blur-xs absolute bottom-0 left-0 z-10 flex justify-center items-center gap-2 p-2">
                        {images.map((image, index) => (
                            <img 
                                key={index} 
                                src={image} 
                                alt={`Thumbnail ${index + 1}`} 
                                className={`w-16 h-16 object-cover rounded-xs border-2 shadow-sm cursor-pointer ${activeImage === image ? 'border-gray-400' : 'border-transparent'}`}
                                onClick={() => setActiveImage(image)}
                                onError={(e) => {
                                    e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=64&h=64&fit=crop&crop=center';
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}