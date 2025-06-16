import { useEffect, useState } from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Skills from './components/Skills';

function App() {
      const [scrollY, setScrollY] = useState(0);
      const [visibleSections, setVisibleSections] = useState(new Set());

      useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setVisibleSections(prev => new Set(prev).add(entry.target.id));
              }
            });
          },
          { threshold: 0.1, rootMargin: '-50px' }
        );

        document.querySelectorAll('section[id]').forEach((section) => {
          observer.observe(section);
        });

        return () => observer.disconnect();
      }, []);
  return (
    <div className='w-full bg-gray-50'>
    <div className='max-w-7xl mx-auto px-4'>
      <Header />
      <Hero />
      <Skills visibleSections={visibleSections} />
      <Projects visibleSections={visibleSections} />
      <Contact />
    </div>
      <Footer />
    </div>
  )
}

export default App
