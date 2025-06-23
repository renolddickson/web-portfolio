import { useLayoutEffect, useRef, useState } from "react";
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);
const MacTerminal = ({content}:{content:string}) => {
    const [typed,setTyped]= useState(false);
    const aboutcontent = useRef<HTMLDivElement | null>(null);
    const date = new Date();
    useLayoutEffect(() => {
        const el = aboutcontent.current;
        if (!el || typed) return;
    
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              let index = 0;
              el.textContent = ''; // Clear before typing
    
              const type = () => {
                if (index < content.length) {
                  el.textContent += content[index];
                  index++;
                  setTimeout(type, 15);
                }
              };
    
              type(); // start typing
              setTyped(true);
              observer.unobserve(el); // Stop watching once triggered
            }
          },
          {
            threshold: 0.5, // 50% visible
          }
        );
    
        observer.observe(el);
    
        return () => observer.disconnect();
      }, [typed, content]);
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'short',  // e.g. Thu
        year: 'numeric',   // 2025
        month: 'short',    // Mar
        day: 'numeric',    // 1
        hour: '2-digit',   // 19
        minute: '2-digit', // 23
        second: '2-digit', // 38
        hour12: false      // 24‑hour format
    });
    return (
            <div className="relative bg-white rounded-lg w-4xl mx-auto shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between h-8 border-b border-gray-300 px-6 bg-gray-200 sticky top-0">
                    {/* Window Controls */}
                    <div className="flex items-center space-x-3">
                        <div className="w-3.5 h-3.5 rounded-full bg-red-500 border border-red-600"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-400 border border-yellow-500"></div>
                        <div className="w-3.5 h-3.5 rounded-full bg-green-500 border border-green-600"></div>
                    </div>
                    <div className="text-gray-700 text-xs font-sans">
                        renold — -bash — 120×45
                    </div>
                    <div className="w-14"></div>
                </div>
                <div className="p-4 text-sm text-gray-800 bg-white h-112 overflow-auto">
                    <div className="mb-2">
                        <span>Last login: {formatter.format(date)} on ttys003</span>
                    </div>
                    <div className="flex flex-col">
                        {/* Command line input */}
                        <div className="flex items-center">
                            <span className="text-blue-600 whitespace-pre">Renold-DEV:~ renold$ </span>
                            <span className="ml-1">About me</span>
                            {!typed && (
                                <span className="w-1 h-4 bg-gray-800 ml-1 animate-[blink_0.7s_steps(2)_infinite]"></span>
                            )}
                        </div>

                        {/* Response + blinking cursor */}
                        <div className="flex items-start">
                            <div ref={aboutcontent} className="whitespace-pre-wrap"></div>
                        </div>
                        {typed && (
                                <span className="w-1 h-4 bg-gray-800 ml-1 animate-[blink_0.7s_steps(2)_infinite]"></span>
                            )}
                    </div>
                </div>
            </div>
    );
};

export default MacTerminal;