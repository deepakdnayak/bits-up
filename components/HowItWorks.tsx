"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (sectionRef.current) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%", // Starts animation when 80% of section is in view
            toggleActions: "play none none none",
          },
        }
      );
    }

    stepsRef.current.forEach((step, index) => {
      gsap.fromTo(
        step,
        { opacity: 0, scale: 0.8, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: index * 0.2, // Staggered effect
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-12 bg-white">
      <h2 className="text-3xl font-bold text-center text-gray-800">How It Works</h2>
      <div className="flex flex-wrap justify-center gap-8 mt-8 max-w-5xl mx-auto">
        {[
          { title: "1. Select a Quiz", text: "Choose from various categories and topics." },
          { title: "2. Answer Questions", text: "Attempt questions and submit your answers." },
          { title: "3. View Score", text: "Check your performance and improve." },
        ].map((step, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) stepsRef.current[index] = el;
            }}
            className="w-64 p-6 bg-white rounded-lg shadow-md text-center transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-xl font-semibold text-blue-600">{step.title}</h3>
            <p className="mt-2 text-gray-600">{step.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
