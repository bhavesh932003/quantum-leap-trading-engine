
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OrderEntry from '@/components/dashboard/OrderEntry';
import ActiveOrders from '@/components/dashboard/ActiveOrders';
import StockCandlestickChart from '@/components/dashboard/StockCandlestickChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TradingPage = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold mb-4">Trading</h1>
        </div>
        
        <Card className="col-span-12 lg:col-span-8 bg-hft-background-panel border-gray-800">
          <CardHeader>
            <CardTitle>Price Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <StockCandlestickChart symbol="AAPL" />
            </div>
          </CardContent>
        </Card>
        
        <OrderEntry className="col-span-12 lg:col-span-4" />
        <ActiveOrders className="col-span-12" />
      </div>
    </DashboardLayout>
  );
};

export default TradingPage;
