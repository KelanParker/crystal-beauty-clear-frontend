import { FaUsers, FaChartBar, FaCog, FaClipboardList, FaBoxOpen } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { Link, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AdminProductsPage from "./admin/products";
import AddProductForm from "./admin/addProduct";
import EditProductForm from "./admin/editProduct";
import { AdminOrdersPage } from "./admin/adminOrders";


export default function AdminPage() {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    // Sync activeLink with route changes (e.g., back/forward buttons)
    setActiveLink(location.pathname);
  }, [location]);

  const isActive = (path) => activeLink === path;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-[300px] h-screen bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
         <nav className="mt-6">
  <Link
    to="/admin"
    className={`flex items-center px-6 py-4 ${
      isActive("/admin") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-50"
    } transition-all duration-200`}
  >
    <FaChartBar className="mr-3" />
    Dashboard
  </Link>
  <Link
    to="/admin/users"
    className={`flex items-center px-6 py-4 ${
      isActive("/admin/users") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-50"
    } transition-all duration-200`}
  >
    <FaUsers className="mr-3" />
    Users
  </Link>
  <Link
    to="/admin/products"
    className={`flex items-center px-6 py-4 ${
      isActive("/admin/products") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-50"
    } transition-all duration-200`}
  >
    <FaClipboardList className="mr-3" />
    Products
  </Link>
  <Link
    to="/admin/settings"
    className={`flex items-center px-6 py-4 ${
      isActive("/admin/settings") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-50"
    } transition-all duration-200`}
  >
    <FaCog className="mr-3" />
    Settings
  </Link>
  <Link
    to="/admin/reports"
    className={`flex items-center px-6 py-4 ${
      isActive("/admin/reports") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-50"
    } transition-all duration-200`}
  >
    <FaClipboardList className="mr-3" />
    Reports
  </Link>
  <Link
    to="/admin/orders"
    className={`flex items-center px-6 py-4 ${
      isActive("/admin/orders") ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-50"
    } transition-all duration-200`}
  >
    <FaBoxOpen className="mr-3" />
    Orders
  </Link>
</nav>

        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 relative">
          {/* Add Product Button - Shows only on products page */}
          {location.pathname === "/admin/products" && (
            <Link
              to="/admin/addProduct"
              className="text-white bg-gray-700 p-3 rounded-full text-2xl cursor-pointer hover:bg-gray-300 hover:text-gray-700 absolute bottom-4 right-4 shadow-lg transition-colors duration-200 z-10"
            >
              <FaPlus />
            </Link>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Admin Dashboard</h1>
                    <p className="text-gray-600">Manage your application from here</p>
                  </div>
                }
              />
              <Route
                path="/users"
                element={
                  <h1 className="text-3xl font-bold text-gray-800">Users Management</h1>
                }
              />
              <Route
                path="/products"
                element={
                  <AdminProductsPage />
                }
              />
              <Route
                path="/orders"
                element={
                  <AdminOrdersPage />
                }
              />
              <Route
                path="/settings"
                element={
                  <h1 className="text-3xl font-bold text-gray-800">Settings Panel</h1>
                }
              />
              <Route
                path="/reports"
                element={
                  <h1 className="text-3xl font-bold text-gray-800">Reports Section</h1>
                }
              />
              <Route
                path="/addProduct"
                element={
                  <AddProductForm />
                }
              />
              <Route path="/products/edit/:id" element={<EditProductForm />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
