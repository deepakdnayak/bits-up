"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: "Is registration required?", answer: "No, you just need your GitHub username to track your score." },
    { question: "Are quizzes free?", answer: "Yes, all quizzes on BitsUp are completely free to play." },
    { question: "What types of quizzes are available?", answer: "BitsUp offers quizzes on various aptitude-based topics, including logical reasoning, mathematics, and technical skills." },
    { question: "How is difficulty categorized?", answer: "Quizzes are categorized into Easy, Medium, and Hard levels, allowing you to choose based on your comfort level." },
    { question: "How is my score tracked?", answer: "Your score is mapped to your GitHub username and stored in our database, allowing you to track your progress." },
    { question: "Can I retake quizzes?", answer: "Yes, you can retake quizzes, but your first attempt will only be considered for your score." },
    { question: "Who can add new quizzes?", answer: "Only admins can add new quizzes. Admins must log in each time they access the admin panel." },
    { question: "How often are new quizzes added?", answer: "New quizzes are added regularly based on user demand and trending topics." },
  ];

  return (
    <section ref={sectionRef} className="py-12 px-6 bg-white" id="FAQ">
      <h2 className="text-3xl font-bold text-center text-gray-800">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto mt-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b py-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <summary className="font-semibold">{faq.question}</summary>
              <span className="text-xl">{openIndex === index ? "➖" : "➕"}</span>
            </div>
            <div
              className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
                openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
