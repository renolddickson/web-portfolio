import React, { useEffect, useRef } from "react";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollToSection } from "../utils/utils";
import gsap from 'gsap';

gsap.registerPlugin(ScrollToPlugin,ScrollTrigger);

const Header = () => {
    const headerRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

      useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let lastScroll = 0;
    
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const direction = self.direction; // 1 = down, -1 = up
            const scrollY = self.scroll();
    
            if (!headerRef.current) return;
    
            if (scrollY <= 100 || direction === -1) {
              gsap.to(headerRef.current, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
              });
            } else {
              gsap.to(headerRef.current, {
                y: '-100%',
                duration: 0.3,
                ease: 'power2.out',
              });
            }
    
            lastScroll = scrollY;
          },
        });
      }, []);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden';
    };
    const menuItems = [
        { text: "Home", delay: "delay-100", id:'home' },
        { text: "About", delay: "delay-200", id:'about' },
        { text: "Projects", delay: "delay-300", id:'projects' },
        { text: "Contact", delay: "delay-400", id:'contact' },
    ];
    return (
        <header className='fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-white z-50 transition-transform duration-300' ref={headerRef}>
            <h3 className="text-2xl font-bold flex items-center space-x-1">
                Ren
                <span className="inline-block w-3 h-3 mt-2 bg-green-400 rounded-full"></span>
                ld
            </h3>
            <ul className='hidden md:flex space-x-4'>
                {menuItems.map((item) => (
                    <li key={item.id} className="cursor-pointer" onClick={() => scrollToSection(item.id)}>{item.text}</li>
                ))}
            </ul>
            <div className="md:hidden">
                <button
                    onClick={toggleMenu}
                    className="focus:outline-none relative z-[1000] transition-transform duration-300"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
                    <div className={`w-6 h-0.5 bg-black my-1.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></div>
                    <div className={`w-6 h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </button>

                <div className={`fixed top-0 left-0 h-screen inset-0 z-[999] bg-white transition-all duration-500 flex items-center justify-center ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                    <ul className="text-center text-2xl space-y-8">
                        {menuItems.map((item) => (
                            <li
                                key={item.id}
                                className={`cursor-pointer transform transition-all duration-500 ${item.delay} ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                onClick={() => {
                                    toggleMenu();
                                    scrollToSection(item.id);
                                  }}
                            >
                                {item.text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Header