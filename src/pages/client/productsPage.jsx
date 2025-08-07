import { useEffect, useState } from "react";
import axios from "axios"; // Using regular axios instead of the instance with auth
import Loader from "../../assets/components/loader";
import ProductCard from "../../assets/components/productCard";

export default function ProductsPage() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        console.log("Attempting to fetch products from:", import.meta.env.VITE_BACKEND_URL);
        
        // Use regular axios without authentication for public products endpoint
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
            .then((response) => {
                console.log("Full response:", response);
                console.log("Response status:", response.status);
                console.log("Products received:", response.data);
                
                // Handle different response structures
                const products = response.data.products || response.data.data || response.data;
                console.log("Processed products:", products);
                
                // Debug each product's image structure
                if (Array.isArray(products)) {
                    products.forEach((product, index) => {
                        console.log(`Product ${index + 1} (${product.name}) images:`, {
                            images: product.images,
                            image: product.image,
                            imageUrl: product.imageUrl
                        });
                    });
                }
                
                setProductList(Array.isArray(products) ? products : []);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                console.error("Error details:", error.response?.data);
                console.error("Error status:", error.response?.status);
                console.error("Backend URL:", import.meta.env.VITE_BACKEND_URL);
                setLoading(false);
            });
    }, []);
    
    return (
        <div className="w-full h-full p-4">
            {loading ? (
                <Loader />
            ) : (
                <div className="flex flex-wrap gap-4 justify-center">
                    {productList.length > 0 ? (
                        productList.map((product) => (
                            <ProductCard 
                                key={product._id || product.id}
                                product={product}
                            />
                        ))
                    ) : (
                        <p className="col-span-3 text-center text-lg">No products found</p>
                    )}
                </div>
            )}
        </div>
    );
}
