import HeroSection from '@/components/sections/homepage/hero-section';
import AboutUsSection from '@/components/sections/homepage/about-us-section';
import RoomAndSuites from '@/components/sections/homepage/room-and-suites';

import TestimonialsSection from '@/components/sections/homepage/testimonials-section';

import TeamSection from '@/components/sections/homepage/team-section';

import { ContactUs } from '@/components/sections/homepage/contact-us-section';
import { FAQSection } from '@/components/sections/homepage/faq-section';
import StatsSection from '@/components/sections/homepage/stats-section';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ===== Hero Section ===== */}
      <HeroSection />

      {/* ===== About Us Section ===== */}
      <AboutUsSection />

      {/* ===== Statistics Section ===== */}
      <StatsSection />

      {/* ===== Rooms & Suites Section ===== */}
      <RoomAndSuites />



      {/* ===== Team Member Section ===== */}
      <TeamSection />

      {/* ===== Testimonials Section ===== */}
      <TestimonialsSection />

      {/* ===== Sponsors Section (commented out) ===== */}
      {/* <SpoonserSection /> */}

      {/* ===== Blogs Section (commented out) ===== */}
      {/* <BlogsSection /> */}
      <FAQSection />
      <ContactUs />
      
    </div>
  );
}
