import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { fetchData } from '../utils/api';

gsap.registerPlugin(ScrollTrigger);

interface Projects {
  id: string;
  name: string;
  description: string;
  cover_image_url: string;
  live_link: string;
  github_link: string;
  technologies: string[];
}

const ProjectSection = () => {
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef(null);
  const pathVioletRef = useRef<SVGPathElement | null>(null);
  const pathYellowRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await fetchData<Projects>('projects');
        setProjects(res);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Could not load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getProjects();
  }, []);

  useGSAP(() => {
    const animateScrollPath = (
      ref: SVGPathElement | null,
      triggerEl: Element,
      options: {
        start?: string;
        end?: string;
        scrub?: number;
        delay?: number;
      } = {}
    ) => {
      if (!ref) return;
      const length = ref.getTotalLength();

      gsap.set(ref, {
        strokeDasharray: length,
        strokeDashoffset: length,
      });

      gsap.to(ref, {
        strokeDashoffset: 0,
        scrollTrigger: {
          trigger: triggerEl,
          start: options.start || "top bottom",
          end: options.end || "bottom+=100 bottom", // extends 100px past bottom
          scrub: options.scrub ?? 1,
        },
        ease: "none",
        delay: options.delay || 0,
      });
    };

    const sectionEl = sectionRef.current!;
    animateScrollPath(pathVioletRef.current, sectionEl, {
      start: "top 80%",
      end: "bottom-=180 bottom",
      scrub: 0.6,
      delay: 0.2,
    });

    animateScrollPath(pathYellowRef.current, sectionEl, {
      start: "top bottom",
      end: "bottom-=160 bottom",
      scrub: 1.2,
    });

    // Card reveal animation
    gsap.utils.toArray<HTMLElement>(".project-card").forEach((el) => {
      const x = gsap.utils.random(-30, 30);
      const y = gsap.utils.random(60, 100);
      const rot = gsap.utils.random(-4, 4);

      gsap.fromTo(
        el,
        {
          opacity: 0,
          x,
          y,
          rotateZ: rot,
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          rotateZ: 0,
          scale: 1,
          ease: "expo.out",
          duration: 1.1,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
        }
      );
    });
  }, [projects]);

  return (
    <section
      ref={sectionRef}
      className="relative isolate py-24 bg-[#f8f9ff] text-black overflow-hidden"
    >
      {!loading && !error && (
        <>
          <svg
            className="absolute top-0 left-0 h-full w-full z-0 pointer-events-none"
            viewBox="0 0 1000 1000"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              ref={pathYellowRef}
              d="M0,200 C300,100 700,300 1000,200"
              stroke="#A8FFB0"
              strokeWidth="4"
              fill="none"
            />
          </svg>

          {/* Violet Path (S-shaped, vertical from top-left to bottom-right-ish) */}
          <svg
            className="absolute top-0 left-0 h-full w-full z-0 pointer-events-none"
            viewBox="0 0 1000 1000"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              ref={pathVioletRef}
              d="M0,0 
       C200,300 600,300 400,500 
       C200,700 800,700 700,1000"
              stroke="#7b61ff"
              strokeWidth="4"
              fill="none"
            />
          </svg>

          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <h2 className="text-5xl font-bold mb-16">Featured Projects</h2>

            <div className="grid sm:grid-cols-2 gap-10">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="project-card rounded-3xl overflow-hidden border border-black/10 bg-white shadow-md p-4 space-y-4 transition-all duration-500 hover:shadow-2xl"
                >
                  <img
                    src={project.cover_image_url}
                    alt={project.name}
                    className="w-full h-60 object-cover rounded-xl"
                  />
                  <h3 className="text-2xl font-semibold text-black">{project.name}</h3>
                  <p className="text-black/80">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-black/10 text-black px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-2">
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Live
                      </a>
                    )}
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProjectSection;
