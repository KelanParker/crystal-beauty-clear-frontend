import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authenticateUser, mockUsers, setCurrentUser } from '../../utils/auth';
import { BsEye, BsEyeSlash, BsPersonCircle, BsShield, BsGear } from 'react-icons/bs';
import { CRYSTAL_BEAUTY_IMAGES } from '../../../utils/supabaseStorage';

export default function EnhancedLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAccountSwitcher, setShowAccountSwitcher] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    // Check if user wants to switch accounts
    if (searchParams.get('switch') === 'true') {
      setShowAccountSwitcher(true);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login logic
        const result = authenticateUser(formData.email, formData.password);
        
        if (result.success) {
          navigate('/');
        } else {
          setError(result.error);
        }
      } else {
        // Registration logic (mock)
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        
        // Mock registration success
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          role: 'user',
          joinDate: new Date().toISOString().split('T')[0]
        };
        
        setCurrentUser(newUser);
        navigate('/');
      }
  } catch {
      setError('An error occurred. Please try again.');
    }
    
    setIsLoading(false);
  };

  const handleQuickLogin = (user) => {
    setCurrentUser(user);
    navigate('/');
  };

  const demoAccounts = mockUsers.map(user => ({
    ...user,
    description: {
      'owner': 'Full access to all features including developer panel',
      'developer': 'Access to developer tools and site management',
      'admin': 'Administrative access to orders and products',
      'user': 'Standard customer account with shopping features'
    }[user.role]
  }));

  if (showAccountSwitcher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Account</h2>
            <p className="text-gray-600">Select an account to continue with</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {demoAccounts.map((user) => (
              <div
                key={user.id}
                onClick={() => handleQuickLogin(user)}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 cursor-pointer transform hover:scale-105 transition-all duration-200 hover:shadow-2xl group"
              >
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-200">
                    {user.name.charAt(0)}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                  
                  <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium mb-3 ${
                    user.role === 'owner' || user.role === 'developer'
                      ? 'bg-purple-100 text-purple-700'
                      : user.role === 'admin'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {user.role.toUpperCase()}
                  </span>
                  
                  <p className="text-xs text-gray-500 leading-relaxed">{user.description}</p>
                  
                  <div className="mt-4 flex justify-center">
                    {user.role === 'owner' || user.role === 'developer' ? (
                      <BsShield className="w-5 h-5 text-purple-500" />
                    ) : user.role === 'admin' ? (
                      <BsGear className="w-5 h-5 text-blue-500" />
                    ) : (
                      <BsPersonCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => setShowAccountSwitcher(false)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to login form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Logo and Header */}
        <div className="text-center">
          <img
            className="mx-auto h-16 w-auto"
            src={CRYSTAL_BEAUTY_IMAGES.branding.logo}
            alt="ELIORE"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isLogin ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Join our beauty community'}
          </p>
        </div>

        {/* Demo Account Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <BsShield className="w-5 h-5 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-blue-700 font-medium">Demo Mode</p>
              <p className="text-xs text-blue-600">
                Use password "password123" or{' '}
                <button
                  onClick={() => setShowAccountSwitcher(true)}
                  className="underline hover:text-blue-800"
                >
                  quick login
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <BsEyeSlash className="w-5 h-5" /> : <BsEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required={!isLogin}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Confirm your password"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-pink-600 hover:text-pink-700 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>

          {isLogin && (
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          )}
        </form>

        {/* Quick Demo Login */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickLogin(mockUsers.find(u => u.role === 'owner'))}
              className="px-3 py-2 text-xs border border-purple-200 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Owner Demo
            </button>
            <button
              onClick={() => handleQuickLogin(mockUsers.find(u => u.role === 'user'))}
              className="px-3 py-2 text-xs border border-green-200 text-green-700 rounded-lg hover:bg-green-50 transition-colors"
            >
              Customer Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
