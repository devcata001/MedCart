// pages/auth/register.jsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Input from "../../components/Input";

export default function Register() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        studentId: "",
        institution: "",
        agreeTerms: false,
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
        if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);
        // TODO: Implement actual registration API call
        setTimeout(() => {
            setIsLoading(false);
            router.push("/auth/login");
        }, 1500);
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <div className="max-w-2xl w-full">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
                            <p className="text-gray-600">Join thousands of medical students</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Full Name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    error={errors.fullName}
                                    required
                                />
                                <Input
                                    label="Phone Number"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <Input
                                label="Email Address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                error={errors.email}
                                required
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Student ID (Optional)"
                                    name="studentId"
                                    value={formData.studentId}
                                    onChange={handleInputChange}
                                    placeholder="For student discounts"
                                />
                                <Input
                                    label="Institution (Optional)"
                                    name="institution"
                                    value={formData.institution}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    label="Password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    error={errors.password}
                                    required
                                />
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    error={errors.confirmPassword}
                                    required
                                />
                            </div>

                            <div>
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-blue-600 rounded mt-1"
                                    />
                                    <span className="text-sm text-gray-600">
                                        I agree to the{" "}
                                        <Link href="#" className="text-blue-600 hover:underline">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="#" className="text-blue-600 hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </span>
                                </label>
                                {errors.agreeTerms && <p className="text-sm text-red-500 mt-1">{errors.agreeTerms}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-gray-600">
                                Already have an account?{" "}
                                <Link href="/auth/login" className="text-blue-600 font-semibold hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
