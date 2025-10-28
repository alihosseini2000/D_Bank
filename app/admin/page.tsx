import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, DollarSign, TrendingUp, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AdminPage() {
  const userGrowthData = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1900 },
    { month: 'Mar', users: 2500 },
    { month: 'Apr', users: 3200 },
    { month: 'May', users: 4100 },
    { month: 'Jun', users: 5000 },
  ];

  const feeRevenueData = [
    { week: 'W1', fees: 12000 },
    { week: 'W2', fees: 15000 },
    { week: 'W3', fees: 18000 },
    { week: 'W4', fees: 22000 },
    { week: 'W5', fees: 19000 },
    { week: 'W6', fees: 25000 },
  ];

  const treasuryData = [
    { month: 'Jan', value: 500000 },
    { month: 'Feb', value: 650000 },
    { month: 'Mar', value: 820000 },
    { month: 'Apr', value: 950000 },
    { month: 'May', value: 1100000 },
    { month: 'Jun', value: 1250000 },
  ];

  const topUsers = [
    { id: 1, name: 'Alice Johnson', volume: '$2.5M', trades: 1240, status: 'active' },
    { id: 2, name: 'Bob Smith', volume: '$1.8M', trades: 980, status: 'active' },
    { id: 3, name: 'Carol White', volume: '$1.5M', trades: 850, status: 'active' },
    { id: 4, name: 'David Brown', volume: '$1.2M', trades: 720, status: 'suspended' },
    { id: 5, name: 'Eve Davis', volume: '$980K', trades: 650, status: 'active' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div>
        <h1>Admin Panel</h1>
        <p className="text-gray-400">Platform analytics and user management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Total Users</span>
              <Users className="h-5 w-5 text-cyan-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">45,231</div>
            <div className="flex items-center gap-1 text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+18.2% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Total Fees</span>
              <DollarSign className="h-5 w-5 text-cyan-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">$125,430</div>
            <div className="flex items-center gap-1 text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+24.5% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Treasury</span>
              <TrendingUp className="h-5 w-5 text-cyan-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">$1.25M</div>
            <div className="flex items-center gap-1 text-green-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>+13.7% from last month</span>
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
            <div className="text-3xl mb-2">$8.5M</div>
            <div className="flex items-center gap-1 text-red-500">
              <ArrowDownRight className="h-4 w-4" />
              <span>-5.2% from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#06b6d4"
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fee Revenue</CardTitle>
            <CardDescription>Platform fees collected weekly</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={feeRevenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                />
                <Bar dataKey="fees" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Treasury & Top Users */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Treasury Balance</CardTitle>
            <CardDescription>Protocol treasury growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={treasuryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: '#06b6d4', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Users</CardTitle>
            <CardDescription>Highest trading volume users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div>{user.name}</div>
                      <div className="text-sm text-gray-400">{user.trades} trades</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div>{user.volume}</div>
                    <Badge
                      variant={user.status === 'active' ? 'default' : 'destructive'}
                      className={
                        user.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }
                    >
                      {user.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Pools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl mb-2">42</div>
            <p className="text-gray-400">Liquidity pools active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total TVL</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl mb-2">$2.5B</div>
            <p className="text-gray-400">Total value locked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Avg. Daily Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl mb-2">$12.3M</div>
            <p className="text-gray-400">30-day average</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
