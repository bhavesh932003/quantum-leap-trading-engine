
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const RiskManagementPage = () => {
  const riskMetrics = [
    { name: 'Daily Drawdown', value: 3.2, limit: 5, status: 'normal' },
    { name: 'Position Concentration', value: 65, limit: 75, status: 'warning' },
    { name: 'Leverage', value: 1.5, limit: 3, status: 'normal' },
    { name: 'VaR (95%)', value: 8250, limit: 10000, status: 'normal' },
  ];
  
  const exposures = [
    { symbol: 'AAPL', value: 98250, change: 1.2 },
    { symbol: 'MSFT', value: 83500, change: -0.8 },
    { symbol: 'NVDA', value: 87320, change: 2.5 },
    { symbol: 'TSLA', value: 31500, change: -1.7 },
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold mb-4">Risk Management</h1>
        </div>
        
        <Card className="col-span-12 md:col-span-6 lg:col-span-8 bg-hft-background-panel border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle size={20} className="mr-2 text-hft-warning" />
              Risk Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {riskMetrics.map((metric) => (
                <div key={metric.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{metric.name}</div>
                    <div className="flex items-center">
                      <span className={metric.status === 'warning' ? 'text-hft-warning' : 'text-white'}>
                        {typeof metric.value === 'number' && metric.name.includes('Drawdown') ? `-${metric.value}%` : metric.value}
                      </span>
                      <Badge 
                        variant="outline" 
                        className={`ml-2 ${
                          metric.status === 'warning' 
                            ? 'bg-hft-warning/10 text-hft-warning' 
                            : 'bg-hft-profit/10 text-hft-profit'
                        }`}
                      >
                        Limit: {metric.name.includes('Drawdown') ? `-${metric.limit}%` : metric.limit}
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={(metric.value / metric.limit) * 100} 
                    className={`h-2 ${
                      metric.status === 'warning' 
                        ? 'bg-gray-800 [&>div]:bg-hft-warning' 
                        : 'bg-gray-800 [&>div]:bg-hft-profit'
                    }`} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-12 md:col-span-6 lg:col-span-4 bg-hft-background-panel border-gray-800">
          <CardHeader>
            <CardTitle>Market Exposure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {exposures.map((exposure) => (
                <div key={exposure.symbol} className="flex items-center justify-between pb-2 border-b border-gray-800">
                  <div className="font-medium">{exposure.symbol}</div>
                  <div className="flex flex-col items-end">
                    <div className="font-medium">${exposure.value.toLocaleString()}</div>
                    <div className={`flex items-center text-xs ${
                      exposure.change >= 0 ? 'text-hft-profit' : 'text-hft-loss'
                    }`}>
                      {exposure.change >= 0 ? (
                        <TrendingUp size={12} className="mr-1" />
                      ) : (
                        <TrendingDown size={12} className="mr-1" />
                      )}
                      {exposure.change >= 0 ? '+' : ''}{exposure.change}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RiskManagementPage;
