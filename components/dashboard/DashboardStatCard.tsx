'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

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
    <Card className="glass-panel border-white/5 hover:border-royal-gold/30 transition-all duration-500 group overflow-hidden relative">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <span className="text-[10px] uppercase tracking-widest text-royal-gold/60 font-bold group-hover:text-royal-gold transition-colors">
          {label}
        </span>
        <Icon className="h-4 w-4 text-royal-gold/40 group-hover:text-royal-gold transition-colors" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-serif font-bold text-white mb-1">
          {value}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[10px] text-white/40 font-light">{subValue}</p>
          {trend && (
            <span className={`text-[10px] font-bold ${trend.isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
              {trend.isUp ? '↑' : '↓'} {trend.value}
            </span>
          )}
        </div>
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-royal-gold group-hover:w-full transition-all duration-700" />
      </CardContent>
    </Card>
  );
};

export default DashboardStatCard;
