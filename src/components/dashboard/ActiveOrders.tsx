
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { XCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Order {
  id: string;
  symbol: string;
  type: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  status: 'OPEN' | 'PARTIAL' | 'PENDING';
  filled: number;
  timestamp: string;
  strategy: string;
}

interface ActiveOrdersProps {
  className?: string;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-24825',
    symbol: 'AAPL',
    type: 'BUY',
    price: 198.50,
    quantity: 100,
    status: 'OPEN',
    filled: 0,
    timestamp: '14:32:05',
    strategy: 'MOMENTUM-A'
  },
  {
    id: 'ORD-24824',
    symbol: 'MSFT',
    type: 'SELL',
    price: 421.75,
    quantity: 50,
    status: 'PARTIAL',
    filled: 32,
    timestamp: '14:31:22',
    strategy: 'MEAN-REV'
  },
  {
    id: 'ORD-24823',
    symbol: 'NVDA',
    type: 'BUY',
    price: 874.25,
    quantity: 25,
    status: 'PENDING',
    filled: 0,
    timestamp: '14:30:58',
    strategy: 'BREAKOUT-3'
  },
  {
    id: 'ORD-24822',
    symbol: 'TSLA',
    type: 'BUY',
    price: 208.50,
    quantity: 75,
    status: 'OPEN',
    filled: 0,
    timestamp: '14:29:47',
    strategy: 'MOMENTUM-B'
  }
];

const ActiveOrders: React.FC<ActiveOrdersProps> = ({ className }) => {
  return (
    <Card className={cn("col-span-12 md:col-span-6 bg-hft-background-panel border-gray-800", className)}>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center">
          Active Orders
          <Badge className="ml-2 bg-hft-buy/20 text-hft-buy border-0">
            {mockOrders.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">ID</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Symbol</th>
                <th className="py-3 px-4 text-left font-medium text-muted-foreground">Side</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Price</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Qty / Filled</th>
                <th className="py-3 px-4 text-center font-medium text-muted-foreground">Status</th>
                <th className="py-3 px-4 text-right font-medium text-muted-foreground">Strategy</th>
                <th className="py-3 px-4 text-center font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className={cn(
                    "border-b border-gray-800 hover:bg-gray-800/50", 
                    order.status === 'PENDING' && "bg-yellow-900/10"
                  )}
                >
                  <td className="py-3 px-4 text-gray-400">{order.id}</td>
                  <td className="py-3 px-4 font-medium">{order.symbol}</td>
                  <td className={cn(
                    "py-3 px-4 font-medium",
                    order.type === 'BUY' ? "text-hft-buy" : "text-hft-sell"
                  )}>
                    {order.type}
                  </td>
                  <td className="py-3 px-4 text-right font-medium">${order.price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right">
                    {order.quantity} / <span className="text-muted-foreground">{order.filled}</span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Badge variant="outline" className={cn(
                      "uppercase text-xs border-transparent",
                      order.status === 'OPEN' && "bg-green-900/20 text-green-500",
                      order.status === 'PARTIAL' && "bg-blue-900/20 text-blue-500",
                      order.status === 'PENDING' && "bg-yellow-900/20 text-yellow-500"
                    )}>
                      {order.status === 'PENDING' && <AlertCircle className="mr-1" size={12} />}
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-400">{order.strategy}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center">
                      <button className="p-1 hover:text-red-400 transition-colors">
                        <XCircle size={16} />
                      </button>
                    </div>
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

export default ActiveOrders;
