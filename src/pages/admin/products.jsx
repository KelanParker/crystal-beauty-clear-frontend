// src/pages/AdminProductsPage.jsx
import axios from "../../../utils/axiosInstance"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrEdit } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

// Skeleton Loading Component for Product Table
function ProductTableSkeleton() {
    return (
        <>
            {[...Array(5)].map((_, index) => (
                <tr key={index} className="border-t animate-pulse">
                    <td className="px-4 py-4">
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="flex justify-center items-center gap-3">
                            <div className="h-5 w-5 bg-gray-300 rounded"></div>
                            <div className="h-5 w-5 bg-gray-300 rounded"></div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const navigate = useNavigate()

    // Fetch all products
    const fetchProducts = async (isRefresh = false) => {
        try {
            if (isRefresh) {
                setRefreshing(true);
            } else {
                setLoading(true);
            }
            const response = await axios.get(`/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error.response?.data || error.message);
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Delete a product
    const deleteProduct = async (id) => {
        // Add confirmation dialog
        if (!window.confirm('Are you sure you want to delete this product?')) {
            return;
        }

        try {
            // Use axiosInstance which already handles the token
            await axios.delete(`/api/products/${id}`);
            
            toast.success('Product deleted successfully');
            
            // Refresh the products list with skeleton loading
            await fetchProducts(true);
        } catch (error) {
            console.error('Error deleting product:', error);
            const errorMsg = error?.response?.data?.message || 'Failed to delete product';
            toast.error(errorMsg);
        }
    };

    return (
        <div className="w-full h-full rounded-2xl p-4">
            {/* Products Table */}
            <table className="w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="text-center bg-gray-200">
                        <th className="px-4 py-2">Product ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Labeled Price</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Stock</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Show skeleton loading during initial load or refresh */}
                    {(loading || refreshing) && (
                        <ProductTableSkeleton />
                    )}
                    
                    {/* Show actual products when not loading */}
                    {!loading && !refreshing && (
                        <>
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-8 text-gray-500">
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="text-center border-t cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                                    >
                                        <td className="px-4 py-2">{product.productID || product.productId || "N/A"}</td>
                                        <td className="px-4 py-2">{product.name}</td>
                                        <td className="px-4 py-2">{product.labeledPrice ?? product.labledPrice ?? "N/A"}</td>
                                        <td className="px-4 py-2">{product.price}</td>
                                        <td className="px-4 py-2">{product.stock}</td>
                                        <td className="px-4 py-2">
                                            <div className="flex justify-center items-center gap-3">
                                                <FaRegTrashAlt
                                                    onClick={() => deleteProduct(product._id)}
                                                    className="text-[20px] text-red-500 hover:text-red-700 cursor-pointer transition-colors duration-200"
                                                    title="Delete"
                                                />
                                                
                                                <GrEdit
                                                    onClick={()=>{
                                                        navigate(`/admin/products/edit/${product._id}`)
                                                    }}
                                                    className="text-[20px] text-green-500 hover:text-green-700 cursor-pointer transition-colors duration-200"
                                                    title="Edit"
                                                />
                                                
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </>
                    )}
                </tbody>
            </table>
        </div>
    );
}