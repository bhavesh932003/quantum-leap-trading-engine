
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  GaugeCircle, 
  Server, 
  Wifi, 
  Settings, 
  HelpCircle,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger
} from '@/components/ui/tooltip';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Header: React.FC = () => {
  const currentTime = new Date().toLocaleTimeString();
  const [time, setTime] = React.useState(currentTime);
  const [connectionStatus, setConnectionStatus] = React.useState('connected');
  const [latency, setLatency] = React.useState(0.45);
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      // Simulate random latency changes
      setLatency(Math.floor(Math.random() * 10) / 10 + 0.1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-hft-background-panel border-b border-gray-800 py-2 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-lg font-bold text-white mr-4">
            Quantum Leap <span className="text-hft-highlight">HFT</span>
          </h1>
          
          <Badge variant="outline" className="mr-2 border-hft-buy text-hft-buy">
            v1.0.0
          </Badge>
          
          <div className="hidden md:flex items-center ml-2">
            <Badge variant="outline" className="ml-2 border-gray-700">
              <span className="text-xs font-normal">Market: </span>
              <span className="text-white ml-1">Open</span>
            </Badge>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="hidden md:inline text-sm text-muted-foreground">{time}</span>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm">
                  <GaugeCircle size={16} className="mr-1 text-hft-profit" />
                  <span>{latency}ms</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current latency to exchange</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm">
                  <Server size={16} className="mr-1 text-hft-profit" />
                  <span>Engine</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trading engine status: Online</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm">
                  <Wifi 
                    size={16} 
                    className={connectionStatus === 'connected' ? 'text-hft-profit mr-1' : 'text-hft-warning mr-1'} 
                  />
                  <span>{connectionStatus === 'connected' ? 'Connected' : 'Offline'}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Market data connection status</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger className="relative">
              <Bell size={18} className="text-gray-400 hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-hft-profit mt-1" />
                  <div>
                    <p className="text-sm font-medium">Order Executed</p>
                    <p className="text-xs text-muted-foreground">Buy 100 AAPL @ $198.25</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-start gap-2">
                  <Server size={16} className="text-hft-warning mt-1" />
                  <div>
                    <p className="text-sm font-medium">System Warning</p>
                    <p className="text-xs text-muted-foreground">Position limit approaching for TSLA</p>
                    <p className="text-xs text-muted-foreground mt-1">10 minutes ago</p>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm">
              <div className="w-8 h-8 rounded-full bg-hft-buy/20 border border-hft-buy/30 flex items-center justify-center">
                TR
              </div>
              <ChevronDown size={16} className="ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Trader Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings size={16} className="mr-2" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle size={16} className="mr-2" /> Help
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
