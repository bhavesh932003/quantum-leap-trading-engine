
import React, { useState, useEffect } from 'react';
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
  ChevronLeft
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ 
  icon, 
  label,
  path,
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
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(isMobile);
  
  // Determine which nav item is active based on the current path
  const getIsActive = (path: string): boolean => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };
  
  const navItems = [
    { label: 'Dashboard', icon: <BarChart3 size={18} />, path: '/' },
    { label: 'Order Book', icon: <PackageOpen size={18} />, path: '/orderbook' },
    { label: 'Market Data', icon: <LineChart size={18} />, path: '/market-data' },
    { label: 'Trading', icon: <AreaChart size={18} />, path: '/trading' },
    { label: 'History', icon: <History size={18} />, path: '/history' },
    { label: 'Risk Management', icon: <AlertTriangle size={18} />, path: '/risk' },
    { label: 'Settings', icon: <Settings size={18} />, path: '/settings' }
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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
                  getIsActive(item.path) 
                    ? "bg-hft-buy/20 text-white" 
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                {item.icon}
              </button>
            ) : (
              <SidebarNavItem
                icon={item.icon}
                label={item.label}
                path={item.path}
                active={getIsActive(item.path)}
                onClick={() => handleNavigation(item.path)}
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
