import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { CRYSTAL_BEAUTY_IMAGES } from '../../../utils/supabaseStorage';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactInfo = [
        {
            icon: <FaPhone className="text-2xl text-pink-500" />,
            title: "Phone",
            details: ["+94 11 234 5678", "+94 77 123 4567"],
            description: "Call us for immediate assistance"
        },
        {
            icon: <FaEnvelope className="text-2xl text-pink-500" />,
            title: "Email",
            details: ["hello@crystalbeautyclear.lk", "support@crystalbeautyclear.lk"],
            description: "Send us an email anytime"
        },
        {
            icon: <FaMapMarkerAlt className="text-2xl text-pink-500" />,
            title: "Address",
            details: ["123 Beauty Street", "Colombo 03, Sri Lanka"],
            description: "Visit our physical store"
        },
        {
            icon: <FaClock className="text-2xl text-pink-500" />,
            title: "Business Hours",
            details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sunday: 10:00 AM - 6:00 PM"],
            description: "We're here when you need us"
        }
    ];

    const socialMedia = [
        { icon: <FaFacebookF />, name: "Facebook", color: "bg-blue-600", link: "#" },
        { icon: <FaInstagram />, name: "Instagram", color: "bg-pink-600", link: "#" },
        { icon: <FaTwitter />, name: "Twitter", color: "bg-blue-400", link: "#" },
        { icon: <FaWhatsapp />, name: "WhatsApp", color: "bg-green-600", link: "#" }
    ];

    const faqs = [
        {
            question: "What is your return policy?",
            answer: "We offer a 30-day return policy for unopened products in original packaging. Please contact us for return instructions."
        },
        {
            question: "Do you offer free shipping?",
            answer: "Yes! We offer free shipping on orders over LKR 5,000 within Colombo. Island-wide delivery charges apply for other areas."
        },
        {
            question: "How long does delivery take?",
            answer: "Delivery within Colombo takes 1-2 business days. Other areas in Sri Lanka typically take 3-5 business days."
        },
        {
            question: "Are your products authentic?",
            answer: "Absolutely! We only sell 100% authentic products sourced directly from authorized distributors and manufacturers."
        }
    ];

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Here you would typically send the form data to your backend
            console.log('Form submitted:', formData);
            
            toast.success('Message sent successfully! We\'ll get back to you soon.');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: ''
            });
        } catch {
            toast.error('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-pink-100 to-purple-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We'd love to hear from you! Whether you have questions about our products, 
                        need beauty advice, or want to share feedback, we're here to help.
                    </p>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="text-center bg-gray-50 p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300">
                                <div className="flex justify-center mb-4">
                                    {info.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {info.title}
                                </h3>
                                <div className="space-y-1 mb-3">
                                    {info.details.map((detail, idx) => (
                                        <p key={idx} className="text-gray-600 font-medium">
                                            {detail}
                                        </p>
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500">
                                    {info.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Map */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                Send us a Message
                            </h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                            placeholder="+94 77 123 4567"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="product-inquiry">Product Inquiry</option>
                                            <option value="order-support">Order Support</option>
                                            <option value="returns">Returns & Exchanges</option>
                                            <option value="beauty-advice">Beauty Advice</option>
                                            <option value="partnership">Business Partnership</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                                        placeholder="Tell us how we can help you..."
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-pink-500 text-white py-4 px-6 rounded-lg hover:bg-pink-600 transition-colors duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Map & Additional Info */}
                        <div className="space-y-8">
                            {/* Store Photos - USING SUPABASE IMAGES */}
                            {/* Images stored in: supabase/crystal-beauty-images/office/ */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    Our Beautiful Store
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                    <img 
                                        src={CRYSTAL_BEAUTY_IMAGES.office.reception} 
                                        alt="Modern beauty salon reception" 
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                    <img 
                                        src={CRYSTAL_BEAUTY_IMAGES.office.display} 
                                        alt="Product display showcase" 
                                        className="w-full h-32 object-cover rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* Map Placeholder */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    Visit Our Store
                                </h3>
                                <div className="bg-gray-200 h-64 rounded-2xl flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <FaMapMarkerAlt className="text-4xl mx-auto mb-2" />
                                        <p>Interactive Map</p>
                                        <p className="text-sm">123 Beauty Street, Colombo 03</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                                    Follow Us
                                </h3>
                                <div className="flex space-x-4">
                                    {socialMedia.map((social, index) => (
                                        <a
                                            key={index}
                                            href={social.link}
                                            className={`w-12 h-12 ${social.color} text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300`}
                                            title={social.name}
                                        >
                                            {social.icon}
                                        </a>
                                    ))}
                                </div>
                                <p className="text-gray-600 mt-4">
                                    Stay connected for beauty tips, product updates, and exclusive offers!
                                </p>
                            </div>

                            {/* Quick Support */}
                            <div className="bg-pink-50 p-6 rounded-2xl">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
                                    Need Immediate Help?
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    For urgent inquiries, contact us directly:
                                </p>
                                <div className="space-y-2">
                                    <a href="tel:+94112345678" className="flex items-center space-x-3 text-pink-600 hover:text-pink-800">
                                        <FaPhone />
                                        <span>+94 11 234 5678</span>
                                    </a>
                                    <a href="https://wa.me/94771234567" className="flex items-center space-x-3 text-green-600 hover:text-green-800">
                                        <FaWhatsapp />
                                        <span>WhatsApp Chat</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Quick answers to common questions
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600">
                                    {faq.answer}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Can't find what you're looking for?{' '}
                            <a href="#contact-form" className="text-pink-600 hover:text-pink-800 font-medium">
                                Send us a message
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
