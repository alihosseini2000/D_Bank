"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowDownUp, Settings, Info, AlertCircle } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export default function SwapPage() {
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [fromToken, setFromToken] = useState('ETH');
  const [toToken, setToToken] = useState('USDT');
  const [slippage, setSlippage] = useState([0.5]);
  const [showSettings, setShowSettings] = useState(false);

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', balance: '2.5432', price: 2340.50 },
    { symbol: 'BTC', name: 'Bitcoin', balance: '0.1234', price: 45230.00 },
    { symbol: 'USDT', name: 'Tether', balance: '5000.00', price: 1.00 },
    { symbol: 'USDC', name: 'USD Coin', balance: '3000.00', price: 1.00 },
    { symbol: 'DAI', name: 'Dai', balance: '1500.00', price: 1.00 },
  ];

  const handleSwap = () => {
    toast.success('Swap executed successfully!');
  };

  const switchTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div>
        <h1>Swap</h1>
        <p className="text-gray-400">Exchange tokens instantly at the best rates</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Swap Interface */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Swap Tokens</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  aria-label="Settings"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {showSettings && (
                <Alert className="bg-gray-800 border-gray-700">
                  <Settings className="h-4 w-4" />
                  <AlertDescription>
                    <div className="space-y-4 mt-2">
                      <div>
                        <Label>Slippage Tolerance: {slippage[0]}%</Label>
                        <Slider
                          value={slippage}
                          onValueChange={setSlippage}
                          max={5}
                          step={0.1}
                          className="mt-2"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSlippage([0.1])}
                        >
                          0.1%
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSlippage([0.5])}
                        >
                          0.5%
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSlippage([1])}
                        >
                          1%
                        </Button>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* From Token */}
              <div className="p-4 rounded-lg border border-gray-800 space-y-2">
                <Label>From</Label>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="flex-1 text-2xl"
                  />
                  <Select value={fromToken} onValueChange={setFromToken}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>
                    Balance: {tokens.find(t => t.symbol === fromToken)?.balance}
                  </span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-cyan-500">
                    MAX
                  </Button>
                </div>
              </div>

              {/* Switch Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={switchTokens}
                  aria-label="Switch tokens"
                >
                  <ArrowDownUp className="h-4 w-4" />
                </Button>
              </div>

              {/* To Token */}
              <div className="p-4 rounded-lg border border-gray-800 space-y-2">
                <Label>To</Label>
                <div className="flex gap-4">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                    className="flex-1 text-2xl"
                  />
                  <Select value={toToken} onValueChange={setToToken}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="text-sm text-gray-400">
                  Balance: {tokens.find(t => t.symbol === toToken)?.balance}
                </div>
              </div>

              {/* Swap Details */}
              {fromAmount && (
                <div className="p-4 rounded-lg bg-gray-800/50 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Rate</span>
                    <span>1 {fromToken} = 2,340.50 {toToken}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Price Impact</span>
                    <span className="text-green-500">{'<0.01%'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Minimum Received</span>
                    <span>{toAmount} {toToken}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Network Fee</span>
                    <span>~$2.50</span>
                  </div>
                </div>
              )}

              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                onClick={handleSwap}
                disabled={!fromAmount || !toAmount}
              >
                Swap
              </Button>

              <Alert className="bg-yellow-500/10 border-yellow-500/50">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-500">
                  Always verify transaction details before confirming
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>

        {/* Token Info */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Tokens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tokens.map((token) => (
                <div
                  key={token.symbol}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-colors"
                >
                  <div>
                    <div>{token.symbol}</div>
                    <div className="text-sm text-gray-400">{token.name}</div>
                  </div>
                  <div className="text-right">
                    <div>{token.balance}</div>
                    <div className="text-sm text-gray-400">
                      ${(parseFloat(token.balance) * token.price).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-cyan-500 mt-0.5" />
                <div className="text-sm text-gray-400">
                  Swaps are executed at the best available rate across multiple liquidity pools
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-cyan-500 mt-0.5" />
                <div className="text-sm text-gray-400">
                  Network fees vary based on blockchain congestion
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-cyan-500 mt-0.5" />
                <div className="text-sm text-gray-400">
                  Slippage protection ensures you get the expected rate
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
