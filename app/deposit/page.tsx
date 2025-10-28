import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Coins, TrendingUp, Lock, Unlock, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

export function DepositPage() {
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');
  const [selectedPool, setSelectedPool] = useState('');

  const yieldPools = [
    {
      id: 1,
      name: 'ETH Staking',
      apy: 4.5,
      tvl: '$125M',
      lockPeriod: 'Flexible',
      minDeposit: 0.01,
      rewards: 'ETH',
      risk: 'Low',
    },
    {
      id: 2,
      name: 'ETH-USDT LP',
      apy: 18.2,
      tvl: '$85M',
      lockPeriod: '30 days',
      minDeposit: 100,
      rewards: 'GOV + Fees',
      risk: 'Medium',
    },
    {
      id: 3,
      name: 'Stablecoin Pool',
      apy: 12.5,
      tvl: '$250M',
      lockPeriod: 'Flexible',
      minDeposit: 10,
      rewards: 'GOV',
      risk: 'Low',
    },
    {
      id: 4,
      name: 'BTC-ETH LP',
      apy: 25.8,
      tvl: '$65M',
      lockPeriod: '90 days',
      minDeposit: 500,
      rewards: 'GOV + Fees',
      risk: 'High',
    },
    {
      id: 5,
      name: 'GOV Staking',
      apy: 35.5,
      tvl: '$45M',
      lockPeriod: '180 days',
      minDeposit: 1000,
      rewards: 'GOV',
      risk: 'Medium',
    },
  ];

  const yourPositions = [
    {
      id: 1,
      pool: 'ETH Staking',
      deposited: 2.5,
      value: 5850,
      earned: 0.12,
      earnedValue: 281,
      apy: 4.5,
      unlockDate: null,
    },
    {
      id: 2,
      pool: 'ETH-USDT LP',
      deposited: 5000,
      value: 5000,
      earned: 425,
      earnedValue: 425,
      apy: 18.2,
      unlockDate: '2025-11-28',
    },
  ];

  const handleStake = () => {
    toast.success('Successfully staked!');
    setStakeAmount('');
  };

  const handleUnstake = () => {
    toast.success('Unstake request submitted!');
    setUnstakeAmount('');
  };

  const getRiskBadge = (risk: string) => {
    const colors = {
      Low: 'bg-green-500/10 text-green-500',
      Medium: 'bg-yellow-500/10 text-yellow-500',
      High: 'bg-red-500/10 text-red-500',
    };
    return colors[risk as keyof typeof colors] || '';
  };

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div>
        <h1>Deposit & Yield Farming</h1>
        <p className="text-gray-400">Earn passive income by staking your assets</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-500 to-blue-500 border-0 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/90">Total Deposited</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">$10,850.00</div>
            <div className="text-white/80">Across 2 pools</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Total Earned</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">$706.00</div>
            <div className="text-green-500">+6.5% return</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Avg APY</span>
              <Coins className="h-5 w-5 text-cyan-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">11.35%</div>
            <div className="text-gray-400">Weighted average</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Claimable</span>
              <Unlock className="h-5 w-5 text-cyan-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">$281.00</div>
            <Button size="sm" className="mt-2 w-full bg-cyan-500 hover:bg-cyan-600">
              Claim All
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Available Pools */}
      <Card>
        <CardHeader>
          <CardTitle>Available Yield Pools</CardTitle>
          <CardDescription>Choose a pool to start earning rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {yieldPools.map((pool) => (
              <Card
                key={pool.id}
                className="border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer"
                onClick={() => setSelectedPool(pool.name)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle>{pool.name}</CardTitle>
                    <Badge className={getRiskBadge(pool.risk)}>{pool.risk}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
                    <div className="text-3xl text-cyan-500 mb-1">{pool.apy}%</div>
                    <div className="text-sm text-gray-400">APY</div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">TVL</span>
                      <span>{pool.tvl}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Lock Period</span>
                      <span>{pool.lockPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Min Deposit</span>
                      <span>${pool.minDeposit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Rewards</span>
                      <span>{pool.rewards}</span>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    Stake Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stake/Unstake Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Stake Assets</CardTitle>
            <CardDescription>Lock your tokens to earn rewards</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="stake">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="stake">
                  <Lock className="h-4 w-4 mr-2" />
                  Stake
                </TabsTrigger>
                <TabsTrigger value="unstake">
                  <Unlock className="h-4 w-4 mr-2" />
                  Unstake
                </TabsTrigger>
              </TabsList>

              <TabsContent value="stake" className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Pool</Label>
                  <select
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                    value={selectedPool}
                    onChange={(e) => setSelectedPool(e.target.value)}
                  >
                    <option value="">Choose a pool@/components.</option>
                    {yieldPools.map((pool) => (
                      <option key={pool.id} value={pool.name}>
                        {pool.name} - {pool.apy}% APY
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Amount to Stake</Label>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={stakeAmount}
                    onChange={(e) => setStakeAmount(e.target.value)}
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Available: 2.5432 ETH</span>
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0 text-cyan-500"
                      onClick={() => setStakeAmount('2.5432')}
                    >
                      MAX
                    </Button>
                  </div>
                </div>

                {stakeAmount && selectedPool && (
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="pt-6 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Estimated Daily Rewards</span>
                        <span className="text-green-500">~$2.85</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Estimated Monthly Rewards</span>
                        <span className="text-green-500">~$85.50</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Estimated Yearly Rewards</span>
                        <span className="text-green-500">~$1,026.00</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Alert className="bg-cyan-500/10 border-cyan-500/50">
                  <AlertCircle className="h-4 w-4 text-cyan-500" />
                  <AlertDescription className="text-cyan-500">
                    Rewards are automatically compounded and can be claimed at any time.
                  </AlertDescription>
                </Alert>

                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                  onClick={handleStake}
                  disabled={!stakeAmount || !selectedPool}
                >
                  Stake
                </Button>
              </TabsContent>

              <TabsContent value="unstake" className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Position</Label>
                  <select className="w-full px-3 py-2 rounded-md border border-input bg-background">
                    <option value="">Choose a position@/components.</option>
                    {yourPositions.map((pos) => (
                      <option key={pos.id} value={pos.pool}>
                        {pos.pool} - ${pos.value.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Amount to Unstake</Label>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={unstakeAmount}
                    onChange={(e) => setUnstakeAmount(e.target.value)}
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>Staked: 2.5 ETH</span>
                    <Button variant="link" size="sm" className="h-auto p-0 text-cyan-500">
                      MAX
                    </Button>
                  </div>
                </div>

                <Alert className="bg-yellow-500/10 border-yellow-500/50">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <AlertDescription className="text-yellow-500">
                    Early unstaking may incur penalties. Check lock period before unstaking.
                  </AlertDescription>
                </Alert>

                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleUnstake}
                  disabled={!unstakeAmount}
                >
                  Unstake
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Your Positions */}
        <Card>
          <CardHeader>
            <CardTitle>Your Positions</CardTitle>
            <CardDescription>Active staking positions and rewards</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {yourPositions.map((position) => (
              <Card key={position.id} className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{position.pool}</CardTitle>
                    <Badge className="bg-cyan-500/10 text-cyan-500">
                      {position.apy}% APY
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-400">Deposited</div>
                      <div>{position.deposited} {position.pool.includes('LP') ? 'USD' : 'ETH'}</div>
                      <div className="text-xs text-gray-400">${position.value.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-400">Earned</div>
                      <div className="text-green-500">{position.earned.toFixed(2)}</div>
                      <div className="text-xs text-gray-400">${position.earnedValue.toFixed(2)}</div>
                    </div>
                  </div>

                  {position.unlockDate && (
                    <div className="flex items-center gap-2 text-sm">
                      <Lock className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-400">
                        Unlocks: {new Date(position.unlockDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      disabled={!!position.unlockDate}
                    >
                      Unstake
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 bg-green-500 hover:bg-green-600"
                    >
                      Claim ${position.earnedValue.toFixed(2)}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {yourPositions.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No active positions. Start staking to earn rewards!
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
