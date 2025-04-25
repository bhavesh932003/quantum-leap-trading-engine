
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import OrderBook from '@/components/dashboard/OrderBook';

const OrderBookPage = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold mb-4">Order Book</h1>
          <OrderBook className="col-span-12" />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderBookPage;
