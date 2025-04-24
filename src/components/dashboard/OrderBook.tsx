
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface OrderLevel {
  price: number;
  size: number;
  total: number;
}

interface OrderBookProps {
  className?: string;
}

const generateOrderBookData = (basePrice: number, spread: number) => {
  const askLevels: OrderLevel[] = [];
  const bidLevels: OrderLevel[] = [];
  
  let askTotal = 0;
  let bidTotal = 0;
  const askBasePrice = basePrice + spread / 2;
  const bidBasePrice = basePrice - spread / 2;

  for (let i = 0; i < 10; i++) {
    // Generate random size with some logic to make it look realistic
    const askSize = Math.floor(Math.random() * 100) + 10;
    askTotal += askSize;
    
    askLevels.push({
      price: Number((askBasePrice + i * 0.05).toFixed(2)),
      size: askSize,
      total: askTotal
    });
  }

  for (let i = 0; i < 10; i++) {
    const bidSize = Math.floor(Math.random() * 100) + 10;
    bidTotal += bidSize;
    
    bidLevels.push({
      price: Number((bidBasePrice - i * 0.05).toFixed(2)),
      size: bidSize,
      total: bidTotal
    });
  }

  return { askLevels, bidLevels };
};

const OrderBook: React.FC<OrderBookProps> = ({ className }) => {
  const [symbol, setSymbol] = useState("AAPL");
  const [orderBookData, setOrderBookData] = useState(() => 
    generateOrderBookData(199.47, 0.05)
  );
  
  const maxTotal = Math.max(
    orderBookData.askLevels[orderBookData.askLevels.length - 1].total,
    orderBookData.bidLevels[orderBookData.bidLevels.length - 1].total
  );
  
  useEffect(() => {
    // Simulate order book updates
    const timer = setInterval(() => {
      const basePrice = symbol === "AAPL" ? 199.47 : 
                        symbol === "MSFT" ? 420.55 :
                        symbol === "TSLA" ? 210.25 : 
                        symbol === "NVDA" ? 873.22 : 199.47;
                        
      setOrderBookData(generateOrderBookData(basePrice, 0.05));
    }, 2000);
    
    return () => clearInterval(timer);
  }, [symbol]);

  return (
    <Card className={cn("col-span-12 md:col-span-6 bg-hft-background-panel border-gray-800", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2">
          Order Book
          <Badge variant="outline" className="ml-2 bg-hft-buy/10 text-hft-buy border-hft-buy/30">
            L2 Data
          </Badge>
        </CardTitle>
        <div>
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger className="w-28 h-8 text-sm bg-gray-800 border-gray-700">
              <SelectValue placeholder="Symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AAPL">AAPL</SelectItem>
              <SelectItem value="MSFT">MSFT</SelectItem>
              <SelectItem value="TSLA">TSLA</SelectItem>
              <SelectItem value="NVDA">NVDA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex text-xs mb-1">
          <div className="flex-1">
            <div className="grid grid-cols-3 text-gray-400 py-1">
              <div className="text-left">Total</div>
              <div className="text-right">Size</div>
              <div className="text-right">Bid</div>
            </div>
          </div>
          <div className="w-4"></div> {/* Spacer */}
          <div className="flex-1">
            <div className="grid grid-cols-3 text-gray-400 py-1">
              <div className="text-left">Ask</div>
              <div className="text-right">Size</div>
              <div className="text-right">Total</div>
            </div>
          </div>
        </div>
        
        <div className="flex text-sm">
          {/* Bids */}
          <div className="flex-1">
            {orderBookData.bidLevels.map((level, index) => (
              <div key={`bid-${index}`} className="relative grid grid-cols-3 py-0.5">
                <div className="absolute inset-0 right-0 bg-hft-buy/10" style={{
                  width: `${(level.total / maxTotal) * 100}%`,
                }}></div>
                <div className="text-left relative z-10">{level.total}</div>
                <div className="text-right relative z-10">{level.size}</div>
                <div className="text-right font-medium text-hft-buy relative z-10">{level.price}</div>
              </div>
            ))}
          </div>
          
          <div className="w-4 flex items-center justify-center">
            <div className="h-full border-r border-gray-700"></div>
          </div>
          
          {/* Asks */}
          <div className="flex-1">
            {orderBookData.askLevels.map((level, index) => (
              <div key={`ask-${index}`} className="relative grid grid-cols-3 py-0.5">
                <div className="absolute inset-0 left-0 bg-hft-sell/10" style={{
                  width: `${(level.total / maxTotal) * 100}%`,
                }}></div>
                <div className="text-left font-medium text-hft-sell relative z-10">{level.price}</div>
                <div className="text-right relative z-10">{level.size}</div>
                <div className="text-right relative z-10">{level.total}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderBook;
