"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Info() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

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
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { rotateY: 90, opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: index * 0.2, // Stagger effect for each card
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-12 px-6 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">Why Choose BitsUp?</h2>
      <div className="grid md:grid-cols-3 gap-6 mt-8 max-w-6xl mx-auto">
        {[
          { title: "Diverse Topics", text: "Explore quizzes on coding, logic, aptitude, and more." },
          { title: "Real-Time Leaderboard", text: "Compete with others and track your performance." },
          { title: "No Registration Needed", text: "Just enter your GitHub username and start playing!" },
        ].map((info, index) => (
          <div
            key={index}
            ref={(el) => {
              if (el) cardsRef.current[index] = el;
            }}
            className="p-6 bg-gray-100 rounded-lg shadow-md text-center transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
          >
            <h3 className="text-2xl font-semibold text-blue-600">{info.title}</h3>
            <p className="mt-2 text-gray-600">{info.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}