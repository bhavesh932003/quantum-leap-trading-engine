
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  AreaChart, 
  PackageOpen, 
  LineChart, 
  Settings, 
  History, 
  AlertTriangle, 
  ChevronRight, 
  ChevronLeft,
  PanelLeft
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  icon, 
  label, 
  active = false,
  onClick
}) => {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md transition-colors",
        active 
          ? "bg-hft-buy/20 text-white" 
          : "text-gray-400 hover:text-white hover:bg-gray-800"
      )}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

const Sidebar: React.FC = () => {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(isMobile);
  const [activeItem, setActiveItem] = useState('Dashboard');
  
  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 size={18} /> },
    { label: 'Order Book', icon: <PackageOpen size={18} /> },
    { label: 'Market Data', icon: <LineChart size={18} /> },
    { label: 'Trading', icon: <AreaChart size={18} /> },
    { label: 'History', icon: <History size={18} /> },
    { label: 'Risk Management', icon: <AlertTriangle size={18} /> },
    { label: 'Settings', icon: <Settings size={18} /> }
  ];

  return (
    <aside 
      className={cn(
        "bg-hft-background-panel border-r border-gray-800 h-full transition-all duration-200 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex flex-col flex-grow px-2 py-4">
        {navItems.map((item) => (
          <div key={item.label} className="mb-1">
            {collapsed ? (
              <button
                className={cn(
                  "w-full flex justify-center p-3 text-sm font-medium rounded-md transition-colors",
                  activeItem === item.label 
                    ? "bg-hft-buy/20 text-white" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
                onClick={() => setActiveItem(item.label)}
              >
                {item.icon}
              </button>
            ) : (
              <SidebarNavItem
                icon={item.icon}
                label={item.label}
                active={activeItem === item.label}
                onClick={() => setActiveItem(item.label)}
              />
            )}
          </div>
        ))}
      </div>
      
      <button 
        className="flex items-center justify-center p-2 hover:bg-gray-800 rounded-md mx-2 mb-2"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? 
          <ChevronRight size={18} className="text-gray-400" /> : 
          <ChevronLeft size={18} className="text-gray-400" />
        }
      </button>
    </aside>
  );
};

export default Sidebar;
