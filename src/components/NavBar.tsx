import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavBar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const menuButton = document.querySelector('[data-menu="button"]');
      if (
        menuOpen && 
        !target.closest('[data-menu="mobile"]') && 
        !target.closest('[data-menu="button"]') &&
        target !== menuButton
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Productos', path: '/productos' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contacto' },
  ];

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/contacto') {
      e.preventDefault();
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={cn(
        'fixed w-full z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container-padding mx-auto">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex flex-col items-start leading-tight">
            <span className="text-2xl font-bold text-tech-blue">
              Compusistemas
            </span>
            <span className="text-2xl font-bold text-tech-blue -mt-1">
              de Chiapas
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  'font-medium transition-colors hover:text-tech-blue',
                  location.pathname === link.path 
                    ? 'text-tech-blue' 
                    : 'text-gray-600'
                )}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href={location.pathname === '/contacto' ? '#contact-form' : '/contacto'} 
              className="btn-primary"
              onClick={handleContactClick}
            >
              Contáctanos
            </a>
          </nav>

          {/* Mobile menu button */}
          <button 
            data-menu="button"
            className="md:hidden p-4 -m-4" 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div data-menu="mobile" className="md:hidden bg-white">
          <nav className="flex flex-col px-4 py-6 space-y-4 animate-fade-in">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={cn(
                  'font-medium py-2 transition-colors',
                  location.pathname === link.path 
                    ? 'text-tech-blue' 
                    : 'text-gray-600'
                )}
              >
                {link.name}
              </Link>
            ))}
            <a 
              href={location.pathname === '/contacto' ? '#contact-form' : '/contacto'} 
              className="btn-primary text-center mt-2"
              onClick={handleContactClick}
            >
              Contáctanos
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
