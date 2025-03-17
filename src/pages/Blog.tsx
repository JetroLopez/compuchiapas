import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

interface BlogPost {
  id: string; // UUID en la base de datos
  title: string;
  content: string;
  summary: string;
  author: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
}

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Blog Tecnológico | Compuchiapas";
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_entries')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;

      setBlogPosts(data || []);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('No se pudieron cargar las entradas del blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tech-blue"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{error}</h2>
            <button 
              onClick={() => fetchBlogPosts()}
              className="btn-primary"
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const featuredPost = blogPosts[0];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-4 md:pt-28 md:pb-8 bg-gradient-to-b from-tech-lightGray to-white">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Tecnológico</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Artículos, guías y consejos para mantenerte al día con la tecnología
          </p>
        </div>
      </section>
      
      {/* Featured Article */}
      {featuredPost && (
        <section className="py-6">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-64 md:h-auto">
                  <img 
                    src={featuredPost.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar size={16} className="mr-2" />
                    <span>{new Date(featuredPost.published_at).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                    <span className="mx-2">•</span>
                    <User size={16} className="mr-2" />
                    <span>{featuredPost.author}</span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-gray-600 mb-6">{featuredPost.summary}</p>
                  
                  <Link 
                    to={`/blog/${featuredPost.id}`} 
                    className="group flex items-center text-tech-blue font-medium hover:underline mt-auto"
                  >
                    Leer artículo completo
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Blog Posts Grid */}
      <section className="py-12 bg-tech-lightGray">
        <div className="container-padding max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Artículos recientes</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1, 4).map((post) => (
              <div key={post.id} className="glass-card rounded-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full">
                <div className="relative h-48">
                  <img 
                    src={post.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span>{new Date(post.published_at).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{post.summary}</p>
                  
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="group flex items-center text-tech-blue font-medium hover:underline mt-auto"
                  >
                    Leer más
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {blogPosts.length > 4 && (
            <div className="mt-8 text-center">
              <Link to="/blog/archive" className="btn-outline">
                Ver más artículos
              </Link>
            </div>
          )}
        </div>
      </section>
      
      {/* Archive Section */}
      <section className="py-12">
        <div className="container-padding max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Archivo de artículos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from(new Set(blogPosts.map(post => {
              const date = new Date(post.published_at);
              const monthYear = `${date.toLocaleString('es', { month: 'long' })} ${date.getFullYear()}`;
              return monthYear;
            }))).slice(0, 6).map((month: string, index) => (
              <Link 
                key={index}
                to={`/blog/archive/${month.toLowerCase().replace(' ', '-')}`}
                className="glass-card rounded-2xl p-6 flex justify-between items-center transition-all duration-300 hover:bg-tech-blue/5"
              >
                <span className="font-medium">{month}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-12 bg-tech-blue text-white">
        <div className="container-padding max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Suscríbete a nuestro boletín</h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto opacity-90">
            Recibe nuestros artículos más recientes y consejos tecnológicos directamente en tu correo
          </p>
          
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="px-4 py-3 rounded-lg flex-grow focus:outline-none text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-white text-tech-blue hover:bg-gray-100 py-3 px-6 rounded-lg font-medium transition-all duration-300"
            >
              Suscribirme
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
