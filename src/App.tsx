import Header from './components/Header'
import Hero from './components/Hero'
import Footer from './components/Footer';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Skills from './components/Skills';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import AboutUs from './components/AboutUs';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App: React.FC = () => {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className='w-full bg-gray-50'>
          <div className='max-w-7xl mx-auto px-4'>
            <Header />
            <Hero />
            <AboutUs />
            <Skills />
            <Projects />
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App
