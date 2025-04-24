
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AreaChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface PnLChartProps {
  className?: string;
}

const hourlyData = [
  { time: '09:30', pnl: 0 },
  { time: '10:00', pnl: 12500 },
  { time: '10:30', pnl: 8900 },
  { time: '11:00', pnl: 11200 },
  { time: '11:30', pnl: 15600 },
  { time: '12:00', pnl: 14200 },
  { time: '12:30', pnl: 18500 },
  { time: '13:00', pnl: 17800 },
  { time: '13:30', pnl: 22300 },
  { time: '14:00', pnl: 26800 },
  { time: '14:30', pnl: 24500 },
  { time: '15:00', pnl: 27900 },
  { time: '15:30', pnl: 32100 },
  { time: '16:00', pnl: 35000 },
];

const dailyData = [
  { time: 'Mon', pnl: 35000 },
  { time: 'Tue', pnl: 42000 },
  { time: 'Wed', pnl: 28000 },
  { time: 'Thu', pnl: 53000 },
  { time: 'Fri', pnl: 69000 },
  { time: 'Mon', pnl: 58000 },
  { time: 'Tue', pnl: 75000 },
  { time: 'Wed', pnl: 62000 },
  { time: 'Thu', pnl: 48000 },
  { time: 'Fri', pnl: 89000 },
  { time: 'Mon', pnl: 102000 },
];

const weeklyData = [
  { time: 'Week 1', pnl: 89000 },
  { time: 'Week 2', pnl: 156000 },
  { time: 'Week 3', pnl: 132000 },
  { time: 'Week 4', pnl: 218000 },
  { time: 'Week 5', pnl: 185000 },
  { time: 'Week 6', pnl: 263000 },
  { time: 'Week 7', pnl: 298000 },
  { time: 'Week 8', pnl: 342000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-3 rounded-md shadow-lg">
        <p className="text-sm text-gray-300">{`Time: ${label}`}</p>
        <p className="text-sm font-semibold text-hft-profit">
          {`P&L: $${payload[0].value.toLocaleString()}`}
        </p>
      </div>
    );
  }
  return null;
};

const formatYAxis = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

const PnLChart: React.FC<PnLChartProps> = ({ className }) => {
  return (
    <Card className={cn("col-span-12 lg:col-span-8 bg-hft-background-panel border-gray-800", className)}>
      <CardHeader>
        <CardTitle>P&L Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily" className="w-full">
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="hourly">Today</TabsTrigger>
              <TabsTrigger value="daily">2 Weeks</TabsTrigger>
              <TabsTrigger value="weekly">2 Months</TabsTrigger>
            </TabsList>
            <div className="text-right">
              <div className="text-2xl font-bold text-hft-profit">$102,000</div>
              <div className="text-sm text-gray-400">Total P&L</div>
            </div>
          </div>
          
          <TabsContent value="hourly" className="h-[300px] mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={hourlyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#95a5a6', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#95a5a6', fontSize: 12 }}
                  tickFormatter={formatYAxis}
                />
                <CartesianGrid vertical={false} stroke="#333" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="pnl" 
                  stroke="#2ecc71" 
                  strokeWidth={2}
                  fill="url(#colorPnl)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="daily" className="h-[300px] mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dailyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#95a5a6', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#95a5a6', fontSize: 12 }}
                  tickFormatter={formatYAxis}
                />
                <CartesianGrid vertical={false} stroke="#333" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="pnl" 
                  stroke="#2ecc71" 
                  strokeWidth={2}
                  fill="url(#colorPnl)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="weekly" className="h-[300px] mt-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ecc71" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2ecc71" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="time" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#95a5a6', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#95a5a6', fontSize: 12 }}
                  tickFormatter={formatYAxis}
                />
                <CartesianGrid vertical={false} stroke="#333" />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="pnl" 
                  stroke="#2ecc71" 
                  strokeWidth={2}
                  fill="url(#colorPnl)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PnLChart;
