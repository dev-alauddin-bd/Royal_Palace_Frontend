'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Quote,
  Star,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Button } from '../../ui/button';
import { useFindAllTestimonialsQuery } from '@/redux/features/testimonial/testimonialApi';
import { ITestimonial } from '@/types/testimonial.interface';

const pageVariants = {
  initial: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
};

const fullPageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
};

const TestimonialsSection = () => {
  // Pagination State & direction for slide animation
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState(0);
  const limit = 2;

  // Fetch Testimonials
  const { data: testimonialsData } = useFindAllTestimonialsQuery({
    page,
    limit,
  });
  const testimonials = Array.isArray(testimonialsData?.data?.data) ? testimonialsData.data.data : [];

  // Pagination Handlers with direction set
  const handleNext = () => {
    if (testimonials.length === limit) {
      setDirection(1);
      setPage((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (page > 1) {
      setDirection(-1);
      setPage((prev) => prev - 1);
    }
  };

  return (
    <motion.section
      variants={fullPageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="relative min-h-screen bg-royal-obsidian"
    >
      {/* Background Image Overlay */}
      <div className="absolute h-[70vh] inset-0">
        <Image
          src="/images/08d793fa28a68cda.jpg"
          alt="Luxury resort sunset view"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 py-6 px-4 md:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto w-full">
          {/* Section Header */}

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            {/* Title Decoration */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-royal-gold to-transparent w-12 md:w-32 mr-6"></div>
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 text-royal-gold mr-3" />
                <h2 className="text-royal-gold text-sm font-medium tracking-[0.2em] uppercase">
                  Testimonials
                </h2>
                <MessageCircle className="w-6 h-6 text-royal-gold ml-3" />
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-royal-gold to-transparent w-12 md:w-32 ml-6"></div>
            </div>

            {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight text-center max-w-5xl mx-auto text-white">
            Hear from our <span className="text-royal-gold italic">Valued Guests</span>
          </h1>
        </motion.div>
        {/* Testimonials Cards with slide animation */}
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-12 mb-16"
          >
            {testimonials.map((testimonial: ITestimonial) => (
              <div
                key={testimonial._id}
                className="glass-panel border-white/10 rounded-none p-12 relative overflow-hidden"
              >
                {/* User Info & Avatar */}
                <div className="flex items-center mb-8">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-none overflow-hidden border border-royal-gold/30">
                      <Image
                        src={testimonial.userImage || '/placeholder.svg'}
                        alt={testimonial.userName || 'User avatar'}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -top-3 -right-3 bg-royal-gold text-royal-blue px-3 py-1 flex items-center space-x-1 font-bold text-xs">
                      <Star className="w-3 h-3 fill-royal-blue" />
                      <span>{testimonial.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Testimonial Text */}
                <Quote className="w-10 h-10 text-royal-gold mb-8 opacity-50" />
                <p className="text-white text-xl font-serif italic leading-relaxed mb-8">
                  "{testimonial.reviewText}"
                </p>

                {/* Author Name */}
                <div className="border-t border-white/10 pt-6">
                  <h4 className="text-royal-gold font-bold text-[10px] uppercase tracking-[0.3em]">
                    {testimonial.userName}
                  </h4>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination Buttons */}
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="w-14 h-14 border border-royal-gold/30 text-royal-gold flex items-center justify-center transition-all hover:bg-royal-gold hover:text-royal-blue disabled:opacity-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 h-px bg-white/10 max-w-sm relative">
            <div 
              className="absolute h-full bg-royal-gold transition-all duration-500" 
              style={{ width: `${(page / (testimonialsData?.data?.meta?.totalPages || 1)) * 100}%` }}
            />
          </div>

          <button
            onClick={handleNext}
            disabled={testimonials.length < limit}
            className="w-14 h-14 bg-royal-gold text-royal-blue flex items-center justify-center transition-all hover:bg-royal-gold-dark hover:text-white disabled:opacity-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

          {/* Mobile “View All” Button */}
          <div className="flex justify-center mt-8 md:hidden">
            <Button
              variant="outline"
              className="border-white bg-tra text-white hover:bg-white hover:text-black"
            >
              VIEW ALL
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default TestimonialsSection;
