'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

const blogs = [
  {
    id: '1',
    title: 'The Art of Sovereign Living: A Guide to Luxury',
    excerpt: 'Discover the secrets behind our world-class hospitality and how we define the standard of elegance.',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000',
    date: 'May 12, 2026',
    author: 'Admin',
    category: 'Lifestyle'
  },
  {
    id: '2',
    title: 'Fine Dining: A Culinary Journey at Royal Palace',
    excerpt: 'Explore the exquisite flavors and masterfully crafted dishes from our Michelin-starred kitchen.',
    image: 'https://images.unsplash.com/photo-1550966842-28c2e27bde20?auto=format&fit=crop&q=80&w=1000',
    date: 'May 10, 2026',
    author: 'Executive Chef',
    category: 'Culinary'
  },
  {
    id: '3',
    title: 'Wellness & Serenity: The Ultimate Spa Retreat',
    excerpt: 'Unwind and rejuvenate your spirit with our comprehensive wellness guide and spa treatments.',
    image: 'https://images.unsplash.com/photo-1544161515-4ae6b91839d4?auto=format&fit=crop&q=80&w=1000',
    date: 'May 05, 2026',
    author: 'Wellness Lead',
    category: 'Wellness'
  },
  {
    id: '4',
    title: 'Coastal Escapes: Exploring the Hidden Gems',
    excerpt: 'A curated list of the most breathtaking coastal spots near our resort for the perfect day out.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000',
    date: 'April 28, 2026',
    author: 'Concierge',
    category: 'Travel'
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ===== Header ===== */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1445019980597-93fa8acb246c?auto=format&fit=crop&q=80&w=2000" 
          alt="Blog Header" 
          fill 
          className="object-cover opacity-30"
        />
        <div className="relative z-10 text-center space-y-6 px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-royal-gold/20 w-20" />
            <BookOpen className="w-6 h-6 text-royal-gold" />
            <div className="h-px bg-royal-gold/20 w-20" />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tight">
            Royal <span className="text-royal-gold italic">Archives</span>
          </h1>
          <p className="text-white/40 text-[10px] uppercase tracking-[0.5em] font-bold">Insights into the sovereign lifestyle</p>
        </div>
      </section>

      {/* ===== Blog Grid ===== */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogs.map((blog, index) => (
            <motion.article 
              key={blog.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/blog/${blog.id}`} className="block space-y-6">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image 
                    src={blog.image} 
                    alt={blog.title} 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                  <div className="absolute top-6 left-6">
                    <span className="bg-royal-gold text-royal-blue px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest shadow-xl">
                      {blog.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-6 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-royal-gold" />
                      {blog.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3 text-royal-gold" />
                      {blog.author}
                    </div>
                  </div>
                  
                  <h2 className="text-3xl font-serif font-bold text-white group-hover:text-royal-gold transition-colors duration-300 leading-tight">
                    {blog.title}
                  </h2>
                  
                  <p className="text-white/60 text-sm font-light leading-relaxed">
                    {blog.excerpt}
                  </p>
                  
                  <div className="pt-4 flex items-center gap-3 text-royal-gold text-[10px] font-bold uppercase tracking-[0.25em] group-hover:gap-5 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
