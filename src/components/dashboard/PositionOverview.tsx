
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Position {
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercent: number;
}

interface PositionOverviewProps {
  className?: string;
}

const mockPositions: Position[] = [
  { 
    symbol: 'AAPL', 
    quantity: 500, 
    avgPrice: 197.25, 
    currentPrice: 199.47, 
    pnl: 1110, 
    pnlPercent: 1.13
  },
  { 
    symbol: 'MSFT', 
    quantity: 200, 
    avgPrice: 415.80, 
    currentPrice: 420.55, 
    pnl: 950, 
    pnlPercent: 1.14
  },
  { 
    symbol: 'NVDA', 
    quantity: 100, 
    avgPrice: 860.40, 
    currentPrice: 873.22, 
    pnl: 1282, 
    pnlPercent: 1.49
  },
  { 
    symbol: 'TSLA', 
    quantity: -150, 
    avgPrice: 215.75, 
    currentPrice: 210.25, 
    pnl: 825, 
    pnlPercent: 2.55
  },
];

const PositionOverview: React.FC<PositionOverviewProps> = ({ className }) => {
  const totalPnL = mockPositions.reduce((sum, pos) => sum + pos.pnl, 0);
  
  return (
    <Card className={cn("col-span-12 md:col-span-6 lg:col-span-8 bg-hft-background-panel border-gray-800", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          Position Overview
          <Badge className="ml-2 bg-primary/20 text-primary border-0">
            {mockPositions.length}
          </Badge>
        </CardTitle>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">Total P&L</div>
          <div className={cn(
            "text-lg font-bold",
            totalPnL >= 0 ? "text-hft-profit" : "text-hft-loss"
          )}>
            ${totalPnL.toLocaleString()}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Symbol</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Quantity</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Avg Price</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Current</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">P&L</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">P&L %</th>
              </tr>
            </thead>
            <tbody>
              {mockPositions.map((position) => (
                <tr 
                  key={position.symbol} 
                  className="border-b border-gray-800 hover:bg-gray-800/50"
                >
                  <td className="py-3 px-4 font-medium">{position.symbol}</td>
                  <td className={cn(
                    "py-3 px-4 text-right",
                    position.quantity > 0 ? "text-hft-buy" : "text-hft-sell"
                  )}>
                    {position.quantity > 0 ? '+' : ''}{position.quantity}
                  </td>
                  <td className="py-3 px-4 text-right">${position.avgPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">${position.currentPrice.toFixed(2)}</td>
                  <td className={cn(
                    "py-3 px-4 text-right",
                    position.pnl >= 0 ? "text-hft-profit" : "text-hft-loss"
                  )}>
                    ${position.pnl.toLocaleString()}
                  </td>
                  <td className={cn(
                    "py-3 px-4 text-right flex items-center justify-end",
                    position.pnl >= 0 ? "text-hft-profit" : "text-hft-loss"
                  )}>
                    {position.pnl >= 0 ? 
                      <ArrowUpRight size={16} className="mr-0.5" /> : 
                      <ArrowDownRight size={16} className="mr-0.5" />
                    }
                    {position.pnlPercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default PositionOverview;
