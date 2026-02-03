// pages/shop.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import Badge from "../components/Badge";
import Modal from "../components/Modal";
import { ProductGridSkeleton } from "../components/LoadingSkeleton";

// Mock product data - Replace with API call
const allProducts = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
        title: "Gray's Anatomy (42nd Edition)",
        description: "Essential anatomy reference",
        price: 28500,
        oldPrice: 35000,
        rating: 5,
        reviews: 234,
        category: "Study Tools",
        healthGoal: "Focus",
        studyLevel: "Preclinical",
        tag: "recommended",
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400&h=300&fit=crop",
        title: "Professional Stethoscope",
        description: "Dual head, premium quality",
        price: 15000,
        rating: 5,
        reviews: 189,
        category: "Clinical Essentials",
        studyLevel: "Clinical",
        tag: "recommended",
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=400&h=300&fit=crop",
        title: "Premium Lab Coat",
        description: "100% cotton, all sizes",
        price: 8500,
        rating: 4,
        reviews: 156,
        category: "Clinical Essentials",
        studyLevel: "Clinical",
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
        category: "Clinical Essentials",
        studyLevel: "Preclinical",
        tag: "recommended",
    },
    {
        id: 5,
        image: "https://images.unsplash.com/photo-1550572017-4fade35b4151?w=400&h=300&fit=crop",
        title: "Vitamin D3 Supplement",
        description: "Supports immune health",
        price: 4500,
        rating: 4.5,
        reviews: 89,
        category: "Supplements",
        healthGoal: "Immunity",
        tag: "medPick",
    },
    {
        id: 6,
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&h=300&fit=crop",
        title: "Focus & Memory Capsules",
        description: "Natural nootropic blend",
        price: 6500,
        rating: 4,
        reviews: 124,
        category: "Supplements",
        healthGoal: "Focus",
    },
    {
        id: 7,
        image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
        title: "Stress Relief Tea",
        description: "Calming herbal blend",
        price: 3200,
        rating: 4.5,
        reviews: 67,
        category: "Wellness",
        healthGoal: "Stress Relief",
    },
    {
        id: 8,
        image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
        title: "Study Flashcards Set",
        description: "500+ medical terms",
        price: 5500,
        rating: 5,
        reviews: 178,
        category: "Study Tools",
        studyLevel: "Preclinical",
        tag: "medPick",
    },
];

export default function Shop() {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("recommended");
    const [filters, setFilters] = useState({
        category: [],
        priceRange: [0, 50000],
        healthGoal: [],
        studyLevel: [],
    });
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Filter products based on active filters
    const filteredProducts = allProducts.filter(product => {
        // Search filter
        if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }
        // Category filter
        if (filters.category.length > 0 && !filters.category.includes(product.category)) {
            return false;
        }
        // Price range filter
        if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
            return false;
        }
        // Health goal filter
        if (filters.healthGoal.length > 0 && product.healthGoal && !filters.healthGoal.includes(product.healthGoal)) {
            return false;
        }
        // Study level filter
        if (filters.studyLevel.length > 0 && product.studyLevel && !filters.studyLevel.includes(product.studyLevel)) {
            return false;
        }
        return true;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "priceLowHigh":
                return a.price - b.price;
            case "priceHighLow":
                return b.price - a.price;
            case "recommended":
            default:
                return 0;
        }
    });

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            if (Array.isArray(newFilters[filterType])) {
                if (newFilters[filterType].includes(value)) {
                    newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
                } else {
                    newFilters[filterType] = [...newFilters[filterType], value];
                }
            }
            return newFilters;
        });
    };

    const clearFilters = () => {
        setFilters({
            category: [],
            priceRange: [0, 50000],
            healthGoal: [],
            studyLevel: [],
        });
        setSearchQuery("");
    };

    const FilterSidebar = () => (
        <div className="space-y-6">
            {/* Categories */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
                {["Study Tools", "Clinical Essentials", "Wellness", "Supplements"].map(category => (
                    <label key={category} className="flex items-center gap-2 py-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.category.includes(category)}
                            onChange={() => handleFilterChange("category", category)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-gray-700">{category}</span>
                    </label>
                ))}
            </div>

            {/* Price Range */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                    <input
                        type="range"
                        min="0"
                        max="50000"
                        step="1000"
                        value={filters.priceRange[1]}
                        onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>₦0</span>
                        <span>₦{filters.priceRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Health Goal */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Health Goal</h3>
                {["Focus", "Immunity", "Stress Relief", "Energy"].map(goal => (
                    <label key={goal} className="flex items-center gap-2 py-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.healthGoal.includes(goal)}
                            onChange={() => handleFilterChange("healthGoal", goal)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-gray-700">{goal}</span>
                    </label>
                ))}
            </div>

            {/* Study Level */}
            <div>
                <h3 className="font-semibold text-gray-900 mb-3">Study Level</h3>
                {["Preclinical", "Clinical"].map(level => (
                    <label key={level} className="flex items-center gap-2 py-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={filters.studyLevel.includes(level)}
                            onChange={() => handleFilterChange("studyLevel", level)}
                            className="w-4 h-4 text-blue-600 rounded"
                        />
                        <span className="text-gray-700">{level}</span>
                    </label>
                ))}
            </div>

            {/* Clear Filters */}
            <button
                onClick={clearFilters}
                className="w-full py-2 text-blue-600 font-semibold hover:bg-blue-50 rounded-lg transition"
            >
                Clear All Filters
            </button>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shop Medical Supplies</h1>
                        <p className="text-gray-600">Everything you need for medical school success</p>
                    </div>

                    {/* Search & Sort Bar */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                        >
                            <option value="recommended">Recommended</option>
                            <option value="priceLowHigh">Price: Low to High</option>
                            <option value="priceHighLow">Price: High to Low</option>
                        </select>

                        {/* Mobile Filter Button */}
                        <button
                            onClick={() => setMobileFiltersOpen(true)}
                            className="lg:hidden flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filters
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Desktop Filter Sidebar */}
                        <aside className="hidden lg:block w-64 flex-shrink-0">
                            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                                <FilterSidebar />
                            </div>
                        </aside>

                        {/* Products Grid */}
                        <div className="flex-1">
                            {/* Results Count */}
                            <div className="mb-4 text-gray-600">
                                Showing {sortedProducts.length} of {allProducts.length} products
                            </div>

                            {/* Loading State */}
                            {isLoading && <ProductGridSkeleton count={8} />}

                            {/* Products Grid */}
                            {!isLoading && sortedProducts.length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {sortedProducts.map(product => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            )}

                            {/* Empty State */}
                            {!isLoading && sortedProducts.length === 0 && (
                                <div className="text-center py-16">
                                    <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                                    <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Mobile Filter Modal */}
            <Modal
                isOpen={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                title="Filters"
                size="full"
            >
                <FilterSidebar />
            </Modal>

            <Footer />
        </div>
    );
}
