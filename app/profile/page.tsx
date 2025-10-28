"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Shield, Bell, Eye, Globe, Coins } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function ProfilePage() {
  const historyLogs = [
    { id: 1, action: 'Login', location: 'New York, US', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'Swap ETH → USDT', location: 'New York, US', time: '5 hours ago', status: 'success' },
    { id: 3, action: 'Password Changed', location: 'New York, US', time: '1 day ago', status: 'success' },
    { id: 4, action: 'Failed Login Attempt', location: 'London, UK', time: '2 days ago', status: 'failed' },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 lg:ml-64">
      <div>
        <h1>Profile</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="w-32 h-32 mb-4">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-3xl">
                JD
              </AvatarFallback>
            </Avatar>
            <h3 className="mb-1">John Doe</h3>
            <p className="text-gray-400 mb-4">john.doe@example.com</p>
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 mb-4">
              Verified User
            </Badge>
            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1">
                Change Photo
              </Button>
              <Button variant="outline" className="flex-1">
                Remove
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Card className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="tokens">Tokens</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="personal" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wallet">Wallet Address</Label>
                    <Input
                      id="wallet"
                      defaultValue="0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background"
                      placeholder="Tell us about yourself@/components."
                      defaultValue="DeFi enthusiast and early adopter"
                    />
                  </div>

                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
                    Save Changes
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="security" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-cyan-500" />
                      <div>
                        <div>Two-Factor Authentication</div>
                        <div className="text-sm text-gray-400">
                          Add an extra layer of security
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-cyan-500" />
                      <div>
                        <div>Email Notifications</div>
                        <div className="text-sm text-gray-400">
                          Get notified about account activity
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                  </div>

                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
                    Update Password
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-cyan-500" />
                      <div>
                        <div>Push Notifications</div>
                        <div className="text-sm text-gray-400">
                          Receive notifications on your device
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Eye className="h-5 w-5 text-cyan-500" />
                      <div>
                        <div>Show Balance</div>
                        <div className="text-sm text-gray-400">
                          Display your balance on dashboard
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <select className="w-full px-3 py-2 rounded-md border border-input bg-background">
                      <option>English</option>
                      <option>Español</option>
                      <option>中文</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <select className="w-full px-3 py-2 rounded-md border border-input bg-background">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>

                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500">
                    Save Preferences
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="tokens" className="space-y-4">
                <div className="space-y-4">
                  <Card className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-cyan-500/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-cyan-500" />
                        GOV Token Balance
                      </CardTitle>
                      <CardDescription>Your governance token holdings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-4xl mb-4">12,543 GOV</div>
                      <div className="text-sm text-gray-400 mb-4">≈ $37,629.00 USD</div>
                      <Progress value={65} className="mb-2" />
                      <div className="text-sm text-gray-400">
                        Voting power: 0.12% of total supply
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Staked Tokens</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl mb-2">8,420 GOV</div>
                        <div className="text-sm text-gray-400">APY: 12.5%</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Rewards Earned</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl mb-2">342 GOV</div>
                        <div className="text-sm text-gray-400">≈ $1,026.00 USD</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500">
                      Stake Tokens
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Claim Rewards
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>

      {/* Activity History */}
      <Card>
        <CardHeader>
          <CardTitle>Activity History</CardTitle>
          <CardDescription>Recent account activity and security logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {historyLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 rounded-lg border hover:border-cyan-500/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      log.status === 'success'
                        ? 'bg-green-500/10 text-green-500'
                        : 'bg-red-500/10 text-red-500'
                    }`}
                  >
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <div>{log.action}</div>
                    <div className="text-sm text-gray-400">{log.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">{log.time}</div>
                  <Badge
                    variant={log.status === 'success' ? 'default' : 'destructive'}
                    className={
                      log.status === 'success' ? 'bg-green-500/10 text-green-500' : ''
                    }
                  >
                    {log.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
