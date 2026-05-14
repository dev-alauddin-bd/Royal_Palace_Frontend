'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface DashboardTableProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  headers: string[];
  children: React.ReactNode;
  viewAllLink?: string;
}

const DashboardTable: React.FC<DashboardTableProps> = ({
  title,
  description,
  icon: Icon,
  headers,
  children,
  viewAllLink,
}) => {
  return (
    <Card className="glass-panel border-white/5 overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg font-serif text-white flex items-center gap-3">
            {Icon && <Icon className="h-5 w-5 text-royal-gold" />}
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-white/40 text-xs uppercase tracking-widest">
              {description}
            </CardDescription>
          )}
        </div>
        {viewAllLink && (
          <a
            href={viewAllLink}
            className="text-[10px] text-royal-gold uppercase tracking-[0.3em] font-bold hover:text-white transition-colors"
          >
            View All
          </a>
        )}
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase tracking-[0.2em] font-bold text-royal-gold/60 border-b border-white/5">
              {headers.map((header) => (
                <th key={header} className="px-8 py-5 text-left font-bold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">{children}</tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default DashboardTable;
