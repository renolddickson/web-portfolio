// SvgPathScrollReveal.tsx
import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SvgPathScrollReveal: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useLayoutEffect(() => {
    if (!pathRef.current) return;

    // 1. Measure the path
    const length = pathRef.current.getTotalLength();

    // 2. Hide it by offsetting dash
    gsap.set(pathRef.current, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // 3. Animate dashoffset to 0 on scroll
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      duration: 2,
      ease: 'power2.out',
      
    });

    // cleanup
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <>
      {/* Fixed SVG canvas */}
      <div className="fixed inset-0 z-0 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 800 200"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          <path
            ref={pathRef}
            d="M20,100 C200,0 400,200 780,100"
            stroke="#10B981"
            strokeWidth={4}
            fill="none"
          />
        </svg>
      </div>

      {/* Scrollable content to drive the animation */}
      <div className="relative z-10 space-y-20 pt-96 pb-96">
        {['Scroll', 'to', 'Reveal', 'Your', 'Path'].map((word, idx) => (
          <h1
            key={idx}
            className="text-6xl font-bold text-center text-gray-800"
          >
            {word}
          </h1>
        ))}
      </div>
    </>
  );
};

export default SvgPathScrollReveal;
