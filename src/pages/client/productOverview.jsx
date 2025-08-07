import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../assets/components/loader";
import { ImageSlider } from "../../assets/components/imageSlider";
import { addToCart } from "../../../utils/cart";

export default function ProductOverview() {
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");
    const [quantity, setQuantity] = useState(1);
    
    console.log("Product ID from URL:", params.id);

    useEffect(() => {
        // Check if we have a valid product ID
        if (!params.id) {
            console.error("No product ID found in URL");
            setStatus("error");
            return;
        }

        if(status === "loading") {
            // Try to find product by productID first, then by MongoDB _id
            const tryFetchProduct = async () => {
                try {
                    // First, get all products and find by productID
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const products = await response.json();
                    console.log("All products:", products);
                    
                    // Find product by productID (like "P0003") or by _id
                    const foundProduct = products.find(p => 
                        p.productID === params.id || 
                        p.productId === params.id || 
                        p._id === params.id
                    );
                    
                    if (foundProduct) {
                        console.log("Product found:", foundProduct);
                        setProduct(foundProduct);
                        setStatus("loaded");
                    } else {
                        console.error("Product not found with ID:", params.id);
                        setStatus("error");
                        toast.error("Product not found");
                    }
                    
                } catch (error) {
                    console.error("Error fetching product:", error);
                    toast.error("Error fetching product: " + error.message);
                    setStatus("error");
                }
            };
            
            tryFetchProduct();
        }
    }, [params.id, status]);

    // Handle redirect after hooks
    if (!params.id) {
        window.location.href = "/products";
        return null;
    }

    
    return (
    <div className="w-full h-screen max-h-screen overflow-y-auto p-4">
      
      {
        status === "loading" && <Loader />
      }
      
      {status === "loaded" && (
          <div className="w-full h-full flex">
            <div className="w-[50%] h-full mx-auto ">
                <ImageSlider images={product.imageUrl || product.images || []} />
            </div>
            <div className="w-[50%] h-full mx-auto ">
                <h1 className="text-2xl font-bold mb-4 text-center">{product.name}{"  |  "}<span className="text-2xl text-gray-500 mb-2">{Array.isArray(product.altNames) && product.altNames.length > 0 ? product.altNames.join(" | ") : "No alternative names available"}</span></h1>
                
                <div className="mb-4">
                    {
                        product.labeledPrice > product.price ? (
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg font-bold text-red-500">LKR {product.price}</span>
                                <span className="line-through text-gray-500">LKR {product.labeledPrice}</span>
                                
                            </div>
                        ) : (
                            <div className="mb-2">
                                <span className="text-lg font-bold text-red-500">LKR {product.price}</span>
                            </div>
                        )}
                </div>
                <div className="flex flex-col gap-2">
                    <h2 className="text-lg text-black">Stock: {product.stock || "N/A"}</h2>
                    <p className="text-gray-700 mb-4">{product.description || "No description available"}</p>
                    <h3 className="text-gray-500">Category: {product.category || "N/A"}</h3>
                    <h3 className="text-gray-500">Product ID: {product.productID || product.productId || "N/A"}</h3>
                    <h3 className="text-gray-500">Brand: {product.brand || "N/A"}</h3>
                </div>
                
                {/* Quantity Selector */}
                <div className="flex items-center gap-4 mb-4">
                    <label className="text-lg font-semibold">Quantity:</label>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                        >
                            -
                        </button>
                        <span className="px-4 py-1 border rounded min-w-[50px] text-center">{quantity}</span>
                        <button 
                            onClick={() => setQuantity(quantity + 1)}
                            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold"
                        >
                            +
                        </button>
                    </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                    <button className="w-[200px] bg-pink-500 text-white py-2 px-4 rounded hover:bg-white hover:text-pink-500
                    hover:border hover:border-pink-500 transition-colors duration-300 cursor-pointer" onClick={() => { 
                        addToCart(product, quantity); 
                        toast.success(`Added ${quantity} item(s) to cart!`); 
                    }}>
                        Add to Cart
                    </button>
                    <button 
                        className="w-[200px] bg-green-500 text-white py-2 px-4 rounded hover:bg-white hover:text-green-500 hover:border hover:border-green-500 transition-colors duration-300 cursor-pointer"
                        onClick={() => {
                            // Create a temporary cart item for direct checkout
                            const buyNowItem = {
                                ...product,
                                quantity: quantity
                            };
                            
                            // Calculate pricing for checkout
                            const itemPrice = product.price * quantity;
                            const shippingCost = itemPrice > 25000 ? 0 : 2500; // Free shipping over LKR 25,000
                            const tax = itemPrice * 0.15; // 15% VAT
                            const finalTotal = itemPrice + shippingCost + tax;
                            
                            // Navigate directly to checkout with this single item
                            navigate('/checkout', {
                                state: {
                                    items: [buyNowItem],
                                    total: finalTotal,
                                    isBuyNow: true
                                }
                            });
                            
                            toast.success("Proceeding to checkout!");
                        }}
                    >
                        Buy Now
                    </button>
                </div>
            </div>
          </div>
      )}
      
      {
        status === "error" && <div className="text-red-500">Error loading product details.</div>
      }
    </div>
  );
}
