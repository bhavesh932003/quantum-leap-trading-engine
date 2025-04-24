
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: string;
}

const marketData: MarketItem[] = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 199.47, change: 1.25, volume: '45.2M' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 420.55, change: 2.13, volume: '22.6M' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 180.12, change: -0.85, volume: '18.9M' },
  { symbol: 'TSLA', name: 'Tesla, Inc.', price: 210.25, change: -2.34, volume: '32.5M' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 873.22, change: 3.87, volume: '51.1M' },
  { symbol: 'GOOG', name: 'Alphabet Inc.', price: 165.89, change: 0.72, volume: '12.8M' },
  { symbol: 'META', name: 'Meta Platforms', price: 498.90, change: 1.15, volume: '15.4M' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 165.77, change: -1.20, volume: '28.5M' }
];

const MarketOverview: React.FC = () => {
  const [sortField, setSortField] = useState('symbol');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedData = [...marketData].sort((a, b) => {
    // Type guard for price and change
    if (sortField === 'price' || sortField === 'change') {
      return sortDirection === 'asc' 
        ? a[sortField] - b[sortField] 
        : b[sortField] - a[sortField];
    }

    // For string fields
    const fieldA = String(a[sortField as keyof MarketItem]);
    const fieldB = String(b[sortField as keyof MarketItem]);
    
    return sortDirection === 'asc'
      ? fieldA.localeCompare(fieldB)
      : fieldB.localeCompare(fieldA);
  });

  return (
    <Card className="col-span-12 md:col-span-6 bg-hft-background-panel border-gray-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Market Overview</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-hft-neutral text-hft-neutral">
            US Markets
          </Badge>
          <button className="p-1 hover:bg-gray-800 rounded">
            <Menu size={16} />
          </button>
        </div>
      </CardHeader>
      <CardContent className="overflow-auto max-h-[360px]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th 
                className="text-left py-2 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('symbol')}
              >
                Symbol
              </th>
              <th 
                className="text-left py-2 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('name')}
              >
                Name
              </th>
              <th 
                className="text-right py-2 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('price')}
              >
                Price
              </th>
              <th 
                className="text-right py-2 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('change')}
              >
                Change
              </th>
              <th 
                className="text-right py-2 px-3 cursor-pointer hover:text-white"
                onClick={() => handleSort('volume')}
              >
                Volume
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr 
                key={item.symbol} 
                className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
              >
                <td className="py-2.5 px-3 font-medium">{item.symbol}</td>
                <td className="py-2.5 px-3 text-gray-400">{item.name}</td>
                <td className="py-2.5 px-3 text-right font-medium">${item.price.toFixed(2)}</td>
                <td className={cn(
                  "py-2.5 px-3 text-right flex items-center justify-end",
                  item.change >= 0 ? "text-hft-profit" : "text-hft-loss"
                )}>
                  {item.change >= 0 ? <ArrowUpRight size={16} className="mr-0.5" /> : <ArrowDownRight size={16} className="mr-0.5" />}
                  {Math.abs(item.change).toFixed(2)}%
                </td>
                <td className="py-2.5 px-3 text-right text-gray-400">{item.volume}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
