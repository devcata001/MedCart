// components/LoadingSkeleton.jsx
import React from "react";

export function ProductCardSkeleton() {
    return (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm animate-pulse">
            <div className="bg-gray-200 h-48 w-full"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            </div>
        </div>
    );
}

export function ProductGridSkeleton({ count = 8 }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(count)].map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

export function ProductDetailSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-200 h-96 rounded-lg"></div>
                <div className="space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    <div className="h-12 bg-gray-200 rounded w-full mt-8"></div>
                </div>
            </div>
        </div>
    );
}
