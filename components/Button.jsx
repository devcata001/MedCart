// components/Button.jsx
import React from "react";

export default function Button({ children, variant = "primary", className = "", onClick, href }) {
    const baseStyles = "px-6 py-3 rounded-full font-semibold transition-all duration-200 inline-flex items-center gap-2";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
        secondary: "border-2 border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white",
        outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    };

    const styles = `${baseStyles} ${variants[variant]} ${className}`;

    if (href) {
        return (
            <a href={href} className={styles}>
                {children}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
            </a>
        );
    }

    return (
        <button onClick={onClick} className={styles}>
            {children}
        </button>
    );
}
