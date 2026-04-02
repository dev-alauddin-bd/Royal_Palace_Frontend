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
  const testimonials = testimonialsData?.data || [];

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
      className="relative min-h-screen"
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
              <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-32 mr-6"></div>
              <div className="flex items-center">
                <MessageCircle className="w-6 h-6 text-[#bf9310] mr-3" />
                <h2 className="text-[#bf9310] text-sm font-medium tracking-[0.2em] uppercase">
                  Testimonials
                </h2>
                <MessageCircle className="w-6 h-6 text-[#bf9310] ml-3" />
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-[#bf9310] to-transparent w-32 ml-6"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-5xl font-medium leading-snug text-center max-w-6xl mx-auto text-white">
              Hear from our valued
              <br />
              <span className="block">guests and their experiences</span>
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
              className="grid md:grid-cols-2 gap-8 mb-12"
            >
              {testimonials.map((testimonial: ITestimonial) => (
                <div
                  key={testimonial._id}
                  className="bg-black/40 backdrop-blur-sm border rounded-lg p-8"
                >
                  {/* User Info & Avatar */}
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
                        <Image
                          src={testimonial.userImage || '/placeholder.svg'}
                          alt={testimonial.userName}
                          width={64}
                          height={64}
                          className="object-cover"
                        />
                      </div>
                      <div className="absolute -top-2 -right-2 bg-white rounded-full px-2 py-1 flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-[#bf9310] text-[#bf9310]" />
                        <span className="text-xs font-medium text-black">
                          {testimonial.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <Quote className="w-12 h-12 text-[#bf9310] mb-6" />
                  <p className="text-white text-lg leading-relaxed mb-6">
                    {testimonial.reviewText}
                  </p>

                  {/* Author Name */}
                  <div>
                    <h4 className="text-white font-medium text-lg">
                      {testimonial.userName}
                    </h4>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Buttons */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handlePrev}
              disabled={page === 1}
              className={`w-12 h-12 rounded-full border border-gray-600 text-white flex items-center justify-center transition-colors ${
                page === 1
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-white hover:text-black'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 h-px bg-gray-600 max-w-md">
              <div className="h-full bg-yellow-500 w-2/3" />
            </div>

            <button
              onClick={handleNext}
              disabled={testimonials.length < limit}
              className={`w-12 h-12 rounded-full bg-[#bf9310] text-black flex items-center justify-center transition-colors ${
                testimonials.length < limit
                  ? 'opacity-30 cursor-not-allowed'
                  : 'hover:bg-yellow-600'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
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
