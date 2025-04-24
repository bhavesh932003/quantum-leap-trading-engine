
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import MarketOverview from '@/components/dashboard/MarketOverview';
import OrderBook from '@/components/dashboard/OrderBook';
import PnLChart from '@/components/dashboard/PnLChart';
import ActiveOrders from '@/components/dashboard/ActiveOrders';
import SystemMetrics from '@/components/dashboard/SystemMetrics';
import OrderEntry from '@/components/dashboard/OrderEntry';
import PositionOverview from '@/components/dashboard/PositionOverview';

const Index = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-4">
        <PnLChart />
        <SystemMetrics />
        <OrderBook />
        <OrderEntry />
        <PositionOverview />
        <MarketOverview />
        <ActiveOrders />
      </div>
    </DashboardLayout>
  );
};

export default Index;
