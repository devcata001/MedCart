// pages/checkout.jsx
import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Stepper from "../components/Stepper";

const steps = ["Shipping Info", "Payment", "Review Order", "Confirmation"];

export default function Checkout() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Shipping Info
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        // Payment
        paymentMethod: "card",
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
    });

    const [errors, setErrors] = useState({});
    const [orderNumber, setOrderNumber] = useState("");
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const formatPrice = (amount) => `₦${amount.toLocaleString()}`;

    // Mock cart data
    const cartItems = [
        {
            id: 1,
            name: "Gray's Anatomy (42nd Edition)",
            price: 28500,
            quantity: 1,
        },
        {
            id: 2,
            name: "Professional Stethoscope",
            price: 15000,
            quantity: 2,
        },
    ];

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 2500;
    const total = subtotal + shipping;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateShipping = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePayment = () => {
        if (formData.paymentMethod === "card") {
            const newErrors = {};
            if (!formData.cardNumber) newErrors.cardNumber = "Card number is required";
            if (!formData.cardName) newErrors.cardName = "Cardholder name is required";
            if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";
            if (!formData.cvv) newErrors.cvv = "CVV is required";

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        }
        return true;
    };

    const handleNext = () => {
        if (currentStep === 1 && !validateShipping()) return;
        if (currentStep === 2 && !validatePayment()) return;

        if (currentStep === 3) {
            // Simulate payment processing
            setIsProcessingPayment(true);

            // Demo payment simulation with 2-second delay
            setTimeout(() => {
                const orderNum = "MED" + Date.now().toString().slice(-8);
                setOrderNumber(orderNum);
                setIsProcessingPayment(false);
                setCurrentStep(4);

                // Show success notification
                alert(`✅ Payment Successful!\n\nOrder Number: ${orderNum}\n\nThis is a demo payment. In production, this will integrate with Paystack or Stripe.`);
            }, 2000);

            return; // Don't proceed to next step immediately
        }

        setCurrentStep(prev => Math.min(4, prev + 1));
    };

    const handleBack = () => {
        setCurrentStep(prev => Math.max(1, prev - 1));
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

                    {/* Stepper */}
                    <Stepper steps={steps} currentStep={currentStep} />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                {/* Step 1: Shipping Info */}
                                {currentStep === 1 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Information</h2>
                                        <div className="space-y-4">
                                            <Input
                                                label="Full Name"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                error={errors.fullName}
                                                required
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <Input
                                                    label="Email"
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    error={errors.email}
                                                    required
                                                />
                                                <Input
                                                    label="Phone Number"
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    error={errors.phone}
                                                    required
                                                />
                                            </div>
                                            <Input
                                                label="Street Address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                error={errors.address}
                                                required
                                            />
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <Input
                                                    label="City"
                                                    name="city"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    error={errors.city}
                                                    required
                                                />
                                                <Input
                                                    label="State"
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    error={errors.state}
                                                    required
                                                />
                                                <Input
                                                    label="ZIP Code"
                                                    name="zipCode"
                                                    value={formData.zipCode}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Payment */}
                                {currentStep === 2 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h2>

                                        {/* Payment Method Selection */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                            <button
                                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "card" }))}
                                                className={`p-4 border-2 rounded-lg transition ${formData.paymentMethod === "card"
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <svg className="w-8 h-8 mx-auto mb-2 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                                </svg>
                                                <p className="font-semibold">Card Payment</p>
                                            </button>
                                            <button
                                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "bank" }))}
                                                className={`p-4 border-2 rounded-lg transition ${formData.paymentMethod === "bank"
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <svg className="w-8 h-8 mx-auto mb-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                                                </svg>
                                                <p className="font-semibold">Bank Transfer</p>
                                            </button>
                                            <button
                                                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: "paystack" }))}
                                                className={`p-4 border-2 rounded-lg transition ${formData.paymentMethod === "paystack"
                                                    ? "border-blue-600 bg-blue-50"
                                                    : "border-gray-200 hover:border-gray-300"
                                                    }`}
                                            >
                                                <svg className="w-8 h-8 mx-auto mb-2 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                                </svg>
                                                <p className="font-semibold">Paystack</p>
                                            </button>
                                        </div>

                                        {/* Card Payment Form */}
                                        {formData.paymentMethod === "card" && (
                                            <div className="space-y-4">
                                                <Input
                                                    label="Card Number"
                                                    name="cardNumber"
                                                    placeholder="1234 5678 9012 3456"
                                                    value={formData.cardNumber}
                                                    onChange={handleInputChange}
                                                    error={errors.cardNumber}
                                                    required
                                                />
                                                <Input
                                                    label="Cardholder Name"
                                                    name="cardName"
                                                    value={formData.cardName}
                                                    onChange={handleInputChange}
                                                    error={errors.cardName}
                                                    required
                                                />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <Input
                                                        label="Expiry Date"
                                                        name="expiryDate"
                                                        placeholder="MM/YY"
                                                        value={formData.expiryDate}
                                                        onChange={handleInputChange}
                                                        error={errors.expiryDate}
                                                        required
                                                    />
                                                    <Input
                                                        label="CVV"
                                                        name="cvv"
                                                        placeholder="123"
                                                        value={formData.cvv}
                                                        onChange={handleInputChange}
                                                        error={errors.cvv}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        {/* Bank Transfer Instructions */}
                                        {formData.paymentMethod === "bank" && (
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                                <h3 className="font-semibold text-blue-900 mb-4">Bank Transfer Details</h3>
                                                <div className="space-y-2 text-blue-800">
                                                    <p><strong>Bank:</strong> First Bank of Nigeria</p>
                                                    <p><strong>Account Name:</strong> MedCart Nigeria Ltd</p>
                                                    <p><strong>Account Number:</strong> 1234567890</p>
                                                    <p className="text-sm mt-4">
                                                        Please make your payment and use your email as reference.
                                                        You'll receive an order confirmation once payment is verified.
                                                    </p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Paystack Info */}
                                        {formData.paymentMethod === "paystack" && (
                                            <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
                                                <h3 className="font-semibold text-teal-900 mb-4">Paystack Payment</h3>
                                                <p className="text-teal-800 mb-4">
                                                    You'll be redirected to Paystack to complete your payment securely.
                                                </p>
                                                <div className="flex items-center gap-2 text-sm text-teal-700">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                    </svg>
                                                    <span>Secure payment processing</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Step 3: Review Order */}
                                {currentStep === 3 && (
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Review Your Order</h2>

                                        {/* Demo Payment Notice */}
                                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                                            <div className="flex">
                                                <svg className="w-5 h-5 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                                </svg>
                                                <div>
                                                    <h3 className="text-sm font-medium text-yellow-800">Demo Payment Mode</h3>
                                                    <p className="mt-1 text-sm text-yellow-700">
                                                        This is a demo checkout. No real payment will be processed.
                                                        Click "Place Order" to simulate a successful payment.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Shipping Info Review */}
                                        <div className="mb-6">
                                            <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                                            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                                                <p className="font-semibold">{formData.fullName}</p>
                                                <p>{formData.email}</p>
                                                <p>{formData.phone}</p>
                                                <p className="mt-2">{formData.address}</p>
                                                <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                                            </div>
                                        </div>

                                        {/* Payment Method Review */}
                                        <div className="mb-6">
                                            <h3 className="font-semibold text-gray-900 mb-3">Payment Method</h3>
                                            <div className="bg-gray-50 rounded-lg p-4 text-gray-700">
                                                {formData.paymentMethod === "card" && <p>Card ending in {formData.cardNumber.slice(-4)}</p>}
                                                {formData.paymentMethod === "bank" && <p>Bank Transfer</p>}
                                                {formData.paymentMethod === "paystack" && <p>Paystack Payment</p>}
                                            </div>
                                        </div>

                                        {/* Items Review */}
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-3">Order Items</h3>
                                            <div className="space-y-3">
                                                {cartItems.map(item => (
                                                    <div key={item.id} className="flex justify-between bg-gray-50 rounded-lg p-4">
                                                        <div>
                                                            <p className="font-semibold text-gray-900">{item.name}</p>
                                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                        </div>
                                                        <p className="font-semibold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Step 4: Confirmation */}
                                {currentStep === 4 && (
                                    <div className="text-center py-12">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
                                        <p className="text-lg text-gray-600 mb-2">Thank you for your order</p>
                                        <p className="text-gray-500 mb-4">
                                            Order Number: <span className="font-semibold text-blue-600">{orderNumber}</span>
                                        </p>

                                        {/* Demo Mode Notice */}
                                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                                            <p className="text-sm text-blue-800">
                                                <strong>Demo Mode:</strong> This was a simulated payment.
                                                In production, real payments will be processed via Paystack or Stripe.
                                            </p>
                                        </div>

                                        <p className="text-gray-600 mb-8">
                                            We've sent a confirmation email to <strong>{formData.email}</strong>
                                        </p>
                                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                            <button
                                                onClick={() => router.push("/")}
                                                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                                            >
                                                Continue Shopping
                                            </button>
                                            <button
                                                onClick={() => router.push("/account/orders")}
                                                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                                            >
                                                View Orders
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Navigation Buttons */}
                                {currentStep < 4 && (
                                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                                        <button
                                            onClick={handleBack}
                                            disabled={currentStep === 1 || isProcessingPayment}
                                            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Back
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={isProcessingPayment}
                                            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                        >
                                            {isProcessingPayment ? (
                                                <>
                                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Processing...
                                                </>
                                            ) : (
                                                currentStep === 3 ? "Place Order" : "Continue"
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        {currentStep < 4 && (
                            <div className="lg:col-span-1">
                                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                                    <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                                    <div className="space-y-3 text-sm mb-4">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="flex justify-between text-gray-700">
                                                <span>{item.name} (x{item.quantity})</span>
                                                <span>{formatPrice(item.price * item.quantity)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="border-t border-gray-200 pt-4 space-y-2 text-sm">
                                        <div className="flex justify-between text-gray-700">
                                            <span>Subtotal</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700">
                                            <span>Shipping</span>
                                            <span>{formatPrice(shipping)}</span>
                                        </div>
                                        <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                            <span>Total</span>
                                            <span className="text-blue-600">{formatPrice(total)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
