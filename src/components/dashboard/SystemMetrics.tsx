
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowUpCircle, Network, Cpu, HardDrive, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SystemMetricsProps {
  className?: string;
}

interface Metric {
  name: string;
  value: number;
  unit: string;
  icon: JSX.Element;
  status: 'normal' | 'warning' | 'critical';
}

const metrics: Metric[] = [
  {
    name: 'Order Latency',
    value: 0.42,
    unit: 'ms',
    icon: <Clock className="h-4 w-4" />,
    status: 'normal',
  },
  {
    name: 'CPU Usage',
    value: 45,
    unit: '%',
    icon: <Cpu className="h-4 w-4" />,
    status: 'normal',
  },
  {
    name: 'Network',
    value: 85,
    unit: 'Mbps',
    icon: <Network className="h-4 w-4" />,
    status: 'normal',
  },
  {
    name: 'Memory',
    value: 76,
    unit: '%',
    icon: <HardDrive className="h-4 w-4" />,
    status: 'warning',
  },
];

const SystemMetrics: React.FC<SystemMetricsProps> = ({ className }) => {
  return (
    <Card className={cn("col-span-12 lg:col-span-4 bg-hft-background-panel border-gray-800", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          System Metrics
          <span className="flex items-center text-xs text-hft-profit font-normal ml-auto">
            <ArrowUpCircle className="h-3 w-3 mr-1" />
            Online
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.name} className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <span className="mr-2 text-muted-foreground">{metric.icon}</span>
                  {metric.name}
                </div>
                <span className={cn(
                  metric.status === 'normal' && "text-hft-profit",
                  metric.status === 'warning' && "text-hft-warning",
                  metric.status === 'critical' && "text-hft-loss"
                )}>
                  {metric.value} {metric.unit}
                </span>
              </div>
              <Progress 
                value={
                  metric.unit === '%' ? metric.value : 
                  metric.unit === 'ms' ? Math.min(100, metric.value * 100) :
                  Math.min(100, metric.value / 2)
                } 
                className={cn(
                  "h-1.5", 
                  metric.status === 'normal' && "bg-gray-800 [&>div]:bg-hft-profit",
                  metric.status === 'warning' && "bg-gray-800 [&>div]:bg-hft-warning",
                  metric.status === 'critical' && "bg-gray-800 [&>div]:bg-hft-loss"
                )}
              />
            </div>
          ))}
          
          <div className="border border-gray-800 rounded-md p-3 mt-4">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Cpu className="h-4 w-4 mr-2 text-muted-foreground" />
              Trading Engine Status
            </h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Orders/sec</span>
                <span>1,245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Position limit</span>
                <span className="text-hft-profit">65%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Strategies</span>
                <span>8 active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Risk limit</span>
                <span className="text-hft-warning">76%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SystemMetrics;
