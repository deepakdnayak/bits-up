"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Motto() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      const containerWidth = window.innerWidth;
      const endX = -(textWidth - containerWidth + 50); // Ensuring "Excel" stays visible

      gsap.to(textRef.current, {
        x: endX, // Moves the text just enough to keep "Excel" in view
        ease: "power1.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top center",
          end: "bottom center",
          markers: true,
          scrub: 2, // Smooth scrolling effect
          pin: true, // Pins the section during animation
        },
      });
    }
  }, []);

  return (
    <section className="h-screen flex items-center justify-center bg-white overflow-hidden">
      <div ref={textRef} className="whitespace-nowrap text-[200px] font-bold text-gray-800">
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Challenge &nbsp; Learn &nbsp; Excel
      </div>
    </section>
  );
}
