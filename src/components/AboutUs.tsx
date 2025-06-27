import { useRef } from 'react';
import MacTerminal from './MacTerminal';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText'; // Import SplitText for text animation

gsap.registerPlugin(SplitText);
const AboutUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null); // Changed to div for SplitText compatibility

  useGSAP(() => {
    // Animate section to scroll over Hero, triggered by Hero
    gsap.fromTo(
      sectionRef.current,
      { y: '100vh' },
      {
        y: '0vh',
        ease: 'none',
        scrollTrigger: {
          trigger: '#home', // Use Hero section as trigger
          start: 'top top+=10%', // Start animation shortly after scrolling begins
          end: 'bottom top', // End when Hero's bottom hits viewport top
          scrub: true,
          // markers: true, // Uncomment for debugging
        },
      }
    );

    // Fade-in animation for text content with SplitText
    if (textRef.current) { // Check if SplitText is available
      const splitText = new SplitText(textRef.current, { type: 'lines' });
      const lines = splitText.lines;

      gsap.fromTo(
        lines,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current, // Use Hero section as trigger
            start: 'top bottom', // Start animation shortly after scrolling begins
            end: 'bottom top',
          },
          stagger: 0.06, // Adjusted for better visibility
        }
      );

      // Cleanup SplitText on unmount
      return () => {
        splitText.revert();
      };
    } else {
      console.error('SplitText plugin is not available. Check installation and registration.');
    }
  }, []);

  const content = `Hello, I'm Renold Dickson — a full-stack developer passionate about crafting efficient, user-friendly apps.

    I specialize in:
    • Building modern web apps with React, Angular
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
    <section
      ref={sectionRef}
      className="relative min-h-[100vh] bg-[#f8f9ff]/80 backdrop-blur-md text-black flex items-center justify-center z-10 font-mono"
      id="about"
    >
      <div className="container mx-auto px-0 sm:px-4 flex items-center justify-center h-full">
        <div className="w-full h-fit">
          <div className="hidden md:block">
            <MacTerminal content={content} />
          </div>
          <div className="block md:hidden w-full min-h-screen bg-[#f8f9ff] px-4 py-8">
            <div className="max-w-sm mx-auto">
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-black mb-2">
                  About Me
                </h1>
                <div className="w-16 h-1 bg-black"></div>
              </div>
                <div
                  ref={textRef}
                  className="text-base text-gray-800 font-medium leading-relaxed text-left space-y-4 transition-opacity duration-1000"
                  dangerouslySetInnerHTML={{
                    __html: content
                      .split('\n\n')
                      .map(paragraph => `<p class="mb-4 leading-relaxed">${paragraph.replace(/\n/g, '<br>')}</p>`)
                      .join('')
                  }}
                />
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;