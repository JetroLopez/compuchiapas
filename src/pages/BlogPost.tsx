import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  image_url: string | null;
  published_at: string;
  created_at: string;
}

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    try {
      if (!id) throw new Error('ID no proporcionado');

      const { data, error } = await supabase
        .from('blog_entries')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Artículo no encontrado');

      setPost(data);
      document.title = `${data.title} | Compuchiapas Blog`;
    } catch (err) {
      console.error('Error fetching blog post:', err);
      setError('No se pudo cargar el artículo');
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

  if (error || !post) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{error || 'Artículo no encontrado'}</h2>
            <Link 
              to="/blog"
              className="btn-primary inline-flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al blog
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section with Image */}
      <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={post.image_url || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97'} 
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="container-padding max-w-4xl mx-auto text-center text-white">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {post.title}
            </h1>
            <div className="flex items-center justify-center text-sm space-x-4">
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                <span>{new Date(post.published_at).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="py-12">
        <div className="container-padding max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          <div className="mt-12 pt-8 border-t">
            <Link 
              to="/blog"
              className="inline-flex items-center text-tech-blue hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al blog
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost; 