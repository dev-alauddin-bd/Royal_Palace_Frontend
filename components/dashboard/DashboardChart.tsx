'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
} from 'recharts';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardChartProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  data: any[];
  type: 'area' | 'bar' | 'line';
  dataKey: string;
  xAxisKey: string;
  height?: number;
  prefix?: string;
}

const DashboardChart: React.FC<DashboardChartProps> = ({
  title,
  description,
  icon: Icon,
  data,
  type,
  dataKey,
  xAxisKey,
  height = 350,
  prefix = '',
}) => {
  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c5a021" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#c5a021" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-royal-gold/5" />
            <XAxis
              dataKey={xAxisKey}
              stroke="currentColor"
              className="text-muted-foreground"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="currentColor"
              className="text-muted-foreground"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${prefix}${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid rgba(197, 160, 33, 0.2)',
                borderRadius: '0px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              itemStyle={{ color: '#c5a021', fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: 'var(--foreground)', marginBottom: '4px', fontWeight: 'bold', fontSize: '12px' }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke="#c5a021"
              strokeWidth={3}
              fillOpacity={1}
              fill={`url(#color-${dataKey})`}
              animationDuration={1500}
            />
          </AreaChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-royal-gold/5" />
            <XAxis
              dataKey={xAxisKey}
              stroke="currentColor"
              className="text-muted-foreground"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="currentColor"
              className="text-muted-foreground"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${prefix}${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid rgba(197, 160, 33, 0.2)',
                borderRadius: '0px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              itemStyle={{ color: '#c5a021', fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: 'var(--foreground)', marginBottom: '4px', fontWeight: 'bold', fontSize: '12px' }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#c5a021"
              strokeWidth={3}
              dot={{ r: 4, fill: '#c5a021', strokeWidth: 2, stroke: 'var(--card)' }}
              activeDot={{ r: 6, strokeWidth: 0 }}
              animationDuration={1500}
            />
          </LineChart>
        );
      case 'bar':
      default:
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-royal-gold/5" />
            <XAxis
              dataKey={xAxisKey}
              stroke="currentColor"
              className="text-muted-foreground"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="currentColor"
              className="text-muted-foreground"
              fontSize={10}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${prefix}${value}`}
            />
            <Tooltip
              cursor={{ fill: 'rgba(197, 160, 33, 0.05)' }}
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid rgba(197, 160, 33, 0.2)',
                borderRadius: '0px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              }}
              itemStyle={{ color: '#c5a021', fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: 'var(--foreground)', marginBottom: '4px', fontWeight: 'bold', fontSize: '12px' }}
            />
            <Bar 
              dataKey={dataKey} 
              fill="#c5a021" 
              radius={[2, 2, 0, 0]} 
              barSize={24} 
              animationDuration={1500}
            />
          </BarChart>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-panel border-royal-gold/10 overflow-hidden shadow-sm dark:shadow-none">
        <CardHeader className="border-b border-royal-gold/5 pb-4">
          <CardTitle className="text-lg font-[var(--font-cinzel)] text-foreground flex items-center gap-3">
            {Icon && <Icon className="h-5 w-5 text-royal-gold" />}
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-8 h-full">
          <div style={{ height, width: '100%', minHeight: 0, minWidth: 0 }}>
            <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
              {renderChart()}
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DashboardChart;
