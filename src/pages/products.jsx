import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + '/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    }, []);

    return (
        <div className="w-full h-full rounded-2xl p-4 relative">
            <Link to="/admin/addProduct" className="text-white bg-gray-700 p-2.5 rounded-full text-2xl cursor-pointer hover:bg-gray-300 hover:text-gray-700 absolute bottom-4 right-4">
                <FaPlus />
            </Link>
            <table className="w-full table-auto border-collapse shadow-md rounded-lg overflow-hidden">
                <thead>
                    <tr className="text-center bg-gray-200">
                        <th className="px-4 py-2">Product ID</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Labeled Price</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.productID || product._id || index} className="text-center border-t cursor-pointer hover:bg-gray-600 hover:text-white">
                            <td className="px-4 py-2">{product.productID || product.productId || "N/A"}</td>
                            <td className="px-4 py-2">{product.name}</td>
                            <td className="px-4 py-2">{product.labledPrice}</td>
                            <td className="px-4 py-2">{product.price}</td>
                            <td className="px-4 py-2">{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
