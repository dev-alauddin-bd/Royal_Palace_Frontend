'use client';

import React from 'react';
import { Crown } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoaderProps {
  fullScreen?: boolean;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ fullScreen = true, className = '' }) => {
  const containerClasses = fullScreen
    ? 'fixed inset-0 z-[9999] flex items-center justify-center bg-royal-obsidian/95 backdrop-blur-md'
    : 'flex items-center justify-center p-8';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className="relative flex items-center justify-center">
        {/* Outer Elegant Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="absolute w-24 h-24 border border-royal-gold/20 rounded-full"
        />
        
        {/* Middle Decorative Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute w-20 h-20 border-t border-b border-royal-gold/40 rounded-full"
        />

        {/* Central Crown with Glow */}
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            className="flex items-center justify-center"
          >
            <Crown className="w-10 h-10 text-royal-gold drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-4"
          >
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-royal-gold/80 ml-[0.5em]">
              Sovereign Stay
            </span>
          </motion.div>
        </div>
        
        {/* Subtle Background Glow */}
        <div className="absolute w-32 h-32 bg-royal-gold/5 blur-3xl rounded-full" />
      </div>
    </div>
  );
};

export default Loader;
