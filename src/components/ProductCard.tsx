import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  specs: string[];
  sku?: string;
  stock?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  name, 
  price, 
  image, 
  specs,
  sku,
  stock
}) => {
  const category = specs.find(spec => spec.includes('Marca:'))?.replace('Marca:', '').trim() || '';
  const whatsappNumber = "9622148546";
  const whatsappMessage = `Me interesa el producto ${name} con clave ${sku || 'N/A'} que ví en su sitio web`;
  
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden transform transition-all duration-300 hover:shadow-xl group">
      <div className="relative overflow-hidden h-56">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      
      <div className="p-6">
        <h3 className="text-base font-semibold mb-1 line-clamp-2">{name}</h3>
        <p className="text-tech-blue text-sm mb-2">{category}</p>
        {sku && (
          <p className="text-gray-400 text-sm mb-2">SKU: {sku}</p>
        )}
        
        {stock !== undefined && (
          <p className="text-sm font-medium mb-3">
            {stock > 0 ? (
              <span className="text-green-600">Disponible</span>
            ) : (
              <span className="text-red-600">No disponible</span>
            )}
          </p>
        )}
        
        <button 
          onClick={handleWhatsAppClick}
          className="w-full btn-primary flex items-center justify-center gap-2 py-2"
          disabled={stock !== undefined && stock < 1}
        >
          <MessageCircle size={18} />
          Consulta
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
