// src/pages/AdminProductsPage.jsx
import axios from "../../utils/axiosInstance"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);

    // Fetch all products
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error.response?.data || error.message);
            toast.error("Failed to load products");
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Delete a product
    const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No token found. Please login.');
      return;
    }

    await axios.delete(import.meta.env.VITE_BACKEND_URL + `/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    alert('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Failed to delete product');
  }
};


    return (
        <div className="w-full h-full rounded-2xl p-4 relative">
            {/* Add Product Button */}
            <Link
                to="/admin/addProduct"
                className="text-white bg-gray-700 p-3 rounded-full text-2xl cursor-pointer hover:bg-gray-300 hover:text-gray-700 absolute bottom-4 right-4 shadow-lg"
            >
                <FaPlus />
            </Link>

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
                                className="text-center border-t cursor-pointer hover:bg-gray-100"
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
                                            className="text-[20px] text-red-500 hover:text-red-700 cursor-pointer"
                                            title="Delete"
                                        />
                                        <Link to={`/admin/editProduct/${product._id}`}>
                                            <GrEdit
                                                className="text-[20px] text-green-500 hover:text-green-700 cursor-pointer"
                                                title="Edit"
                                            />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
