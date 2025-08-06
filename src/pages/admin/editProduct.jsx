import axios from "../../../utils/axiosInstance"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import mediaUpload from "../../../utils/mediaUpload";

export default function EditProductForm() {
    const [productID, setProductID] = useState("");
    const [name, setName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [price, setPrice] = useState("");
    const [labeledPrice, setLabeledPrice] = useState("");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("");
    const [images, setImages] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();
    const { id } = useParams(); // Get product ID from URL params

    // Fetch existing product data
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
                    {
                        headers: {
                            Authorization: "Bearer " + token
                        }
                    }
                );
                
                const product = res.data;
                console.log("Loaded product data:", product); // Debug log
                
                // Pre-fill form fields
                setProductID(product.productID || product.productId || product._id || "");
                setName(product.name || "");
                setAlternativeNames(product.alternativeNames ? product.alternativeNames.join(", ") : "");
                setPrice(product.price?.toString() || "");
                setLabeledPrice(product.labeledPrice?.toString() || "");
                setDescription(product.description || "");
                setStock(product.stock?.toString() || "");
                setExistingImages(product.imageUrl || []);
                
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch product", error);
                console.error("Error response:", error?.response?.data);
                console.error("Error status:", error?.response?.status);
                
                const errorMsg = error?.response?.data?.message || error?.response?.data || "Failed to load product data";
                toast.error(errorMsg);
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    async function handleUpdateProduct() {
        if (!name || !price || !labeledPrice || !stock) {
            toast.error("Please fill in all required fields.");
            return;
        }

        let imageUrls = existingImages; // Keep existing images by default

        // If new images are uploaded, upload them and replace existing ones
        if (images.length > 0) {
            try {
                toast.loading("Uploading images...");
                
                const uploadPromises = images.map((img) => mediaUpload(img));
                const uploadedUrls = await Promise.all(uploadPromises);
                
                imageUrls = uploadedUrls;
                
                toast.dismiss();
                toast.success("Images uploaded!");
            } catch (err) {
                toast.dismiss();
                toast.error("Image upload failed");
                console.error(err);
                return;
            }
        }

        const productData = {
            productID,
            name,
            alternativeNames: alternativeNames.split(",").map(name => name.trim()),
            category: "Skin Care",
            brand: "Radiance Haven",
            price: parseFloat(price),
            labeledPrice: parseFloat(labeledPrice),
            quantity: 10,
            stock: parseInt(stock, 10),
            isAvailable: true,
            rating: 4.5,
            description,
            imageUrl: imageUrls
        };

        const token = localStorage.getItem("token");
        console.log("Updated Product Data:", productData);

        try {
            const res = await axios.put(
                `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
                productData,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );
            toast.success("Product updated successfully!");
            console.log(res);
            navigate("/admin/products");
        } catch (error) {
            console.error("Failed to update product", error?.response?.data || error.message);
            toast.error("Product update failed");
        }
    }

    if (loading) {
        return (
            <div className="w-full h-full rounded-2xl flex items-center justify-center p-4">
                <div className="text-xl">Loading product data...</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full rounded-2xl flex items-center justify-center p-4">
            <div className="w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col items-center p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h1>
                
                <input
                    value={productID}
                    readOnly
                    disabled
                    className="w-[400px] h-[50px] border border-gray-300 rounded-2xl text-center m-[5px] bg-gray-100 text-gray-600 cursor-not-allowed" 
                    placeholder="Product ID" 
                />
                
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                    placeholder="Product Name" 
                />
                
                <input
                    value={alternativeNames}
                    onChange={(e) => setAlternativeNames(e.target.value)}
                    className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                    placeholder="Alternative Names"
                />
                
                <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                    placeholder="Price"
                    type="number"
                />
                
                <input
                    value={labeledPrice}
                    onChange={(e) => setLabeledPrice(e.target.value)}
                    className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                    placeholder="Labeled Price"
                    type="number"
                />
                
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-[400px] h-[100px] border border-gray-400 rounded-2xl text-center m-[5px]"
                    placeholder="Description"
                />

                {/* Show existing images */}
                {existingImages.length > 0 && !images.length && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        <img
                            src={existingImages[0]}
                            alt="Current product image"
                            className="w-[100px] h-[100px] object-cover rounded-lg"
                        />
                        <span className="text-sm text-gray-600 self-center">Current image</span>
                    </div>
                )}
                
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        if (e.target.files) {
                            setImages(Array.from(e.target.files));
                        }
                    }}
                    className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                    placeholder="New Product Images"
                />

                {/* Show preview of new images */}
                {images.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        <img
                            src={URL.createObjectURL(images[0])}
                            alt="New image preview"
                            className="w-[100px] h-[100px] object-cover rounded-lg"
                        />
                        <span className="text-sm text-gray-600 self-center">New image preview</span>
                    </div>
                )}

                <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-[400px] h-[50px] border border-gray-400 rounded-2xl text-center m-[5px]"
                    placeholder="Stock"
                    type="number"
                />
                
                <div className="w-[400px] h-[100px] flex items-center justify-between">
                    <Link 
                        to="/admin/products" 
                        className="bg-red-500 text-white px-4 py-2 w-[170px] text-center rounded-lg mt-4 hover:bg-red-700"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={handleUpdateProduct}
                        className="bg-blue-500 text-white px-4 py-2 w-[170px] text-center rounded-lg mt-4 ml-4 hover:bg-blue-700 cursor-pointer"
                    >
                        Update Product
                    </button>
                </div>
            </div>
        </div>
    );
}