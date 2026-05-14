'use client';

import { motion } from 'framer-motion';
import { Crown, Star, Award, Users } from 'lucide-react';
import Image from 'next/image';

const AboutUsSection = () => {
  return (
    <section className="bg-main text-white py-20 p-4 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        {/* ===== Section Title with Decorative Lines and Icons ===== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="flex items-center justify-center mb-10">
            <div className="h-px bg-royal-gold/20 w-12 md:w-32 mr-8" />
            <div className="flex items-center">
              <Crown className="w-5 h-5 text-royal-gold mr-4" />
              <h2 className="royal-label">
                About Our Palace
              </h2>
              <Crown className="w-5 h-5 text-royal-gold ml-4" />
            </div>
            <div className="h-px bg-royal-gold/20 w-12 md:w-32 ml-8" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif font-bold leading-tight text-center max-w-5xl mx-auto text-foreground"
          >
            Where Royal Heritage Meets <span className="text-royal-gold italic">Modern Luxury & Elegance</span>
          </motion.h1>
        </motion.div>

        {/* ===== Content Grid ===== */}
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* 🖼️ Image Section with Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden border border-royal-gold/10">
              <Image
                src="/images/reception.avif"
                alt="Royal Palace Hotel Grand Lobby"
                fill
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="absolute -bottom-8 -right-8 bg-royal-obsidian border border-royal-gold p-8 shadow-2xl hidden md:block">
              <Award className="w-10 h-10 text-royal-gold mb-4" />
              <div className="text-white font-serif font-bold text-xl uppercase tracking-widest">
                Five Star
              </div>
              <div className="text-royal-gold text-[10px] font-bold uppercase tracking-[0.3em] mt-1">
                Luxury Standard
              </div>
            </div>
          </motion.div>

          {/* 📄 Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 border-b border-royal-gold/10 pb-16">
              {[
                { value: '150+', label: 'Royal Suites' },
                { value: '5.0', label: 'Royal Rating' },
                { value: '200K+', label: 'Distinguished Guests' },
              ].map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * idx }}
                  viewport={{ once: true }}
                  className="text-left"
                >
                  <div className="text-5xl font-serif font-bold text-royal-gold mb-3">
                    {stat.value}
                  </div>
                  <div className="text-foreground/60 text-[10px] font-bold uppercase tracking-[0.3em]">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-8 mb-16">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-foreground leading-relaxed text-lg md:text-xl font-serif italic"
              >
                "Nestled in the heart of the city, our Royal Palace Hotel stands
                as a testament to timeless elegance and unmatched luxury,
                offering a serene escape amidst urban vibrance."
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-base md:text-lg text-foreground/70 leading-relaxed"
              >
                From our award-winning spa to curated fine dining experiences,
                every corner of the palace is crafted to exceed guest
                expectations with warmth and excellence.
              </motion.p>
            </div>

            {/* Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                { icon: Users, label: '24/7 Butler Service' },
                { icon: Star, label: 'Michelin Dining' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center bg-royal-obsidian/5 p-6 border border-royal-gold/10"
                >
                  <Icon className="w-5 h-5 text-royal-gold mr-4" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
