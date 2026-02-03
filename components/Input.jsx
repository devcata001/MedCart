// components/Input.jsx
import React from "react";

export default function Input({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    error,
    required = false,
    disabled = false,
    icon,
    ...props
}) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                {icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {icon}
                    </div>
                )}
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`w-full px-4 py-3 border rounded-lg transition-all ${icon ? "pl-10" : ""
                        } ${error
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
                        } outline-none`}
                    {...props}
                />
            </div>
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
