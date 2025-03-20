import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { Link, useLocation } from 'react-router-dom';

const Policies: React.FC = () => {
  const location = useLocation();
  const hash = location.hash.replace('#', '');

  useEffect(() => {
    document.title = "Políticas y Términos | Compuchiapas";
    
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        const navbarOffset = 100;
        if (element) {
          const elementTop = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementTop - navbarOffset,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [hash]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    const navbarOffset = 140;
    
    if (element) {
      const elementTop = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementTop - navbarOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-tech-lightGray to-white">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Políticas y Términos</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Información importante sobre nuestras políticas, términos y condiciones
          </p>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-20 bg-white border-b z-30">
        <div className="container-padding max-w-7xl mx-auto py-4">
          <ul className="flex space-x-6 overflow-x-auto">
            <li>
              <button 
                onClick={() => scrollToSection('privacidad')}
                className="text-tech-gray hover:text-tech-blue whitespace-nowrap"
              >
                Política de Privacidad
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('terminos')}
                className="text-tech-gray hover:text-tech-blue whitespace-nowrap"
              >
                Términos y Condiciones
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('envios')}
                className="text-tech-gray hover:text-tech-blue whitespace-nowrap"
              >
                Política de Envíos
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('devoluciones')}
                className="text-tech-gray hover:text-tech-blue whitespace-nowrap"
              >
                Política de Devoluciones
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection('garantia')}
                className="text-tech-gray hover:text-tech-blue whitespace-nowrap"
              >
                Garantía
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Content */}
      <div className="section-padding">
        <div className="container-padding max-w-4xl mx-auto">
          {/* Política de Privacidad */}
          <section id="privacidad" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Política de Privacidad</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                [Aquí irá el contenido detallado de la política de privacidad, incluyendo:]
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Información que recopilamos</li>
                <li>Cómo utilizamos su información</li>
                <li>Protección de datos</li>
                <li>Derechos del usuario</li>
                <li>Cookies y tecnologías similares</li>
                <li>Compartir información con terceros</li>
              </ul>
            </div>
          </section>

          {/* Términos y Condiciones */}
          <section id="terminos" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Términos y Condiciones</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                [Aquí irán los términos y condiciones detallados, incluyendo:]
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Condiciones de uso del sitio</li>
                <li>Proceso de compra</li>
                <li>Precios y pagos</li>
                <li>Propiedad intelectual</li>
                <li>Limitación de responsabilidad</li>
                <li>Modificaciones de los términos</li>
              </ul>
            </div>
          </section>

          {/* Política de Envíos */}
          <section id="envios" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Política de Envíos</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                [Aquí irá la política de envíos detallada, incluyendo:]
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Tiempos de entrega</li>
                <li>Costos de envío</li>
                <li>Áreas de cobertura</li>
                <li>Seguimiento de pedidos</li>
                <li>Restricciones de envío</li>
              </ul>
            </div>
          </section>

          {/* Política de Devoluciones */}
          <section id="devoluciones" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Política de Devoluciones</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                [Aquí irá la política de devoluciones detallada, incluyendo:]
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Proceso de devolución</li>
                <li>Plazos para devoluciones</li>
                <li>Condiciones del producto</li>
                <li>Reembolsos</li>
                <li>Excepciones</li>
              </ul>
            </div>
          </section>

          {/* Garantía */}
          <section id="garantia" className="mb-16">
            <h2 className="text-3xl font-bold mb-6">Garantía</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600">
                [Aquí irá la política de garantía detallada, incluyendo:]
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Cobertura de la garantía</li>
                <li>Duración de la garantía</li>
                <li>Proceso de reclamación</li>
                <li>Exclusiones</li>
                <li>Servicio técnico</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Policies; 