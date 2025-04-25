
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import StockCandlestickChart from '@/components/dashboard/StockCandlestickChart';

const MarketDataPage = () => {
  const [selectedStock, setSelectedStock] = useState('AAPL');

  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold mb-4">Market Data</h1>
          
          <div className="mb-6">
            <Select value={selectedStock} onValueChange={setSelectedStock}>
              <SelectTrigger className="w-48 bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select Stock" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="AAPL">AAPL</SelectItem>
                <SelectItem value="MSFT">MSFT</SelectItem>
                <SelectItem value="TSLA">TSLA</SelectItem>
                <SelectItem value="NVDA">NVDA</SelectItem>
                <SelectItem value="GOOG">GOOG</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Card className="col-span-12 bg-hft-background-panel border-gray-800">
            <CardHeader>
              <CardTitle>
                {selectedStock} Price Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                <StockCandlestickChart symbol={selectedStock} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketDataPage;
