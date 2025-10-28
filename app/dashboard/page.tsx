import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function DashboardPage() {
  const balanceData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 7500 },
    { name: 'Jul', value: 8200 },
  ];

  const volumeData = [
    { name: 'Mon', value: 2400 },
    { name: 'Tue', value: 1398 },
    { name: 'Wed', value: 9800 },
    { name: 'Thu', value: 3908 },
    { name: 'Fri', value: 4800 },
    { name: 'Sat', value: 3800 },
    { name: 'Sun', value: 4300 },
  ];

  const portfolioData = [
    { name: 'ETH', value: 45, color: '#06b6d4' },
    { name: 'BTC', value: 30, color: '#3b82f6' },
    { name: 'USDT', value: 15, color: '#10b981' },
    { name: 'Others', value: 10, color: '#8b5cf6' },
  ];

  const recentTransactions = [
    { id: 1, type: 'deposit', amount: '+$1,250.00', token: 'ETH', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'withdraw', amount: '-$500.00', token: 'USDT', time: '5 hours ago', status: 'completed' },
    { id: 3, type: 'swap', amount: '$2,100.00', token: 'BTC ⇄ ETH', time: '1 day ago', status: 'completed' },
    { id: 4, type: 'deposit', amount: '+$3,500.00', token: 'BTC', time: '2 days ago', status: 'pending' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div>
        <h1>Dashboard</h1>
        <p className="text-gray-400">Welcome back! Here's your portfolio overview</p>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-500 to-blue-500 border-0 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/90">Total Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">$45,231.89</div>
            <div className="flex items-center gap-1 text-white/80">
              <ArrowUpRight className="h-4 w-4" />
              <span>+12.5% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Portfolio Value</span>
              <Wallet className="h-5 w-5 text-cyan-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">$38,492.10</div>
            <div className="flex items-center gap-1 text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+8.2%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>24h Volume</span>
              <Activity className="h-5 w-5 text-cyan-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">$12,543.23</div>
            <div className="flex items-center gap-1 text-red-500">
              <ArrowDownRight className="h-4 w-4" />
              <span>-2.1%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Total Earnings</span>
              <TrendingUp className="h-5 w-5 text-cyan-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">$6,739.79</div>
            <div className="flex items-center gap-1 text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+15.3%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Balance History</CardTitle>
            <CardDescription>Your balance over the last 7 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={balanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Portfolio Distribution</CardTitle>
            <CardDescription>Assets by percentage</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {portfolioData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span>{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions & Weekly Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'deposit'
                          ? 'bg-green-500/10 text-green-500'
                          : tx.type === 'withdraw'
                          ? 'bg-red-500/10 text-red-500'
                          : 'bg-blue-500/10 text-blue-500'
                      }`}
                    >
                      {tx.type === 'deposit' ? (
                        <ArrowDownRight className="h-5 w-5" />
                      ) : tx.type === 'withdraw' ? (
                        <ArrowUpRight className="h-5 w-5" />
                      ) : (
                        <Activity className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <div className="capitalize">{tx.type}</div>
                      <div className="text-sm text-gray-400">{tx.token}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={tx.type === 'deposit' ? 'text-green-500' : tx.type === 'withdraw' ? 'text-red-500' : ''}>
                      {tx.amount}
                    </div>
                    <div className="text-sm text-gray-400">{tx.time}</div>
                  </div>
                  <Badge
                    variant={tx.status === 'completed' ? 'default' : 'secondary'}
                    className={tx.status === 'completed' ? 'bg-green-500/10 text-green-500' : ''}
                  >
                    {tx.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Volume</CardTitle>
            <CardDescription>Trading volume by day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={volumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                />
                <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Deposit', 'Withdraw', 'Swap', 'Stake'].map((action) => (
              <button
                key={action}
                className="p-4 rounded-lg border border-gray-800 hover:border-cyan-500 hover:bg-cyan-500/5 transition-all text-center"
              >
                {action}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
