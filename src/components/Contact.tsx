import { useRef, useState } from "react";
import { Mail, Instagram, Github, Linkedin } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { postData } from "../utils/api";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const cardRef = useRef<HTMLDivElement>(null);
  const socialMediaData = [{
    icon: Github,
    link: "https://dribbble.com/yourprofile",
    title:'Github'
  },
  {
    icon: Instagram,
    link: "https://instagram.com/yourprofile",
    title:'Instagram'
  },
  {
    icon: Mail,
    link: "mailto:renolddickson18@gmail.com",
    title:'Email'
},{
    icon: Linkedin,
    link: "https://linkedin.com/in/renolddickson",
    title:'Linkedin'
}]
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await postData('contacts', formData);
      console.log('Submitted successfully:', result);
      // Optionally reset the form
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Submission error:', err);
    }
  };
  useGSAP(() => {
    gsap.fromTo(".contact-card", 
    {
      opacity: 0,
      y: 50,
    },
    {
      scrollTrigger: {
        trigger: ".contact-card",
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
    }
  );

  gsap.fromTo(".form-input",
    {
      opacity: 0,
      x: 40,
    },
    {
      scrollTrigger: {
        trigger: ".form-input",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.2,
    }
  );

    const card:HTMLDivElement | null = cardRef.current;
    if (!card) return;
    const onMouseMove = (e:MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(card, {
        rotationY: x / 25,
        rotationX: -y / 25,
        transformPerspective: 1000,
        transformOrigin: "center",
        duration: 0.4,
        ease: "power2.out",
      });
    };
    const onMouseLeave = () => {
      gsap.to(card, {
        rotationY: 0,
        rotationX: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    };
    card.addEventListener("mousemove", onMouseMove);
    card.addEventListener("mouseleave", onMouseLeave);

    return () => {
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen pt-24 px-4 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 relative overflow-hidden"
    >
      {/* Blur Circles */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-emerald-400/10 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-violet-400/10 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16">
        {/* Contact Info */}
        <div
          ref={cardRef}
          className="w-full max-w-sm contact-card bg-neutral-800/60 border border-neutral-700 backdrop-blur-xl rounded-3xl shadow-lg p-8 text-center"
        >
          <div className="w-44 h-44 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-emerald-500 to-violet-600 flex items-center justify-center">
            <div className="w-28 h-28 bg-neutral-700 rounded-full"></div>
          </div>

          <h1 className="text-3xl font-extrabold text-white mt-6">Renold Dickson</h1>
          <p className="text-neutral-300 text-lg mt-2">Full Stack Developer</p>
          <p className="text-neutral-400 mt-1">Tamil Nadu, India</p>

          <div className="flex justify-center gap-4 mt-6">
            {socialMediaData.map((item, idx) => (

              <a
                key={idx} href={item.link}
                className="w-11 h-11 bg-neutral-700/60 hover:bg-neutral-600/60 text-neutral-300 hover:text-white rounded-xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-neutral-600/30"
              >
                <item.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <button className="mt-8 w-full bg-gradient-to-r from-emerald-500 to-violet-600 hover:from-emerald-600 hover:to-violet-700 text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.03]">
            Let's Talk
          </button>
        </div>

        {/* Contact Form */}
        <div className="w-full max-w-md bg-neutral-800/60 border border-neutral-700 backdrop-blur-xl rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-white text-center mb-6">Say Hello</h2>

          <div className="space-y-5">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="form-input w-full px-6 py-4 bg-neutral-700/40 border border-neutral-600/30 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all duration-300 backdrop-blur-sm"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="form-input w-full px-6 py-4 bg-neutral-700/40 border border-neutral-600/30 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all duration-300 backdrop-blur-sm"
            />
            <textarea
              rows={5}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="form-input w-full px-6 py-4 bg-neutral-700/40 border border-neutral-600/30 rounded-2xl text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all duration-300 resize-none backdrop-blur-sm"
            ></textarea>

            <button className="w-full bg-white hover:bg-gray-100 text-neutral-800 py-4 px-6 rounded-2xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-[1.02]" onClick={handleSubmit}>
              Send Message
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center mt-8">
          <div className="">
            <div className="text-xl sm:text-2xl font-bold text-white">
              Ren<span className="text-blue-400">old</span>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-400">
            © 2025 Renold Dickson. Crafted with precision and passion.
          </p>
        </div>
    </section>
  );
};

export default Contact;
