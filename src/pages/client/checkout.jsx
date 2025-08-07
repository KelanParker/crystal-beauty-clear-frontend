import getCart from '../../../utils/cart';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    
    // Shipping Information
    const [shippingInfo, setShippingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        country: 'Sri Lanka'
    });

    // Payment Information
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    });

    useEffect(() => {
        const cartItems = location.state?.items || getCart();
        const isBuyNow = location.state?.isBuyNow || false;
        
        if (cartItems.length === 0) {
            toast.error('Your cart is empty');
            navigate('/cart');
            return;
        }
        setCart(cartItems);
        
        // If it's a Buy Now purchase, don't redirect to cart on empty
        if (isBuyNow && cartItems.length > 0) {
            // Buy Now items are passed directly, no need to check regular cart
            console.log("Buy Now checkout with items:", cartItems);
        }
    }, [location.state, navigate]);

    // Calculate total price and total discount
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalDiscount = cart.reduce((sum, item) => {
        if (item.labeledPrice && item.labeledPrice > item.price) {
            return sum + ((item.labeledPrice - item.price) * item.quantity);
        }
        return sum;
    }, 0);

    const shippingCost = total > 25000 ? 0 : 2500; // Free shipping over LKR 25,000
    const tax = total * 0.15; // 15% tax (VAT)
    const finalTotal = total + shippingCost + tax;

    const handleShippingChange = (e) => {
        setShippingInfo({
            ...shippingInfo,
            [e.target.name]: e.target.value
        });
    };

    const handlePaymentChange = (e) => {
        setPaymentInfo({
            ...paymentInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        const requiredShippingFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'province', 'postalCode'];
        const requiredPaymentFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
        
        for (let field of requiredShippingFields) {
            if (!shippingInfo[field].trim()) {
                toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }
        
        for (let field of requiredPaymentFields) {
            if (!paymentInfo[field].trim()) {
                toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }

        setLoading(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Only clear cart if it's not a Buy Now purchase
            const isBuyNow = location.state?.isBuyNow || false;
            if (!isBuyNow) {
                localStorage.removeItem('cart');
            }
            
            toast.success('Order placed successfully!');
            navigate('/order-confirmation', {
                state: {
                    orderDetails: {
                        items: cart,
                        total: finalTotal,
                        shippingInfo,
                        orderNumber: 'ORD-' + Date.now(),
                        shippingCost: shippingCost,
                        tax: tax,
                        subtotal: total,
                        totalDiscount: totalDiscount
                    }
                }
            });
        } catch {
            toast.error('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-center text-3xl font-bold mt-4 mb-8">Checkout</h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Side - Forms */}
                    <div className="space-y-6">
                        {/* Shipping Information */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Shipping Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="First Name"
                                    value={shippingInfo.firstName}
                                    onChange={handleShippingChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={shippingInfo.lastName}
                                    onChange={handleShippingChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={shippingInfo.email}
                                    onChange={handleShippingChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone"
                                    value={shippingInfo.phone}
                                    onChange={handleShippingChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={shippingInfo.address}
                                    onChange={handleShippingChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 md:col-span-2"
                                    required
                                />
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="City"
                                    value={shippingInfo.city}
                                    onChange={handleShippingChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="province"
                                    placeholder="Province"
                                    value={shippingInfo.province}
                                    onChange={handleShippingChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="postalCode"
                                    placeholder="Postal Code"
                                    value={shippingInfo.postalCode}
                                    onChange={handleShippingChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                                <select
                                    name="country"
                                    value={shippingInfo.country}
                                    onChange={handleShippingChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                >
                                    <option value="Sri Lanka">Sri Lanka</option>
                                    <option value="India">India</option>
                                    <option value="Maldives">Maldives</option>
                                </select>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    name="cardholderName"
                                    placeholder="Cardholder Name"
                                    value={paymentInfo.cardholderName}
                                    onChange={handlePaymentChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                    required
                                />
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    value={paymentInfo.cardNumber}
                                    onChange={handlePaymentChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                    maxLength="19"
                                    required
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        placeholder="MM/YY"
                                        value={paymentInfo.expiryDate}
                                        onChange={handlePaymentChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                        maxLength="5"
                                        required
                                    />
                                    <input
                                        type="text"
                                        name="cvv"
                                        placeholder="CVV"
                                        value={paymentInfo.cvv}
                                        onChange={handlePaymentChange}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                                        maxLength="4"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Order Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-md h-fit">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        
                        {/* Cart Items */}
                        <div className="space-y-4 mb-6">
                            {cart.map((item, idx) => (
                                <div key={item.productID || idx} className="flex items-center gap-4 border-b pb-4">
                                    <img 
                                        src={Array.isArray(item.imageUrl) ? item.imageUrl[0] : item.imageUrl} 
                                        alt={item.name} 
                                        className="w-16 h-16 object-cover rounded" 
                                    />
                                    <div className="flex-1">
                                        <div className="font-semibold">{item.name}</div>
                                        <div className="text-gray-600">Qty: {item.quantity}</div>
                                        <div className="text-gray-600">LKR {item.price} each</div>
                                    </div>
                                    <div className="font-semibold">LKR {(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>

                        {/* Order Totals */}
                        <div className="space-y-2 border-t pt-4">
                            <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>LKR {(total + totalDiscount).toFixed(2)}</span>
                            </div>
                            {totalDiscount > 0 && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount:</span>
                                    <span>-LKR {totalDiscount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>{shippingCost === 0 ? 'FREE' : `LKR ${shippingCost.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax (VAT):</span>
                                <span>LKR {tax.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold border-t pt-2">
                                <span>Total:</span>
                                <span>LKR {finalTotal.toFixed(2)}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3 mt-6">
                            <button
                                onClick={handleSubmitOrder}
                                disabled={loading}
                                className="w-full bg-pink-500 text-white py-3 px-4 rounded-lg hover:bg-pink-600 disabled:bg-gray-400 transition-colors duration-300 font-semibold"
                            >
                                {loading ? 'Processing...' : `Place Order - LKR ${finalTotal.toFixed(2)}`}
                            </button>
                            <button
                                onClick={() => navigate('/cart')}
                                className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                            >
                                Back to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}