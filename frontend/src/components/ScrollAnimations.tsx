'use client';

import { useEffect } from 'react';

export default function ScrollAnimations() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    }, observerOptions);

    // Observe all elements with scroll animation classes
    const animatedElements = document.querySelectorAll(
      '.scroll-animate, .scroll-slide-left, .scroll-slide-right, .scroll-slide-up, .scroll-slide-down, .scroll-scale, .scroll-rotate, .scroll-bounce, .scroll-flip-x, .scroll-flip-y'
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    // Parallax effect for background elements
    const parallaxElements = document.querySelectorAll('.parallax');
    
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      parallaxElements.forEach((el) => {
        const speed = (el as HTMLElement).dataset.speed || '0.5';
        const yPos = -(scrolled * parseFloat(speed));
        (el as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleParallax);
    };
  }, []);

  return null;
}
