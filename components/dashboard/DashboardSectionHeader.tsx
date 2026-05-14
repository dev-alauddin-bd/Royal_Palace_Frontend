'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardSectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  badge?: string;
  rightElement?: React.ReactNode;
}

const DashboardSectionHeader: React.FC<DashboardSectionHeaderProps> = ({
  title,
  subtitle,
  icon: Icon,
  badge,
  rightElement,
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-royal-gold">
          <div className="p-2 bg-royal-gold/10 border border-royal-gold/20 rounded-none">
            {Icon && <Icon className="h-5 w-5" />}
          </div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
            {badge || 'Royal Management'}
          </span>
        </div>
        <div>
          <h1 className="text-4xl font-[var(--font-cinzel)] font-bold text-foreground tracking-tight">
            {title}
          </h1>
          <div className="h-[2px] w-20 bg-royal-gold mt-2 opacity-50" />
        </div>
        {subtitle && (
          <p className="text-muted-foreground text-sm font-medium max-w-xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      <div className="flex items-center gap-4">
        {rightElement}
      </div>
    </motion.div>
  );
};

export default DashboardSectionHeader;
