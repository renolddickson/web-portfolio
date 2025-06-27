import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Image float animation
      gsap.to(imageRef.current, {
        y: -10,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        duration: 2,
      });

      // Text animation
      gsap.from(nameRef.current, {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.3,
        ease: 'power3.out',
      });

      gsap.from(roleRef.current, {
        opacity: 0,
        x: -30,
        duration: 1,
        delay: 0.7,
        ease: 'power3.out',
      });

      gsap.from(buttonRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.1,
        ease: 'power3.out',
      });

      // Pin the hero section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        // markers: true, // Uncomment for debugging
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      <div className="container mx-auto px-6 md:px-12 h-full flex flex-col md:flex-row items-center justify-center">
        {/* Text block */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left z-10">
          <h1 ref={nameRef} className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">
            Hi, I'm <span className="text-blue-600">Renold Dickson</span>
          </h1>
          <p ref={roleRef} className="text-2xl md:text-3xl font-semibold text-gray-700">
            Software Developer
          </p>

          {/* Buttons */}
          <div ref={buttonRef} className="pt-4 flex justify-center md:justify-start space-x-4">
            <button
              className="relative px-6 py-2 text-white bg-black rounded-full font-medium text-lg group overflow-hidden"
            >
              <span className="absolute inset-0 bg-white scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 z-0" />
              <span className="relative z-10 group-hover:text-black">HIRE ME</span>
            </button>
            <a href="/assets/Antony Renold Dickson.pdf" download>
              <button className="px-6 py-2 border border-black text-black rounded-full transition-all duration-300 hover:bg-black hover:text-white">
                GET CV
              </button>
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0">
          <div
            ref={imageRef}
            className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] rounded-full bg-gray-200 p-4 md:p-8 shadow-md"
          >
            <img
              src="/assets/hero-image.png"
              alt="Renold Cartoon"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
