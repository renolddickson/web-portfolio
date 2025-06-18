import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

type Position = { x: number; y: number };

const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const motionStrengths = useRef<number[]>(
    Array.from({ length: 18 }, () => Math.random() * 0.4 + 0.1) // between 0.1 and 0.5
  ).current;

  const skills: string[] = [
    'React', 'Node.js', 'TypeScript', 'Python', 'MongoDB', 'PostgreSQL',
    'AWS', 'Docker', 'GraphQL', 'Next.js', 'Vue.js', 'Express',
    'JavaScript', 'CSS', 'HTML', 'Git', 'Redis', 'Kubernetes'
  ];

  const cardPositions = useRef<Position[]>(
    skills.map(() => ({
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
    }))
  ).current;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const strength = motionStrengths[index];
        const offsetX = -normX * 50 * strength;
        const offsetY = -normY * 50 * strength;

        gsap.to(card, {
          x: offsetX,
          y: offsetY,
          duration: 0.5,
          ease: 'power3.out',
        });
      });
    };

    const handleMouseLeave = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        gsap.to(card, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const getRandomColor = (index: number): string => {
    const colors = [
      'from-blue-200 to-blue-300',
      'from-purple-200 to-purple-300',
      'from-green-200 to-green-300',
      'from-red-200 to-red-300',
      'from-yellow-200 to-yellow-300',
      'from-indigo-200 to-indigo-300',
      'from-pink-200 to-pink-300',
      'from-teal-200 to-teal-300',
    ];
    return colors[index % colors.length];
  };

  return (
    <section className="py-16 sm:py-24 min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">
            Tech Stack
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
            Hover to explore the technologies that power my projects
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative h-96 sm:h-[500px] lg:h-[600px] w-full"
          style={{ perspective: '1000px' }}
        >
          {skills.map((skill, index) => (
            <div
              key={skill}
              ref={(el) => (cardsRef.current[index] = el)}
              className="absolute transition-transform duration-300 ease-out will-change-transform"
              style={{
                left: `${cardPositions[index].x}%`,
                top: `${cardPositions[index].y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className={`
                px-4 py-2 sm:px-5 sm:py-3 
                bg-gradient-to-r ${getRandomColor(index)}
                text-white text-sm sm:text-base font-medium 
                rounded-lg shadow-md border border-white/30 
                hover:shadow-2xl transition-all duration-200 
                whitespace-nowrap select-none
              `}>
                {skill}
              </div>
            </div>
          ))}

          {/* Ambient particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            Move your cursor around to interact with the tech stack
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
