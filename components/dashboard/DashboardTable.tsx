'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LucideIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
    <Card className="glass-panel border-royal-gold/10 overflow-hidden shadow-sm dark:shadow-none h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-royal-gold/5">
        <div className="space-y-1">
          <CardTitle className="text-lg font-[var(--font-cinzel)] text-foreground flex items-center gap-3">
            {Icon && <Icon className="h-5 w-5 text-royal-gold" />}
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">
              {description}
            </CardDescription>
          )}
        </div>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-[10px] text-royal-gold uppercase tracking-[0.2em] font-bold hover:text-foreground flex items-center gap-2 transition-all group"
          >
            View All <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-royal-gold/5 text-[10px] uppercase tracking-[0.2em] font-bold text-accent-foreground border-b border-royal-gold/10">
              {headers.map((header) => (
                <th key={header} className="px-8 py-5 text-left font-bold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-royal-gold/5">
            {children}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default DashboardTable;
