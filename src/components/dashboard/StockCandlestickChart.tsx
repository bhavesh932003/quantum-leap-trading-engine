
import React, { useEffect, useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// In a real application, this data would come from an API
const generateCandlestickData = (symbol: string, days = 30) => {
  const basePrice = {
    'AAPL': 198,
    'MSFT': 420,
    'TSLA': 210,
    'NVDA': 870,
    'GOOG': 172,
  }[symbol] || 100;
  
  const volatility = {
    'AAPL': 2,
    'MSFT': 5,
    'TSLA': 8,
    'NVDA': 12,
    'GOOG': 3,
  }[symbol] || 3;
  
  const data = [];
  let currentPrice = basePrice;
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = Math.max(1, currentPrice + change);
    
    const open = currentPrice;
    const close = open + (Math.random() - 0.5) * (volatility / 2);
    const high = Math.max(open, close) + Math.random() * (volatility / 2);
    const low = Math.min(open, close) - Math.random() * (volatility / 2);
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat(open.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
  }
  
  return data;
};

interface StockCandlestickChartProps {
  symbol: string;
  className?: string;
}

const timeframes = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

const StockCandlestickChart: React.FC<StockCandlestickChartProps> = ({ 
  symbol,
  className 
}) => {
  const [data, setData] = useState<any[]>([]);
  const [timeframe, setTimeframe] = useState('1M');
  const [currentPrice, setCurrentPrice] = useState(0);
  const [previousClose, setPreviousClose] = useState(0);
  
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const candlestickData = generateCandlestickData(symbol);
    setData(candlestickData);
    
    const lastCandle = candlestickData[candlestickData.length - 1];
    setCurrentPrice(lastCandle.close);
    setPreviousClose(candlestickData[candlestickData.length - 2]?.close || lastCandle.open);
    
    // Simulate real-time price updates
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 0.5;
        return parseFloat((prev + change).toFixed(2));
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [symbol, timeframe]);
  
  const priceChange = currentPrice - previousClose;
  const priceChangePercent = (priceChange / previousClose) * 100;
  
  // Format the values for display
  const formattedCurrentPrice = currentPrice.toFixed(2);
  const formattedPriceChange = priceChange.toFixed(2);
  const formattedPriceChangePercent = priceChangePercent.toFixed(2);
  
  return (
    <div className={cn("", className)}>
      <div className="mb-4 flex flex-col md:flex-row justify-between gap-2">
        <div className="space-y-1">
          <div className="text-xl font-bold">{symbol}</div>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">${formattedCurrentPrice}</span>
            <span className={cn(
              "text-sm font-medium",
              priceChange >= 0 ? "text-hft-profit" : "text-hft-loss"
            )}>
              {priceChange >= 0 ? '+' : ''}{formattedPriceChange} ({priceChange >= 0 ? '+' : ''}{formattedPriceChangePercent}%)
            </span>
          </div>
        </div>
        
        <div className="flex gap-1">
          {timeframes.map((tf) => (
            <Button
              key={tf}
              size="sm"
              variant={timeframe === tf ? "default" : "outline"}
              className={cn(
                "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700",
                timeframe === tf && "bg-gray-700 text-white"
              )}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="h-full min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis 
              domain={['dataMin - 5', 'dataMax + 5']} 
              stroke="#9ca3af"
              tickFormatter={(tick) => `$${tick}`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                color: '#f9fafb'
              }}
              formatter={(value: number) => [`$${value}`, 'Price']}
            />
            <ReferenceLine y={previousClose} stroke="#6b7280" strokeDasharray="3 3" />
            <Area 
              type="monotone" 
              dataKey="close" 
              stroke="#34d399" 
              fillOpacity={1}
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockCandlestickChart;
