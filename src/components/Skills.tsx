/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Position = { x: number; y: number };

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const motionStrengths = useRef(
    Array.from({ length: 18 }, () => Math.random() * 2 + 0.5)
  ).current;

  const skills: string[] = [
    'React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'GraphQL', 'Next.js', 'Vue.js', 'Express',
    'JavaScript', 'CSS', 'HTML', 'Git', 'Redis', 'Kubernetes'
  ];

  // Function to check if positions overlap
  const isOverlapping = (pos1:any, pos2:any, minDistance = 15) => {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return Math.sqrt(dx * dx + dy * dy) < minDistance;
  };

  // Generate non-overlapping positions
  const generatePositions = (): Position[] => {
    const positions: Position[] = [];
    const maxAttempts = 100;
    
    for (let i = 0; i < skills.length; i++) {
      let position: Position;
      let attempts = 0;
      
      do {
        position = {
          x: Math.random() * 85 + 5, // 5% to 90% to avoid edges
          y: Math.random() * 80 + 10, // 10% to 90% to avoid edges
        };
        attempts++;
      } while (
        attempts < maxAttempts && 
        positions.some(existingPos => isOverlapping(position, existingPos))
      );
      
      positions.push(position);
    }
    
    return positions;
  };

  const cardPositions = useRef(generatePositions()).current;

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;

    // Desktop: Zoom in animation with mouse move effects
    if (!isMobile) {
      // Set initial state for desktop cards
      gsap.set(cardsRef.current, {
        y: 100,
        opacity: 0,
      });

      // Animate cards on scroll with different delays
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.to(card, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1, // Staggered animation
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        });
      });

      // Track previous mouse position for velocity
      let prevX = 0;
      let prevY = 0;
      let velocityX = 0;
      let velocityY = 0;

      // Mouse move animation at window level
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        // Calculate velocity based on mouse movement
        velocityX = (e.clientX - prevX) * 0.1; // Adjust multiplier for sensitivity
        velocityY = (e.clientY - prevY) * 0.1;
        prevX = e.clientX;
        prevY = e.clientY;

        cardsRef.current.forEach((card, index) => {
          if (!card) return;

          const strength = motionStrengths[index];
          const offsetX = -normX * 50 * strength + velocityX * strength;
          const offsetY = -normY * 50 * strength + velocityY * strength;

          gsap.to(card, {
            x: offsetX,
            y: offsetY,
            duration: 0.5,
            ease: 'power3.out', // Smooth easing with velocity
          });
        });
      };

      // Decay effect after mouse leave
      const handleMouseLeave = () => {
        cardsRef.current.forEach((card) => {
          if (!card) return;

          gsap.to(card, {
            x: '+=' + velocityX * 10, // Extend movement based on velocity
            y: '+=' + velocityY * 10,
            duration: 1, // 1-second decay
            ease: 'power3.out', // Slow down gradually
            onComplete: () => {
              gsap.to(card, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' }); // Final rest
            },
          });
        });
        velocityX *= 0.9; // Reduce velocity for next frame
        velocityY *= 0.9;
      };

      // Add window-level event listeners
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    } else {
      // Mobile: One by one animation with opacity and y movement
      const mobileCards = container.querySelectorAll('.mobile-skill-card');
      
      // Set initial state for mobile cards
      gsap.set(mobileCards, {
        opacity: 0,
        y: 30,
      });

      // Animate cards one by one on scroll
      mobileCards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          }
        });
      });
    }
  }, []);

  return (
    <section className="py-16 sm:py-24 md:min-h-screen relative overflow-hidden" id='skills' ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header and Content */}
        <div className="block md:hidden">
          <div className="text-left mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-black mb-4">
              Skills
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Technologies that power my projects
            </p>
          </div>
          <div className="flex flex-wrap gap-3 justify-start">
            {skills.map((skill) => (
              <div
                key={skill}
                className="mobile-skill-card px-4 py-2 text-black border-1 border-gray-400 bg-white text-sm rounded-lg shadow-md shadow-gray-400 whitespace-nowrap select-none"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Scattered Layout with Centered Header */}
        <div className="hidden md:block relative h-96 sm:h-[300px] lg:h-[400px] w-full" style={{ perspective: '1000px' }}>
          {/* Centered Header at the top */}
          <div className='w-full h-full absolute left-0 top-0 flex items-center justify-center'>
            <div className="w-xl mx-auto border-dashed border-4 border-red-500 z-[100] rounded-lg p-4 text-center" style={{backgroundImage: 'url(/assets/blur-bg.png)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
                Skills
              </h2>
              {/* <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
                Hover to explore the technologies that power my projects
              </p> */}
            </div>
          </div>
          {/* Scattered Cards with Shadow */}
          <div className='z-[99]'>
          {skills.map((skill, index) => (
            <div
              key={skill}
              ref={(el: HTMLDivElement | null) => { cardsRef.current[index] = el; }}
              className="absolute transition-transform duration-300 ease-out will-change-transform"
              style={{
                left: `${cardPositions[index].x}%`,
                top: `${cardPositions[index].y}%`,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
              }}
            >
              <div className={`
                px-4 py-2 sm:px-5 sm:py-3 text-black
                border-1 border-gray-200
                bg-white text-sm sm:text-base
                rounded-lg shadow-lg shadow-gray-500/50
                hover:shadow-2xl transition-all duration-200 hover:z-50
                whitespace-nowrap select-none
              `}
              onMouseEnter={(e) => {
                e.currentTarget.style.zIndex = '100';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.zIndex = '10';
              }}
              >
                {skill}
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;