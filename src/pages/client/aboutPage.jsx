import { FaHeart, FaLeaf, FaShieldAlt, FaUsers, FaAward, FaGlobe } from 'react-icons/fa';
import { CRYSTAL_BEAUTY_IMAGES } from '../../../utils/supabaseStorage';

export default function AboutPage() {
    // Company values - USING SUPABASE IMAGES
    // Icons stored in: supabase/crystal-beauty-images/values/
    const values = [
        {
            icon: <FaHeart className="text-3xl text-pink-500" />,
            title: "Passion for Beauty",
            description: "We believe beauty comes from within and our products help enhance your natural radiance.",
            image: CRYSTAL_BEAUTY_IMAGES.values.customer // Customer care heart icon
        },
        {
            icon: <FaLeaf className="text-3xl text-green-500" />,
            title: "Natural Ingredients",
            description: "Our formulations use carefully selected natural ingredients that are gentle on your skin.",
            image: CRYSTAL_BEAUTY_IMAGES.values.sustainability // Sustainability leaf icon
        },
        {
            icon: <FaShieldAlt className="text-3xl text-blue-500" />,
            title: "Quality Assurance",
            description: "Every product undergoes rigorous testing to ensure the highest quality and safety standards.",
            image: CRYSTAL_BEAUTY_IMAGES.values.quality // Quality guarantee icon
        },
        {
            icon: <FaUsers className="text-3xl text-purple-500" />,
            title: "Innovation First",
            description: "We continuously research and develop new formulations to bring you the latest in beauty technology.",
            image: CRYSTAL_BEAUTY_IMAGES.values.innovation // Innovation research icon
        }
    ];

    const milestones = [
        {
            year: "2020",
            title: "Founded",
            description: "Crystal Beauty Clear was established with a vision to make quality cosmetics accessible to everyone."
        },
        {
            year: "2021",
            title: "First 1000 Customers",
            description: "Reached our first milestone of serving 1000 happy customers across Sri Lanka."
        },
        {
            year: "2022",
            title: "Product Expansion",
            description: "Expanded our product line to include skincare, makeup, and fragrance collections."
        },
        {
            year: "2023",
            title: "Island Wide Delivery",
            description: "Launched island-wide delivery service, bringing beauty products to your doorstep."
        },
        {
            year: "2024",
            title: "Premium Collection",
            description: "Introduced our premium collection featuring luxury skincare and cosmetics."
        }
    ];

    // Team members - USING SUPABASE IMAGES
    // Photos stored in: supabase/crystal-beauty-images/team/
    const team = [
        {
            name: "Sarah Johnson",
            role: "Founder & CEO",
            image: CRYSTAL_BEAUTY_IMAGES.team.ceo, // CEO - Sarah Johnson
            description: "Beauty industry veteran with 15+ years of experience in cosmetics and skincare."
        },
        {
            name: "Dr. Maya Patel",
            role: "Head of Research & Development",
            image: CRYSTAL_BEAUTY_IMAGES.team.research, // Head of R&D - Dr. Maya Patel
            description: "Dermatologist and cosmetic scientist specializing in skin-friendly formulations."
        },
        {
            name: "Emily Chen",
            role: "Marketing Director",
            image: CRYSTAL_BEAUTY_IMAGES.team.marketing, // Marketing Director - Emily Chen
            description: "Digital marketing expert passionate about connecting beauty with technology."
        },
        {
            name: "Lisa Wong",
            role: "Sales Manager",
            image: CRYSTAL_BEAUTY_IMAGES.team.sales, // Sales Manager - Lisa Wong
            description: "Customer relationship specialist with expertise in beauty retail and consultations."
        }
    ];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-r from-pink-100 to-purple-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 mb-6">
                        About Crystal Beauty Clear
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We're passionate about helping you discover your unique beauty through high-quality, 
                        affordable cosmetics and skincare products designed specifically for Sri Lankan skin.
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    Crystal Beauty Clear was born from a simple belief: everyone deserves to feel confident 
                                    and beautiful in their own skin. Founded in 2020, we started as a small team of beauty 
                                    enthusiasts who noticed a gap in the Sri Lankan market for high-quality, affordable cosmetics.
                                </p>
                                <p>
                                    Understanding the unique needs of Sri Lankan skin, climate, and lifestyle, we set out to 
                                    create products that not only enhance natural beauty but also nourish and protect. Our 
                                    journey began with extensive research into local skin types and preferences.
                                </p>
                                <p>
                                    Today, we're proud to serve thousands of customers across Sri Lanka, offering a carefully 
                                    curated selection of skincare, makeup, and beauty accessories that celebrate the diversity 
                                    and beauty of our island nation.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="/api/placeholder/600/500"
                                alt="Our Story"
                                className="rounded-2xl shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -right-6 bg-pink-500 text-white p-6 rounded-2xl">
                                <div className="text-center">
                                    <div className="text-3xl font-bold">50K+</div>
                                    <div className="text-sm">Happy Customers</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            Our Values
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
                                <div className="flex justify-center mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Journey Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            Our Journey
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Key milestones in our growth story
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-pink-200"></div>
                        <div className="space-y-12">
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                                        <div className="bg-white p-6 rounded-2xl shadow-lg">
                                            <div className="text-2xl font-bold text-pink-500 mb-2">
                                                {milestone.year}
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                {milestone.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                {milestone.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="relative flex items-center justify-center w-12 h-12 bg-pink-500 rounded-full border-4 border-white shadow-lg z-10">
                                        <div className="w-3 h-3 bg-white rounded-full"></div>
                                    </div>
                                    <div className="w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
                            Meet Our Team
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            The passionate people behind Crystal Beauty Clear
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {team.map((member, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                        {member.name}
                                    </h3>
                                    <div className="text-pink-500 font-medium mb-3">
                                        {member.role}
                                    </div>
                                    <p className="text-gray-600">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-r from-pink-500 to-purple-600">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
                        <div>
                            <div className="text-4xl font-bold mb-2">50K+</div>
                            <div className="text-pink-100">Happy Customers</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">200+</div>
                            <div className="text-pink-100">Products</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">99.8%</div>
                            <div className="text-pink-100">Satisfaction Rate</div>
                        </div>
                        <div>
                            <div className="text-4xl font-bold mb-2">24/7</div>
                            <div className="text-pink-100">Customer Support</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                        Our Mission
                    </h2>
                    <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                        To empower every individual to express their unique beauty with confidence through 
                        high-quality, accessible cosmetics and skincare products that celebrate diversity, 
                        promote self-love, and enhance natural radiance while contributing positively to our community.
                    </p>
                </div>
            </section>
        </div>
    );
}
