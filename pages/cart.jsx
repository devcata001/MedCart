// pages/cart.jsx
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItem from "../components/CartItem";
import Input from "../components/Input";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const router = useRouter();
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, isAuthenticated } = useCart();
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);

    const formatPrice = (amount) => `₦${amount.toLocaleString()}`;

    const handleUpdateQuantity = (id, newQuantity) => {
        updateQuantity(id, newQuantity);
    };

    const handleRemoveItem = (id) => {
        removeFromCart(id);
    };

    const handleApplyCoupon = () => {
        if (couponCode.toUpperCase() === "MEDSTUDENT10") {
            setAppliedCoupon({ code: couponCode, discount: 0.1 });
            alert("Coupon applied! 10% discount");
        } else {
            alert("Invalid coupon code");
        }
    };

    const handleProceedToCheckout = () => {
        if (!isAuthenticated) {
            alert("⚠️ Please login or create an account to proceed with checkout");
            router.push("/auth/login");
        } else {
            router.push("/checkout");
        }
    };

    // Calculate totals
    const subtotal = getCartTotal();
    const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;
    const shipping = subtotal >= 50000 ? 0 : 2500;
    const total = subtotal - discount + shipping;

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                    {/* Page Header */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

                    {cartItems.length === 0 ? (
                        /* Empty Cart State */
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <svg className="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                            <p className="text-gray-600 mb-6">Add some medical supplies to get started</p>
                            <Link href="/shop">
                                <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                                    Continue Shopping
                                </button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2">
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                                        Cart Items ({cartItems.length})
                                    </h2>
                                    <div className="divide-y divide-gray-200">
                                        {cartItems.map(item => (
                                            <CartItem
                                                key={item.id}
                                                item={item}
                                                onUpdateQuantity={handleUpdateQuantity}
                                                onRemove={handleRemoveItem}
                                            />
                                        ))}
                                    </div>
                                    <Link href="/shop">
                                        <button className="mt-6 text-blue-600 font-semibold hover:underline flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                            </svg>
                                            Continue Shopping
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                    <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                                    {/* Subtotal */}
                                    <div className="flex justify-between text-gray-700 mb-3">
                                        <span>Subtotal</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>

                                    {/* Discount */}
                                    {appliedCoupon && (
                                        <div className="flex justify-between text-green-600 mb-3">
                                            <span>Discount ({appliedCoupon.code})</span>
                                            <span>-{formatPrice(discount)}</span>
                                        </div>
                                    )}

                                    {/* Shipping */}
                                    <div className="flex justify-between text-gray-700 mb-3">
                                        <span>Shipping</span>
                                        <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                                    </div>

                                    {shipping > 0 && (
                                        <p className="text-sm text-blue-600 mb-4">
                                            Add ₦{(50000 - subtotal).toLocaleString()} more for free shipping!
                                        </p>
                                    )}

                                    {/* Coupon Code */}
                                    <div className="border-t border-gray-200 pt-4 mb-4">
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Coupon code"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                            />
                                            <button
                                                onClick={handleApplyCoupon}
                                                className="px-4 py-3 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-900 transition whitespace-nowrap"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                    </div>

                                    {/* Total */}
                                    <div className="border-t border-gray-200 pt-4 mb-6">
                                        <div className="flex justify-between items-center">
                                            <span className="text-xl font-bold text-gray-900">Total</span>
                                            <span className="text-2xl font-bold text-blue-600">{formatPrice(total)}</span>
                                        </div>
                                    </div>

                                    {/* Checkout Button */}
                                    <button
                                        onClick={handleProceedToCheckout}
                                        className="w-full bg-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                                    >
                                        Proceed to Checkout
                                    </button>

                                    {/* Trust Badges */}
                                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                            <span>Secure payment</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
                                            </svg>
                                            <span>Fast delivery nationwide</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600">
                                            <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span>Easy returns</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
