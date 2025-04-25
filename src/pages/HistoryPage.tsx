
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

const HistoryPage = () => {
  // Sample trade history data
  const tradeHistory = [
    { id: 'TH-10125', symbol: 'AAPL', side: 'BUY', quantity: 100, price: 199.47, pnl: 125.00, timestamp: '2025-04-25 14:32:05' },
    { id: 'TH-10124', symbol: 'MSFT', side: 'SELL', quantity: 50, price: 420.55, pnl: 237.50, timestamp: '2025-04-25 13:58:22' },
    { id: 'TH-10123', symbol: 'NVDA', side: 'BUY', quantity: 30, price: 873.22, pnl: -125.40, timestamp: '2025-04-25 13:45:18' },
    { id: 'TH-10122', symbol: 'TSLA', side: 'SELL', quantity: 75, price: 210.25, pnl: 412.50, timestamp: '2025-04-25 13:30:47' },
    { id: 'TH-10121', symbol: 'GOOG', side: 'BUY', quantity: 25, price: 172.88, pnl: -87.25, timestamp: '2025-04-25 13:22:15' },
    { id: 'TH-10120', symbol: 'AMZN', side: 'SELL', quantity: 40, price: 185.95, pnl: 157.60, timestamp: '2025-04-25 13:15:38' },
    { id: 'TH-10119', symbol: 'META', side: 'BUY', quantity: 60, price: 485.72, pnl: 215.40, timestamp: '2025-04-25 13:05:52' },
    { id: 'TH-10118', symbol: 'AAPL', side: 'SELL', quantity: 120, price: 198.25, pnl: -86.40, timestamp: '2025-04-25 12:58:10' },
  ];

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold mb-4">Trade History</h1>
          
          <Card className="col-span-12 bg-hft-background-panel border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Calendar size={20} className="mr-2" />
                Trade History
                <Badge className="ml-2 bg-primary/20 text-primary border-0">
                  {tradeHistory.length}
                </Badge>
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Last 24 hours
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">ID</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Time</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Symbol</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground">Side</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">Quantity</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">Price</th>
                      <th className="py-3 px-4 text-right font-medium text-muted-foreground">P&L</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradeHistory.map((trade) => (
                      <tr 
                        key={trade.id} 
                        className="border-b border-gray-800 hover:bg-gray-800/50"
                      >
                        <td className="py-3 px-4 text-gray-400">{trade.id}</td>
                        <td className="py-3 px-4 text-gray-400">{trade.timestamp.split(' ')[1]}</td>
                        <td className="py-3 px-4 font-medium">{trade.symbol}</td>
                        <td className={cn(
                          "py-3 px-4 font-medium",
                          trade.side === 'BUY' ? "text-hft-buy" : "text-hft-sell"
                        )}>
                          {trade.side}
                        </td>
                        <td className="py-3 px-4 text-right">{trade.quantity}</td>
                        <td className="py-3 px-4 text-right">${trade.price.toFixed(2)}</td>
                        <td className={cn(
                          "py-3 px-4 text-right",
                          trade.pnl >= 0 ? "text-hft-profit" : "text-hft-loss"
                        )}>
                          ${trade.pnl.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="py-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HistoryPage;
