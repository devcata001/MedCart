// components/CartItem.jsx
import React from "react";
import Link from "next/link";

export default function CartItem({ item, onUpdateQuantity, onRemove }) {
    const { id, image, name, price, quantity } = item;

    const formatPrice = (amount) => `₦${amount.toLocaleString()}`;

    return (
        <div className="flex gap-4 py-4 border-b border-gray-200">
            {/* Product Image */}
            <Link href={`/product/${id}`}>
                <img
                    src={image}
                    alt={name}
                    className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-75 transition"
                />
            </Link>

            {/* Product Info */}
            <div className="flex-1">
                <Link href={`/product/${id}`}>
                    <h3 className="font-semibold text-gray-900 hover:text-blue-600 transition cursor-pointer">
                        {name}
                    </h3>
                </Link>
                <p className="text-lg font-bold text-blue-600 mt-1">{formatPrice(price)}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                            onClick={() => onUpdateQuantity(id, quantity - 1)}
                            disabled={quantity <= 1}
                            className="px-3 py-1 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
                            </svg>
                        </button>
                        <span className="px-4 py-1 font-semibold">{quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(id, quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100 transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                        </button>
                    </div>
                    <button
                        onClick={() => onRemove(id)}
                        className="text-red-500 hover:text-red-700 transition"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Subtotal */}
            <div className="text-right">
                <p className="font-bold text-gray-900">{formatPrice(price * quantity)}</p>
            </div>
        </div>
    );
}
