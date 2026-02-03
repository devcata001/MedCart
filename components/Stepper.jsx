// components/Stepper.jsx
import React from "react";

export default function Stepper({ steps, currentStep }) {
    return (
        <div className="w-full py-6">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = stepNumber < currentStep;
                    const isCurrent = stepNumber === currentStep;

                    return (
                        <React.Fragment key={index}>
                            {/* Step */}
                            <div className="flex flex-col items-center flex-1">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${isCompleted
                                        ? "bg-green-500 text-white"
                                        : isCurrent
                                            ? "bg-blue-600 text-white ring-4 ring-blue-100"
                                            : "bg-gray-200 text-gray-500"
                                    }`}>
                                    {isCompleted ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>
                                <span className={`mt-2 text-xs md:text-sm font-medium text-center ${isCurrent ? "text-blue-600" : "text-gray-500"
                                    }`}>
                                    {step}
                                </span>
                            </div>

                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className={`h-1 flex-1 mx-2 rounded transition-all ${isCompleted ? "bg-green-500" : "bg-gray-200"
                                    }`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
