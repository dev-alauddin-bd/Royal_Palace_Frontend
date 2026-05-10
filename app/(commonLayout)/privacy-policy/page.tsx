'use client';

import React from 'react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-royal-obsidian text-white/80 py-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-20">
           <Shield className="w-16 h-16 text-royal-gold mx-auto mb-6 opacity-50" />
           <h1 className="text-4xl md:text-5xl font-serif font-bold text-white uppercase tracking-widest mb-4">Privacy <span className="text-royal-gold italic">Policy</span></h1>
           <p className="text-[10px] uppercase tracking-[0.5em] text-royal-gold/40">Last Updated: May 2026</p>
        </div>

        <div className="space-y-16">
          <section className="space-y-6">
            <div className="flex items-center space-x-4">
               <div className="w-8 h-px bg-royal-gold" />
               <h2 className="text-xl font-serif font-bold text-white uppercase tracking-widest">Introduction</h2>
            </div>
            <p className="leading-loose text-sm uppercase tracking-widest">
              At Royal Palace, your privacy is as paramount as your comfort. This policy outlines how we handle the personal information you entrust to us during your stay and while using our digital platforms.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center space-x-4">
               <div className="w-8 h-px bg-royal-gold" />
               <h2 className="text-xl font-serif font-bold text-white uppercase tracking-widest">Data Collection</h2>
            </div>
            <p className="leading-loose text-sm uppercase tracking-widest">
              We collect information necessary to provide you with a bespoke hospitality experience, including:
            </p>
            <ul className="list-none space-y-4 text-[10px] font-bold uppercase tracking-widest">
               <li className="flex items-center space-x-4"><div className="w-1 h-1 bg-royal-gold" /> <span>Identity & Contact Information</span></li>
               <li className="flex items-center space-x-4"><div className="w-1 h-1 bg-royal-gold" /> <span>Payment & Transaction Details</span></li>
               <li className="flex items-center space-x-4"><div className="w-1 h-1 bg-royal-gold" /> <span>Personal Preferences & Stay History</span></li>
            </ul>
          </section>

          <section className="space-y-6">
            <div className="flex items-center space-x-4">
               <div className="w-8 h-px bg-royal-gold" />
               <h2 className="text-xl font-serif font-bold text-white uppercase tracking-widest">Security Sovereignty</h2>
            </div>
            <p className="leading-loose text-sm uppercase tracking-widest">
              We employ state-of-the-art encryption and physical security measures to protect your data. Your information is never shared with third parties for marketing purposes without your explicit royal consent.
            </p>
          </section>

          <div className="pt-20 border-t border-royal-gold/10 text-center">
             <p className="text-[9px] uppercase tracking-widest text-white/40 italic">
               For any inquiries regarding your data, please contact our Data Sovereign at privacy@royalpalace.com
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
