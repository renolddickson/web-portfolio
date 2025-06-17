import { useEffect, useState } from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Skills from './components/Skills';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

function App() {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 1, 
      effects: true,
      smoothTouch: 0.1,
    });

  }, []);
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className='w-full bg-gray-50'>
          <div className='max-w-7xl mx-auto px-4'>
            <Header />
            <Hero />
            {/* Pass no visibleSections prop anymore. Components will handle their own animations. */}
            <Skills />
            <Projects />
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
