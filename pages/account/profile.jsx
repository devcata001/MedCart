// pages/account/profile.jsx
import React, { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Input from "../../components/Input";

export default function Profile() {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "Chioma Okafor",
        email: "chioma.okafor@example.com",
        phone: "+234 800 123 4567",
        studentId: "MED2023001",
        institution: "University of Lagos",
        level: "MBBS 3",
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsSaving(true);
        // TODO: Implement API call to save profile
        setTimeout(() => {
            setIsSaving(false);
            setIsEditing(false);
        }, 1000);
    };

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
                                        <div className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                            </svg>
                                            Orders
                                        </div>
                                    </Link>
                                    <Link href="/account/profile">
                                        <div className="flex items-center gap-3 p-3 bg-blue-50 text-blue-600 rounded-lg font-medium cursor-pointer">
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
                            <div className="flex items-center justify-between mb-6">
                                <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-8">
                                {/* Profile Picture */}
                                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-3xl">
                                        {formData.fullName.charAt(0)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{formData.fullName}</h2>
                                        <p className="text-gray-600">{formData.email}</p>
                                        {isEditing && (
                                            <button className="mt-2 text-sm text-blue-600 hover:underline">
                                                Change Profile Picture
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Profile Information */}
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Full Name"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <Input
                                            label="Email Address"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Phone Number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <Input
                                            label="Student ID"
                                            name="studentId"
                                            value={formData.studentId}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Input
                                            label="Institution"
                                            name="institution"
                                            value={formData.institution}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                        <Input
                                            label="Study Level"
                                            name="level"
                                            value={formData.level}
                                            onChange={handleInputChange}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>

                                {/* Edit Buttons */}
                                {isEditing && (
                                    <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
                                        <button
                                            onClick={handleSave}
                                            disabled={isSaving}
                                            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                                        >
                                            {isSaving ? "Saving..." : "Save Changes"}
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Change Password Section */}
                            <div className="bg-white rounded-lg shadow-sm p-8 mt-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
                                <div className="space-y-6">
                                    <Input
                                        label="Current Password"
                                        type="password"
                                        placeholder="Enter current password"
                                    />
                                    <Input
                                        label="New Password"
                                        type="password"
                                        placeholder="Enter new password"
                                    />
                                    <Input
                                        label="Confirm New Password"
                                        type="password"
                                        placeholder="Confirm new password"
                                    />
                                    <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                                        Update Password
                                    </button>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-white rounded-lg shadow-sm p-8 mt-6 border-2 border-red-200">
                                <h2 className="text-xl font-bold text-red-600 mb-4">Danger Zone</h2>
                                <p className="text-gray-600 mb-4">
                                    Once you delete your account, there is no going back. Please be certain.
                                </p>
                                <button className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">
                                    Delete Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
