// pages/account/orders.jsx
import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Badge from "../../components/Badge";

// Mock order data
const orders = [
    {
        id: "MED12345678",
        date: "Feb 1, 2026",
        status: "delivered",
        total: 58500,
        items: [
            { name: "Gray's Anatomy (42nd Edition)", qty: 1, price: 28500 },
            { name: "Professional Stethoscope", qty: 2, price: 15000 },
        ],
    },
    {
        id: "MED12345679",
        date: "Jan 28, 2026",
        status: "processing",
        total: 12000,
        items: [
            { name: "Dissection Kit (12-piece)", qty: 1, price: 12000 },
        ],
    },
    {
        id: "MED12345680",
        date: "Jan 15, 2026",
        status: "shipped",
        total: 35000,
        items: [
            { name: "Medical Textbook Bundle", qty: 1, price: 35000 },
        ],
    },
];

export default function Orders() {
    const [selectedTab, setSelectedTab] = useState("all");
    const formatPrice = (amount) => `₦${amount.toLocaleString()}`;

    const getStatusBadge = (status) => {
        const statusConfig = {
            delivered: { variant: "success", text: "Delivered" },
            processing: { variant: "warning", text: "Processing" },
            shipped: { variant: "primary", text: "Shipped" },
            cancelled: { variant: "danger", text: "Cancelled" },
        };
        const config = statusConfig[status];
        return <Badge variant={config.variant}>{config.text}</Badge>;
    };

    const filteredOrders = selectedTab === "all" ? orders : orders.filter(o => o.status === selectedTab);

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full md:w-64 flex-shrink-0">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h2 className="font-bold text-gray-900 mb-4">My Account</h2>
                                <nav className="space-y-2">
                                    <Link href="/account/orders">
                                        <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-lg font-medium cursor-pointer">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            Orders
                                        </div>
                                    </Link>
                                    <Link href="/account/profile">
                                        <div className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profile
                                        </div>
                                    </Link>
                                    <Link href="/account/addresses">
                                        <div className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Addresses
                                        </div>
                                    </Link>
                                    <button className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg w-full">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </nav>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">My Orders</h1>

                            {/* Tabs */}
                            <div className="bg-white rounded-lg shadow-sm mb-6">
                                <div className="flex border-b border-gray-200 overflow-x-auto">
                                    {["all", "processing", "shipped", "delivered"].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setSelectedTab(tab)}
                                            className={`px-6 py-4 font-medium capitalize whitespace-nowrap ${selectedTab === tab
                                                    ? "border-b-2 border-blue-600 text-blue-600"
                                                    : "text-gray-600 hover:text-gray-900"
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Orders List */}
                            <div className="space-y-4">
                                {filteredOrders.length === 0 ? (
                                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        <p className="text-gray-600">No orders found</p>
                                    </div>
                                ) : (
                                    filteredOrders.map(order => (
                                        <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 pb-4 border-b border-gray-200">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">Order #{order.id}</h3>
                                                    <p className="text-sm text-gray-600">{order.date}</p>
                                                </div>
                                                <div className="flex items-center gap-4 mt-2 md:mt-0">
                                                    {getStatusBadge(order.status)}
                                                    <span className="font-bold text-gray-900">{formatPrice(order.total)}</span>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div className="space-y-3 mb-4">
                                                {order.items.map((item, index) => (
                                                    <div key={index} className="flex justify-between text-gray-700">
                                                        <span>{item.name} (x{item.qty})</span>
                                                        <span>{formatPrice(item.price * item.qty)}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Actions */}
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                                                    View Details
                                                </button>
                                                {order.status === "delivered" && (
                                                    <button className="px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition">
                                                        Reorder
                                                    </button>
                                                )}
                                                {order.status === "processing" && (
                                                    <button className="px-6 py-2 border-2 border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition">
                                                        Cancel Order
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
