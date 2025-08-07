import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEdit, FaTrash, FaSearch, FaFilter, FaDownload } from "react-icons/fa";

// Order Status Badge Component
function OrderStatusBadge({ status }) {
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'confirmed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'processing':
                return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'shipped':
                return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'delivered':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'refunded':
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
            {status || 'Unknown'}
        </span>
    );
}

// Skeleton Loading Component for Orders Table
function OrdersTableSkeleton() {
    return (
        <>
            {[...Array(8)].map((_, index) => (
                <tr key={index} className="border-t animate-pulse">
                    <td className="px-4 py-4">
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
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
                        <div className="h-4 bg-gray-300 rounded w-24"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                    </td>
                    <td className="px-4 py-4">
                        <div className="flex justify-center items-center gap-2">
                            <div className="h-6 w-6 bg-gray-300 rounded"></div>
                            <div className="h-6 w-6 bg-gray-300 rounded"></div>
                            <div className="h-6 w-6 bg-gray-300 rounded"></div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}

// Order Details Modal Component
function OrderDetailsModal({ order, isOpen, onClose, onStatusUpdate }) {
    const [newStatus, setNewStatus] = useState(order?.status || '');

    const statusOptions = [
        'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'
    ];

    const handleStatusUpdate = async () => {
        try {
            // Simulate API call to update order status
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            onStatusUpdate(order.orderNumber, newStatus);
            toast.success('Order status updated successfully!');
            onClose();
        } catch (err) {
            console.error('Failed to update order status:', err);
            toast.error('Failed to update order status');
        }
    };

    if (!isOpen || !order) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Order Details - {order.orderNumber}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Order Information */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg mb-3">Order Information</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Order Number:</span> {order.orderNumber}</p>
                                <p><span className="font-medium">Date:</span> {order.date}</p>
                                <p><span className="font-medium">Total:</span> LKR {order.total.toFixed(2)}</p>
                                <p><span className="font-medium">Items:</span> {order.items} item(s)</p>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">Status:</span>
                                    <OrderStatusBadge status={order.status} />
                                </div>
                            </div>
                        </div>

                        {/* Customer Information */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg mb-3">Customer Information</h3>
                            <div className="space-y-2">
                                <p><span className="font-medium">Name:</span> {order.customerName}</p>
                                <p><span className="font-medium">Email:</span> {order.customerEmail}</p>
                                <p><span className="font-medium">Phone:</span> {order.customerPhone}</p>
                                <p><span className="font-medium">Address:</span> {order.shippingAddress}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg mb-3">Order Items</h3>
                            <div className="space-y-3">
                                {order.orderItems?.map((item, index) => (
                                    <div key={index} className="flex justify-between items-center p-2 bg-white rounded border">
                                        <div>
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">LKR {(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                )) || (
                                    <p className="text-gray-500">No items available</p>
                                )}
                            </div>
                        </div>

                        {/* Update Status */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="font-semibold text-lg mb-3">Update Status</h3>
                            <div className="space-y-3">
                                <select
                                    value={newStatus}
                                    onChange={(e) => setNewStatus(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg"
                                >
                                    {statusOptions.map(status => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleStatusUpdate}
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Update Status
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Generate mock orders data - Remove this when implementing real API
    const generateMockOrders = () => {
        // Return empty array for now - will be replaced with real API calls
        return [];
    };

    // Fetch orders
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            // TODO: Replace with real API call
            // const response = await fetch('/api/orders');
            // const data = await response.json();
            
            // For now, return empty array
            await new Promise(resolve => setTimeout(resolve, 500));
            const mockData = generateMockOrders();
            setOrders(mockData);
        } catch (err) {
            console.error('Failed to fetch orders:', err);
            toast.error('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    // Filter orders based on search term and status
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Handle status update
    const handleStatusUpdate = (orderNumber, newStatus) => {
        setOrders(prevOrders => 
            prevOrders.map(order => 
                order.orderNumber === orderNumber 
                    ? { ...order, status: newStatus }
                    : order
            )
        );
    };

    // Handle order deletion
    const handleDeleteOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));
                setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
                toast.success('Order deleted successfully!');
            } catch (err) {
                console.error('Failed to delete order:', err);
                toast.error('Failed to delete order');
            }
        }
    };

    // Handle view order details
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
        setIsModalOpen(true);
    };

    // Export orders to CSV
    const exportToCSV = () => {
        const headers = ['Order Number', 'Customer Name', 'Email', 'Date', 'Total', 'Items', 'Status'];
        const csvContent = [
            headers.join(','),
            ...filteredOrders.map(order => [
                order.orderNumber,
                order.customerName,
                order.customerEmail,
                order.date,
                order.total.toFixed(2),
                order.items,
                order.status
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'orders.csv';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success('Orders exported successfully!');
    };

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
                    <p className="text-gray-600 mt-1">Manage and track all customer orders</p>
                </div>
                <button
                    onClick={exportToCSV}
                    className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <FaDownload />
                    Export CSV
                </button>
            </div>

            {/* Filters and Search */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by order number, customer name, or email..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                            <option value="refunded">Refunded</option>
                        </select>
                    </div>

                    {/* Refresh Button */}
                    <button
                        onClick={fetchOrders}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                    <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Pending Orders</h3>
                    <p className="text-2xl font-bold text-yellow-600">
                        {orders.filter(o => o.status === 'pending').length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Delivered Orders</h3>
                    <p className="text-2xl font-bold text-green-600">
                        {orders.filter(o => o.status === 'delivered').length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                    <p className="text-2xl font-bold text-blue-600">
                        LKR {orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Order Number
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Total
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Items
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <OrdersTableSkeleton />
                            ) : filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="px-4 py-8 text-center text-gray-500">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="font-medium text-gray-900">{order.orderNumber}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-gray-900">{order.customerName}</div>
                                            <div className="text-sm text-gray-500">{order.customerEmail}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-900">
                                            {order.date}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">
                                            LKR {order.total.toFixed(2)}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-900">
                                            {order.items}
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <OrderStatusBadge status={order.status} />
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center items-center gap-2">
                                                <button
                                                    onClick={() => handleViewOrder(order)}
                                                    className="text-blue-600 hover:text-blue-800 text-lg"
                                                    title="View Details"
                                                >
                                                    <FaEye />
                                                </button>
                                                <button
                                                    onClick={() => handleViewOrder(order)}
                                                    className="text-green-600 hover:text-green-800 text-lg"
                                                    title="Edit Order"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteOrder(order.id)}
                                                    className="text-red-600 hover:text-red-800 text-lg"
                                                    title="Delete Order"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            <OrderDetailsModal
                order={selectedOrder}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onStatusUpdate={handleStatusUpdate}
            />
        </div>
    );
}
