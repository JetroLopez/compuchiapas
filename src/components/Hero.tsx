import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (title && subtitle && cta) {
      requestAnimationFrame(() => {
        title.style.opacity = '1';
        title.classList.add('animate-fade-up');
        
        subtitle.style.opacity = '1';
        subtitle.classList.add('animate-fade-up');
        subtitle.style.animationDelay = '100ms';
        
        cta.style.opacity = '1';
        cta.classList.add('animate-fade-up');
        cta.style.animationDelay = '200ms';
      });
    }
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('servicios-destacados');
    const headerOffset = 20; // Altura del header + margen adicional
    if (servicesSection) {
      const elementPosition = servicesSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Holographic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-tech-lightGray via-white to-tech-lightGray">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-200/30 via-purple-200/20 to-pink-200/30 animate-gradient-shift"></div>
        
        {/* Light beams */}
        <div className="absolute inset-0 opacity-70">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-200/20 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        </div>
        
        {/* Mesh grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      </div>
      
      <div className="container-padding max-w-7xl mx-auto text-center relative z-10">
        <div className="pt-20 pb-32 md:pt-28 md:pb-36">
          <h1 ref={titleRef} className="opacity-0 transition-opacity duration-300">
            <span className="block text-6xl md:text-7xl lg:text-8xl font-bold text-tech-gray mb-2 md:mb-4 text-shadow-light">
              Expertos en tecnología
            </span>
            <span className="holographic-text block text-4xl md:text-5xl lg:text-6xl font-bold mt-2 md:mt-4 pb-2">
              Tu mejor elección
            </span>
          </h1>
          
          <p ref={subtitleRef} className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto mt-6 md:mt-12 mb-8 md:mb-12 opacity-0 transition-opacity duration-300 text-shadow-sm">
            Servicios técnicos profesionales y equipos de calidad con garantía de satisfacción
          </p>
          
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 opacity-0 transition-opacity duration-300">
            <a 
              href="/servicios" 
              className="btn-primary text-lg px-12 py-3 md:py-4 min-w-[240px] sm:min-w-[280px] transition-all duration-300 hover:scale-105 hover:shadow-glow"
            >
              Ver servicios
            </a>
            <a 
              href="/productos" 
              className="btn-outline text-lg px-12 py-3 md:py-4 min-w-[240px] sm:min-w-[280px] transition-all duration-300 hover:scale-105 hover:shadow-glow-light backdrop-blur-sm"
            >
              Explorar productos
            </a>
          </div>
        </div>
      </div>

      {/* Arrow button with gradient background */}
      <div className="absolute -bottom-4 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent flex items-center justify-center z-20">
        <button 
          onClick={scrollToServices} 
          className="transform hover:translate-y-1 transition-transform duration-300" 
          aria-label="Desplazarse hacia abajo"
        >
          <ArrowDown className="h-12 w-12 text-tech-blue hover:text-tech-blue/80" />
        </button>
      </div>
    </div>
  );
};

export default Hero;