import Header from './components/Header';
import Hero from './components/Hero';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Skills from './components/Skills';
import AboutUs from './components/AboutUs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

const App: React.FC = () => {
  return (
    <div className="w-full bg-white">
      <Header />
      <Hero />
      <AboutUs />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
};

export default App;