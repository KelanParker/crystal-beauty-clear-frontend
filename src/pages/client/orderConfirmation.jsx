import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { FaCheckCircle, FaBox, FaTruck, FaCalendarAlt, FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';

export default function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const orderDetails = location.state?.orderDetails;

    useEffect(() => {
        if (!orderDetails) {
            toast.error('No order details found');
            navigate('/cart');
        }
    }, [orderDetails, navigate]);

    if (!orderDetails) {
        return null;
    }

    const { items, total, shippingInfo, orderNumber, shippingCost = 0, tax = 0 } = orderDetails;
    const orderDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);
    const deliveryDate = estimatedDelivery.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
            <div className="max-w-4xl mx-auto p-4">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                        <FaCheckCircle className="text-4xl text-green-500" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
                    <p className="text-lg text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
                </div>

                {/* Order Details Card */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">Order #{orderNumber}</h2>
                                <div className="flex items-center gap-2">
                                    <FaCalendarAlt className="text-pink-200" />
                                    <span>Order Date: {orderDate}</span>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0 text-right">
                                <div className="text-3xl font-bold">LKR {total.toFixed(2)}</div>
                                <div className="text-pink-200">Total Amount</div>
                            </div>
                        </div>
                    </div>

                    {/* Order Status */}
                    <div className="p-6 border-b">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FaTruck className="text-blue-500" />
                            Order Status
                        </h3>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                <span className="font-semibold text-green-600">Order Confirmed</span>
                            </div>
                            <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                <span className="text-gray-500">Processing</span>
                            </div>
                            <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                <span className="text-gray-500">Shipped</span>
                            </div>
                            <div className="flex-1 h-1 bg-gray-200 rounded"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                                <span className="text-gray-500">Delivered</span>
                            </div>
                        </div>
                        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2">
                                <FaCalendarAlt className="text-blue-500" />
                                <span className="font-semibold">Estimated Delivery: {deliveryDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 border-b">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FaBox className="text-orange-500" />
                            Order Items ({items.length})
                        </h3>
                        <div className="space-y-4">
                            {items.map((item, idx) => (
                                <div key={item.productID || idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <img 
                                        src={Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl} 
                                        alt={item.name} 
                                        className="w-16 h-16 object-cover rounded-lg" 
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold text-lg">{item.name}</div>
                                        <div className="text-gray-600">Quantity: {item.quantity}</div>
                                        <div className="text-gray-600">Unit Price: LKR {(item.labeledPrice || item.price).toFixed(2)}</div>
                                        {item.labeledPrice && item.labeledPrice > item.price && (
                                            <div className="text-green-600 text-sm">Discount: -LKR {((item.labeledPrice - item.price) * item.quantity).toFixed(2)}</div>
                                        )}
                                    </div>
                                    <div className="text-right">
                                        <div className="font-bold text-lg">LKR {(item.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="p-6 border-b">
                        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>LKR {items.reduce((sum, item) => sum + ((item.labeledPrice || item.price) * item.quantity), 0).toFixed(2)}</span>
                            </div>
                            {items.some(item => item.labeledPrice && item.labeledPrice > item.price) && (
                                <div className="flex justify-between text-green-600">
                                    <span>Total Discount:</span>
                                    <span>-LKR {items.reduce((sum, item) => {
                                        if (item.labeledPrice && item.labeledPrice > item.price) {
                                            return sum + ((item.labeledPrice - item.price) * item.quantity);
                                        }
                                        return sum;
                                    }, 0).toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>{shippingCost > 0 ? `LKR ${shippingCost.toFixed(2)}` : 'Free'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (VAT 15%):</span>
                                <span>LKR {tax.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between text-xl font-bold">
                                    <span>Total:</span>
                                    <span>LKR {total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <FaMapMarkerAlt className="text-red-500" />
                            Shipping Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <FaUser className="text-gray-400" />
                                    <span className="font-semibold">{shippingInfo.firstName} {shippingInfo.lastName}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaPhone className="text-gray-400" />
                                    <span>{shippingInfo.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <FaEnvelope className="text-gray-400" />
                                    <span>{shippingInfo.email}</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="font-semibold text-gray-700">Delivery Address:</div>
                                <div className="text-gray-600">
                                    {shippingInfo.address}<br />
                                    {shippingInfo.city}, {shippingInfo.province}<br />
                                    {shippingInfo.postalCode}<br />
                                    {shippingInfo.country}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate('/products')}
                        className="px-8 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-300 font-semibold"
                    >
                        Continue Shopping
                    </button>
                    <button
                        onClick={() => navigate('/')}
                        className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-300 font-semibold"
                    >
                        Back to Home
                    </button>
                    <button
                        onClick={() => window.print()}
                        className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 font-semibold"
                    >
                        Print Order
                    </button>
                </div>

                {/* Additional Information */}
                <div className="mt-8 text-center">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <h4 className="font-bold text-lg mb-2">What's Next?</h4>
                        <p className="text-gray-600 mb-4">
                            You will receive an email confirmation shortly. We'll also send you tracking information once your order ships.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                    <FaBox className="text-blue-500" />
                                </div>
                                <div className="font-semibold">Order Processing</div>
                                <div className="text-gray-500">1-2 business days</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                                    <FaTruck className="text-yellow-500" />
                                </div>
                                <div className="font-semibold">Shipping</div>
                                <div className="text-gray-500">5-7 business days</div>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                    <FaCheckCircle className="text-green-500" />
                                </div>
                                <div className="font-semibold">Delivery</div>
                                <div className="text-gray-500">At your doorstep</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
