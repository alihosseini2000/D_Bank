"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { toast } from 'sonner';

export default function FuturesPage() {
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [position, setPosition] = useState<'long' | 'short'>('long');
  const [leverage, setLeverage] = useState([10]);
  const [amount, setAmount] = useState('');
  const [limitPrice, setLimitPrice] = useState('');
  const [takeProfit, setTakeProfit] = useState('');
  const [stopLoss, setStopLoss] = useState('');

  const chartData = [
    { time: '00:00', price: 2300 },
    { time: '04:00', price: 2320 },
    { time: '08:00', price: 2290 },
    { time: '12:00', price: 2350 },
    { time: '16:00', price: 2340 },
    { time: '20:00', price: 2380 },
    { time: '24:00', price: 2370 },
  ];

  const orderBook = {
    asks: [
      { price: 2342.50, amount: 2.5, total: 5856.25 },
      { price: 2342.00, amount: 1.8, total: 4215.60 },
      { price: 2341.50, amount: 3.2, total: 7492.80 },
      { price: 2341.00, amount: 1.5, total: 3511.50 },
      { price: 2340.50, amount: 2.1, total: 4915.05 },
    ],
    bids: [
      { price: 2340.00, amount: 1.9, total: 4446.00 },
      { price: 2339.50, amount: 2.3, total: 5380.85 },
      { price: 2339.00, amount: 1.6, total: 3742.40 },
      { price: 2338.50, amount: 2.8, total: 6547.80 },
      { price: 2338.00, amount: 1.2, total: 2805.60 },
    ],
  };

  const openPositions = [
    {
      id: 1,
      symbol: 'ETH/USDT',
      type: 'Long',
      size: 1.5,
      entry: 2320.00,
      mark: 2340.50,
      liquidation: 2100.00,
      pnl: '+$30.75',
      pnlPercent: '+1.32%',
    },
  ];

  const handlePlaceOrder = () => {
    toast.success(`${position === 'long' ? 'Long' : 'Short'} order placed successfully!`);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div className="flex items-center justify-between">
        <div>
          <h1>Futures Trading</h1>
          <p className="text-gray-400">Trade perpetual contracts with leverage</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-green-500/10 text-green-500 px-4 py-2">
            ETH/USDT: $2,340.50
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>ETH/USDT Perpetual</CardTitle>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-green-500">+2.4%</span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" domain={['dataMin - 20', 'dataMax + 20']} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Form */}
        <Card>
          <CardHeader>
            <CardTitle>Place Order</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={position} onValueChange={(v) => setPosition(v as 'long' | 'short')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="long" className="data-[state=active]:bg-green-500/10 data-[state=active]:text-green-500">
                  Long
                </TabsTrigger>
                <TabsTrigger value="short" className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500">
                  Short
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs value={orderType} onValueChange={(v) => setOrderType(v as 'market' | 'limit')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="market">Market</TabsTrigger>
                <TabsTrigger value="limit">Limit</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-2">
              <Label>Leverage: {leverage[0]}x</Label>
              <Slider
                value={leverage}
                onValueChange={setLeverage}
                max={100}
                step={1}
                className="mt-2"
              />
              <div className="flex gap-2">
                {[10, 25, 50, 100].map((lev) => (
                  <Button
                    key={lev}
                    variant="outline"
                    size="sm"
                    onClick={() => setLeverage([lev])}
                  >
                    {lev}x
                  </Button>
                ))}
              </div>
            </div>

            {orderType === 'limit' && (
              <div className="space-y-2">
                <Label>Limit Price</Label>
                <Input
                  type="number"
                  placeholder="2340.50"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label>Amount (ETH)</Label>
              <Input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Take Profit (Optional)</Label>
              <Input
                type="number"
                placeholder="2500.00"
                value={takeProfit}
                onChange={(e) => setTakeProfit(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Stop Loss (Optional)</Label>
              <Input
                type="number"
                placeholder="2200.00"
                value={stopLoss}
                onChange={(e) => setStopLoss(e.target.value)}
              />
            </div>

            <div className="p-3 rounded-lg bg-gray-800/50 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Entry Price</span>
                <span>$2,340.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Position Size</span>
                <span>{amount || '0'} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Liquidation Price</span>
                <span className="text-red-500">$2,106.45</span>
              </div>
            </div>

            <Button
              className={`w-full ${
                position === 'long'
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-red-500 hover:bg-red-600'
              }`}
              onClick={handlePlaceOrder}
              disabled={!amount}
            >
              {position === 'long' ? 'Long' : 'Short'} {orderType === 'market' ? 'Market' : 'Limit'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Order Book & Positions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Book</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="grid grid-cols-3 gap-2 text-xs text-gray-400 mb-2">
                  <div>Price (USDT)</div>
                  <div className="text-right">Amount (ETH)</div>
                  <div className="text-right">Total</div>
                </div>
                {orderBook.asks.reverse().map((ask, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-sm py-1 hover:bg-gray-800/50">
                    <div className="text-red-500">{ask.price.toFixed(2)}</div>
                    <div className="text-right">{ask.amount.toFixed(4)}</div>
                    <div className="text-right text-gray-400">{ask.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="py-2 text-center border-y border-gray-800">
                <span className="text-xl">$2,340.50</span>
              </div>
              <div>
                {orderBook.bids.map((bid, index) => (
                  <div key={index} className="grid grid-cols-3 gap-2 text-sm py-1 hover:bg-gray-800/50">
                    <div className="text-green-500">{bid.price.toFixed(2)}</div>
                    <div className="text-right">{bid.amount.toFixed(4)}</div>
                    <div className="text-right text-gray-400">{bid.total.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Open Positions</CardTitle>
          </CardHeader>
          <CardContent>
            {openPositions.length > 0 ? (
              <div className="space-y-4">
                {openPositions.map((pos) => (
                  <div key={pos.id} className="p-4 rounded-lg border border-gray-800">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div>{pos.symbol}</div>
                        <Badge
                          variant="secondary"
                          className={
                            pos.type === 'Long'
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-red-500/10 text-red-500'
                          }
                        >
                          {pos.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-green-500">{pos.pnl}</div>
                        <div className="text-sm text-gray-400">{pos.pnlPercent}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-400">Size</div>
                        <div>{pos.size} ETH</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Entry</div>
                        <div>${pos.entry.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Mark Price</div>
                        <div>${pos.mark.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Liquidation</div>
                        <div className="text-red-500">${pos.liquidation.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        Close
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">No open positions</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
