"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <nav className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold">
                    BitsUp.
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-6">
                    <Link href="/Quiz" className="hover:scale-110 hover:text-blue-500 transition-all">
                        Quizes
                    </Link>
                    <Link href="/LeaderBoard" className="hover:scale-110 hover:text-blue-500 transition-all">
                        Leaderboard
                    </Link>
                    <Link href="/AboutUs" className="hover:scale-110 hover:text-blue-500 transition-all">
                        About Us
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                className="md:hidden flex items-center focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
                >
                <span className="sr-only">Toggle Menu</span>
                <svg
                    className="w-6 h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                </svg>
                </button>
            </div>

            {/* Mobile Links */}
            {isOpen && (
                <div className="md:hidden text-black">
                    <Link href="/Quiz" className="block px-4 py-2 hover:text-blue-500">
                        Quizes
                    </Link>
                    <Link href="/LeaderBoard" className="block px-4 py-2 hover:text-blue-500">
                        Leaderboard
                    </Link>
                    <Link href="/AboutUs" className="block px-4 py-2 hover:text-blue-500">
                        About Us
                    </Link>
                </div>
            )}
            </nav>
    )
}

export default Navbar