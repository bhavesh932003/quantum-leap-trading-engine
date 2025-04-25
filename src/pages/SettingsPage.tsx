
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Settings, Bell, Shield, Wifi, Server } from 'lucide-react';

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <h1 className="text-2xl font-bold mb-4">Settings</h1>
          
          <Card className="col-span-12 bg-hft-background-panel border-gray-800">
            <Tabs defaultValue="general">
              <CardHeader>
                <TabsList className="w-full bg-gray-800">
                  <TabsTrigger value="general" className="flex-1 data-[state=active]:bg-gray-700">
                    <Settings size={16} className="mr-1" /> General
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="flex-1 data-[state=active]:bg-gray-700">
                    <Bell size={16} className="mr-1" /> Notifications
                  </TabsTrigger>
                  <TabsTrigger value="risk" className="flex-1 data-[state=active]:bg-gray-700">
                    <Shield size={16} className="mr-1" /> Risk Controls
                  </TabsTrigger>
                  <TabsTrigger value="connectivity" className="flex-1 data-[state=active]:bg-gray-700">
                    <Wifi size={16} className="mr-1" /> Connectivity
                  </TabsTrigger>
                </TabsList>
              </CardHeader>
              
              <CardContent>
                <TabsContent value="general" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="trader_one" className="bg-gray-800 border-gray-700" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="trader@example.com" className="bg-gray-800 border-gray-700" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dark-mode">Dark Mode</Label>
                        <Switch id="dark-mode" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Trading Preferences</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="confirm-orders">Confirm Orders</Label>
                        <Switch id="confirm-orders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-close">Auto-close daily positions</Label>
                        <Switch id="auto-close" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="default-qty">Default Order Quantity</Label>
                        <Input id="default-qty" type="number" defaultValue="100" className="bg-gray-800 border-gray-700" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Save Changes</Button>
                </TabsContent>
                
                <TabsContent value="notifications" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Notification Settings</h3>
                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="order-executed">Order Executed</Label>
                        <Switch id="order-executed" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="price-alerts">Price Alerts</Label>
                        <Switch id="price-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="risk-warnings">Risk Warnings</Label>
                        <Switch id="risk-warnings" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="system-msgs">System Messages</Label>
                        <Switch id="system-msgs" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="email-notif">Email Notifications</Label>
                        <Switch id="email-notif" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Save Changes</Button>
                </TabsContent>
                
                <TabsContent value="risk" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Risk Control Settings</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="max-position">Maximum Position Size ($)</Label>
                        <Input id="max-position" type="number" defaultValue="100000" className="bg-gray-800 border-gray-700" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="daily-limit">Daily Loss Limit ($)</Label>
                        <Input id="daily-limit" type="number" defaultValue="5000" className="bg-gray-800 border-gray-700" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="max-drawdown">Maximum Drawdown (%)</Label>
                        <Input id="max-drawdown" type="number" defaultValue="5" className="bg-gray-800 border-gray-700" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-stop">Auto Stop Loss</Label>
                        <Switch id="auto-stop" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Save Changes</Button>
                </TabsContent>
                
                <TabsContent value="connectivity" className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">Connection Settings</h3>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="server">Server Location</Label>
                        <div className="flex items-center gap-2">
                          <Server size={16} className="text-hft-profit" />
                          <span>New York (NY4) - Connected</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-reconnect">Auto Reconnect</Label>
                        <Switch id="auto-reconnect" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="realtime">Real-time Data</Label>
                        <Switch id="realtime" defaultChecked />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="data-timeout">Data Timeout (ms)</Label>
                        <Input id="data-timeout" type="number" defaultValue="1000" className="bg-gray-800 border-gray-700" />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full">Save Changes</Button>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
