import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import { CRYSTAL_BEAUTY_IMAGES } from '../../../utils/supabaseStorage';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  const customerService = [
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Your Order', href: '/track-order' },
    { name: 'Customer Support', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: FaFacebookF, href: 'https://facebook.com/crystalbeautyclear' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/crystalbeautyclear' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/crystalbeautyclear' },
    { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com/crystalbeautyclear' },
    { name: 'LinkedIn', icon: FaLinkedinIn, href: 'https://linkedin.com/company/crystalbeautyclear' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-pink-600">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Stay Beautiful with Our Newsletter
            </h3>
            <p className="text-pink-100 mb-8 max-w-2xl mx-auto">
              Get the latest beauty tips, exclusive offers, and new product announcements 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-pink-400 mb-4">
                ELIORE
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Your trusted partner in beauty and skincare. We bring you the finest 
                cosmetics and beauty products to enhance your natural radiance.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MdLocationOn className="text-pink-400 text-lg" />
                <span className="text-gray-300">123 Beauty Street, Colombo 03, Sri Lanka</span>
              </div>
              <div className="flex items-center space-x-3">
                <MdPhone className="text-pink-400 text-lg" />
                <span className="text-gray-300">+94 11 234 5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MdEmail className="text-pink-400 text-lg" />
                <span className="text-gray-300">info@crystalbeautyclear.lk</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-pink-400">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-pink-400">Customer Service</h3>
            <ul className="space-y-3">
              {customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-pink-400">Legal & Social</h3>
            <ul className="space-y-3 mb-6">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Media Icons */}
            <div>
              <h4 className="text-sm font-semibold mb-4 text-gray-400">Follow Us</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-pink-600 hover:text-white transition-colors duration-200"
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} ELIORE. All rights reserved.
            </div>
            
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-pink-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-pink-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="hover:text-pink-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Secure Payments:</span>
              {/* Payment method icons - USING SUPABASE IMAGES */}
              {/* Icons stored in: supabase/crystal-beauty-images/ecommerce/ */}
              <div className="flex space-x-2">
                <img 
                  src={CRYSTAL_BEAUTY_IMAGES.ecommerce.visa} 
                  alt="Visa" 
                  className="w-8 h-5 object-contain"
                  onError={(e) => {
                    // Fallback to text if image fails
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs items-center justify-center font-bold" style={{display: 'none'}}>
                  VISA
                </div>
                
                <img 
                  src={CRYSTAL_BEAUTY_IMAGES.ecommerce.mastercard} 
                  alt="Mastercard" 
                  className="w-8 h-5 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-8 h-5 bg-red-600 rounded text-white text-xs items-center justify-center font-bold" style={{display: 'none'}}>
                  MC
                </div>
                
                <img 
                  src={CRYSTAL_BEAUTY_IMAGES.ecommerce.paypal} 
                  alt="PayPal" 
                  className="w-8 h-5 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-8 h-5 bg-blue-700 rounded text-white text-xs items-center justify-center font-bold" style={{display: 'none'}}>
                  PP
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center space-x-8 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>Free Shipping Over LKR 5000</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
