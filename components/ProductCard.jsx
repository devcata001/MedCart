// components/ProductCard.jsx
import React from "react";
import Link from "next/link";
import Badge from "./Badge";
import RatingStars from "./RatingStars";

export default function ProductCard({ product }) {
    const { id, image, title, description, price, oldPrice, rating, reviews, tag } = product;

    // Format price to Nigerian Naira
    const formatPrice = (amount) => `₦${amount.toLocaleString()}`;

    return (
        <Link href={`/product/${id}`}>
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gray-100">
                    {tag && (
                        <div className="absolute top-3 left-3 z-10">
                            <Badge variant={tag === "recommended" ? "recommended" : "medPick"} size="sm">
                                {tag === "recommended" ? "Clinically Recommended" : "Med-Student Pick"}
                            </Badge>
                        </div>
                    )}
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Product Info */}
                <div className="p-4">
                    {/* Rating */}
                    <div className="mb-2">
                        <RatingStars rating={rating} reviews={reviews} size="sm" />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">{title}</h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3">{description}</p>

                    {/* Price & Button */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xl font-bold text-blue-600">{formatPrice(price)}</div>
                            {oldPrice && (
                                <div className="text-sm text-gray-400 line-through">{formatPrice(oldPrice)}</div>
                            )}
                        </div>
                        <button className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
