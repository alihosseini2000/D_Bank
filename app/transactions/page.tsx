"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowUpRight,
  ArrowDownRight,
  Repeat,
  Download,
  Search,
  ExternalLink,
  Filter,
} from 'lucide-react';

export function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const transactions = [
    {
      id: 1,
      hash: '0x742d35...5f0bEb',
      type: 'swap',
      from: 'ETH',
      to: 'USDT',
      amount: '1.5',
      value: '$3,510.75',
      fee: '$2.50',
      status: 'completed',
      timestamp: '2025-10-28 14:32:15',
      block: 18234567,
    },
    {
      id: 2,
      hash: '0x8a3f21...9c2DeC',
      type: 'deposit',
      from: 'Wallet',
      to: 'DeFi Bank',
      amount: '2.0',
      value: '$4,681.00',
      fee: '$1.20',
      status: 'completed',
      timestamp: '2025-10-28 12:15:42',
      block: 18234321,
    },
    {
      id: 3,
      hash: '0x5d9a42...3f1AbC',
      type: 'withdraw',
      from: 'DeFi Bank',
      to: 'Wallet',
      amount: '500',
      value: '$500.00',
      fee: '$0.85',
      status: 'completed',
      timestamp: '2025-10-28 09:45:30',
      block: 18233987,
    },
    {
      id: 4,
      hash: '0x1c8f53...7e4FdE',
      type: 'stake',
      from: 'Wallet',
      to: 'ETH Staking Pool',
      amount: '3.5',
      value: '$8,191.75',
      fee: '$3.20',
      status: 'pending',
      timestamp: '2025-10-28 08:20:18',
      block: 18233845,
    },
    {
      id: 5,
      hash: '0x9f2d64...2a5CeF',
      type: 'swap',
      from: 'BTC',
      to: 'ETH',
      amount: '0.1',
      value: '$4,523.00',
      fee: '$5.50',
      status: 'completed',
      timestamp: '2025-10-27 18:55:22',
      block: 18231234,
    },
    {
      id: 6,
      hash: '0x4e7c85...1b3DfG',
      type: 'bridge',
      from: 'Ethereum',
      to: 'Polygon',
      amount: '1.0',
      value: '$2,340.50',
      fee: '$7.00',
      status: 'completed',
      timestamp: '2025-10-27 15:30:45',
      block: 18230987,
    },
    {
      id: 7,
      hash: '0x3a6b94...8c9EfH',
      type: 'unstake',
      from: 'Staking Pool',
      to: 'Wallet',
      amount: '1.2',
      value: '$2,808.60',
      fee: '$2.10',
      status: 'failed',
      timestamp: '2025-10-27 11:12:33',
      block: 18230456,
    },
    {
      id: 8,
      hash: '0x7d1e52...5f8GhI',
      type: 'deposit',
      from: 'Wallet',
      to: 'Lending Pool',
      amount: '5000',
      value: '$5,000.00',
      fee: '$1.50',
      status: 'completed',
      timestamp: '2025-10-26 20:45:15',
      block: 18228765,
    },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownRight className="h-4 w-4 text-green-500" />;
      case 'withdraw':
      case 'unstake':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'swap':
      case 'bridge':
        return <Repeat className="h-4 w-4 text-blue-500" />;
      default:
        return <ArrowUpRight className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      completed: 'bg-green-500/10 text-green-500',
      pending: 'bg-yellow-500/10 text-yellow-500',
      failed: 'bg-red-500/10 text-red-500',
    };
    return styles[status as keyof typeof styles] || '';
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || tx.type === filterType;
    const matchesStatus = filterStatus === 'all' || tx.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div>
        <h1>Transaction History</h1>
        <p className="text-gray-400">View and manage all your blockchain transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">{transactions.length}</div>
            <p className="text-sm text-gray-400">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">$31,555.60</div>
            <p className="text-sm text-green-500">+12.3% this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Fees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">$23.85</div>
            <p className="text-sm text-gray-400">Last 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-1">1</div>
            <p className="text-sm text-yellow-500">Awaiting confirmation</p>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete history of your blockchain activity</CardDescription>
            </div>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by hash or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="swap">Swap</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdraw">Withdraw</SelectItem>
                <SelectItem value="stake">Stake</SelectItem>
                <SelectItem value="unstake">Unstake</SelectItem>
                <SelectItem value="bridge">Bridge</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left py-3 px-2">Type</th>
                  <th className="text-left py-3 px-2">Hash</th>
                  <th className="text-left py-3 px-2">Details</th>
                  <th className="text-right py-3 px-2">Amount</th>
                  <th className="text-right py-3 px-2">Fee</th>
                  <th className="text-center py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">Time</th>
                  <th className="text-center py-3 px-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        {getTypeIcon(tx.type)}
                        <span className="capitalize">{tx.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <code className="text-sm text-cyan-500">{tx.hash}</code>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-sm">
                        <div>{tx.from} → {tx.to}</div>
                        <div className="text-gray-400">{tx.amount} {tx.type === 'swap' || tx.type === 'bridge' ? tx.from : ''}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div>{tx.value}</div>
                    </td>
                    <td className="py-4 px-2 text-right text-gray-400">
                      {tx.fee}
                    </td>
                    <td className="py-4 px-2 text-center">
                      <Badge className={getStatusBadge(tx.status)}>
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-sm">
                        <div>{tx.timestamp.split(' ')[0]}</div>
                        <div className="text-gray-400">{tx.timestamp.split(' ')[1]}</div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="hover:text-cyan-500"
                        aria-label="View on explorer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No transactions found matching your filters
            </div>
          )}

          {/* Pagination */}
          {filteredTransactions.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-400">
                Showing {filteredTransactions.length} of {transactions.length} transactions
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
