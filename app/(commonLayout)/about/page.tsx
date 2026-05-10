'use client';

import React from 'react';
import AboutUsSection from '@/components/sections/homepage/about-us-section';
import StatsSection from '@/components/sections/homepage/stats-section';
import TeamSection from '@/components/sections/homepage/team-section';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* ===== About Hero ===== */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-royal-obsidian">
           <div className="absolute inset-0 bg-[url('/images/Hero-Banner.webp')] bg-cover bg-center opacity-20" />
           <div className="absolute inset-0 bg-gradient-to-t from-royal-obsidian via-transparent to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-7xl font-serif font-bold text-white uppercase tracking-[0.2em] mb-6"
           >
             Our <span className="text-royal-gold italic">Legacy</span>
           </motion.h1>
           <div className="h-px bg-royal-gold/30 w-32 mx-auto" />
        </div>
      </section>

      <AboutUsSection />
      <StatsSection />
      <TeamSection />
      
      {/* Additional Philosophy Section */}
      <section className="py-24 bg-white dark:bg-royal-obsidian border-t border-royal-gold/10">
         <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
               <h2 className="royal-label">The Royal Philosophy</h2>
               <p className="text-2xl md:text-4xl font-serif italic text-foreground/80 leading-relaxed">
                  "Hospitality is not just a service; it's a sacred bond between the host and the sovereign guest."
               </p>
               <p className="text-foreground/60 leading-loose uppercase tracking-widest text-xs font-bold">
                  Since 1994, Royal Palace has been the cornerstone of luxury in the heart of the city, 
                  blending traditional sovereignty with modern elegance to create an unmatched experience 
                  for our esteemed visitors.
               </p>
            </div>
         </div>
      </section>
    </div>
  );
}
