import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: 1, image: '/assets/project1.png', title: 'AI Teammate', url: '#' },
  { id: 2, image: '/assets/project2.png', title: '3D Artwork', url: '#' },
];

const ProjectSection = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(pathRef.current, {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
    }, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gsap.utils.toArray(".project-card").forEach((el:any) => {
      gsap.fromTo(el, {
        opacity: 0,
        y: 100,
        rotateX: 25,
        rotateY: 10,
      }, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "expo.out",
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 bg-[#f8f9ff] text-black overflow-hidden">
      {/* SVG Path */}
      <svg className="absolute top-0 left-0 w-full h-64" viewBox="0 0 1000 200" fill="none">
        <path
          ref={pathRef}
          d="M0,100 Q500,-50 1000,100"
          stroke="#7b61ff"
          strokeWidth="5"
          fill="none"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold mb-16">Featured Projects</h2>
        <div className="grid sm:grid-cols-2 gap-10">
          {projects.map((project) => (
            <a
              href={project.url}
              key={project.id}
              className="project-card project-hover relative rounded-3xl overflow-hidden backdrop-blur-xl border border-white/20 bg-white/10 hover:shadow-2xl transition-all duration-500"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-white/50 backdrop-blur-sm text-black">
                <h3 className="text-xl font-semibold">{project.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
