'use client';
import { useEffect, useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  tech: string[];
  color: string;
}

const projects: Project[] = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with modern UI/UX',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: '#34D399',
  },
  {
    title: 'Design System',
    description: 'Comprehensive design system for enterprise apps',
    tech: ['Figma', 'React', 'Storybook'],
    color: '#F472B6',
  },
  {
    title: 'Mobile Banking App',
    description: 'Secure mobile banking application with biometric auth',
    tech: ['React Native', 'Firebase'],
    color: '#60A5FA',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Real-time dashboard with charts',
    tech: ['Vue.js', 'D3.js'],
    color: '#FBBF24',
  },
];

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !headerRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.card');
      const header = headerRef.current;
      const containerBounds = containerRef.current.getBoundingClientRect();
      const headerBounds = header.getBoundingClientRect();

      const root = {
        x: headerBounds.left + headerBounds.width / 2 - containerBounds.left,
        y: headerBounds.top + headerBounds.height / 2 - containerBounds.top,
      };

      // Animate header
      gsap.fromTo(
        header,
        { opacity: 0, y: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );

      // Animate central node
      gsap.fromTo(
        '.central-node',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.8,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        },
      );

      // Animate curved paths and cards
      cards.forEach((card, i) => {
        const path = `.path-${i}`;
        const el = card;

        const cardBounds = el.getBoundingClientRect();
        const cardCenter = {
          x: cardBounds.left + cardBounds.width / 2 - containerBounds.left,
          y: cardBounds.top + cardBounds.height / 2 - containerBounds.top,
        };

        // Create curved path using quadratic Bezier
        const controlPoint = {
          x: root.x + (cardCenter.x - root.x) * 0.5,
          y: root.y + (cardCenter.y - root.y) * 0.7,
        };

        const pathD = `M${root.x},${root.y} Q${controlPoint.x},${controlPoint.y} ${cardCenter.x},${cardCenter.y}`;

        // Set initial path
        gsap.set(path, { attr: { d: `M${root.x},${root.y} Q${controlPoint.x},${controlPoint.y} ${root.x},${root.y}` } });

        // Animate path
        gsap.to(path, {
          attr: { d: pathD },
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
          delay: i * 0.2,
        });

        // Card reveal animation
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.7, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              once: true,
            },
            delay: i * 0.2 + 0.3,
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative bg-gray-50 py-24 overflow-hidden" ref={containerRef}>
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
      >
        <circle
          className="central-node"
          cx={containerRef.current?.getBoundingClientRect().width / 2 || 0}
          cy="100"
          r="10"
          fill="#10B981"
        />
        {projects.map((_, i) => (
          <path
            key={i}
            className={`path-${i}`}
            stroke="#D1D5DB"
            strokeWidth="2"
            fill="none"
          />
        ))}
      </svg>

      <div className="text-center mb-16 relative z-10" ref={headerRef}>
        <h2 className="text-5xl font-bold text-gray-900 tracking-tight">
          Featured Projects
        </h2>
        <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
          Explore a collection of innovative projects showcasing creativity and technical excellence
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 max-w-7xl mx-auto relative z-10">
        {projects.map((project, i) => (
          <div
            key={i}
            className="card bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
            style={{ borderLeft: `4px solid ${project.color}` }}
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">{project.title}</h3>
            <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex-1 bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-gray-800 transition-colors"
              >
                View Project <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Github className="w-5 h-5 text-gray-700" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;