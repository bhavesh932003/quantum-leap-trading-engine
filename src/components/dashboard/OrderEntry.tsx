
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowRight, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface OrderEntryProps {
  className?: string;
}

const OrderEntry: React.FC<OrderEntryProps> = ({ className }) => {
  const { toast } = useToast();
  const [symbol, setSymbol] = useState('AAPL');
  const [side, setSide] = useState('buy');
  const [orderType, setOrderType] = useState('market');
  const [quantity, setQuantity] = useState('100');
  const [price, setPrice] = useState('198.50');
  const [strategy, setStrategy] = useState('manual');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!symbol || !quantity || (orderType === 'limit' && !price)) {
      toast({
        title: "Invalid Order",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setSubmitting(true);
    
    // Simulate order submission
    setTimeout(() => {
      toast({
        title: "Order Submitted",
        description: `${side.toUpperCase()} ${quantity} ${symbol} @ ${orderType === 'market' ? 'MARKET' : '$' + price}`,
        variant: "default",
      });
      setSubmitting(false);
    }, 1000);
  };
  
  return (
    <Card className={cn("col-span-12 md:col-span-6 lg:col-span-4 bg-hft-background-panel border-gray-800", className)}>
      <CardHeader>
        <CardTitle>Order Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Symbol</label>
              <Select value={symbol} onValueChange={setSymbol}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Select Symbol" />
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
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Side</label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  className={cn(
                    side === 'buy' 
                      ? "bg-hft-buy hover:bg-hft-buy/80" 
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  )}
                  onClick={() => setSide('buy')}
                >
                  Buy
                </Button>
                <Button
                  type="button"
                  className={cn(
                    side === 'sell' 
                      ? "bg-hft-sell hover:bg-hft-sell/80" 
                      : "bg-gray-800 text-gray-400 hover:text-white"
                  )}
                  onClick={() => setSide('sell')}
                >
                  Sell
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Order Type</label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger className="bg-gray-800 border-gray-700">
                  <SelectValue placeholder="Order Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market</SelectItem>
                  <SelectItem value="limit">Limit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Quantity</label>
              <Input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          </div>
          
          {orderType === 'limit' && (
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Price</label>
              <Input 
                type="number" 
                step="0.01" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)}
                className="bg-gray-800 border-gray-700"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Strategy</label>
            <Select value={strategy} onValueChange={setStrategy}>
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select Strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="momentum-a">Momentum-A</SelectItem>
                <SelectItem value="mean-rev">Mean Reversion</SelectItem>
                <SelectItem value="breakout-3">Breakout-3</SelectItem>
              </Select>
            </div>
            
          <div className="flex items-center text-sm text-hft-warning bg-hft-warning/10 p-2 rounded-md mb-2">
            <AlertTriangle size={16} className="mr-2" />
            Orders execute in microseconds. Verify before submitting.
          </div>
          
          <Button 
            type="submit"
            className={cn(
              "w-full",
              side === 'buy' 
                ? "bg-hft-buy hover:bg-hft-buy/80" 
                : "bg-hft-sell hover:bg-hft-sell/80",
              submitting && "opacity-70 cursor-not-allowed"
            )}
            disabled={submitting}
          >
            {submitting ? "Processing..." : (
              <>
                Submit {side.toUpperCase()} Order 
                <ArrowRight size={16} className="ml-2" />
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default OrderEntry;
