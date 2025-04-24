
import React from 'react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className={cn("flex-1 p-4 overflow-auto", className)}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
