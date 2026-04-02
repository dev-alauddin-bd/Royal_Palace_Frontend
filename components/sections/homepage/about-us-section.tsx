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
          className="mb-20"
        >
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-32 mr-6" />
            <div className="flex items-center">
              <Crown className="w-6 h-6 text-[#bf9310] mr-3" />
              <h2 className="text-[#bf9310] text-base md:text-sm font-medium tracking-[0.2em] uppercase">
                About Our Palace
              </h2>
              <Crown className="w-6 h-6 text-[#bf9310] ml-3" />
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-32 ml-6" />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base md:text-3xl lg:text-5xl font-medium leading-snug text-center max-w-6xl mx-auto text-foreground"
          >
            Where Royal Heritage Meets
            <br />
            Modern Luxury & Elegance
          </motion.h1>
        </motion.div>

        {/* ===== Content Grid ===== */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 🖼️ Image Section with Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/reception.avif"
                alt="Royal Palace Hotel Grand Lobby"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>

            <div className="absolute -bottom-6 -right-6 bg-[#bf9310] p-4 rounded-2xl shadow-2xl hidden md:block">
              <Award className="w-8 h-8 text-slate-900" />
              <div className="text-slate-900 font-bold text-sm mt-1">
                5-Star
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
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
                  className="text-center"
                >
                  <div className="text-5xl font-light text-[#bf9310] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-foreground text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-6 mb-10">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-foreground leading-relaxed text-base md:text-lg"
              >
                Nestled in the heart of the city, our Royal Palace Hotel stands
                as a testament to timeless elegance and unmatched luxury,
                offering a serene escape amidst urban vibrance.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-base md:text-lg text-foreground leading-relaxed"
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
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10"
            >
              {[
                { icon: Users, label: '24/7 Butler Service' },
                { icon: Star, label: 'Michelin Dining' },
                { icon: Crown, label: 'Royal Heritage' },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center justify-center bg-main px-4 py-2 rounded-full border border-slate-700"
                >
                  <Icon className="w-4 h-4 text-[#bf9310] mr-2" />
                  <span className="text-sm text-foreground">{label}</span>
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
