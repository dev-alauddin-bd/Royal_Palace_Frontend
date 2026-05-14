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
} from 'recharts';
import { LucideIcon } from 'lucide-react';

interface DashboardChartProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  data: any[];
  type: 'area' | 'bar';
  dataKey: string;
  xAxisKey: string;
  height?: number;
  prefix?: string;
}

const chartColors = {
  gold: '#c5a021',
  white: '#ffffff',
  grey: '#475569',
};

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
  return (
    <Card className="glass-panel border-white/5 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg font-serif text-white flex items-center gap-3">
          {Icon && <Icon className="h-5 w-5 text-royal-gold" />}
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-white/40 text-xs uppercase tracking-widest">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={`pt-4 h-[${height}px]`}>
        <div style={{ height, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            {type === 'area' ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.gold} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={chartColors.gold} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey={xAxisKey}
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${prefix}${value}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f141d',
                    border: '1px solid rgba(197, 160, 33, 0.2)',
                    borderRadius: '0px',
                  }}
                  itemStyle={{ color: chartColors.gold, fontSize: '12px' }}
                  labelStyle={{ color: 'white', marginBottom: '4px' }}
                />
                <Area
                  type="monotone"
                  dataKey={dataKey}
                  stroke={chartColors.gold}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#color-${dataKey})`}
                />
              </AreaChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey={xAxisKey}
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${prefix}${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  contentStyle={{
                    backgroundColor: '#0f141d',
                    border: '1px solid rgba(197, 160, 33, 0.2)',
                    borderRadius: '0px',
                  }}
                  itemStyle={{ color: chartColors.gold, fontSize: '12px' }}
                  labelStyle={{ color: 'white', marginBottom: '4px' }}
                />
                <Bar dataKey={dataKey} fill={chartColors.gold} radius={[0, 0, 0, 0]} barSize={30} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardChart;
