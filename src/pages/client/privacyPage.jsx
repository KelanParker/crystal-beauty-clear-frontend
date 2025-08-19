export default function PrivacyPage() {
    const sections = [
        {
            title: "Information We Collect",
            content: [
                {
                    subtitle: "Personal Information",
                    text: "We collect information you provide directly to us, such as when you create an account, make a purchase, subscribe to our newsletter, or contact us. This may include your name, email address, phone number, shipping address, payment information, and any other information you choose to provide."
                },
                {
                    subtitle: "Automatically Collected Information",
                    text: "When you use our website, we automatically collect certain information about your device and usage patterns. This includes your IP address, browser type, operating system, referring URLs, pages viewed, and the dates/times of your visits."
                },
                {
                    subtitle: "Cookies and Tracking Technologies",
                    text: "We use cookies, web beacons, and similar tracking technologies to collect information about your browsing activities and to provide you with a personalized experience. You can control cookie settings through your browser preferences."
                }
            ]
        },
        {
            title: "How We Use Your Information",
            content: [
                {
                    subtitle: "Order Processing",
                    text: "We use your personal information to process and fulfill your orders, including processing payments, arranging shipping, and providing customer service related to your purchase."
                },
                {
                    subtitle: "Account Management",
                    text: "Your information helps us maintain your account, provide customer support, and communicate with you about your account or our services."
                },
                {
                    subtitle: "Marketing Communications",
                    text: "With your consent, we may send you promotional emails about new products, special offers, and other information we think may interest you. You can opt out of these communications at any time."
                },
                {
                    subtitle: "Service Improvement",
                    text: "We analyze usage patterns and feedback to improve our website, products, and services. This helps us provide a better shopping experience for all our customers."
                }
            ]
        },
        {
            title: "Information Sharing and Disclosure",
            content: [
                {
                    subtitle: "Service Providers",
                    text: "We may share your information with third-party service providers who perform services on our behalf, such as payment processing, shipping, email delivery, and website analytics. These providers are contractually obligated to protect your information."
                },
                {
                    subtitle: "Legal Requirements",
                    text: "We may disclose your information if required by law, regulation, legal process, or governmental request. We may also disclose information to protect our rights, property, or safety, or that of our users or others."
                },
                {
                    subtitle: "Business Transfers",
                    text: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any such change in ownership or control of your personal information."
                }
            ]
        },
        {
            title: "Data Security",
            content: [
                {
                    subtitle: "Security Measures",
                    text: "We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security assessments."
                },
                {
                    subtitle: "Payment Security",
                    text: "All payment transactions are processed through secure, encrypted connections. We do not store complete credit card information on our servers and comply with industry-standard security protocols."
                },
                {
                    subtitle: "Data Retention",
                    text: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. When we no longer need your information, we securely delete or anonymize it."
                }
            ]
        },
        {
            title: "Your Rights and Choices",
            content: [
                {
                    subtitle: "Access and Correction",
                    text: "You have the right to access, update, or correct your personal information. You can do this by logging into your account or contacting us directly."
                },
                {
                    subtitle: "Data Portability",
                    text: "You have the right to request a copy of your personal information in a structured, machine-readable format. We will provide this information within a reasonable timeframe."
                },
                {
                    subtitle: "Deletion Rights",
                    text: "You may request that we delete your personal information, subject to certain legal limitations. We will honor such requests unless we have a legitimate business need to retain the information."
                },
                {
                    subtitle: "Marketing Opt-out",
                    text: "You can opt out of receiving promotional communications from us at any time by clicking the unsubscribe link in our emails or contacting us directly."
                }
            ]
        },
        {
            title: "Cookies and Tracking",
            content: [
                {
                    subtitle: "Types of Cookies",
                    text: "We use essential cookies for website functionality, performance cookies to analyze usage patterns, and marketing cookies to provide personalized content and advertisements."
                },
                {
                    subtitle: "Cookie Management",
                    text: "You can control cookies through your browser settings. However, disabling certain cookies may limit your ability to use some features of our website."
                },
                {
                    subtitle: "Third-party Tracking",
                    text: "We may allow third-party analytics and advertising services to collect information about your browsing activities. These services have their own privacy policies governing their use of information."
                }
            ]
        }
    ];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-pink-100 to-purple-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Your privacy is important to us. This policy explains how we collect, use, 
                        and protect your personal information when you use our services.
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
                            Welcome to ELIORE
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            At ELIORE, we are committed to protecting your privacy and ensuring 
                            the security of your personal information. This Privacy Policy describes our 
                            practices regarding the collection, use, and sharing of information when you 
                            visit our website, make purchases, or interact with our services.
                        </p>
                        <p className="text-gray-600 leading-relaxed mt-4">
                            By using our website and services, you agree to the collection and use of 
                            information in accordance with this policy. We encourage you to read this 
                            policy carefully and contact us if you have any questions.
                        </p>
                    </div>

                    {/* Policy Sections */}
                    <div className="space-y-12">
                        {sections.map((section, index) => (
                            <div key={index} className="border-b border-gray-200 pb-8 last:border-b-0">
                                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                                    {index + 1}. {section.title}
                                </h2>
                                <div className="space-y-6">
                                    {section.content.map((item, itemIndex) => (
                                        <div key={itemIndex}>
                                            <h3 className="text-xl font-semibold text-gray-700 mb-3">
                                                {item.subtitle}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed">
                                                {item.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Children's Privacy */}
                    <div className="bg-yellow-50 p-8 rounded-2xl mt-12">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Children's Privacy
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our services are not intended for children under the age of 13. We do not 
                            knowingly collect personal information from children under 13. If you are a 
                            parent or guardian and you are aware that your child has provided us with 
                            personal information, please contact us immediately so we can take appropriate action.
                        </p>
                    </div>

                    {/* International Users */}
                    <div className="bg-blue-50 p-8 rounded-2xl mt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            International Users
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our services are primarily intended for users in Sri Lanka. If you are accessing 
                            our website from outside Sri Lanka, please note that your information may be 
                            transferred to, stored, and processed in Sri Lanka where our servers are located 
                            and our central database is operated.
                        </p>
                    </div>

                    {/* Changes to Policy */}
                    <div className="bg-purple-50 p-8 rounded-2xl mt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            Changes to This Privacy Policy
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            We may update our Privacy Policy from time to time to reflect changes in our 
                            practices or for legal, operational, or regulatory reasons. We will notify you 
                            of any material changes by posting the new Privacy Policy on this page and 
                            updating the "Last updated" date. We encourage you to review this Privacy 
                            Policy periodically for any changes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Contact Us About Privacy
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                            If you have any questions, concerns, or requests regarding this Privacy Policy 
                            or our privacy practices, please don't hesitate to contact us.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
                            <div className="text-center">
                                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    📧
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
                                <p className="text-gray-600">privacy@crystalbeautyclear.lk</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    📞
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Phone</h3>
                                <p className="text-gray-600">+94 11 234 5678</p>
                            </div>
                            
                            <div className="text-center">
                                <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    📍
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2">Address</h3>
                                <p className="text-gray-600">123 Beauty Street<br />Colombo 03, Sri Lanka</p>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <a
                                href="/contact"
                                className="inline-block bg-pink-500 text-white px-8 py-4 rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                            >
                                Contact Our Privacy Team
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
