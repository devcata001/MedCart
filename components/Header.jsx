// components/Header.jsx
import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { getCartCount } = useCart();

    return (
        <header className="bg-white shadow-sm sticky top-0 z-30">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-xl md:text-2xl font-bold text-blue-700 flex items-center gap-2">
                        <span className="bg-blue-600 rounded p-1 text-white">
                            <svg width="20" height="20" className="md:w-6 md:h-6" fill="none" viewBox="0 0 24 24">
                                <rect width="24" height="24" rx="6" fill="#2563EB" />
                                <path d="M12 7v10M7 12h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </span>
                        MedCart
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex gap-6 xl:gap-8 text-gray-700 font-medium text-sm xl:text-base">
                    <Link href="/shop" className="hover:text-blue-600 transition">Textbooks</Link>
                    <Link href="/shop" className="hover:text-blue-600 transition">Lab Equipment</Link>
                    <Link href="/shop" className="hover:text-blue-600 transition">Study Aids</Link>
                    <Link href="/shop" className="hover:text-blue-600 transition">Supplies</Link>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-2 md:gap-4">
                    {/* Search Icon */}
                    <button className="p-2 hover:bg-gray-100 rounded-full transition">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </button>

                    {/* Cart Icon */}
                    <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {getCartCount() > 0 && (
                            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                                {getCartCount()}
                            </span>
                        )}
                    </Link>

                    {/* Desktop Auth Buttons */}
                    <Link href="/auth/login" className="hidden lg:inline-block">
                        <button className="px-4 xl:px-5 py-2 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition text-sm xl:text-base">
                            Login
                        </button>
                    </Link>
                    <Link href="/auth/register" className="hidden lg:inline-block">
                        <button className="px-4 xl:px-5 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-sm xl:text-base">
                            Sign Up
                        </button>
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden border-t border-gray-200 bg-white">
                    <nav className="flex flex-col px-4 py-3 space-y-3">
                        <Link href="/shop" className="text-gray-700 font-medium py-2 hover:text-blue-600 transition">
                            Textbooks
                        </Link>
                        <Link href="/shop" className="text-gray-700 font-medium py-2 hover:text-blue-600 transition">
                            Lab Equipment
                        </Link>
                        <Link href="/shop" className="text-gray-700 font-medium py-2 hover:text-blue-600 transition">
                            Study Aids
                        </Link>
                        <Link href="/shop" className="text-gray-700 font-medium py-2 hover:text-blue-600 transition">
                            Supplies
                        </Link>
                        <div className="pt-3 border-t border-gray-200 flex flex-col gap-3">
                            <Link href="/auth/login">
                                <button className="w-full px-5 py-2.5 rounded-full border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">
                                    Login
                                </button>
                            </Link>
                            <Link href="/auth/register">
                                <button className="w-full px-5 py-2.5 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                                    Sign Up
                                </button>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
