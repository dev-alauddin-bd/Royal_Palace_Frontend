'use client';

import { Crown } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-royal-gold/10">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Crown className="h-7 w-7 text-royal-gold" />
              <span className="font-serif text-2xl font-bold tracking-[0.1em] uppercase">Royal Palace</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Experience the pinnacle of luxury and hospitality. Our hotel offers world-class amenities and exceptional service for an unforgettable stay in the heart of sovereignty.
            </p>
          </div>
          
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-royal-gold mb-8">Quick Links</h3>
            <ul className="space-y-4 text-xs font-medium uppercase tracking-widest">
              <li><Link href="/" className="text-muted-foreground hover:text-royal-gold transition-colors">About Us</Link></li>
              <li><Link href="/rooms" className="text-muted-foreground hover:text-royal-gold transition-colors">Rooms & Suites</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-royal-gold transition-colors">FAQ</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-royal-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-royal-gold mb-8">Services</h3>
            <ul className="space-y-4 text-xs font-medium uppercase tracking-widest">
              <li><Link href="/" className="text-muted-foreground hover:text-royal-gold transition-colors">Fine Dining</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-royal-gold transition-colors">Spa & Wellness</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-royal-gold transition-colors">Event Planning</Link></li>
              <li><Link href="/" className="text-muted-foreground hover:text-royal-gold transition-colors">Concierge</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-royal-gold mb-8">Contact Info</h3>
            <ul className="space-y-4 text-xs text-muted-foreground font-medium uppercase tracking-widest">
              <li className="flex items-start gap-3">
                <span className="text-royal-gold">Address:</span>
                123 Luxury Lane, Maldives
              </li>
              <li className="flex items-start gap-3">
                <span className="text-royal-gold">Phone:</span>
                +1 (555) 000-0000
              </li>
              <li className="flex items-start gap-3">
                <span className="text-royal-gold">Email:</span>
                concierge@royalpalace.com
              </li>
              <li className="text-royal-gold font-bold pt-2">Open 24/7</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-royal-gold/10 text-center">
          <p className="text-[10px] uppercase tracking-[0.5em] text-muted-foreground">
            &copy; {new Date().getFullYear()} Royal Palace Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
