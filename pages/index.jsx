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
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
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
        image: "https://images.unsplash.com/photo-1584467735871-8e85fceb2951?w=400&h=300&fit=crop",
        title: "Professional Stethoscope",
        description: "Dual head, premium quality",
        price: 15000,
        rating: 5,
        reviews: 189,
        tag: "recommended",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop",
        title: "Premium Lab Coat",
        description: "100% cotton, all sizes",
        price: 8500,
        rating: 4,
        reviews: 156,
        tag: "medPick",
    },
    {
        id: 4,
        image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=400&h=300&fit=crop",
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
        link: "#",
        bg: "from-blue-500 to-blue-700",
        cta: "Browse 500+ titles →",
    },
    {
        name: "Lab Equipment",
        description: "Professional grade tools",
        icon: <span className="inline-block bg-teal-500 rounded-full p-3"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#14B8A6" /><path d="M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>,
        link: "#",
        bg: "from-teal-500 to-teal-700",
        cta: "Explore equipment →",
    },
    {
        name: "Study Aids",
        description: "Notes, flashcards & more",
        icon: <span className="inline-block bg-green-500 rounded-full p-3"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#22C55E" /><path d="M10 22V10h12v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>,
        link: "#",
        bg: "from-green-500 to-green-700",
        cta: "View study tools →",
    },
];

const testimonials = [
    {
        text: "MedCart saved me so much money on textbooks! The quality is excellent and delivery was super fast. Highly recommend to all med students.",
        name: "Chioma Okafor",
        details: "University of Lagos",
        image: "https://img.freepik.com/premium-photo/portrait-smiling-female-doctor-wearing-white-coat-with-stethoscope-hospital-office_255667-23420.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
        text: "Best place to get lab equipment. The dissection kit I bought was top quality and came with everything I needed for anatomy class.",
        name: "Ahmed Bello",
        details: "Ladoke Akintola University of Technology",
        image: "https://media.istockphoto.com/id/638667804/photo/confident-medical-student-before-class.jpg?s=612x612&w=0&k=20&c=B4Qcd-u6S0109gHkDCuioQ_xyNT5LsXLoJoBLRE9cHU=",
    },
    {
        text: "The student discount program is amazing! I've saved over ₦50,000 on my textbooks this semester. Customer service is also very responsive.",
        name: "Adekunle Johnson",
        details: "University of Ibadan",
        image: "https://media.istockphoto.com/id/1434513602/photo/medical-student-poses-for-camera.jpg?s=612x612&w=0&k=20&c=3Kc0mywYUoMIqhabkD1iBSXwj-ZO-uewxAdl_Tt_voI=",
    },
];

export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-blue-50 py-12 md:py-20">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-4 md:px-8">
                        <div className="flex-1">
                            <span className="inline-block bg-green-500 text-white text-xs font-semibold rounded-full px-4 py-1 mb-4">Trusted by 10,000+ Medical Students</span>
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                Affordable Medical Resources for <span className="text-blue-600">Every Student</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-8">Get quality textbooks, lab equipment, and study materials delivered to your doorstep. Special student discounts available!</p>
                            <div className="flex gap-4 mb-8">
                                <Button variant="primary">Shop Now</Button>
                                <Button variant="secondary">Browse Categories</Button>
                            </div>
                            <div className="flex gap-6 text-sm text-gray-700">
                                <span className="flex items-center gap-2"><span className="text-green-500 text-xl">&#x1F69A;</span>Free Delivery on ₦50k+</span>
                                <span className="flex items-center gap-2"><span className="text-green-500 text-xl">&#x1F512;</span>Secure Payment</span>
                            </div>
                        </div>
                        <div className="flex-1 flex justify-center">
                            {/* TODO: Replace with actual hero image of medical books stack */}
                            <img src="https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=500&h=600&fit=crop" alt="Stack of medical books" className="rounded-xl shadow-lg object-contain w-full max-w-xs md:max-w-md" />
                        </div>
                    </div>
                </section>

                {/* Featured Products */}
                <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                    <p className="text-gray-600 mb-8">Top picks for medical students this month</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {products.map((product, idx) => (
                            <ProductCard key={idx} product={product} />
                        ))}
                    </div>
                    <div className="flex justify-end mt-4">
                        <a href="#" className="text-blue-600 font-semibold hover:underline">View All →</a>
                    </div>
                </section>

                {/* Shop by Category */}
                <section className="bg-white py-16">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Shop by Category</h2>
                        <p className="text-gray-600 mb-8">Everything you need for medical school in one place</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {categories.map((category, idx) => (
                                <CategoryCard key={idx} category={category} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Students Choose MedCart */}
                <section className="py-16 bg-blue-50">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Why Students Choose MedCart</h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                            <div className="flex flex-col items-center gap-2">
                                <span className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2563EB" /><path d="M10 22V10h12v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>
                                <span className="font-semibold text-lg">Student Discounts</span>
                                <span className="text-sm text-gray-600">Up to 40% off on selected items. Special pricing for bulk orders.</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="bg-green-100 text-green-600 rounded-full p-3 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#22C55E" /><path d="M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>
                                <span className="font-semibold text-lg">Peer Recommended</span>
                                <span className="text-sm text-gray-600">Products reviewed and recommended by fellow medical students.</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="bg-blue-100 text-blue-600 rounded-full p-3 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#2563EB" /><path d="M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>
                                <span className="font-semibold text-lg">Fast Delivery</span>
                                <span className="text-sm text-gray-600">Delivery to all campuses nationwide. Track your order in real-time.</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="bg-purple-100 text-purple-600 rounded-full p-3 mb-2"><svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#A78BFA" /><path d="M16 10v12" stroke="#fff" strokeWidth="2" strokeLinecap="round" /></svg></span>
                                <span className="font-semibold text-lg">Flexible Payment</span>
                                <span className="text-sm text-gray-600">Pay with cards, bank transfer, or installment plans available.</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4 md:px-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">What Students Say</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
