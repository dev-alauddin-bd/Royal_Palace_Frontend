'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardStatCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isUp: boolean;
  };
}

const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  label,
  value,
  subValue,
  icon: Icon,
  trend,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-panel border-royal-gold/10 hover:border-royal-gold/30 transition-all duration-500 group overflow-hidden relative shadow-sm dark:shadow-none">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-accent-foreground font-bold opacity-70 group-hover:opacity-100 transition-opacity">
            {label}
          </span>
          <div className="w-8 h-8 rounded-full bg-royal-gold/5 flex items-center justify-center group-hover:bg-royal-gold/20 transition-colors">
            <Icon className="h-4 w-4 text-royal-gold" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-[var(--font-cinzel)] font-bold text-foreground mb-1">
            {value}
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{subValue}</p>
            {trend && (
              <span className={`text-[10px] font-bold px-1.5 py-0.5 ${trend.isUp ? 'text-emerald-600 bg-emerald-500/10' : 'text-rose-600 bg-rose-500/10'}`}>
                {trend.isUp ? '↑' : '↓'} {trend.value}
              </span>
            )}
          </div>
          {/* Decorative Bottom Bar */}
          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-royal-gold group-hover:w-full transition-all duration-700 ease-in-out" />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardStatCard;
