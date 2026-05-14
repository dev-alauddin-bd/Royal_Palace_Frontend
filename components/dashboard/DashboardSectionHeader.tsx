'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

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
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-royal-gold">
          {Icon && <Icon className="h-5 w-5" />}
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold">
            {badge || 'Royal Management'}
          </span>
        </div>
        <h1 className="text-4xl font-serif font-bold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/40 text-sm font-light max-w-md">
            {subtitle}
          </p>
        )}
      </div>
      {rightElement}
    </div>
  );
};

export default DashboardSectionHeader;
