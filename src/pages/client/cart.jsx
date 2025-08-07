import getCart, { removeFromCart, addToCart } from '../../../utils/cart';
import { useState, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCart(getCart());
    }, []);

    const handleRemove = (productID) => {
        removeFromCart(productID);
        setCart(getCart());
    };

    const handleQuantity = (item, delta) => {
        if (delta === 1) {
            addToCart(item, 1);
        } else if (delta === -1) {
            addToCart(item, -1);
        }
        setCart(getCart());
    };

    // Calculate total price and total discount - CORRECTED LOGIC
    const originalTotal = cart.reduce((sum, item) => sum + ((item.labeledPrice || item.price) * item.quantity), 0);
    const totalDiscount = cart.reduce((sum, item) => {
        if (item.labeledPrice && item.labeledPrice > item.price) {
            return sum + ((item.labeledPrice - item.price) * item.quantity);
        }
        return sum;
    }, 0);
    const netTotal = originalTotal - totalDiscount;

    return (
        <div className="w-full h-screen max-h-screen">
            <div className="w-full h-screen-70px max-h-screen-70px overflow-y-auto">
                <h1 className="text-center text-2xl font-bold mt-4">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-center mt-4">Your cart is empty.</p>
                ) : (
                    <>
                    <ul className="max-w-xl mx-auto mt-6">
                        {cart.map((item, idx) => (
                            <li key={item.productID || idx} className="border-b py-4 flex items-center gap-4">
                                <img src={Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                <div className="flex-1 flex flex-col gap-1">
                                    <div className="font-bold text-lg">{item.name}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <button onClick={() => handleQuantity(item, -1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold">-</button>
                                        <span>Qty: {item.quantity}</span>
                                        <button onClick={() => handleQuantity(item, 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-lg font-bold">+</button>
                                    </div>
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-gray-500 text-sm">Unit Price:</span>
                                        <span className="font-semibold text-gray-500">LKR {item.labeledPrice || item.price}</span>
                                    </div>
                                    {item.labeledPrice && item.labeledPrice > item.price && (
                                        <div className="flex justify-between items-center mt-1">
                                            <span className="text-green-600 text-sm">Discount:</span>
                                            <span className="font-semibold text-green-600">- LKR {((item.labeledPrice - item.price) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center mt-1">
                                        <span className="text-gray-700 text-sm">Item Total:</span>
                                        <span className="font-semibold text-black">LKR {(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                </div>
                                <button onClick={() => handleRemove(item.productID)} className="text-red-500 hover:text-red-700 text-xl shadow-md ml-2">
                                    <FaRegTrashAlt />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="max-w-xl mx-auto mt-8 p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between text-lg font-bold mb-2">
                            <span>Total Items:</span>
                            <span>{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
                        </div>
                        <div className="flex justify-between text-md font-semibold mb-2">
                            <span>Total:</span>
                            <span>LKR {originalTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-md font-semibold mb-2">
                            <span>- Discount:</span>
                            <span className="text-green-600">- LKR {totalDiscount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-xl font-bold border-t pt-2 mt-2">
                            <span>Net Total:</span>
                            <span>LKR {netTotal.toFixed(2)}</span>
                        </div>
                        <div className="mt-4 ">
                            <button onClick={() => navigate("/checkout",{
                                state: { items: cart, total: netTotal, totalDiscount }
                            })} className="w-[300px]  bg-pink-500 text-white py-2 px-4 rounded hover:bg-white hover:text-pink-500
                    hover:border hover:border-pink-500 transition-colors duration-300 cursor-pointer">
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                    </>
                )}
            </div>
        </div>
    );
}