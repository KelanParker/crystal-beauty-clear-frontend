import { useState, useEffect, useRef } from "react";
import { BsSearch, BsCart3, BsPersonCircle, BsGear, BsBoxArrowRight, BsPerson, BsShield, BsImage } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import getCart from "../../../utils/cart";
import { CRYSTAL_BEAUTY_IMAGES } from "../../../utils/supabaseStorage";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Load current user and check authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("currentUser");
    if (user && token) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Update cart count
  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(count);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setIsUserDropdownOpen(false);
    navigate("/login");
  };

  const handleSwitchAccount = () => {
    setIsUserDropdownOpen(false);
    navigate("/login?switch=true");
  };

  const handleSettings = () => {
    setIsUserDropdownOpen(false);
    navigate("/settings");
  };

  const handleDeveloperPanel = () => {
    setIsUserDropdownOpen(false);
    navigate("/developer");
  };

  const handleAdminPanel = () => {
    setIsUserDropdownOpen(false);
    navigate("/admin");
  };

  // Check if user is developer/owner
  const isDeveloper = currentUser?.role === 'developer' || currentUser?.role === 'owner';
  const isAdmin = currentUser?.role === 'admin' || isDeveloper;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-pink-100' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src={CRYSTAL_BEAUTY_IMAGES.branding.logo} 
                alt="Crystal Beauty Clear" 
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Crystal Beauty Clear
                </h1>
                <p className="text-xs text-gray-500">Professional Skincare</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 group ${
                  location.pathname === item.href
                    ? 'text-pink-600'
                    : 'text-gray-700 hover:text-pink-600'
                }`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-600 to-purple-600 transform transition-transform duration-200 ${
                  location.pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            
            {/* Search */}
            <div className="relative">
              {!isSearchOpen ? (
                <button
                  onClick={toggleSearch}
                  className="p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200 hover:bg-pink-50 rounded-full"
                  aria-label="Search products"
                >
                  <FaSearch className="w-5 h-5" />
                </button>
              ) : (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-48 px-4 py-2 text-sm border border-pink-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={toggleSearch}
                    className="ml-2 p-2 text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200 hover:bg-pink-50 rounded-full group"
            >
              <BsCart3 className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* User Account */}
            <div className="relative" ref={dropdownRef}>
              {currentUser ? (
                <button
                  onClick={toggleUserDropdown}
                  className="flex items-center space-x-2 p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200 hover:bg-pink-50 rounded-full group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {currentUser.name?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                  </div>
                  <span className="hidden sm:block text-sm font-medium">
                    {currentUser.name || 'User'}
                  </span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full hover:from-pink-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                >
                  <BsPersonCircle className="w-5 h-5" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
              )}

              {/* User Dropdown Menu */}
              {isUserDropdownOpen && currentUser && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                  
                  {/* User Info Header */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-lg font-semibold">
                        {currentUser.name?.charAt(0) || currentUser.email?.charAt(0) || 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {currentUser.name || 'User'}
                        </p>
                        <p className="text-xs text-gray-500">{currentUser.email}</p>
                        {currentUser.role && (
                          <span className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${
                            currentUser.role === 'developer' || currentUser.role === 'owner'
                              ? 'bg-purple-100 text-purple-700'
                              : currentUser.role === 'admin'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {currentUser.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-1">
                    <button
                      onClick={handleSettings}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150"
                    >
                      <BsGear className="w-4 h-4 mr-3" />
                      Account Settings
                    </button>

                    <button
                      onClick={handleSwitchAccount}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors duration-150"
                    >
                      <BsPerson className="w-4 h-4 mr-3" />
                      Switch Account
                    </button>

                    {isAdmin && (
                      <button
                        onClick={handleAdminPanel}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-150"
                      >
                        <BsShield className="w-4 h-4 mr-3" />
                        Admin Panel
                      </button>
                    )}

                    {isDeveloper && (
                      <button
                        onClick={handleDeveloperPanel}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-150"
                      >
                        <BsImage className="w-4 h-4 mr-3" />
                        Developer Panel
                      </button>
                    )}
                  </div>

                  {/* Logout */}
                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                    >
                      <BsBoxArrowRight className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-pink-600 transition-colors duration-200 hover:bg-pink-50 rounded-full"
            >
              {isMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-pink-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    location.pathname === item.href
                      ? 'bg-pink-50 text-pink-600'
                      : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Mobile User Actions */}
              {!currentUser && (
                <Link
                  to="/login"
                  className="block px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-200"
                >
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
