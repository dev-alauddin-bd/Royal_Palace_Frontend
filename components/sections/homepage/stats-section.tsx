'use client';

import { motion } from 'framer-motion';
import { Users, Bed, Calendar, Award } from 'lucide-react';
import React from 'react';

const stats = [
  {
    label: 'Happy Guests',
    value: '15k+',
    icon: Users,
    description: 'Serving sovereignty since 1994'
  },
  {
    label: 'Luxury Suites',
    value: '120+',
    icon: Bed,
    description: 'Curated for ultimate comfort'
  },
  {
    label: 'Events Hosted',
    value: '2.5k+',
    icon: Calendar,
    description: 'Unforgettable moments created'
  },
  {
    label: 'Awards Won',
    value: '45+',
    icon: Award,
    description: 'Excellence in hospitality'
  }
];

const StatsSection = () => {
  return (
    <section className="py-24 bg-royal-obsidian relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-royal-gold rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-royal-gold rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-none border border-royal-gold/20 bg-white/5 mb-6 group-hover:border-royal-gold transition-colors duration-500">
                <stat.icon className="w-6 h-6 text-royal-gold" />
              </div>
              <h3 className="text-4xl font-serif font-bold text-white mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-royal-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
                {stat.label}
              </p>
              <div className="h-px bg-white/10 w-12 mx-auto mb-4 group-hover:w-24 transition-all duration-500" />
              <p className="text-white/40 text-[9px] uppercase tracking-widest leading-loose">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
