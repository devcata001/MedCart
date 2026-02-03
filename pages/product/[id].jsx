// pages/product/[id].jsx
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Badge from "../../components/Badge";
import RatingStars from "../../components/RatingStars";
import ProductCard from "../../components/ProductCard";
import Tooltip from "../../components/Tooltip";
import { ProductDetailSkeleton } from "../../components/LoadingSkeleton";
import { useCart } from "../../context/CartContext";

// Mock product data - Replace with API call
const productData = {
    1: {
        id: 1,
        image: "https://placehold.co/600x600?text=Grays+Anatomy",
        images: [
            "https://placehold.co/600x600?text=Grays+Anatomy+1",
            "https://placehold.co/600x600?text=Grays+Anatomy+2",
            "https://placehold.co/600x600?text=Grays+Anatomy+3",
        ],
        title: "Gray's Anatomy (42nd Edition)",
        description: "The world's most trusted anatomy textbook for over 160 years. Comprehensive coverage of human anatomy with detailed illustrations.",
        longDescription: "Gray's Anatomy for Students is a clinically oriented, student-friendly textbook of human anatomy. Praised for its easy-to-read, visual approach and emphasis on clinical application, this popular textbook is both comprehensive and affordable.",
        price: 28500,
        oldPrice: 35000,
        rating: 5,
        reviews: 234,
        inStock: true,
        category: "Study Tools",
        tag: "recommended",
        features: [
            "Over 1,000 full-color illustrations",
            "Clinical boxes throughout",
            "Surface anatomy and imaging",
            "Online access included",
            "Latest 42nd Edition",
        ],
        medTip: "This book is essential for preclinical students. Focus on understanding anatomical relationships rather than memorizing every detail. Use it alongside dissection and practical sessions.",
        verified: true,
    },
    2: {
        id: 2,
        image: "https://placehold.co/600x600?text=Stethoscope",
        images: [
            "https://placehold.co/600x600?text=Stethoscope+1",
            "https://placehold.co/600x600?text=Stethoscope+2",
        ],
        title: "Professional Stethoscope",
        description: "Dual head, premium quality medical stethoscope for accurate auscultation.",
        longDescription: "A high-quality dual-head stethoscope designed for clinical professionals. Features acoustic precision tubing, comfortable earpieces, and a durable diaphragm for clear sound transmission. Perfect for both preclinical and clinical students.",
        price: 15000,
        rating: 5,
        reviews: 189,
        inStock: true,
        category: "Clinical Essentials",
        tag: "recommended",
        features: [
            "Dual head design (diaphragm & bell)",
            "Acoustic precision tubing",
            "Comfortable ear pieces",
            "Durable stainless steel",
            "Ideal for all auscultation needs",
        ],
        medTip: "Learn proper stethoscope technique early. Practice distinguishing between normal and abnormal lung and heart sounds with supervision from experienced clinicians.",
        verified: true,
    },
    3: {
        id: 3,
        image: "https://placehold.co/600x600?text=Lab+Coat",
        images: [
            "https://placehold.co/600x600?text=Lab+Coat+1",
            "https://placehold.co/600x600?text=Lab+Coat+2",
        ],
        title: "Premium Lab Coat",
        description: "100% cotton, all sizes, professional medical apparel.",
        longDescription: "High-quality 100% cotton lab coat offering comfort and durability for clinical settings. Features multiple pockets for instrument storage, reinforced stitching, and a professional fit. Available in all standard sizes.",
        price: 8500,
        rating: 4,
        reviews: 156,
        inStock: true,
        category: "Clinical Essentials",
        tag: "medPick",
        features: [
            "100% premium cotton",
            "Multiple pockets",
            "Reinforced stitching",
            "Professional fit",
            "All sizes available",
        ],
        medTip: "Invest in 2-3 good quality lab coats for rotation. Keep them clean and pressed for a professional appearance during clinical rotations.",
        verified: true,
    },
    4: {
        id: 4,
        image: "https://placehold.co/600x600?text=Dissection+Kit",
        images: [
            "https://placehold.co/600x600?text=Dissection+1",
            "https://placehold.co/600x600?text=Dissection+2",
        ],
        title: "Dissection Kit (12-piece)",
        description: "Complete anatomy tools for practical dissection sessions.",
        longDescription: "A comprehensive 12-piece dissection kit containing all essential surgical instruments. Includes scalpels, forceps, scissors, and probes. Perfect for anatomy lab work and dissection practice.",
        price: 12000,
        rating: 5,
        reviews: 201,
        inStock: true,
        category: "Clinical Essentials",
        tag: "recommended",
        features: [
            "12 essential surgical instruments",
            "Stainless steel construction",
            "Sharp and precise cutting edges",
            "Comfortable handles",
            "Professional grade quality",
        ],
        medTip: "Handle instruments with respect. Always keep your tools sharp and clean. Practice proper dissection technique to minimize tissue damage.",
        verified: true,
    },
    5: {
        id: 5,
        image: "https://placehold.co/600x600?text=Vitamin+D3",
        images: [
            "https://placehold.co/600x600?text=Vitamin+D3",
        ],
        title: "Vitamin D3 Supplement",
        description: "Supports immune health and bone strength.",
        longDescription: "High-potency Vitamin D3 supplement supporting immune function and calcium absorption. Especially important for medical students with limited sun exposure due to study schedules.",
        price: 4500,
        rating: 4.5,
        reviews: 89,
        inStock: true,
        category: "Supplements",
        tag: "medPick",
        features: [
            "High potency formula",
            "Supports immune function",
            "Enhances calcium absorption",
            "Easy-to-swallow capsules",
            "Doctor recommended",
        ],
        medTip: "Vitamin D deficiency is common among students. Check your levels regularly and supplement if needed for better immunity and mood.",
        verified: true,
    },
    6: {
        id: 6,
        image: "https://placehold.co/600x600?text=Vitamin+D3",
        images: [
            "https://placehold.co/600x600?text=Vitamin+D3",
        ],
        title: "Focus & Memory Capsules",
        description: "Natural nootropic blend for mental clarity.",
        longDescription: "Natural nootropic blend designed to enhance focus, memory, and mental clarity. Perfect for intense study sessions and clinical exams.",
        price: 6500,
        rating: 4,
        reviews: 124,
        inStock: true,
        category: "Supplements",
        features: [
            "Natural herbal ingredients",
            "Enhances focus and concentration",
            "Improves memory retention",
            "No artificial additives",
            "Safe for long-term use",
        ],
        medTip: "Combine supplements with adequate sleep and exercise. No supplement can replace proper study techniques and rest.",
        verified: true,
    },
    7: {
        id: 7,
        image: "https://placehold.co/600x600?text=Stress+Relief+Tea",
        images: [
            "https://placehold.co/600x600?text=Stress+Relief+Tea",
        ],
        title: "Stress Relief Tea",
        description: "Calming herbal blend for relaxation.",
        longDescription: "Premium herbal tea blend specially formulated to reduce stress and anxiety. Contains chamomile, lavender, and lemon balm.",
        price: 3200,
        rating: 4.5,
        reviews: 67,
        inStock: true,
        category: "Wellness",
        features: [
            "100% natural herbs",
            "Calming blend",
            "No caffeine",
            "Sleep-promoting",
            "Organic certified",
        ],
        medTip: "Take time for self-care. A warm cup of herbal tea can be a great way to unwind after long study sessions or clinical shifts.",
        verified: true,
    },
    8: {
        id: 8,
        image: "https://placehold.co/600x600?text=Focus+Capsules",
        images: [
            "https://placehold.co/600x600?text=Focus+Capsules",
        ],
        title: "Study Flashcards Set",
        description: "500+ medical terms and definitions.",
        longDescription: "Comprehensive flashcard set containing over 500 medical terms, definitions, and clinical correlations. Perfect for active recall studying.",
        price: 5500,
        rating: 5,
        reviews: 178,
        inStock: true,
        category: "Study Tools",
        tag: "medPick",
        features: [
            "500+ medical terms",
            "Detailed definitions",
            "Clinical correlations",
            "Durable cards",
            "Indexed by system",
        ],
        medTip: "Use flashcards for spaced repetition learning. Review regularly and test yourself frequently for better retention.",
        verified: true,
    },
};

const relatedProducts = [
    {
        id: 2,
        image: "https://placehold.co/400x300?text=Stethoscope",
        title: "Professional Stethoscope",
        description: "Dual head, premium quality",
        price: 15000,
        rating: 5,
        reviews: 189,
        tag: "recommended",
    },
    {
        id: 4,
        image: "https://placehold.co/400x300?text=Dissection+Kit",
        title: "Dissection Kit (12-piece)",
        description: "Complete anatomy tools",
        price: 12000,
        rating: 5,
        reviews: 201,
        tag: "recommended",
    },
    {
        id: 8,
        image: "https://placehold.co/400x300?text=Flashcards",
        title: "Study Flashcards Set",
        description: "500+ medical terms",
        price: 5500,
        rating: 5,
        reviews: 178,
        tag: "medPick",
    },
];

export default function ProductDetail() {
    const router = useRouter();
    const { id } = router.query;
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Get product data
    const product = productData[id];
    const formatPrice = (amount) => `₦${amount.toLocaleString()}`;

    // Wait for router to be ready
    React.useEffect(() => {
        if (router.isReady) {
            setIsLoading(false);
        }
    }, [router.isReady]);

    // Handle product not found or loading
    if (isLoading || !router.isReady) {
        return (
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
                    <ProductDetailSkeleton />
                </main>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
                        <Link href="/shop">
                            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                                Back to Shop
                            </button>
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`✅ Added ${quantity} ${product.title} to cart!`);
        setQuantity(1); // Reset quantity after adding
    };

    if (isLoading) {
        return (
            <div className="bg-gray-50 min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 max-w-7xl mx-auto px-4 md:px-8 py-8 w-full">
                    <ProductDetailSkeleton />
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                    {/* Breadcrumb */}
                    <nav className="mb-6 text-sm text-gray-600">
                        <a href="/" className="hover:text-blue-600">Home</a>
                        <span className="mx-2">/</span>
                        <a href="/shop" className="hover:text-blue-600">Shop</a>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900">{product.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Product Images */}
                        <div>
                            {/* Main Image */}
                            <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.title}
                                    className="w-full h-96 object-cover"
                                />
                            </div>

                            {/* Thumbnail Images */}
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`rounded-lg overflow-hidden border-2 transition ${selectedImage === index
                                            ? "border-blue-600"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <img src={img} alt={`View ${index + 1}`} className="w-full h-20 object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            {/* Badges */}
                            <div className="flex gap-2 mb-4">
                                {product.tag && (
                                    <Badge variant={product.tag === "recommended" ? "recommended" : "medPick"}>
                                        {product.tag === "recommended" ? "Clinically Recommended" : "Med-Student Pick"}
                                    </Badge>
                                )}
                                {product.verified && (
                                    <Tooltip content="Verified by medical professionals">
                                        <Badge variant="success">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Verified
                                        </Badge>
                                    </Tooltip>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

                            {/* Rating */}
                            <div className="mb-6">
                                <RatingStars rating={product.rating} reviews={product.reviews} size="lg" />
                            </div>

                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl font-bold text-blue-600">{formatPrice(product.price)}</span>
                                    {product.oldPrice && (
                                        <span className="text-xl text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                                    )}
                                </div>
                                {product.oldPrice && (
                                    <p className="text-green-600 font-semibold mt-2">
                                        Save ₦{(product.oldPrice - product.price).toLocaleString()} (
                                        {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off)
                                    </p>
                                )}
                            </div>

                            {/* Stock Status */}
                            <div className="mb-6">
                                {product.inStock ? (
                                    <Badge variant="success" size="lg">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        In Stock
                                    </Badge>
                                ) : (
                                    <Badge variant="danger" size="lg">Out of Stock</Badge>
                                )}
                            </div>

                            {/* Description */}
                            <div className="mb-6">
                                <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
                            </div>

                            {/* Key Features */}
                            <div className="mb-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Key Features:</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-700">
                                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Medical Student Tip */}
                            {product.medTip && (
                                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6 rounded-r-lg">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-blue-900 mb-1">Medical Student Tip</h4>
                                            <p className="text-blue-800 text-sm">{product.medTip}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-gray-700 font-medium">Quantity:</span>
                                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="px-4 py-2 hover:bg-gray-100 transition"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                                        </svg>
                                    </button>
                                    <span className="px-6 py-2 font-semibold text-lg">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="px-4 py-2 hover:bg-gray-100 transition"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart Button */}
                            <button
                                onClick={handleAddToCart}
                                disabled={!product.inStock}
                                className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Add to Cart
                            </button>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                                <div className="text-center">
                                    <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-xs text-gray-600">Authentic Products</p>
                                </div>
                                <div className="text-center">
                                    <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                    </svg>
                                    <p className="text-xs text-gray-600">Fast Delivery</p>
                                </div>
                                <div className="text-center">
                                    <svg className="w-8 h-8 text-purple-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L13 7.586l-1.293-1.293z" clipRule="evenodd" />
                                    </svg>
                                    <p className="text-xs text-gray-600">Student Discounts</p>
                                </div>
                            </div>

                            {/* Medical Disclaimer */}
                            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-yellow-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <h5 className="font-semibold text-yellow-900 mb-1">Important Notice</h5>
                                        <p className="text-sm text-yellow-800">This product is for educational purposes. Always consult with licensed healthcare professionals for medical advice.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Related Products */}
                    <section className="mt-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Related Products</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
