// components/CategoryCard.jsx
import React from "react";
import Link from "next/link";

export default function CategoryCard({ category }) {
    const { name, description, icon, link, bg, cta } = category;

    return (
        <Link href={link}>
            <div className={`bg-gradient-to-br ${bg} text-white rounded-2xl p-8 hover:scale-105 transition-transform duration-300 shadow-lg cursor-pointer`}>
                {/* Icon */}
                <div className="mb-6 inline-block bg-white bg-opacity-20 rounded-full p-4">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        {name === "Textbooks" && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        )}
                        {name === "Lab Equipment" && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        )}
                        {name === "Study Aids" && (
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        )}
                    </svg>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold mb-2">{name}</h3>
                <p className="text-white text-opacity-90 mb-6">{description}</p>

                {/* CTA Link */}
                <div className="font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
                    {cta}
                </div>
            </div>
        </Link>
    );
}
