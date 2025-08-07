import { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaSearch, FaQuestionCircle } from 'react-icons/fa';

export default function FAQPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedItems, setExpandedItems] = useState({});

    const faqCategories = [
        {
            category: "Orders & Shipping",
            icon: "📦",
            questions: [
                {
                    question: "How long does shipping take?",
                    answer: "We offer different shipping options: Express delivery within Colombo takes 1-2 business days, while standard island-wide shipping takes 3-5 business days. We also offer same-day delivery for orders placed before 2 PM within Colombo city limits."
                },
                {
                    question: "Do you offer free shipping?",
                    answer: "Yes! We provide free shipping on orders over LKR 5,000 within the Colombo district. For orders below this amount, a standard shipping fee of LKR 350 applies within Colombo and LKR 500 for other areas."
                },
                {
                    question: "Can I track my order?",
                    answer: "Absolutely! Once your order is dispatched, you'll receive a tracking number via SMS and email. You can track your package in real-time through our website or the courier partner's tracking system."
                },
                {
                    question: "What if my order is delayed?",
                    answer: "While we strive to deliver on time, occasional delays may occur due to weather or unforeseen circumstances. If your order is delayed beyond the estimated delivery time, please contact our customer service team for immediate assistance and compensation options."
                }
            ]
        },
        {
            category: "Products & Quality",
            icon: "💄",
            questions: [
                {
                    question: "Are your products authentic?",
                    answer: "Yes, we guarantee 100% authentic products. We source directly from authorized distributors and brand representatives. Each product comes with authenticity verification and we provide certificates when requested."
                },
                {
                    question: "Do you test products on animals?",
                    answer: "We are committed to cruelty-free beauty. None of our house brand products are tested on animals, and we prioritize working with suppliers who share our cruelty-free values."
                },
                {
                    question: "How do I know which products suit my skin type?",
                    answer: "We offer a free online skin consultation service. You can also contact our beauty experts via chat or phone for personalized product recommendations based on your skin type, concerns, and preferences."
                },
                {
                    question: "Do you have products for sensitive skin?",
                    answer: "Yes, we have a dedicated section for sensitive skin products. These are dermatologist-tested, hypoallergenic, and formulated without common irritants like parabens, sulfates, and artificial fragrances."
                }
            ]
        },
        {
            category: "Returns & Exchanges",
            icon: "↩️",
            questions: [
                {
                    question: "What is your return policy?",
                    answer: "We offer a 30-day return policy for unopened products in original packaging. For opened products, returns are accepted within 7 days if you experience allergic reactions or product defects, with a valid reason and photos."
                },
                {
                    question: "How do I return a product?",
                    answer: "Contact our customer service team to initiate a return. We'll provide you with a return authorization number and prepaid shipping label. Pack the item securely in its original packaging and ship it back to us."
                },
                {
                    question: "When will I receive my refund?",
                    answer: "Refunds are processed within 3-5 business days after we receive and inspect the returned item. The amount will be credited back to your original payment method. Bank transfers may take an additional 2-3 business days."
                },
                {
                    question: "Can I exchange a product instead of returning it?",
                    answer: "Yes, we offer product exchanges for different shades, sizes, or similar products within the same price range. The exchange process is similar to returns, and we'll ship the replacement item once we receive the original."
                }
            ]
        },
        {
            category: "Account & Payment",
            icon: "💳",
            questions: [
                {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit and debit cards (Visa, Mastercard, American Express), online banking, mobile payments (Dialog Pay, Mobitel mCash), and cash on delivery for orders within Colombo."
                },
                {
                    question: "Is my payment information secure?",
                    answer: "Yes, we use industry-standard SSL encryption to protect your payment information. We never store your complete card details on our servers and comply with international security standards for online transactions."
                },
                {
                    question: "Can I save my payment information for future purchases?",
                    answer: "Yes, you can securely save your payment methods in your account for faster checkout. We use tokenization technology to protect your stored payment information."
                },
                {
                    question: "Do you offer installment payments?",
                    answer: "Yes, we partner with several banks to offer installment payment plans for purchases over LKR 10,000. Available installment periods range from 3-12 months with competitive interest rates."
                }
            ]
        },
        {
            category: "Beauty Tips & Usage",
            icon: "✨",
            questions: [
                {
                    question: "How do I apply foundation for best results?",
                    answer: "Start with a clean, moisturized face. Use a primer if needed. Apply foundation from the center of your face outward using a damp beauty sponge or foundation brush. Build coverage gradually and blend well at the edges."
                },
                {
                    question: "How often should I use a face mask?",
                    answer: "For most skin types, using a face mask 1-2 times per week is ideal. Clay masks for oily skin can be used twice weekly, while hydrating masks for dry skin can be used 2-3 times weekly. Always follow product instructions."
                },
                {
                    question: "What's the correct order for skincare application?",
                    answer: "The general rule is to apply products from thinnest to thickest consistency: cleanser, toner, serums, eye cream, moisturizer, and sunscreen (morning) or face oil (evening)."
                },
                {
                    question: "How do I make my makeup last longer in Sri Lankan weather?",
                    answer: "Use a mattifying primer, set your makeup with translucent powder, use waterproof/long-wearing formulas, and carry blotting papers for touch-ups. Consider using a setting spray for extra longevity."
                }
            ]
        },
        {
            category: "Store & Services",
            icon: "🏪",
            questions: [
                {
                    question: "Do you have a physical store?",
                    answer: "Yes, our flagship store is located at 123 Beauty Street, Colombo 03. We're open Monday-Saturday 9 AM-8 PM and Sunday 10 AM-6 PM. You can browse products, get beauty consultations, and make purchases in-store."
                },
                {
                    question: "Do you offer makeup services?",
                    answer: "Yes, we provide professional makeup services for special occasions, bridal makeup, and makeup lessons. Services are available both in-store and as mobile services. Advance booking is required."
                },
                {
                    question: "Can I book a beauty consultation?",
                    answer: "Absolutely! We offer free 30-minute beauty consultations both online and in-store. Our certified beauty experts can help you choose the right products and create personalized beauty routines."
                },
                {
                    question: "Do you have a loyalty program?",
                    answer: "Yes, our Crystal Rewards program offers points for every purchase, exclusive discounts, early access to new products, and special birthday offers. Sign up is free and you start earning points immediately."
                }
            ]
        }
    ];

    const toggleExpand = (categoryIndex, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setExpandedItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const filteredFAQs = faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(
            q => 
                q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                q.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(category => category.questions.length > 0);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-pink-100 to-purple-100">
                <div className="container mx-auto px-4 text-center">
                    <div className="mb-6">
                        <FaQuestionCircle className="text-6xl text-pink-500 mx-auto mb-4" />
                    </div>
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        Find quick answers to common questions about our products, services, and policies. 
                        Can't find what you're looking for? Contact our support team!
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search frequently asked questions..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* FAQ Categories */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    {searchTerm && (
                        <div className="mb-8 text-center">
                            <p className="text-gray-600">
                                {filteredFAQs.reduce((total, category) => total + category.questions.length, 0)} results found for "{searchTerm}"
                            </p>
                        </div>
                    )}

                    <div className="space-y-12">
                        {filteredFAQs.map((category, categoryIndex) => (
                            <div key={categoryIndex}>
                                <div className="flex items-center mb-8">
                                    <span className="text-3xl mr-4">{category.icon}</span>
                                    <h2 className="text-3xl font-bold text-gray-800">
                                        {category.category}
                                    </h2>
                                </div>

                                <div className="space-y-4">
                                    {category.questions.map((faq, questionIndex) => {
                                        const key = `${categoryIndex}-${questionIndex}`;
                                        const isExpanded = expandedItems[key];

                                        return (
                                            <div
                                                key={questionIndex}
                                                className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                                            >
                                                <button
                                                    onClick={() => toggleExpand(categoryIndex, questionIndex)}
                                                    className="w-full px-6 py-4 text-left flex items-center justify-between focus:outline-none"
                                                >
                                                    <h3 className="text-lg font-semibold text-gray-800 pr-4">
                                                        {faq.question}
                                                    </h3>
                                                    <div className="flex-shrink-0">
                                                        {isExpanded ? (
                                                            <FaChevronUp className="text-pink-500" />
                                                        ) : (
                                                            <FaChevronDown className="text-pink-500" />
                                                        )}
                                                    </div>
                                                </button>

                                                <div
                                                    className={`overflow-hidden transition-all duration-300 ${
                                                        isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                    }`}
                                                >
                                                    <div className="px-6 pb-4">
                                                        <div className="border-t border-gray-200 pt-4">
                                                            <p className="text-gray-600 leading-relaxed">
                                                                {faq.answer}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredFAQs.length === 0 && searchTerm && (
                        <div className="text-center py-12">
                            <FaQuestionCircle className="text-4xl text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                No results found
                            </h3>
                            <p className="text-gray-500">
                                Try searching with different keywords or contact our support team for help.
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        Still Have Questions?
                    </h2>
                    <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
                        Our customer support team is here to help you with any questions or concerns.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/contact"
                            className="bg-white text-pink-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
                        >
                            Contact Support
                        </a>
                        <a
                            href="tel:+94112345678"
                            className="bg-pink-600 text-white px-8 py-4 rounded-lg hover:bg-pink-700 transition-colors font-semibold border-2 border-white"
                        >
                            Call Us Now
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
