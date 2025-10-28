"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, AlertCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

export default function BridgePage() {
  const [amount, setAmount] = useState('');
  const [fromChain, setFromChain] = useState('ethereum');
  const [toChain, setToChain] = useState('polygon');

  const chains = [
    { id: 'ethereum', name: 'Ethereum', icon: '⟠', color: 'bg-blue-500' },
    { id: 'polygon', name: 'Polygon', icon: '⬡', color: 'bg-purple-500' },
    { id: 'arbitrum', name: 'Arbitrum', icon: '◆', color: 'bg-cyan-500' },
    { id: 'optimism', name: 'Optimism', icon: '○', color: 'bg-red-500' },
    { id: 'bsc', name: 'BSC', icon: '▲', color: 'bg-yellow-500' },
    { id: 'avalanche', name: 'Avalanche', icon: '▼', color: 'bg-red-600' },
  ];

  const handleBridge = () => {
    toast.success('Bridge transaction initiated!');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div>
        <h1>Bridge</h1>
        <p className="text-gray-400">Transfer assets across blockchain networks</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bridge Interface */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Chain Bridge</CardTitle>
              <CardDescription>Transfer your assets between different blockchains</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Chain Selection Map */}
              <div className="p-6 rounded-lg bg-linear-to-br from-gray-800 to-gray-900 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-center flex-1">
                    <div className="mb-2 text-gray-400">From Chain</div>
                    <Select value={fromChain} onValueChange={setFromChain}>
                      <SelectTrigger className="w-full max-w-xs mx-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {chains.filter(c => c.id !== toChain).map((chain) => (
                          <SelectItem key={chain.id} value={chain.id}>
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{chain.icon}</span>
                              <span>{chain.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <ArrowRight className="h-8 w-8 text-cyan-500 mx-4" />

                  <div className="text-center flex-1">
                    <div className="mb-2 text-gray-400">To Chain</div>
                    <Select value={toChain} onValueChange={setToChain}>
                      <SelectTrigger className="w-full max-w-xs mx-auto">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {chains.filter(c => c.id !== fromChain).map((chain) => (
                          <SelectItem key={chain.id} value={chain.id}>
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{chain.icon}</span>
                              <span>{chain.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {chains.map((chain) => {
                    const isSelected = chain.id === fromChain || chain.id === toChain;
                    return (
                      <div
                        key={chain.id}
                        className={`p-3 rounded-lg border text-center transition-all ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-500/10'
                            : 'border-gray-700 opacity-40'
                        }`}
                      >
                        <div className="text-2xl mb-1">{chain.icon}</div>
                        <div className="text-xs">{chain.name}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <Label>Amount to Bridge</Label>
                <Input
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Balance: 2.5432 ETH</span>
                  <Button variant="link" size="sm" className="h-auto p-0 text-cyan-500">
                    MAX
                  </Button>
                </div>
              </div>

              {/* Fee Details */}
              {amount && (
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardHeader>
                    <CardTitle>Transaction Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">From</span>
                      <span className="flex items-center gap-2">
                        {chains.find(c => c.id === fromChain)?.icon}
                        {chains.find(c => c.id === fromChain)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">To</span>
                      <span className="flex items-center gap-2">
                        {chains.find(c => c.id === toChain)?.icon}
                        {chains.find(c => c.id === toChain)?.name}
                      </span>
                    </div>
                    <div className="border-t border-gray-700 pt-3 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Bridge Fee</span>
                        <span>0.001 ETH (~$2.34)</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Network Fee (Origin)</span>
                        <span>~$3.50</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Network Fee (Destination)</span>
                        <span>~$1.20</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Estimated Time</span>
                        <Badge variant="secondary">~5-10 min</Badge>
                      </div>
                      <div className="border-t border-gray-700 pt-2 flex justify-between">
                        <span>Total Fees</span>
                        <span className="text-cyan-500">~$7.04</span>
                      </div>
                      <div className="flex justify-between">
                        <span>You will receive</span>
                        <span>{amount} ETH</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Alert className="bg-yellow-500/10 border-yellow-500/50">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <AlertDescription className="text-yellow-500">
                  Bridge transactions are irreversible. Ensure destination address is correct.
                </AlertDescription>
              </Alert>

              <Button
                className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                onClick={handleBridge}
                disabled={!amount}
              >
                Initiate Bridge
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supported Chains</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {chains.map((chain) => (
                <div
                  key={chain.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${chain.color} flex items-center justify-center`}>
                      <span>{chain.icon}</span>
                    </div>
                    <span>{chain.name}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                    Active
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bridge Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                <div className="text-sm text-gray-400">
                  Bridge fees vary based on network congestion and liquidity
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                <div className="text-sm text-gray-400">
                  Transactions typically complete within 5-15 minutes
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                <div className="text-sm text-gray-400">
                  Always verify the destination chain and address before bridging
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-cyan-500 mt-0.5 shrink-0" />
                <div className="text-sm text-gray-400">
                  Minimum bridge amount: 0.01 ETH or equivalent
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-linear-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/50">
            <CardHeader>
              <CardTitle>Recent Bridges</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Ethereum → Polygon</span>
                  <Badge className="bg-green-500/10 text-green-500">Completed</Badge>
                </div>
                <div className="text-xs text-gray-400">1.5 ETH • 2 hours ago</div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-400">Arbitrum → Ethereum</span>
                  <Badge className="bg-yellow-500/10 text-yellow-500">Pending</Badge>
                </div>
                <div className="text-xs text-gray-400">0.8 ETH • 5 min ago</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
