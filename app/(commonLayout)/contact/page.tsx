'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save contact data to DB can be added here
    console.log('Contact form submitted:', formData);
    alert('Thank you for contacting Royal Palace. Our concierge will reach out to you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-royal-obsidian">
      {/* ===== Hero ===== */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/Hero-Banner.webp')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4">
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-5xl md:text-6xl font-serif font-bold text-white uppercase tracking-[0.3em]"
           >
             Contact <span className="text-royal-gold italic">Us</span>
           </motion.h1>
           <p className="text-royal-gold/60 text-[10px] font-bold uppercase tracking-[0.5em] mt-4">24/7 Royal Concierge</p>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 max-w-6xl mx-auto">
          {/* Info Side */}
          <div className="space-y-12">
            <div>
               <h2 className="text-4xl font-serif font-bold text-white mb-6">Get in <span className="text-royal-gold italic">Touch</span></h2>
               <p className="text-white/40 leading-loose uppercase tracking-widest text-xs">
                 Whether you have a question about our suites, events, or need assistance with your booking, our dedicated team is here to ensure your experience is flawless.
               </p>
            </div>

            <div className="space-y-8">
               <div className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 border border-royal-gold/20 flex items-center justify-center group-hover:border-royal-gold transition-colors">
                     <MapPin className="w-5 h-5 text-royal-gold" />
                  </div>
                  <div>
                     <h4 className="text-royal-gold text-[10px] font-bold uppercase tracking-widest mb-1">Our Location</h4>
                     <p className="text-white/70 text-sm">123 Sovereign Way, Luxury District, Royal City</p>
                  </div>
               </div>

               <div className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 border border-royal-gold/20 flex items-center justify-center group-hover:border-royal-gold transition-colors">
                     <Phone className="w-5 h-5 text-royal-gold" />
                  </div>
                  <div>
                     <h4 className="text-royal-gold text-[10px] font-bold uppercase tracking-widest mb-1">Reservations</h4>
                     <p className="text-white/70 text-sm">+1 (800) ROYAL-PLCE</p>
                  </div>
               </div>

               <div className="flex items-start space-x-6 group">
                  <div className="w-12 h-12 border border-royal-gold/20 flex items-center justify-center group-hover:border-royal-gold transition-colors">
                     <Mail className="w-5 h-5 text-royal-gold" />
                  </div>
                  <div>
                     <h4 className="text-royal-gold text-[10px] font-bold uppercase tracking-widest mb-1">Email Us</h4>
                     <p className="text-white/70 text-sm">concierge@royalpalace.com</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="glass-panel p-10 border-white/5 relative">
            <div className="absolute -top-1 -right-1 w-12 h-12 border-t-2 border-r-2 border-royal-gold/30" />
            
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-royal-gold/80 font-bold">Your Name</label>
                     <input 
                        type="text" 
                        required
                        className="w-full bg-white/5 border border-white/10 p-4 text-xs text-white focus:border-royal-gold transition-colors outline-none rounded-none"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] uppercase tracking-widest text-royal-gold/80 font-bold">Email Address</label>
                     <input 
                        type="email" 
                        required
                        className="w-full bg-white/5 border border-white/10 p-4 text-xs text-white focus:border-royal-gold transition-colors outline-none rounded-none"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                     />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-royal-gold/80 font-bold">Subject</label>
                  <input 
                     type="text" 
                     required
                     className="w-full bg-white/5 border border-white/10 p-4 text-xs text-white focus:border-royal-gold transition-colors outline-none rounded-none"
                     value={formData.subject}
                     onChange={e => setFormData({...formData, subject: e.target.value})}
                  />
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-royal-gold/80 font-bold">Message</label>
                  <textarea 
                     required
                     rows={5}
                     className="w-full bg-white/5 border border-white/10 p-4 text-xs text-white focus:border-royal-gold transition-colors outline-none rounded-none resize-none"
                     value={formData.message}
                     onChange={e => setFormData({...formData, message: e.target.value})}
                  />
               </div>

               <button type="submit" className="w-full royal-button flex items-center justify-center">
                  <Send className="w-4 h-4 mr-3" />
                  SEND MESSAGE
               </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
