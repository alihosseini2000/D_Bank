"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { AlertCircle, TrendingUp, Shield, Coins } from 'lucide-react';
import { toast } from 'sonner';

export default function LendingPage() {
  const [loanAmount, setLoanAmount] = useState('');
  const [collateralAmount, setCollateralAmount] = useState('');
  const [ltv, setLtv] = useState([65]);

  const markets = [
    { asset: 'ETH', supplyAPY: 3.2, borrowAPY: 5.8, liquidity: '$125M', utilization: 68 },
    { asset: 'USDT', supplyAPY: 8.5, borrowAPY: 12.3, liquidity: '$250M', utilization: 82 },
    { asset: 'USDC', supplyAPY: 7.8, borrowAPY: 11.5, liquidity: '$180M', utilization: 75 },
    { asset: 'DAI', supplyAPY: 7.2, borrowAPY: 10.9, liquidity: '$95M', utilization: 71 },
    { asset: 'WBTC', supplyAPY: 2.8, borrowAPY: 4.5, liquidity: '$85M', utilization: 58 },
  ];

  const yourLoans = [
    {
      id: 1,
      borrowed: 'USDT',
      amount: 5000,
      collateral: 'ETH',
      collateralAmount: 3.2,
      ltv: 65,
      health: 1.54,
      apy: 12.3,
    },
  ];

  const calculateLiquidation = () => {
    if (!collateralAmount || !loanAmount) return 0;
    const collateral = parseFloat(collateralAmount);
    const loan = parseFloat(loanAmount);
    return ((loan / collateral) * 0.75).toFixed(2);
  };

  const handleBorrow = () => {
    toast.success('Loan request submitted!');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div>
        <h1>Lending & Borrowing</h1>
        <p className="text-gray-400">Supply assets to earn interest or borrow against your collateral</p>
      </div>

      {/* Markets Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Lending Markets</CardTitle>
          <CardDescription>Available assets for lending and borrowing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3">Asset</th>
                  <th className="text-right py-3">Supply APY</th>
                  <th className="text-right py-3">Borrow APY</th>
                  <th className="text-right py-3">Liquidity</th>
                  <th className="text-right py-3">Utilization</th>
                  <th className="text-right py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((market) => (
                  <tr key={market.asset} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                          {market.asset.substring(0, 2)}
                        </div>
                        <span>{market.asset}</span>
                      </div>
                    </td>
                    <td className="text-right text-green-500">{market.supplyAPY}%</td>
                    <td className="text-right text-orange-500">{market.borrowAPY}%</td>
                    <td className="text-right">{market.liquidity}</td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress value={market.utilization} className="w-16" />
                        <span className="text-sm">{market.utilization}%</span>
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button size="sm" variant="outline">
                          Supply
                        </Button>
                        <Button size="sm" variant="outline">
                          Borrow
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Loan Calculator & Borrow Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Borrow Assets</CardTitle>
            <CardDescription>Use your crypto as collateral to borrow</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="borrow">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="borrow">Borrow</TabsTrigger>
                <TabsTrigger value="supply">Supply</TabsTrigger>
              </TabsList>

              <TabsContent value="borrow" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Collateral Asset</Label>
                    <select className="w-full px-3 py-2 rounded-md border border-input bg-background">
                      <option>ETH</option>
                      <option>WBTC</option>
                      <option>USDC</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Borrow Asset</Label>
                    <select className="w-full px-3 py-2 rounded-md border border-input bg-background">
                      <option>USDT</option>
                      <option>DAI</option>
                      <option>USDC</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Collateral Amount (ETH)</Label>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={collateralAmount}
                    onChange={(e) => setCollateralAmount(e.target.value)}
                  />
                  <div className="text-sm text-gray-400">Available: 2.5432 ETH</div>
                </div>

                <div className="space-y-2">
                  <Label>Loan to Value (LTV): {ltv[0]}%</Label>
                  <Slider
                    value={ltv}
                    onValueChange={setLtv}
                    max={80}
                    step={5}
                    className="mt-2"
                  />
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Safer</span>
                    <span>Riskier</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Borrow Amount (USDT)</Label>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                  <div className="text-sm text-gray-400">
                    Max borrowable: {collateralAmount ? (parseFloat(collateralAmount) * 2340 * (ltv[0] / 100)).toFixed(2) : '0'} USDT
                  </div>
                </div>

                {collateralAmount && loanAmount && (
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle>Loan Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Collateral Value</span>
                        <span>${(parseFloat(collateralAmount) * 2340).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Borrow Amount</span>
                        <span>${loanAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">LTV Ratio</span>
                        <span>{((parseFloat(loanAmount) / (parseFloat(collateralAmount) * 2340)) * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Borrow APY</span>
                        <span className="text-orange-500">12.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Liquidation Price</span>
                        <span className="text-red-500">${calculateLiquidation()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Health Factor</span>
                        <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                          1.54
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Alert className="bg-yellow-500/10 border-yellow-500/50">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-500">
                    <span>Maintain a health factor above 1.0 to avoid liquidation. Add collateral if your health factor drops below 1.2.</span>
                  </AlertDescription>
                </Alert>

                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  onClick={handleBorrow}
                  disabled={!collateralAmount || !loanAmount}
                >
                  Borrow
                </Button>
              </TabsContent>

              <TabsContent value="supply" className="space-y-4">
                <div className="space-y-2">
                  <Label>Asset to Supply</Label>
                  <select className="w-full px-3 py-2 rounded-md border border-input bg-background">
                    <option>ETH</option>
                    <option>USDT</option>
                    <option>USDC</option>
                    <option>DAI</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Supply Amount</Label>
                  <Input type="number" placeholder="0.0" />
                  <div className="text-sm text-gray-400">Available: 2.5432 ETH</div>
                </div>

                <Card className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 border-green-500/50">
                  <CardContent className="pt-6 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Supply APY</span>
                      <span className="text-green-500">3.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Estimated Yearly Earnings</span>
                      <span>~$243.50</span>
                    </div>
                  </CardContent>
                </Card>

                <Button className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600">
                  Supply
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Your Loans & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Position</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <Coins className="h-4 w-4 text-cyan-500" />
                  <span className="text-sm text-gray-400">Total Borrowed</span>
                </div>
                <div className="text-2xl">$5,000.00</div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-cyan-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-gray-400">Total Supplied</span>
                </div>
                <div className="text-2xl">$12,500.00</div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-red-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-gray-400">Health Factor</span>
                </div>
                <div className="text-2xl text-green-500">1.54</div>
                <Progress value={77} className="mt-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Loans</CardTitle>
            </CardHeader>
            <CardContent>
              {yourLoans.map((loan) => (
                <div key={loan.id} className="p-4 rounded-lg border border-gray-800">
                  <div className="flex justify-between mb-3">
                    <span>{loan.borrowed}</span>
                    <Badge
                      variant="secondary"
                      className={
                        loan.health > 1.2
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-yellow-500/10 text-yellow-500'
                      }
                    >
                      {loan.health.toFixed(2)} Health
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Borrowed</span>
                      <span>${loan.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Collateral</span>
                      <span>{loan.collateralAmount} {loan.collateral}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">LTV</span>
                      <span>{loan.ltv}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">APY</span>
                      <span className="text-orange-500">{loan.apy}%</span>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      Repay
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Add Collateral
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
