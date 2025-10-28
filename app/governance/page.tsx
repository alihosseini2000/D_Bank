"use client"

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Vote, CheckCircle, XCircle, Clock, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function GovernancePage() {
  const [selectedVote, setSelectedVote] = useState<{ [key: number]: 'for' | 'against' | null }>({});

  const proposals = [
    {
      id: 1,
      title: 'Increase ETH Pool APY to 5.5%',
      description: 'Proposal to increase the ETH staking pool APY from 4.5% to 5.5% to attract more liquidity providers.',
      status: 'active',
      endDate: '2025-11-05',
      votesFor: 1250000,
      votesAgainst: 350000,
      quorum: 1000000,
      totalVotes: 1600000,
      votingPower: 12543,
      category: 'Protocol',
    },
    {
      id: 2,
      title: 'Add Support for Arbitrum Chain',
      description: 'Enable cross-chain bridging to Arbitrum network to expand the ecosystem and reduce gas fees for users.',
      status: 'active',
      endDate: '2025-11-08',
      votesFor: 2100000,
      votesAgainst: 450000,
      quorum: 1000000,
      totalVotes: 2550000,
      votingPower: 12543,
      category: 'Development',
    },
    {
      id: 3,
      title: 'Reduce Trading Fees to 0.25%',
      description: 'Lower the platform trading fee from 0.3% to 0.25% to remain competitive with other DEXs.',
      status: 'active',
      endDate: '2025-11-10',
      votesFor: 850000,
      votesAgainst: 980000,
      quorum: 1000000,
      totalVotes: 1830000,
      votingPower: 12543,
      category: 'Economic',
    },
    {
      id: 4,
      title: 'Treasury Allocation for Marketing',
      description: 'Allocate $500,000 from treasury for Q1 2026 marketing campaign to increase platform awareness.',
      status: 'passed',
      endDate: '2025-10-25',
      votesFor: 3200000,
      votesAgainst: 800000,
      quorum: 1000000,
      totalVotes: 4000000,
      votingPower: 0,
      category: 'Treasury',
    },
    {
      id: 5,
      title: 'Implement Auto-Compounding for Staking',
      description: 'Add automatic reward compounding feature for all staking pools.',
      status: 'failed',
      endDate: '2025-10-20',
      votesFor: 750000,
      votesAgainst: 1250000,
      quorum: 1000000,
      totalVotes: 2000000,
      votingPower: 0,
      category: 'Development',
    },
  ];

  const handleVote = (proposalId: number, vote: 'for' | 'against') => {
    setSelectedVote({ @/components.selectedVote, [proposalId]: vote });
    toast.success(`Voted ${vote === 'for' ? 'For' : 'Against'} proposal #${proposalId}`);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-blue-500/10 text-blue-500',
      passed: 'bg-green-500/10 text-green-500',
      failed: 'bg-red-500/10 text-red-500',
    };
    return styles[status as keyof typeof styles] || '';
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Protocol: 'bg-purple-500/10 text-purple-500',
      Development: 'bg-cyan-500/10 text-cyan-500',
      Economic: 'bg-yellow-500/10 text-yellow-500',
      Treasury: 'bg-green-500/10 text-green-500',
    };
    return colors[category as keyof typeof colors] || '';
  };

  const activeProposals = proposals.filter((p) => p.status === 'active');
  const closedProposals = proposals.filter((p) => p.status !== 'active');

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div>
        <h1>Governance</h1>
        <p className="text-gray-400">Participate in protocol decisions and vote on proposals</p>
      </div>

      {/* Voting Power Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-cyan-500 to-blue-500 border-0 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-white/90">Your Voting Power</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">12,543 GOV</div>
            <div className="text-white/80">0.12% of total supply</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Active Proposals</span>
              <Vote className="h-5 w-5 text-cyan-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">{activeProposals.length}</div>
            <div className="text-gray-400">Awaiting your vote</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Votes Cast</span>
              <CheckCircle className="h-5 w-5 text-green-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">23</div>
            <div className="text-gray-400">Total participation</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between">
              <span>Delegation</span>
              <TrendingUp className="h-5 w-5 text-cyan-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl mb-2">0</div>
            <Button size="sm" className="mt-2 w-full" variant="outline">
              Delegate
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Proposals */}
      <Card>
        <CardHeader>
          <CardTitle>Proposals</CardTitle>
          <CardDescription>Vote on important protocol decisions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList className="mb-6">
              <TabsTrigger value="active">
                Active ({activeProposals.length})
              </TabsTrigger>
              <TabsTrigger value="closed">
                Closed ({closedProposals.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeProposals.map((proposal) => (
                <Card key={proposal.id} className="border-gray-800">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusBadge(proposal.status)}>
                            {proposal.status}
                          </Badge>
                          <Badge className={getCategoryColor(proposal.category)}>
                            {proposal.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Clock className="h-4 w-4" />
                            Ends {new Date(proposal.endDate).toLocaleDateString()}
                          </div>
                        </div>
                        <CardTitle className="mb-2">#{proposal.id} - {proposal.title}</CardTitle>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Vote Progress */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-green-500">
                          For: {proposal.votesFor.toLocaleString()} ({((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%)
                        </span>
                        <span className="text-red-500">
                          Against: {proposal.votesAgainst.toLocaleString()} ({((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}%)
                        </span>
                      </div>
                      <div className="relative h-6 rounded-full overflow-hidden bg-gray-800">
                        <div
                          className="absolute left-0 top-0 h-full bg-green-500"
                          style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                        />
                        <div
                          className="absolute right-0 top-0 h-full bg-red-500"
                          style={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Total Votes: {proposal.totalVotes.toLocaleString()} GOV</span>
                        <span>Quorum: {proposal.quorum.toLocaleString()} GOV</span>
                      </div>
                      <Progress
                        value={(proposal.totalVotes / proposal.quorum) * 100}
                        className="h-2"
                      />
                    </div>

                    {/* Voting Buttons */}
                    <div className="flex gap-3">
                      <Button
                        className="flex-1 bg-green-500 hover:bg-green-600"
                        onClick={() => handleVote(proposal.id, 'for')}
                        disabled={selectedVote[proposal.id] !== undefined}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Vote For
                      </Button>
                      <Button
                        className="flex-1 bg-red-500 hover:bg-red-600"
                        onClick={() => handleVote(proposal.id, 'against')}
                        disabled={selectedVote[proposal.id] !== undefined}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Vote Against
                      </Button>
                    </div>

                    {selectedVote[proposal.id] && (
                      <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/50 text-cyan-500 text-sm text-center">
                        You voted {selectedVote[proposal.id] === 'for' ? 'For' : 'Against'} with {proposal.votingPower.toLocaleString()} GOV
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="closed" className="space-y-4">
              {closedProposals.map((proposal) => (
                <Card key={proposal.id} className="border-gray-800 opacity-75">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getStatusBadge(proposal.status)}>
                            {proposal.status}
                          </Badge>
                          <Badge className={getCategoryColor(proposal.category)}>
                            {proposal.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-400">
                            <Clock className="h-4 w-4" />
                            Ended {new Date(proposal.endDate).toLocaleDateString()}
                          </div>
                        </div>
                        <CardTitle className="mb-2">#{proposal.id} - {proposal.title}</CardTitle>
                        <CardDescription>{proposal.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-500">
                        For: {proposal.votesFor.toLocaleString()} ({((proposal.votesFor / proposal.totalVotes) * 100).toFixed(1)}%)
                      </span>
                      <span className="text-red-500">
                        Against: {proposal.votesAgainst.toLocaleString()} ({((proposal.votesAgainst / proposal.totalVotes) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="relative h-6 rounded-full overflow-hidden bg-gray-800">
                      <div
                        className="absolute left-0 top-0 h-full bg-green-500"
                        style={{ width: `${(proposal.votesFor / proposal.totalVotes) * 100}%` }}
                      />
                      <div
                        className="absolute right-0 top-0 h-full bg-red-500"
                        style={{ width: `${(proposal.votesAgainst / proposal.totalVotes) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm text-gray-400 text-center">
                      Total Votes: {proposal.totalVotes.toLocaleString()} GOV
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Create Proposal Button */}
      <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/50">
        <CardContent className="py-8 text-center">
          <h3 className="mb-2">Want to create a proposal?</h3>
          <p className="text-gray-400 mb-4">
            You need at least 100,000 GOV tokens to create a new proposal
          </p>
          <Button
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            disabled
          >
            Create Proposal (Requires 100k GOV)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
