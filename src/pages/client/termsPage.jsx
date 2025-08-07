export default function TermsPage() {
    const sections = [
        {
            title: "Acceptance of Terms",
            content: "By accessing and using the Crystal Beauty Clear website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These terms apply to all visitors, users, and others who access or use the service."
        },
        {
            title: "Description of Service",
            content: "Crystal Beauty Clear provides an online platform for purchasing cosmetics, skincare products, and beauty accessories. Our service includes product browsing, online ordering, payment processing, delivery services, customer support, and related beauty consultation services. We reserve the right to modify or discontinue any aspect of our service at any time."
        },
        {
            title: "User Accounts",
            content: "To access certain features of our service, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete."
        },
        {
            title: "Product Information and Pricing",
            content: "We strive to provide accurate product descriptions and pricing information. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. Prices are subject to change without notice. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time without prior notice."
        },
        {
            title: "Order Acceptance and Payment",
            content: "All orders are subject to acceptance by Crystal Beauty Clear. We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in product or pricing information, or suspected fraudulent activity. Payment must be received before orders are processed and shipped. We accept various payment methods as displayed at checkout."
        },
        {
            title: "Shipping and Delivery",
            content: "We will make every effort to deliver products within the estimated timeframes. However, delivery dates are estimates only and we are not liable for any delays. Risk of loss and title for products pass to you upon delivery to the carrier. Shipping costs are calculated based on weight, destination, and shipping method selected."
        },
        {
            title: "Returns and Refunds",
            content: "Returns are accepted within 30 days of purchase for unopened products in original packaging. Opened products may be returned within 7 days for legitimate reasons such as allergic reactions or product defects. Return shipping costs are the responsibility of the customer unless the return is due to our error. Refunds will be processed to the original payment method within 3-5 business days of receiving the returned item."
        },
        {
            title: "Prohibited Uses",
            content: "You may not use our service for any unlawful purpose or to solicit others to perform unlawful acts, to violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances, to infringe upon or violate our intellectual property rights or the intellectual property rights of others, to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate, to submit false or misleading information, or to upload or transmit viruses or any other type of malicious code."
        },
        {
            title: "Intellectual Property Rights",
            content: "The service and its original content, features, and functionality are and will remain the exclusive property of Crystal Beauty Clear and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent."
        },
        {
            title: "User-Generated Content",
            content: "Our service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content you post and warrant that you have the right to post such content. By posting content, you grant us a non-exclusive, royalty-free, worldwide license to use, display, and distribute such content in connection with our service."
        },
        {
            title: "Privacy Policy",
            content: "Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our service. By using our service, you agree to the collection and use of information in accordance with our Privacy Policy, which is incorporated into these terms by reference."
        },
        {
            title: "Disclaimers",
            content: "The information on this website is provided on an 'as is' basis. To the fullest extent permitted by law, this company excludes all representations, warranties, conditions and terms (whether express or implied) and all liability for damages arising out of or in connection with your use of this website and the products or services offered."
        },
        {
            title: "Limitation of Liability",
            content: "In no event shall Crystal Beauty Clear, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service."
        },
        {
            title: "Indemnification",
            content: "You agree to defend, indemnify, and hold harmless Crystal Beauty Clear and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees)."
        },
        {
            title: "Termination",
            content: "We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the terms. If you wish to terminate your account, you may simply discontinue using the service."
        },
        {
            title: "Governing Law",
            content: "These terms shall be interpreted and governed by the laws of Sri Lanka, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights."
        },
        {
            title: "Changes to Terms",
            content: "We reserve the right, at our sole discretion, to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion."
        },
        {
            title: "Severability",
            content: "If any provision of these terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect."
        },
        {
            title: "Contact Information",
            content: "If you have any questions about these Terms of Service, please contact us at legal@crystalbeautyclear.lk or call us at +94 11 234 5678. You may also write to us at Crystal Beauty Clear, 123 Beauty Street, Colombo 03, Sri Lanka."
        }
    ];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-pink-100 to-purple-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                        Terms of Service
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Please read these terms and conditions carefully before using our website and services. 
                        These terms govern your use of Crystal Beauty Clear's platform and services.
                    </p>
                    <div className="mt-6 text-sm text-gray-500">
                        Last updated: January 2024
                    </div>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-pink-50 p-8 rounded-2xl mb-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Agreement to Terms
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            These Terms of Service ("Terms") constitute a legally binding agreement between you 
                            and Crystal Beauty Clear ("Company", "we", "us", or "our") concerning your use of 
                            our website, mobile application, and services (collectively, the "Service").
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            Please read these Terms carefully before using our Service. By accessing or using any 
                            part of our Service, you agree to be bound by these Terms. If you disagree with any 
                            part of these terms, then you may not access the Service.
                        </p>
                    </div>

                    {/* Terms Sections */}
                    <div className="space-y-8">
                        {sections.map((section, index) => (
                            <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                    {index + 1}. {section.title}
                                </h2>
                                <p className="text-gray-600 leading-relaxed">
                                    {section.content}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Key Points Summary */}
                    <div className="bg-yellow-50 p-8 rounded-2xl mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Key Points Summary
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>You must be at least 18 years old to use our services</li>
                            <li>You are responsible for maintaining the security of your account</li>
                            <li>All sales are subject to our return and refund policy</li>
                            <li>We reserve the right to refuse or cancel orders</li>
                            <li>Product availability and pricing are subject to change</li>
                            <li>These terms are governed by Sri Lankan law</li>
                        </ul>
                    </div>

                    {/* Legal Notice */}
                    <div className="bg-blue-50 p-8 rounded-2xl mt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Legal Notice
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            These Terms of Service have been created with the help of legal professionals and 
                            are designed to protect both Crystal Beauty Clear and our customers. We recommend 
                            that you save or print a copy of these terms for your records. If you have any 
                            questions about these terms, please contact our legal team.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Questions About Our Terms?
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            If you have any questions or concerns about these Terms of Service, 
                            our legal team is here to help clarify any points.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                            <div className="text-center">
                                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    📧
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Legal Email</h3>
                                <p className="text-gray-600">legal@crystalbeautyclear.lk</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    📞
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Legal Hotline</h3>
                                <p className="text-gray-600">+94 11 234 5678</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    📍
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Legal Address</h3>
                                <p className="text-gray-600">123 Beauty Street<br />Colombo 03, Sri Lanka</p>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <a
                                href="/contact"
                                className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg hover:bg-pink-600 transition-colors font-semibold mr-4"
                            >
                                Contact Legal Team
                            </a>
                            <a
                                href="/privacy"
                                className="inline-block bg-gray-200 text-gray-800 px-8 py-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                            >
                                View Privacy Policy
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
