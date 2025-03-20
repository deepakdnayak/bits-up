"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1 }
    )
      .fromTo(textRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0 }, "-=0.5")
      .fromTo(buttonRef.current, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1 }, "-=0.4");
  }, []);

  return (
    <section
      ref={heroRef}
      className="flex flex-col items-center justify-center h-screen text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6"
    >
      {/* Heading */}
      <h1 ref={headingRef} className="text-5xl md:text-6xl font-bold tracking-wide">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-500">
          Welcome to
        </span>{" "}
        BitsUp
      </h1>

      {/* Subtext */}
      <p ref={textRef} className="mt-4 text-lg md:text-xl max-w-2xl opacity-80">
        Challenge yourself with exciting quizzes and improve your skills. Compete with your peers
        and climb the leaderboard!
      </p>

      {/* Buttons */}
      <div ref={buttonRef} className="mt-6 flex space-x-4">
        <Link href="/Quiz">
          <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 hover:scale-105 transition-transform duration-300">
            Start a Quiz
          </button>
        </Link>
        <Link href="/LeaderBoard">
          <button className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg shadow-lg hover:bg-gray-700 hover:scale-105 transition-transform duration-300">
            View Leaderboard
          </button>
        </Link>
      </div>
    </section>
  );
}
