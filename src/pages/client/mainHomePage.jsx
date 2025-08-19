import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaShippingFast, FaShieldAlt, FaHeadset, FaArrowRight } from 'react-icons/fa';
import { CRYSTAL_BEAUTY_IMAGES } from '../../../utils/supabaseStorage';

export default function MainHomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hero section data - USING SUPABASE IMAGES
    // Images stored in: supabase/crystal-beauty-images/hero/
    const heroSlides = [
        {
            id: 1,
            title: "Discover Your Natural Beauty",
            subtitle: "Premium cosmetics for the modern woman",
            description: "Enhance your natural radiance with our carefully curated collection of beauty products",
            image: CRYSTAL_BEAUTY_IMAGES.hero.hero1, // Beautiful woman with glowing skin
            ctaText: "Shop Now",
            ctaLink: "/products"
        },
        {
            id: 2,
            title: "Skincare That Loves You Back",
            subtitle: "Gentle formulas, powerful results",
            description: "Transform your skincare routine with products designed for Sri Lankan skin",
            image: CRYSTAL_BEAUTY_IMAGES.hero.hero2, // Elegant woman applying skincare
            ctaText: "Explore Skincare",
            ctaLink: "/products"
        },
        {
            id: 3,
            title: "Makeup That Speaks Your Language",
            subtitle: "Express yourself with confidence",
            description: "From everyday natural looks to glamorous evening styles",
            image: CRYSTAL_BEAUTY_IMAGES.hero.hero3, // Woman in beauty routine
            ctaText: "Shop Makeup",
            ctaLink: "/products"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-slide functionality
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    // Fetch featured products
    useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                // TODO: Replace with real API call
                // const response = await fetch('/api/products/featured');
                // const data = await response.json();
                
                // Mock featured products for now - USING SUPABASE IMAGES
                // Images stored in: supabase/crystal-beauty-images/products/
                const mockProducts = [
                    {
                        id: 1,
                        name: "Radiance Glow Serum",
                        price: 4500,
                        labeledPrice: 5500,
                        image: CRYSTAL_BEAUTY_IMAGES.products.serum, // Vitamin C serum bottle
                        rating: 4.8,
                        reviews: 156
                    },
                    {
                        id: 2,
                        name: "Velvet Matte Lipstick",
                        price: 2200,
                        labeledPrice: 2800,
                        image: CRYSTAL_BEAUTY_IMAGES.products.lipBalm, // Organic lip balm
                        rating: 4.9,
                        reviews: 89
                    },
                    {
                        id: 3,
                        name: "Hydrating Face Mask",
                        price: 1800,
                        labeledPrice: 2200,
                        image: CRYSTAL_BEAUTY_IMAGES.products.faceMask, // Hydrating face mask
                        rating: 4.7,
                        reviews: 203
                    },
                    {
                        id: 4,
                        name: "Crystal Clear Foundation",
                        price: 3200,
                        labeledPrice: 3800,
                        image: CRYSTAL_BEAUTY_IMAGES.products.moisturizer, // Luxury moisturizer jar
                        rating: 4.6,
                        reviews: 127
                    }
                ];
                
                await new Promise(resolve => setTimeout(resolve, 1000));
                setFeaturedProducts(mockProducts);
            } catch (error) {
                console.error('Failed to fetch featured products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    // Categories data - USING SUPABASE IMAGES
    // Images stored in: supabase/crystal-beauty-images/categories/
    const categories = [
        {
            name: "Skincare",
            description: "Nourish and protect your skin",
            image: CRYSTAL_BEAUTY_IMAGES.categories.skincare, // Skincare routine illustration
            link: "/products?category=skincare"
        },
        {
            name: "Makeup",
            description: "Express your unique style",
            image: CRYSTAL_BEAUTY_IMAGES.categories.makeup, // Makeup collection illustration
            link: "/products?category=makeup"
        },
        {
            name: "Body Care",
            description: "Pamper yourself from head to toe",
            image: CRYSTAL_BEAUTY_IMAGES.categories.bodycare, // Body care essentials illustration
            link: "/products?category=bodycare"
        },
        {
            name: "Hair Care",
            description: "Healthy hair, beautiful you",
            image: CRYSTAL_BEAUTY_IMAGES.categories.haircare, // Hair care products illustration
            link: "/products?category=haircare"
        }
    ];

    // Benefits data
    const benefits = [
        {
            icon: <FaShippingFast className="text-3xl text-pink-500" />,
            title: "Free Shipping",
            description: "Free delivery on orders over LKR 5,000"
        },
        {
            icon: <FaShieldAlt className="text-3xl text-pink-500" />,
            title: "Quality Guarantee",
            description: "100% authentic products guaranteed"
        },
        {
            icon: <FaHeadset className="text-3xl text-pink-500" />,
            title: "24/7 Support",
            description: "Customer support whenever you need it"
        }
    ];

    return (
        <div className="w-full">
            {/* Hero Section with Modern Animations */}
            <section className="hero-modern relative h-[100vh] overflow-hidden">
                {/* Floating Background Elements */}
                <div className="floating-bg absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20 floating-element"></div>
                <div className="floating-bg absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-20 floating-element" style={{animationDelay: '2s'}}></div>
                <div className="floating-bg absolute bottom-20 left-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-20 floating-element" style={{animationDelay: '1s'}}></div>
                
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-all duration-1000 ${
                            index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                    >
                        <div className="relative h-full bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center">
                            <div className="container mx-auto px-4 z-10">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    <div className="text-center lg:text-left animate-on-scroll">
                                        <h2 className="text-sm uppercase tracking-wide text-gradient mb-4 hero-animate" style={{animationDelay: '0.2s'}}>
                                            {slide.subtitle}
                                        </h2>
                                        <h1 className="hero-title text-4xl lg:text-7xl font-bold mb-6 leading-tight hero-animate" style={{animationDelay: '0.4s'}}>
                                            {slide.title}
                                        </h1>
                                        <p className="hero-subtitle text-lg text-gray-600 mb-8 max-w-lg hero-animate" style={{animationDelay: '0.6s'}}>
                                            {slide.description}
                                        </p>
                                        <Link
                                            to={slide.ctaLink}
                                            className="btn-primary magnetic hero-animate"
                                            style={{animationDelay: '0.8s'}}
                                        >
                                            <span>{slide.ctaText}</span>
                                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                    <div className="hidden lg:block">
                                        <div className="hero-image relative">
                                            <img
                                                src={slide.image}
                                                alt={slide.title}
                                                className="w-full h-auto max-w-md mx-auto rounded-3xl shadow-2xl hero-animate"
                                                style={{animationDelay: '1s'}}
                                            />
                                            {/* Glowing effect behind image */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl blur-3xl opacity-20 scale-110 glowing-element"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Modern Slide Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                index === currentSlide 
                                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 scale-125' 
                                    : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Enhanced Benefits Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center text-gradient mb-16 animate-on-scroll">
                        Why Choose ELIORE?
                    </h2>
                    <div className="grid-modern">
                        {benefits.map((benefit, index) => (
                            <div key={index} className="card-modern text-center group stagger-child">
                                <div className="flex justify-center mb-6 floating-element">
                                    <div className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                        {benefit.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            Shop by Category
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Discover our carefully curated collections designed to enhance your natural beauty
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category, index) => (
                            <Link
                                key={index}
                                to={category.link}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="aspect-w-4 aspect-h-3">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <div className="absolute bottom-4 left-4 text-white">
                                    <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                                    <p className="text-sm opacity-90">{category.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Enhanced Featured Products Section */}
            <section className="py-20 bg-gradient-to-br from-white to-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-on-scroll">
                        <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
                            Featured Products
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Our most loved products, carefully selected just for you with premium quality and amazing results
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className="card-modern animate-pulse">
                                    <div className="skeleton w-full h-64 rounded-lg mb-4"></div>
                                    <div className="skeleton-text"></div>
                                    <div className="skeleton-text w-2/3"></div>
                                    <div className="skeleton-button mt-4"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid-modern">
                            {featuredProducts.map((product) => (
                                <div key={product.id} className="product-card magnetic stagger-child">
                                    <div className="image-overlay relative">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-64 object-cover"
                                        />
                                        {product.labeledPrice > product.price && (
                                            <div className="badge-modern absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500">
                                                {Math.round((1 - product.price / product.labeledPrice) * 100)}% OFF
                                            </div>
                                        )}
                                        {/* Floating Add to Cart Button */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <button className="btn-glass">
                                                Quick View
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center mb-3">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <FaStar key={i} className={`${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} transition-colors`} />
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600 ml-2">
                                                ({product.reviews} reviews)
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-bold text-gradient">
                                                    LKR {product.price.toFixed(2)}
                                                </span>
                                                {product.labeledPrice > product.price && (
                                                    <span className="text-sm text-gray-500 line-through">
                                                        LKR {product.labeledPrice.toFixed(2)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Link
                                            to={`/overview/${product.id}`}
                                            className="btn-primary w-full text-center magnetic group"
                                        >
                                            <span>View Details</span>
                                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12 animate-on-scroll">
                        <Link
                            to="/products"
                            className="btn-secondary magnetic"
                        >
                            <span>View All Products</span>
                            <FaArrowRight className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Enhanced Newsletter Section */}
            <section className="py-20 bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 relative overflow-hidden">
                {/* Floating Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full floating-element"></div>
                <div className="absolute top-1/2 right-20 w-32 h-32 bg-white opacity-5 rounded-full floating-element" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-20 left-1/3 w-16 h-16 bg-white opacity-10 rounded-full floating-element" style={{animationDelay: '1s'}}></div>
                
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="animate-on-scroll">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                            Stay Beautiful, Stay Updated
                        </h2>
                        <p className="text-xl text-pink-100 mb-12 max-w-3xl mx-auto leading-relaxed">
                            Subscribe to our newsletter for exclusive offers, beauty tips, and the latest product launches delivered to your inbox
                        </p>
                        <div className="form-modern max-w-lg mx-auto">
                            <div className="flex gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="input-modern flex-1"
                                />
                                <button className="btn-glass text-white hover:bg-white hover:text-purple-600">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-pink-100 text-sm mt-4 opacity-80">
                                Join 50,000+ beauty enthusiasts who trust us
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Floating Action Button */}
            <button className="fab" title="Need Help?">
                <FaHeadset />
            </button>
        </div>
    );
}
