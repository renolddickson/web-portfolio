import { useEffect, useRef } from 'react';
import MacTerminal from './MacTerminal'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.from(textRef.current, {
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 30,
      duration: 1,
      ease: 'power2.out',
    });
  }, []);
  const content = `Hello, I'm Renold Dickson — a full-stack developer passionate about crafting efficient, user-friendly apps.

    I specialize in:
    • Building modern web apps with React, Angular, and Next.js
    • Performance optimization, SSR, and dynamic rendering
    • State management using Redux, Zustand, NgRx, RxJS
    
    Professional highlights:
    • Boosted Zenbasket’s performance by 80% at Centizen
    • Built custom editors and achieved 90%+ Jest test coverage
    • Contributed to Zen Studio – a no-code React website builder
    
    Personal Projects:
    • Q-Docs – a static documentation generator
    • Qooks Prompt – a Chrome extension for AI prompt navigation
    
    Let’s connect and create something truly amazing together!`;
  return (
    <div className="p-10 min-h-screen flex items-center justify-center font-mono">
      <div className='h-full hidden md:block'>
        <MacTerminal content={content} />
      </div>
      <div className='block md:hidden'>
        <h1 className='text-4xl font-bold mb-4 text-center'>About Us</h1>
        <pre
          className="text-lg transition-opacity duration-1000 whitespace-pre-wrap">{content}</pre>
      </div>
    </div>
  )
}

export default AboutUs