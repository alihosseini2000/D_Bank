import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  MessageCircle,
  Mail,
  Book,
  HelpCircle,
  Search,
  ExternalLink,
  Send,
} from 'lucide-react';
import { toast } from 'sonner';

export function SupportPage() {
  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I connect my wallet?',
          a: 'Click on the "Connect Wallet" button in the top right corner and select your preferred wallet provider (MetaMask, WalletConnect, or Coinbase Wallet). Follow the prompts to authorize the connection.',
        },
        {
          q: 'What wallets are supported?',
          a: 'We support MetaMask, WalletConnect, Coinbase Wallet, and any wallet compatible with WalletConnect protocol. We recommend using MetaMask for the best experience.',
        },
        {
          q: 'Is there a minimum deposit amount?',
          a: 'Minimum deposit amounts vary by asset and feature. For most pools, the minimum is around $10-$100. Check individual pool details for specific requirements.',
        },
      ],
    },
    {
      category: 'Trading & Swapping',
      questions: [
        {
          q: 'What is slippage and how do I set it?',
          a: 'Slippage is the difference between expected and actual trade prices. You can set slippage tolerance in the swap interface settings. We recommend 0.5-1% for most trades.',
        },
        {
          q: 'How are swap rates calculated?',
          a: 'Swap rates are determined by liquidity pool balances and automatically route through multiple pools to get you the best price. Rates include a 0.3% platform fee.',
        },
        {
          q: 'What are network fees?',
          a: 'Network fees (gas fees) are paid to blockchain validators to process your transaction. These fees vary based on network congestion and are not controlled by DeFi Bank.',
        },
      ],
    },
    {
      category: 'Staking & Yield Farming',
      questions: [
        {
          q: 'How do I earn yield on my crypto?',
          a: 'Navigate to the Deposit page, select a yield pool that matches your risk tolerance, and stake your assets. You\'ll automatically start earning rewards that can be claimed or auto-compounded.',
        },
        {
          q: 'What is APY vs APR?',
          a: 'APY (Annual Percentage Yield) includes compound interest, while APR (Annual Percentage Rate) does not. Our displayed rates are APY, showing your actual expected returns with compounding.',
        },
        {
          q: 'Can I unstake my tokens anytime?',
          a: 'Flexible pools allow unstaking anytime. Locked pools have specific lock periods (30, 90, or 180 days). Early unstaking from locked pools may incur penalties.',
        },
        {
          q: 'How often are rewards distributed?',
          a: 'Rewards are calculated every block and automatically added to your position. You can claim accumulated rewards anytime without unstaking your principal.',
        },
      ],
    },
    {
      category: 'Lending & Borrowing',
      questions: [
        {
          q: 'What is a health factor?',
          a: 'Health factor indicates your loan\'s safety level. Above 1.0 is safe, below 1.0 risks liquidation. We recommend maintaining at least 1.5 for safety margin.',
        },
        {
          q: 'What happens if I get liquidated?',
          a: 'If your health factor drops below 1.0, liquidators can repay your loan and claim your collateral at a discount. Maintain adequate collateral to avoid liquidation.',
        },
        {
          q: 'How do I increase my health factor?',
          a: 'Add more collateral, repay part of your loan, or wait for your collateral asset to appreciate in value. Monitor your position regularly.',
        },
      ],
    },
    {
      category: 'Security & Safety',
      questions: [
        {
          q: 'Is DeFi Bank audited?',
          a: 'Yes, our smart contracts have been audited by leading security firms. Audit reports are available in our documentation.',
        },
        {
          q: 'Are my funds safe?',
          a: 'We use non-custodial smart contracts, meaning you always maintain control of your funds. However, DeFi carries risks including smart contract bugs and market volatility.',
        },
        {
          q: 'How do I enable 2FA?',
          a: 'Go to Profile > Security and toggle on Two-Factor Authentication. Follow the setup process using an authenticator app like Google Authenticator.',
        },
        {
          q: 'What should I do if I suspect unauthorized access?',
          a: 'Immediately disconnect your wallet, change your passwords, and contact support. Review your transaction history for any unauthorized activity.',
        },
      ],
    },
    {
      category: 'Governance',
      questions: [
        {
          q: 'How do I vote on proposals?',
          a: 'Hold GOV tokens to gain voting power. Navigate to the Governance page and vote on active proposals. Your voting power equals your GOV token balance.',
        },
        {
          q: 'Can I create a proposal?',
          a: 'Yes, but you need a minimum of 100,000 GOV tokens to create proposals. This threshold ensures serious, well-considered proposals.',
        },
        {
          q: 'What is delegation?',
          a: 'Delegation allows you to assign your voting power to another address. The delegate can vote on your behalf while you retain token ownership.',
        },
      ],
    },
  ];

  const resources = [
    {
      title: 'Documentation',
      description: 'Complete guides and API reference',
      icon: Book,
      link: '#',
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: ExternalLink,
      link: '#',
    },
    {
      title: 'Community Forum',
      description: 'Ask questions and share knowledge',
      icon: MessageCircle,
      link: '#',
    },
    {
      title: 'Developer Docs',
      description: 'Technical documentation for developers',
      icon: Book,
      link: '#',
    },
  ];

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Support ticket submitted! We\'ll respond within 24 hours.');
  };

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div>
        <h1>Help & Support</h1>
        <p className="text-gray-400">Find answers and get help with DeFi Bank</p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <Card
              key={index}
              className="border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 flex items-center justify-center mb-3">
                  <Icon className="h-6 w-6 text-cyan-500" />
                </div>
                <CardTitle>{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <a href={resource.link}>
                    View <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search FAQs..."
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={faqs[0].category}>
              <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
                {faqs.map((category) => (
                  <TabsTrigger key={category.category} value={category.category} className="text-xs">
                    {category.category.split(' ')[0]}
                  </TabsTrigger>
                ))}
              </TabsList>

              {faqs.map((category) => (
                <TabsContent key={category.category} value={category.category}>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-start gap-2">
                            <HelpCircle className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                            <span>{faq.q}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-400 pl-7">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Can't find what you're looking for?</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your@email.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 rounded-md border border-input bg-background"
                    required
                  >
                    <option value="">Select category...</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Problem</option>
                    <option value="transaction">Transaction Issue</option>
                    <option value="security">Security Concern</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue..."
                    rows={5}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Ticket
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/50">
            <CardHeader>
              <CardTitle>Need Immediate Help?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="h-4 w-4 mr-2" />
                Live Chat
                <Badge className="ml-auto bg-green-500">Online</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <div className="text-sm text-gray-400 text-center pt-2">
                Average response time: 2-4 hours
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Platform</span>
                <Badge className="bg-green-500/10 text-green-500">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>API</span>
                <Badge className="bg-green-500/10 text-green-500">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Ethereum Network</span>
                <Badge className="bg-green-500/10 text-green-500">Operational</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Polygon Network</span>
                <Badge className="bg-green-500/10 text-green-500">Operational</Badge>
              </div>
              <Button variant="link" className="w-full text-cyan-500 p-0">
                View Status Page →
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Popular Articles */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Articles</CardTitle>
          <CardDescription>Most viewed help articles this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              'Getting Started with DeFi Bank',
              'Understanding Yield Farming',
              'How to Bridge Assets Safely',
              'Managing Your Health Factor',
              'Governance Voting Guide',
              'Security Best Practices',
            ].map((article, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-800 hover:border-cyan-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <Book className="h-5 w-5 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="mb-1">{article}</div>
                    <div className="text-sm text-gray-400">5 min read</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
