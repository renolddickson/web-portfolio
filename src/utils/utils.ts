import gsap from 'gsap';

export const scrollToSection = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: `#${id}`,
        offsetY: 0,
      },
      ease: 'power2.out',
    });
  };