'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, ArrowLeft, Share2, MessageSquare } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function BlogDetailsPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* ===== Back Button ===== */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/blog" className="flex items-center gap-3 text-royal-gold text-[10px] font-bold uppercase tracking-[0.25em] hover:gap-5 transition-all w-fit">
          <ArrowLeft className="w-4 h-4" />
          Back to Archives
        </Link>
      </div>

      {/* ===== Article Header ===== */}
      <header className="container mx-auto px-4 max-w-4xl space-y-8 mb-16">
        <div className="space-y-4">
          <span className="text-royal-gold text-[10px] font-bold uppercase tracking-[0.4em]">Lifestyle</span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
            The Art of Sovereign Living: <br />
            <span className="text-royal-gold italic">A Guide to Luxury</span>
          </h1>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-6 border-y border-royal-gold/10 py-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-royal-gold/20 p-0.5">
                <div className="w-full h-full bg-royal-gold/10 rounded-full flex items-center justify-center text-royal-gold font-bold text-xs italic">A</div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Written By</span>
                <span className="text-sm font-serif text-white">Admin User</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Published</span>
              <span className="text-sm font-serif text-white">May 12, 2026</span>
            </div>
          </div>
          
          <div className="flex gap-4">
            <button className="p-3 border border-royal-gold/10 text-white/40 hover:text-royal-gold hover:border-royal-gold transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-3 border border-royal-gold/10 text-white/40 hover:text-royal-gold hover:border-royal-gold transition-all">
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ===== Main Image ===== */}
      <div className="container mx-auto px-4 mb-16">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000" 
            alt="Article Feature" 
            fill 
            className="object-cover"
          />
        </div>
      </div>

      {/* ===== Article Content ===== */}
      <article className="container mx-auto px-4 max-w-3xl">
        <div className="prose prose-invert prose-royal max-w-none space-y-8">
          <p className="text-xl text-white/80 font-serif italic leading-relaxed">
            "Luxury is not just about the finest materials or the most expensive suites; it's about the feeling of sovereignty, the peace of mind that comes from knowing every detail is handled with precision and care."
          </p>
          
          <div className="h-px bg-royal-gold/20 w-32" />
          
          <p className="text-white/60 leading-relaxed text-lg">
            At the Royal Palace, we believe that every guest deserves to experience life at its most exquisite. From the moment you step through our grand lobby doors, you are not just a visitor; you are part of a heritage of excellence that spans decades.
          </p>
          
          <h2 className="text-3xl font-serif font-bold text-white pt-8">The Pillars of Sovereignty</h2>
          <p className="text-white/60 leading-relaxed">
            Our philosophy is built on three core pillars: Elegance, Comfort, and Personalized Service. We meticulously curate every element of your stay—from the 1000-thread-count Egyptian cotton linens to the custom-designed marble bathrooms.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
            <div className="aspect-square relative">
               <Image src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1000" fill className="object-cover" alt="Interior" />
            </div>
            <div className="aspect-square relative">
               <Image src="https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1000" fill className="object-cover" alt="Detail" />
            </div>
          </div>
          
          <p className="text-white/60 leading-relaxed">
            As we continue to evolve, our commitment to providing a sanctuary of luxury remains unchanged. Join us as we explore new horizons of hospitality, where every stay is a masterpiece of comfort.
          </p>
        </div>
      </article>
    </div>
  );
}
