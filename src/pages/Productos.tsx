import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout';
import ProductHero from '../components/product/ProductHero';
import CustomQuoteBanner from '../components/product/CustomQuoteBanner';
import ProductFilters from '../components/product/ProductFilters';
import ProductsList from '../components/product/ProductsList';
import CustomPCBuild from '../components/product/CustomPCBuild';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useSearchParams } from 'react-router-dom';

const Productos: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const productSectionRef = useRef<HTMLDivElement>(null);
  
  // Define las categorías predefinidas que coinciden con la LINEA ACT de Supabase
  const [categories, setCategories] = useState([
    { id: 'all', name: 'Todos' },
    { id: 'accesorios', name: 'Accesorios' },
    { id: 'almacenamiento', name: 'Almacenamiento' },
    { id: 'cargadores', name: 'Cargadores' },
    { id: 'computadoras', name: 'Computadoras' },
    { id: 'consumibles', name: 'Consumibles' },
    { id: 'digitales', name: 'Digitales' },
    { id: 'energia', name: 'Energía' },
    { id: 'impresoras', name: 'Impresoras' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'mobiliario', name: 'Mobiliario' },
    { id: 'monitores', name: 'Monitores' },
    { id: 'punto de venta', name: 'Punto de venta' },
    { id: 'redes', name: 'Redes' }
  ]);

  // Obtener categorías de Supabase
  const { data: supabaseCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('Productos')
          .select('*');
          
        if (error) {
          console.error('Error fetching categories:', error);
          throw error;
        }
        
        console.log('Categories data from Supabase:', data);
        
        if (!data || data.length === 0) {
          console.log('No categories found');
          return categories;
        }
        
        const uniqueCategories = Array.from(new Set(data.map(item => String(item["LINEA ACT"]))));
        console.log('Unique categories:', uniqueCategories);
        
        const categoryObjects = uniqueCategories.map(category => ({
          id: String(category).toLowerCase(),
          name: String(category)
        }));
        
        const allCategories = [
          { id: 'all', name: 'Todos' },
          ...categoryObjects
        ];
        
        console.log('All categories:', allCategories);
        
        if (categoryObjects.length > 0) {
          setCategories(allCategories);
        }
        
        return allCategories;
      } catch (error) {
        console.error('Error fetching categories:', error);
        return categories;
      }
    },
    enabled: true
  });

  // Aplicar filtro de la URL al cargar la página y hacer scroll
  useEffect(() => {
    const categoriaFromUrl = searchParams.get('categoria');
    if (categoriaFromUrl) {
      setActiveCategory(categoriaFromUrl);
      requestAnimationFrame(() => {
        productSectionRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      });
    }
  }, [searchParams]);

  useEffect(() => {
    document.title = "Productos | Compuchiapas";
  }, []);

  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory('all');
  };

  return (
    <Layout>
      <ProductHero />
      
      {/* Special Banner - reduced spacing */}
      <section className="py-8">
        <div className="container-padding max-w-7xl mx-auto">
          <CustomQuoteBanner />
        </div>
      </section>
      
      {/* Product Catalog */}
      <section ref={productSectionRef} className="py-12">
        <div className="container-padding max-w-7xl mx-auto">
          {/* Search and Filter */}
          <ProductFilters 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          
          {/* Products Grid with fixed height and scroll */}
          <div className="h-[600px] overflow-y-auto rounded-lg">
            <ProductsList 
              products={[]} 
              searchTerm={searchTerm}
              activeCategory={activeCategory}
              resetFilters={resetFilters}
            />
          </div>
        </div>
      </section>
      
      {/* Custom Builds CTA - reduced spacing */}
      <section className="py-12 bg-tech-lightGray">
        <div className="container-padding max-w-7xl mx-auto">
          <CustomPCBuild />
        </div>
      </section>
    </Layout>
  );
};

export default Productos;
