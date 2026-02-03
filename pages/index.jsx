// pages/index.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import ProductCard from "../components/ProductCard";
import TestimonialCard from "../components/TestimonialCard";
import CategoryCard from "../components/CategoryCard";

// Dummy data for products, testimonials, categories
// TODO: Replace with actual product images from your inventory
const products = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop",
        title: "Gray's Anatomy (42nd Edition)",
        description: "Essential anatomy reference",
        price: 28500,
        oldPrice: 35000,
        rating: 5,
        reviews: 234,
        tag: "recommended",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
        title: "Professional Stethoscope",
        description: "Dual head, premium quality",
        price: 15000,
        rating: 5,
        reviews: 189,
        tag: "recommended",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop",
        title: "Premium Lab Coat",
        description: "100% cotton, all sizes",
        price: 8500,
        rating: 4,
        reviews: 156,
        tag: "medPick",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=300&fit=crop",
        title: "Dissection Kit (12-piece)",
        description: "Complete anatomy tools",
        price: 12000,
        rating: 5,
        reviews: 201,
        tag: "recommended",
    },
];

const categories = [
    {
        name: "Textbooks",
        description: "Latest editions & bestsellers",
        icon: <span className="inline-block bg-blue-500 rounded-full p-3"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2563EB" /><path d="M10 22V10h12v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>,
        link: "/shop",
        bg: "from-blue-500 to-blue-700",
        cta: "Browse 500+ titles →",
    },
    {
        name: "Lab Equipment",
        description: "Professional grade tools",
        icon: <span className="inline-block bg-teal-500 rounded-full p-3"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#14B8A6" /><path d="M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>,
        link: "/shop",
        bg: "from-teal-500 to-teal-700",
        cta: "Explore equipment →",
    },
    {
        name: "Study Aids",
        description: "Notes, flashcards & more",
        icon: <span className="inline-block bg-green-500 rounded-full p-3"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#22C55E" /><path d="M10 22V10h12v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>,
        link: "/shop",
        bg: "from-green-500 to-green-700",
        cta: "View study tools →",
    },
];

const testimonials = [
    {
        text: "MedCart saved me so much money on textbooks! The quality is excellent and delivery was super fast. Highly recommend to all med students.",
        name: "Chioma Okafor",
        details: "University of Lagos",
        image: "https://i.pravatar.cc/400?img=1",
    },
    {
        text: "Best place to get lab equipment. The dissection kit I bought was top quality and came with everything I needed for anatomy class.",
        name: "Ahmed Bello",
        details: "Ladoke Akintola University of Technology",
        image: "https://i.pravatar.cc/400?img=2",
    },
    {
        text: "The student discount program is amazing! I've saved over ₦50,000 on my textbooks this semester. Customer service is also very responsive.",
        name: "Adekunle Johnson",
        details: "University of Ibadan",
        image: "https://i.pravatar.cc/400?img=3",
    },
];

export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-blue-50 py-8 md:py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 px-4 md:px-8">
                        <div className="flex-1 w-full">
                            <span className="inline-block bg-green-500 text-white text-xs md:text-sm font-semibold rounded-full px-3 md:px-4 py-1 mb-3 md:mb-4">Trusted by 10,000+ Medical Students</span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight">
                                Affordable Medical Resources for <span className="text-blue-600">Every Student</span>
                            </h1>
                            <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">Get quality textbooks, lab equipment, and study materials delivered to your doorstep. Special student discounts available!</p>
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
                                <Button variant="primary" href="/shop" className="w-full sm:w-auto justify-center">Shop Now</Button>
                                <Button variant="secondary" href="/shop" className="w-full sm:w-auto justify-center">Browse Categories</Button>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-xs md:text-sm text-gray-700">
                                <span className="flex items-center gap-2"><span className="text-green-500 text-lg md:text-xl">&#x1F69A;</span>Free Delivery on ₦50k+</span>
                                <span className="flex items-center gap-2"><span className="text-green-500 text-lg md:text-xl">&#x1F512;</span>Secure Payment</span>
                            </div>
                        </div>
                        <div className="flex-1 w-full flex justify-center">
                            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop" alt="Medical supplies" className="rounded-xl shadow-lg object-contain w-full max-w-xs md:max-w-md" />
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Featured Products</h2>
                    <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Top picks for medical students this month</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {products.map((product, idx) => (
                            <ProductCard key={idx} product={product} />
                        ))}
                    </div>
                    <div className="flex justify-center sm:justify-end mt-6 md:mt-8">
                        <a href="/shop" className="text-blue-600 text-sm md:text-base font-semibold hover:underline">View All →</a>
                    </div>
                </section>

                {/* Shop by Category */}
                <section className="bg-white py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Shop by Category</h2>
                        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8">Everything you need for medical school in one place</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {categories.map((category, idx) => (
                                <CategoryCard key={idx} category={category} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Students Choose MedCart */}
                <section className="py-12 md:py-16 bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">Why Students Choose MedCart</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 text-center">
                            <div className="flex flex-col items-center gap-2 p-4">
                                <span className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2563EB" /><path d="M10 22V10h12v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>
                                <span className="font-semibold text-base md:text-lg">Student Discounts</span>
                                <span className="text-xs md:text-sm text-gray-600">Up to 40% off on selected items. Special pricing for bulk orders.</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4">
                                <span className="bg-green-100 text-green-600 rounded-full p-3 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#22C55E" /><path d="M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>
                                <span className="font-semibold text-base md:text-lg">Peer Recommended</span>
                                <span className="text-xs md:text-sm text-gray-600">Products reviewed and recommended by fellow medical students.</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4">
                                <span className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2563EB" /><path d="M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>
                                <span className="font-semibold text-base md:text-lg">Fast Delivery</span>
                                <span className="text-xs md:text-sm text-gray-600">Delivery to all campuses nationwide. Track your order in real-time.</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 p-4">
                                <span className="bg-purple-100 text-purple-600 rounded-full p-3 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#A78BFA" /><path d="M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>
                                <span className="font-semibold text-base md:text-lg">Flexible Payment</span>
                                <span className="text-xs md:text-sm text-gray-600">Pay with cards, bank transfer, or installment plans available.</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-12 md:py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 text-center">What Students Say</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {testimonials.map((testimonial, idx) => (
                                <TestimonialCard key={idx} testimonial={testimonial} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
