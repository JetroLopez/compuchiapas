import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon,
  className,
  style
}) => {
  const whatsappNumber = "9622148546"; // Número de WhatsApp actualizado
  const whatsappMessage = `Hola, me interesa el servicio de ${title}. ¿Podrían darme más información?`;
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <div 
      className={cn(
        "glass-card rounded-2xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col h-[360px]",
        className
      )}
      style={style}
    >
      <div className="w-16 h-16 mb-6 flex items-center justify-center rounded-xl bg-tech-blue/10 text-tech-blue">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 flex-grow line-clamp-4">{description}</p>
      
      <button 
        onClick={handleWhatsAppClick}
        className="group flex items-center text-tech-blue font-medium hover:underline mt-6"
      >
        Cotizar por WhatsApp
        <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default ServiceCard;
